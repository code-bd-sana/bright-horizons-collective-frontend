'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { AllPlansHeader } from '@/components/dashboard/weekly-plans/all/all-plans-header';
import { PlanCard } from '@/components/dashboard/weekly-plans/all/plan-card';
import { PlanSection } from '@/components/dashboard/weekly-plans/all/plan-section';
import { useAppStore } from '@/store/use-app-store';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import {
  getMondayOfDate,
  getSundayOfMonday,
  useMyWeeklyPlans,
  type ActivityCompletionSummary,
  type AssignedWeeklyPlan,
} from '@/features/weekly-plans';

const DAY_KEYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

function formatDateRange(startDate?: string | null, endDate?: string | null): string {
  if (!startDate) return 'Date not set';
  const start = new Date(startDate);
  const planMonday = getMondayOfDate(start);
  const planSunday = endDate ? new Date(endDate) : getSundayOfMonday(planMonday);

  const startStr = planMonday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr = planSunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${startStr} – ${endStr}`;
}

export default function AllWeeklyPlansPage() {
  const { selectedChildId } = useAppStore();
  const { data: children = [], isLoading: isChildrenLoading } = useChildProfiles();
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();

  // 1. Resolve active child
  const activeChild = useMemo(() => {
    return children.find((c) => c.id === selectedChildId) || children[0] || null;
  }, [children, selectedChildId]);

  // 2. Filter plans for active child
  const childPlans = useMemo(() => {
    if (!activeChild) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === activeChild.id);
  }, [assignedPlans, activeChild]);

  // 3. Categorize into Current, Upcoming, and Previous
  const categorizedPlans = useMemo(() => {
    const now = new Date();
    const currentMonday = getMondayOfDate(now);
    const currentSunday = getSundayOfMonday(currentMonday);

    const current: AssignedWeeklyPlan[] = [];
    const upcoming: AssignedWeeklyPlan[] = [];
    const previous: AssignedWeeklyPlan[] = [];

    childPlans.forEach((plan) => {
      const start = plan.startDate ? new Date(plan.startDate) : new Date(plan.createdAt);
      const end = plan.endDate
        ? new Date(plan.endDate)
        : new Date(start.getTime() + 7 * 86400000 - 1);

      const isCurrent =
        (now >= start && now <= end) || (start <= currentSunday && end >= currentMonday);

      if (isCurrent) {
        current.push(plan);
      } else if (start > currentSunday) {
        upcoming.push(plan);
      } else {
        previous.push(plan);
      }
    });

    // Upcoming: soonest first
    upcoming.sort((a, b) => {
      const aTime = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bTime = b.startDate ? new Date(b.startDate).getTime() : 0;
      return aTime - bTime;
    });

    // Previous: most recently ended first
    previous.sort((a, b) => {
      const aTime = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bTime = b.startDate ? new Date(b.startDate).getTime() : 0;
      return bTime - aTime;
    });

    return { current, upcoming, previous };
  }, [childPlans]);

  // 4. Compute header stats for active child
  const headerStats = useMemo(() => {
    const completions: ActivityCompletionSummary[] = childPlans.flatMap(
      (p) => p.child?.activityCompletions || []
    );

    const uniqueCompletions = completions.filter(
      (item: ActivityCompletionSummary, idx: number, arr: ActivityCompletionSummary[]) =>
        arr.findIndex((c: ActivityCompletionSummary) => c.activityId === item.activityId) === idx
    );

    const activitiesCompleted = uniqueCompletions.length;
    const weeksCompleted = categorizedPlans.previous.length;

    let avgCompletion = 0;
    if (childPlans.length > 0) {
      const totalRates = childPlans.map((plan) => {
        const activities = plan.weeklyPlan?.activities || [];
        const total = 7;
        const count = activities.filter((act) =>
          uniqueCompletions.some((c: ActivityCompletionSummary) => c.activityId === act.activityId)
        ).length;
        return (count / total) * 100;
      });
      avgCompletion = Math.round(
        totalRates.reduce((acc, curr) => acc + curr, 0) / childPlans.length
      );
    }

    return {
      weeksCompleted,
      activitiesCompleted,
      avgCompletion,
      streak: activitiesCompleted,
    };
  }, [childPlans, categorizedPlans]);

  const isLoading = isChildrenLoading || isPlansLoading;

  // Helper to compute card properties for an assigned plan
  function renderPlanCard(
    plan: AssignedWeeklyPlan,
    sectionType: 'current' | 'upcoming' | 'previous'
  ) {
    const completions: ActivityCompletionSummary[] = plan.child?.activityCompletions ?? [];

    const planActivities = plan.weeklyPlan?.activities || [];

    // Map each day of the week Mon-Sun to its completion status
    const completedDays = DAY_KEYS.map((dayKey) => {
      const scheduled = planActivities.find((a) => {
        const d = a.day?.trim().toLowerCase();
        return d === dayKey || d?.startsWith(dayKey.slice(0, 3));
      });
      if (!scheduled) return false;
      return completions.some(
        (c: ActivityCompletionSummary) => c.activityId === scheduled.activityId
      );
    });

    const progress = completedDays.filter(Boolean).length;
    const totalDays = 7;
    const isAllDone = progress >= totalDays;

    let status: 'active' | 'upcoming' | 'completed' = 'upcoming';
    if (sectionType === 'current') {
      status = isAllDone ? 'completed' : 'active';
    } else if (sectionType === 'previous') {
      status = 'completed';
    }

    const weekNumber = plan.weeklyPlan?.weekNumber || 1;
    const title = plan.weeklyPlan?.title || 'Weekly Plan';
    const dateRange = formatDateRange(plan.startDate, plan.endDate);
    const imageSrc = plan.weeklyPlan?.featuredImage || '/weekly-plans/plan-image.png';

    return (
      <PlanCard
        key={plan.id}
        status={status}
        weekNumber={weekNumber}
        title={title}
        dateRange={dateRange}
        progress={progress}
        totalDays={totalDays}
        imageSrc={imageSrc}
        completedDays={completedDays}
        activityLink="/dashboard/weekly-plans"
      />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center pb-25">
      <div className="flex w-full max-w-382.25 flex-col gap-10 lg:gap-14">
        {/* Top Breadcrumb & Header */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/weekly-plans"
              className="font-['Nunito'] font-medium text-[12px] leading-4 text-[#2f7d7e] hover:underline"
            >
              Weekly Plans
            </Link>
            <span className="font-['Nunito'] font-medium text-[12px] leading-4 text-(--text-primary\/200,#8f9b99)">
              /
            </span>
            <span className="font-['Nunito'] font-medium text-[12px] leading-4 text-[#263238]">
              All Weekly Plans
            </span>
          </div>

          <AllPlansHeader
            childName={activeChild?.name}
            weeksCompleted={headerStats.weeksCompleted}
            activitiesCompleted={headerStats.activitiesCompleted}
            avgCompletion={headerStats.avgCompletion}
            streak={headerStats.streak}
          />
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="flex w-full flex-col gap-8 animate-pulse">
            {[1, 2, 3].map((sectionIdx) => (
              <div
                key={sectionIdx}
                className="flex w-full flex-col gap-4 rounded-[16px] border border-[#e8ebe8] bg-white p-4 sm:p-6 lg:gap-6 lg:p-8"
              >
                <div className="h-8 w-48 rounded bg-[#e9f1ee]" />
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <div className="h-91.75 w-71.5 rounded-[16px] bg-[#f7f9f8]" />
                  <div className="h-91.75 w-71.5 rounded-[16px] bg-[#f7f9f8]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* 1. Current Week Plan */}
            <div className="flex w-full flex-col gap-4 rounded-[16px] border border-[#e8ebe8] bg-white p-4 sm:p-6 lg:gap-6 lg:p-8">
              <PlanSection title="Current Weeks">
                {categorizedPlans.current.length > 0 ? (
                  categorizedPlans.current.map((plan) => renderPlanCard(plan, 'current'))
                ) : (
                  <div className="flex w-full items-center justify-center rounded-[12px] border border-dashed border-[#d8ddd9] bg-[#fafafa] py-10 text-center font-['Manrope'] text-[14px] text-[#7d8488]">
                    No active weekly plan for the current week
                    {activeChild ? ` for ${activeChild.name}` : ''}.
                  </div>
                )}
              </PlanSection>
            </div>

            {/* 2. Upcoming Weeks */}
            <div className="flex w-full flex-col gap-4 rounded-[16px] border border-[#e8ebe8] bg-white p-4 sm:p-6 lg:gap-6 lg:p-8">
              <PlanSection title="Upcoming Weeks">
                {categorizedPlans.upcoming.length > 0 ? (
                  categorizedPlans.upcoming.map((plan) => renderPlanCard(plan, 'upcoming'))
                ) : (
                  <div className="flex w-full items-center justify-center rounded-[12px] border border-dashed border-[#d8ddd9] bg-[#fafafa] py-10 text-center font-['Manrope'] text-[14px] text-[#7d8488]">
                    No upcoming weekly plans scheduled
                    {activeChild ? ` for ${activeChild.name}` : ''}.
                  </div>
                )}
              </PlanSection>
            </div>

            {/* 3. Previous Weekly Plan */}
            <div className="flex w-full flex-col gap-4 rounded-[16px] border border-[#e8ebe8] bg-white p-4 sm:p-6 lg:gap-6 lg:p-8">
              <PlanSection title="Previous Weekly Plan">
                {categorizedPlans.previous.length > 0 ? (
                  categorizedPlans.previous.map((plan) => renderPlanCard(plan, 'previous'))
                ) : (
                  <div className="flex w-full items-center justify-center rounded-[12px] border border-dashed border-[#d8ddd9] bg-[#fafafa] py-10 text-center font-['Manrope'] text-[14px] text-[#7d8488]">
                    No previous weekly plans completed yet
                    {activeChild ? ` for ${activeChild.name}` : ''}.
                  </div>
                )}
              </PlanSection>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
