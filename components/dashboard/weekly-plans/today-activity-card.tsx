'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import {
  findCurrentWeeklyPlan,
  useMyWeeklyPlans,
  type ActivityCompletionSummary,
} from '@/features/weekly-plans';

const yogaMask = '/Home/figma-parent-dashboard-star-mask.svg';
const defaultYogaImage = '/Home/figma-parent-dashboard-yoga.png';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

function formatDuration(duration?: string | null): string {
  if (!duration) return '20 min';
  const clean = duration.trim();
  if (clean.toLowerCase().includes('min')) return clean;
  return `${clean} min`;
}

function formatDifficulty(difficulty?: string | null): string {
  if (!difficulty) return 'Easy';
  const lower = difficulty.toLowerCase();
  if (lower.includes('mod')) return 'Moderate';
  if (lower.includes('chal') || lower.includes('hard')) return 'Challenging';
  return 'Easy';
}

export function TodayActivityCard() {
  const { selectedChildId } = useAppStore();
  const { data: children = [], isLoading: isChildrenLoading } = useChildProfiles();
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();
  const [imageError, setImageError] = useState(false);

  // 1. Resolve active child
  const activeChild = useMemo(() => {
    return children.find((c) => c.id === selectedChildId) || children[0] || null;
  }, [children, selectedChildId]);

  // 2. Filter assignments for active child
  const childAssignments = useMemo(() => {
    if (!activeChild) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === activeChild.id);
  }, [assignedPlans, activeChild]);

  // 3. Find assignment matching the current week range
  const currentPlan = useMemo(() => {
    return findCurrentWeeklyPlan(childAssignments);
  }, [childAssignments]);

  const isLoading = isChildrenLoading || isPlansLoading;

  // 4. Determine today's activity
  const todayData = useMemo(() => {
    const now = new Date();
    const todayName = DAY_NAMES[now.getDay()];
    const dateFormatted = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    if (!currentPlan) {
      return {
        now,
        dateFormatted,
        hasPlan: false,
        todayActivity: null,
        isCompleted: false,
      };
    }

    const scheduled = currentPlan.weeklyPlan?.activities?.find((item) => {
      const itemDay = item.day?.trim().toLowerCase();
      return itemDay === todayName.toLowerCase() || itemDay === todayName.slice(0, 3).toLowerCase();
    });

    const activity = scheduled?.activity ?? null;
    const completions: ActivityCompletionSummary[] = currentPlan.child?.activityCompletions ?? [];
    const isCompleted = activity
      ? completions.some((c: ActivityCompletionSummary) => c.activityId === activity.id)
      : false;

    return {
      now,
      dateFormatted,
      hasPlan: true,
      todayActivity: activity,
      isCompleted,
    };
  }, [currentPlan]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:min-h-174.75 min-[1800px]:p-8">
        <div className="flex flex-col gap-5 sm:gap-6 animate-pulse">
          <div className="h-7 w-44 rounded bg-[#e9f1ee]" />
          <div className="aspect-[322.443/309.925] w-full max-h-82.25 rounded-2xl bg-[#e9f1ee]" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 rounded bg-[#e9f1ee]" />
            <div className="h-6 w-3/4 rounded bg-[#e9f1ee]" />
            <div className="h-14 w-full rounded bg-[#e9f1ee]" />
          </div>
          <div className="h-11 w-full rounded-full bg-[#e9f1ee]" />
        </div>
      </section>
    );
  }

  // Case 1: Active weekly plan and today has a scheduled activity
  if (todayData.hasPlan && todayData.todayActivity) {
    const activity = todayData.todayActivity;
    const rawImage = activity.featuredImageUrl || activity.featuredImage || defaultYogaImage;
    const imageSrc = imageError ? defaultYogaImage : rawImage;
    const difficultyLabel = formatDifficulty(activity.difficultyLevel);
    const durationLabel = formatDuration(activity.estimatedDuration);
    const materialTag =
      activity.materialsSummary ||
      (activity.materialsNeeded && activity.materialsNeeded.length > 0
        ? activity.materialsNeeded[0].name
        : null);

    return (
      <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:min-h-174.75 min-[1800px]:p-8">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
              Today&apos;s Activity
            </h2>
            {activeChild && (
              <span className="shrink-0 rounded-full border border-[#d2e3dc] bg-[#e9f1ee] px-2.5 py-0.5 font-nunito text-xs font-semibold text-[#174a4d]">
                {activeChild.name}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {/* Masked Hero Thumbnail */}
            <div className="relative aspect-[322.443/309.925] w-full max-h-82.25 overflow-hidden rounded-2xl bg-[#d2e3dc]">
              <div
                className="absolute inset-2 sm:inset-2.5"
                style={{
                  WebkitMaskImage: `url(${yogaMask})`,
                  maskImage: `url(${yogaMask})`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              >
                <Image
                  src={imageSrc}
                  alt={activity.title}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 64px), 560px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            </div>

            {/* Title, Date & Description */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex flex-col gap-1">
                  <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                    {todayData.dateFormatted}
                  </p>
                  <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                    {activity.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                  {difficultyLabel}
                </span>
              </div>

              <p className="max-w-122.25 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                {activity.shortDescription ||
                  activity.description ||
                  'Engaging and playful therapeutic activity designed to support your child’s goals.'}
              </p>
            </div>
          </div>

          {/* Badges: Duration, Materials & Category */}
          <div className="flex flex-wrap items-start gap-2">
            <span className="flex items-center gap-1 rounded-full border border-[#d4d6d7] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#515b60]">
              <Clock3 aria-hidden="true" className="size-3 stroke-[1.5]" />
              {durationLabel}
            </span>
            <span className="flex flex-wrap gap-1.25">
              {materialTag && (
                <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                  {materialTag}
                </span>
              )}
              {activity.developmentCategory && (
                <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                  {activity.developmentCategory}
                </span>
              )}
            </span>
          </div>

          {/* Action Button */}
          {todayData.isCompleted ? (
            <div className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border border-[#bcd5cb] bg-[#e9f1ee] px-3 font-nunito text-base font-semibold leading-6 text-[#174a4d]">
              <CheckCircle2 className="size-5 text-[#2f7d7e]" />
              Completed Today
            </div>
          ) : (
            <Link
              href={`/dashboard/weekly-plans/activity-detail?activityId=${activity.id}`}
              className="flex min-h-11 w-full items-center justify-center gap-1 rounded-full bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition-colors hover:bg-[#235d5d]"
            >
              Start Activity
              <ArrowRight className="size-4 stroke-2" />
            </Link>
          )}
        </div>
      </section>
    );
  }

  // Case 2: Active plan exists for this week, but today has no scheduled activity (Rest Day)
  if (todayData.hasPlan && !todayData.todayActivity) {
    return (
      <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:min-h-174.75 min-[1800px]:p-8">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
              Today&apos;s Activity
            </h2>
            {activeChild && (
              <span className="shrink-0 rounded-full border border-[#d2e3dc] bg-[#e9f1ee] px-2.5 py-0.5 font-nunito text-xs font-semibold text-[#174a4d]">
                {activeChild.name}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-[322.443/309.925] w-full max-h-82.25 overflow-hidden rounded-2xl bg-[#d2e3dc]">
              <div
                className="absolute inset-2 sm:inset-2.5"
                style={{
                  WebkitMaskImage: `url(${yogaMask})`,
                  maskImage: `url(${yogaMask})`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              >
                <Image
                  src={defaultYogaImage}
                  alt="Rest & Free Play"
                  fill
                  sizes="(max-width: 639px) calc(100vw - 64px), 560px"
                  className="object-cover opacity-80"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="min-w-0 flex flex-col gap-1">
                <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                  {todayData.dateFormatted}
                </p>
                <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                  Rest &amp; Free Play Day
                </h3>
              </div>

              <p className="max-w-122.25 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                {activeChild
                  ? `There is no scheduled therapy activity for ${activeChild.name} today. A wonderful opportunity for unstructured play, rest, or revisiting favorite activities!`
                  : 'No activity scheduled for today. Enjoy unstructured play or revisit favorite activities!'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-2">
            <span className="flex items-center gap-1 rounded-full border border-[#d4d6d7] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#515b60]">
              <Clock3 aria-hidden="true" className="size-3 stroke-[1.5]" />
              Flexible
            </span>
            <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Free Exploration
            </span>
          </div>

          <Link
            href="/dashboard/explore?tab=activities"
            className="flex min-h-11 w-full items-center justify-center gap-1 rounded-full bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition-colors hover:bg-[#235d5d]"
          >
            Explore Activities
            <ArrowRight className="size-4 stroke-2" />
          </Link>
        </div>
      </section>
    );
  }

  // Case 3: No weekly plan active for this week
  return (
    <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:min-h-174.75 min-[1800px]:p-8">
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
            Today&apos;s Activity
          </h2>
          {activeChild && (
            <span className="shrink-0 rounded-full border border-[#d2e3dc] bg-[#e9f1ee] px-2.5 py-0.5 font-nunito text-xs font-semibold text-[#174a4d]">
              {activeChild.name}
            </span>
          )}
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d2e3dc] bg-[#fbfdfc] px-6 py-12 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#e9f1ee] text-[#2f7d7e]">
            <Sparkles className="size-6" />
          </div>
          <h3 className="font-nunito text-lg font-semibold text-[#174a4d]">
            No Activity Scheduled Today
          </h3>
          <p className="mt-1.5 max-w-sm font-manrope text-sm leading-relaxed text-[#607077]">
            {activeChild
              ? `There is no weekly plan active for ${activeChild.name} for the current week. Explore our activities library for fun therapy-informed games!`
              : 'Please select a child profile from the navbar to view today’s activity.'}
          </p>
          <Link
            href="/dashboard/explore?tab=activities"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2f7d7e] px-5 py-2.5 font-nunito text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Explore Activities
            <ArrowRight className="size-4 stroke-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
