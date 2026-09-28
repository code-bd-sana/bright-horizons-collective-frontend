'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Clock3 } from 'lucide-react';

import { ActivityArtwork } from './activity-artwork';
import type { ChildProfile } from '@/features/child-profiles/model/child-profile.types';
import type { AssignedWeeklyPlan } from '@/features/weekly-plans';

type ActivityPanelProps = {
  child?: ChildProfile | null;
  currentPlan?: AssignedWeeklyPlan | null;
  isLoading?: boolean;
};

function formatDifficulty(difficulty?: string | null): string {
  if (!difficulty) return 'Easy';
  const lower = difficulty.toLowerCase();
  if (lower.includes('mod')) return 'Moderate';
  if (lower.includes('chal') || lower.includes('hard')) return 'Challenging';
  return 'Easy';
}

function formatDuration(duration?: string | null): string {
  if (!duration) return '20 min';
  const clean = duration.trim();
  if (clean.toLowerCase().includes('min')) return clean;
  return `${clean} min`;
}

export function ActivityPanel({ child, currentPlan, isLoading }: ActivityPanelProps) {
  const activityData = useMemo(() => {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayDayName = dayNames[now.getDay()];
    const todayDateStr = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    if (!currentPlan) {
      return {
        dateFormatted: `Today · ${todayDateStr}`,
        hasPlan: false,
        activity: null,
        isCompleted: false,
      };
    }

    // 1. Check if today has a scheduled activity
    const scheduledToday = currentPlan.weeklyPlan?.activities?.find((item) => {
      const itemDay = item.day?.trim().toLowerCase();
      return (
        itemDay === todayDayName.toLowerCase() || itemDay === todayDayName.slice(0, 3).toLowerCase()
      );
    });

    const completions = currentPlan.child?.activityCompletions ?? [];

    // 2. If scheduled today has an activity, use that.
    // Otherwise fallback to the next incomplete activity in the plan, or the first activity
    const targetItem = scheduledToday?.activity
      ? scheduledToday
      : currentPlan.weeklyPlan?.activities?.find(
          (item) => !completions.some((c) => c.activityId === item.activity?.id)
        ) || currentPlan.weeklyPlan?.activities?.[0];

    const activity = targetItem?.activity ?? null;
    const isCompleted = activity ? completions.some((c) => c.activityId === activity.id) : false;

    const dateFormatted = scheduledToday?.activity
      ? `Today's Activity · ${todayDateStr}`
      : targetItem?.day
        ? `${targetItem.day}'s Activity · ${todayDateStr}`
        : `Today's Activity · ${todayDateStr}`;

    return {
      dateFormatted,
      hasPlan: true,
      activity,
      isCompleted,
    };
  }, [currentPlan]);

  if (isLoading) {
    return (
      <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-6 2xl:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] animate-pulse">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-36 rounded bg-[#e9f1ee]" />
            <div className="h-8 w-56 rounded bg-[#e9f1ee]" />
          </div>
          <div className="h-14 w-full rounded bg-[#e9f1ee]" />
          <div className="h-61.5 w-full rounded-2xl bg-[#e9f1ee]" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-full bg-[#e9f1ee]" />
          <div className="h-7 w-24 rounded-full bg-[#e9f1ee]" />
        </div>
      </section>
    );
  }

  // Fallback: No scheduled activity found
  if (!activityData.activity) {
    return (
      <section className="flex min-w-0 flex-col justify-between gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-6 2xl:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              {activityData.dateFormatted}
            </p>
            <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
              Rest &amp; Free Play Day
            </h2>
          </div>
          <p className="font-manrope text-sm leading-5.5 text-[#515b60]">
            {child
              ? `There is no scheduled therapy activity for ${child.name} today. A wonderful opportunity for unstructured play, rest, or revisiting favorite activities!`
              : 'No activity scheduled for today. Enjoy unstructured play or revisit favorite activities!'}
          </p>
          <ActivityArtwork
            src="/Home/figma-child-yoga-panda.png"
            alt="Rest and Free Play"
            focalPoint="50% 58%"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-[#d4d6d7] bg-white px-2.5 py-1 font-nunito text-xs font-medium text-[#515b60]">
              <Clock3 className="size-3" />
              Flexible
            </span>
            <span className="rounded-full border border-[#accbcb] bg-white px-2.5 py-1 font-nunito text-xs font-medium text-[#2f7d7e]">
              Free Exploration
            </span>
          </div>
          <Link
            href="/dashboard/explore?tab=activities"
            className="inline-flex items-center gap-1 rounded-full bg-[#2f7d7e] px-4 py-2 font-nunito text-sm font-medium text-white hover:bg-[#256667] transition-colors"
          >
            Explore Activities
          </Link>
        </div>
      </section>
    );
  }

  const activity = activityData.activity;
  const imageSrc =
    activity.featuredImageUrl || activity.featuredImage || '/Home/figma-child-yoga-panda.png';
  const difficultyLabel = formatDifficulty(activity.difficultyLevel);
  const durationLabel = formatDuration(activity.estimatedDuration);
  const materialTag =
    activity.materialsSummary ||
    (activity.materialsNeeded && activity.materialsNeeded.length > 0
      ? activity.materialsNeeded[0].name
      : 'Yoga cards & open space');
  const categoryTag = activity.developmentCategory || 'Motor planning & balance';

  return (
    <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-6 2xl:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              {activityData.dateFormatted}
            </p>
            <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
              {activity.title}
            </h2>
          </div>
          {activityData.isCompleted ? (
            <div className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#dceeee] bg-[#e0f0e9] px-4 py-2 font-nunito text-sm font-medium text-[#174a4d]">
              <CheckCircle2 className="size-4 text-[#2f7d7e]" />
              <span>Completed</span>
            </div>
          ) : (
            <Link
              href={`/dashboard/weekly-plans/activity-detail?activityId=${activity.id}${child?.id ? `&childId=${child.id}` : ''}`}
              className="relative flex h-10 w-full shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#d8ddd9] bg-[#2f7d7e] px-4 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-white sm:w-auto hover:bg-[#256667] transition-colors"
            >
              <span className="relative">Start Activity</span>
              <Image
                className="relative"
                src="/Home/figma-child-yoga-arrow.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]" />
            </Link>
          )}
        </div>
        <p className="max-w-101 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
          {activity.shortDescription ||
            activity.description ||
            'Move through fun animal poses to build balance and whole-body motor planning. Perfect for an energetic start to the week.'}
        </p>
        <ActivityArtwork src={imageSrc} alt={activity.title} focalPoint="50% 58%" />
      </div>
      <div className="flex min-h-17 flex-col gap-2">
        <div className="flex items-center gap-1.25">
          <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
            {difficultyLabel}
          </span>
          <span className="flex items-center gap-1 px-2 py-1.5">
            <Image src="/Home/figma-child-yoga-clock.svg" alt="" width={12} height={12} />
            <span className="font-manrope text-xs leading-4.5 text-[#607077]">{durationLabel}</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-1.25">
          <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            {materialTag}
          </span>
          <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            {categoryTag}
          </span>
        </div>
      </div>
    </section>
  );
}
