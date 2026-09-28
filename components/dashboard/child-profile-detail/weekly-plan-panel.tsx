'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { ChildProfile } from '@/features/child-profiles/model/child-profile.types';
import type { AssignedWeeklyPlan } from '@/features/weekly-plans';
import { getMondayOfDate, getSundayOfMonday } from '@/features/weekly-plans';

const DAYS_CONFIG = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
  { short: 'Sun', full: 'Sunday' },
];

type WeeklyPlanPanelProps = {
  child?: ChildProfile | null;
  currentPlan?: AssignedWeeklyPlan | null;
  isLoading?: boolean;
};

export function WeeklyPlanPanel({ child, currentPlan, isLoading }: WeeklyPlanPanelProps) {
  const planDetails = useMemo(() => {
    const now = new Date();
    const monday = currentPlan?.startDate
      ? getMondayOfDate(new Date(currentPlan.startDate))
      : getMondayOfDate(now);
    const sunday = getSundayOfMonday(monday);

    const monMonth = monday.toLocaleDateString('en-US', { month: 'short' });
    const sunMonth = sunday.toLocaleDateString('en-US', { month: 'short' });
    const monDay = monday.getDate();
    const sunDay = sunday.getDate();
    const dateRangeStr =
      monMonth === sunMonth
        ? `${monMonth} ${monDay}–${sunDay}`
        : `${monMonth} ${monDay} – ${sunMonth} ${sunDay}`;

    const weekNumber = currentPlan?.weeklyPlan?.weekNumber;
    const weekSubtitle = weekNumber
      ? `Week ${weekNumber} · ${dateRangeStr}`
      : `Current Week · ${dateRangeStr}`;
    const planTitle = currentPlan?.weeklyPlan?.title || "This Week's Plan";
    const weeklyFocus =
      currentPlan?.weeklyPlan?.category ||
      currentPlan?.weeklyPlan?.customCategory ||
      currentPlan?.weeklyPlan?.description ||
      'Bilateral Coordination & Motor Planning';

    const completions = currentPlan?.child?.activityCompletions ?? [];
    // JS getDay(): 0 is Sunday, 1 is Monday ... 6 is Saturday -> map to 0=Mon ... 6=Sun
    const todayIndex = (now.getDay() + 6) % 7;

    const daysStatus = DAYS_CONFIG.map((dayConfig, index) => {
      const scheduled = currentPlan?.weeklyPlan?.activities?.find((item) => {
        const itemDay = item.day?.trim().toLowerCase();
        return (
          itemDay === dayConfig.full.toLowerCase() || itemDay === dayConfig.short.toLowerCase()
        );
      });

      const isCompleted = scheduled?.activity
        ? completions.some(
            (c) => c.activityId === scheduled.activity.id || c.activityId === scheduled.activityId
          )
        : false;

      const isToday = index === todayIndex;

      return {
        short: dayConfig.short,
        isCompleted,
        isToday,
      };
    });

    const completedCount = daysStatus.filter((d) => d.isCompleted).length;
    const totalDays = 7;
    const percent = Math.round((completedCount / totalDays) * 100);
    const remainingCount = Math.max(0, totalDays - completedCount);

    return {
      weekSubtitle,
      planTitle,
      weeklyFocus,
      daysStatus,
      completedCount,
      totalDays,
      percent,
      remainingCount,
    };
  }, [currentPlan]);

  if (isLoading) {
    return (
      <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-6 2xl:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] animate-pulse">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 rounded bg-[#e9f1ee]" />
              <div className="h-8 w-48 rounded bg-[#e9f1ee]" />
            </div>
            <div className="h-16 w-full rounded-xl bg-[#e9f1ee]" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-4 w-28 rounded bg-[#e9f1ee]" />
            <div className="flex justify-between gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="size-7.5 rounded-full bg-[#e9f1ee]" />
              ))}
            </div>
          </div>
        </div>
        <div className="h-4 w-full rounded bg-[#e9f1ee]" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 rounded-2xl bg-[#e9f1ee]" />
          <div className="h-16 rounded-2xl bg-[#e9f1ee]" />
        </div>
        <div className="h-10 w-full rounded-full bg-[#e9f1ee]" />
      </section>
    );
  }

  if (!currentPlan) {
    return (
      <section className="flex min-w-0 flex-col justify-between gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-6 2xl:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              {planDetails.weekSubtitle}
            </p>
            <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
              This Week&apos;s Plan
            </h2>
          </div>
          <div className="rounded-xl border border-dashed border-[#d8ddd9] bg-[#fafafa] p-6 text-center">
            <p className="font-nunito text-base font-semibold text-[#263238]">
              No weekly plan active for this week
            </p>
            <p className="mt-1 font-manrope text-xs text-[#7d8488]">
              Assign or view weekly plans curated by our pediatric occupational therapists.
            </p>
          </div>
        </div>
        <Link
          href={`/dashboard/weekly-plans${child?.id ? `?childId=${child.id}` : ''}`}
          className="relative flex h-10 w-full items-center justify-center gap-1 overflow-hidden rounded-full border border-[#d8ddd9] bg-[#2f7d7e] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-white hover:bg-[#256667] transition-colors"
        >
          <span className="relative">View Weekly Plans</span>
          <Image
            className="relative"
            src="/Home/figma-child-plan-arrow.svg"
            alt=""
            width={16}
            height={16}
          />
          <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]" />
        </Link>
      </section>
    );
  }

  return (
    <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-6 2xl:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              {planDetails.weekSubtitle}
            </p>
            <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
              {planDetails.planTitle}
            </h2>
          </div>
          <div className="rounded-xl bg-[#fce9e3] px-3 py-2">
            <p className="font-nunito text-xs font-medium leading-4 text-[#515b60]">Weekly Focus</p>
            <p className="mt-1 font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#493630]">
              {planDetails.weeklyFocus}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            Daily activities
          </p>
          <div className="flex items-center justify-between gap-0.5">
            {planDetails.daysStatus.map((dayItem) => {
              const complete = dayItem.isCompleted;
              const current = dayItem.isToday;
              return (
                <div
                  key={dayItem.short}
                  className="flex min-w-0 flex-col items-center gap-1 sm:w-7.5"
                >
                  <span
                    className={`flex size-7.5 items-center justify-center rounded-full border-2 ${
                      complete || current
                        ? 'border-[#2f7d7e] bg-[#2f7d7e]'
                        : 'border-[#d4d6d7] bg-[#d4d6d7]'
                    }`}
                  >
                    {complete ? (
                      <Image
                        src="/Home/figma-child-plan-check.svg"
                        alt="Complete"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <span className="size-2.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span
                    className={`font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] ${
                      complete || current ? 'text-[#2f7d7e]' : 'text-[#7d8488]'
                    }`}
                  >
                    {dayItem.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between font-nunito text-xs font-medium leading-4">
          <span className="text-[#263238]">
            {planDetails.completedCount} of {planDetails.totalDays} complete
          </span>
          <span className="text-[#2f7d7e]">{planDetails.percent}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#eaecee]">
          <div
            className="h-full bg-[#2f7d7e] transition-all duration-300"
            style={{ width: `${planDetails.percent}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 font-nunito text-center">
        <div className="rounded-2xl bg-[#fafafa] px-4 py-3">
          <p className="text-2xl font-medium leading-8 text-[#263238]">
            {planDetails.remainingCount}
          </p>
          <p className="mt-1 text-xs font-medium leading-4 text-[#7d8488]">Remaining</p>
        </div>
        <div className="rounded-2xl bg-[#fafafa] px-4 py-3">
          <p className="text-2xl font-medium leading-8 text-[#2f7d7e]">
            {planDetails.completedCount}
          </p>
          <p className="mt-1 text-xs font-medium leading-4 text-[#7d8488]">Completed</p>
        </div>
      </div>
      <Link
        href={`/dashboard/weekly-plans${child?.id ? `?childId=${child.id}` : ''}`}
        className="relative flex h-10 w-full items-center justify-center gap-1 overflow-hidden rounded-full border border-[#d8ddd9] bg-[#2f7d7e] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-white hover:bg-[#256667] transition-colors"
      >
        <span className="relative">Continue Weekly Plan</span>
        <Image
          className="relative"
          src="/Home/figma-child-plan-arrow.svg"
          alt=""
          width={16}
          height={16}
        />
        <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]" />
      </Link>
    </section>
  );
}
