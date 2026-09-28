'use client';

import { useMemo } from 'react';
import { useActiveChild } from '@/features/child-profiles/context/child-profile-detail-context';
import {
  useChildCompletedActivities,
  useChildProgress,
  useChildRecentActivities,
} from '@/features/child-profiles/hooks/child-profiles.queries';
import { findCurrentWeeklyPlan, useMyWeeklyPlans } from '@/features/weekly-plans';

import { StatCards } from '@/components/dashboard/child-profile-detail/development-progress/stat-cards';
import { DevelopmentAreas } from '@/components/dashboard/child-profile-detail/development-progress/development-areas';
import { Highlights } from '@/components/dashboard/child-profile-detail/development-progress/highlights';
import { NextSteps } from '@/components/dashboard/child-profile-detail/development-progress/next-steps';

function calculateActivityStreak(completionDates: string[]): number {
  if (!completionDates || completionDates.length === 0) return 0;

  const uniqueDays = Array.from(
    new Set(
      completionDates.map((d) => {
        const date = new Date(d);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      })
    )
  )
    .sort()
    .reverse();

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(now.getTime() - 86400000);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  const latestDay = uniqueDays[0];
  if (latestDay !== todayStr && latestDay !== yesterdayStr) {
    return 0;
  }

  let streak = 0;
  const expected = new Date(latestDay);

  for (const dayStr of uniqueDays) {
    const actual = new Date(dayStr);
    const diffDays = Math.round((expected.getTime() - actual.getTime()) / 86400000);
    if (diffDays === 0) {
      streak += 1;
      expected.setDate(expected.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export default function DevelopmentProgressPage() {
  const { child, isLoading: isChildLoading } = useActiveChild();

  const { data: progressReport, isLoading: isProgressLoading } = useChildProgress(child?.id);
  const { data: completedData, isLoading: isCompletedLoading } = useChildCompletedActivities(
    child?.id
  );
  const { data: recentActivities = [], isLoading: isRecentLoading } = useChildRecentActivities(
    child?.id,
    100
  );
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();

  const childAssignments = useMemo(() => {
    if (!child) return [];
    return assignedPlans.filter((p) => p.childId === child.id);
  }, [assignedPlans, child]);

  const currentPlan = useMemo(() => {
    const active = findCurrentWeeklyPlan(childAssignments);
    if (active) return active;
    if (childAssignments.length > 0) return childAssignments[0];
    return null;
  }, [childAssignments]);

  const totalActivitiesCompleted = useMemo(() => {
    return completedData?.completedActivityIds?.length ?? recentActivities.length;
  }, [completedData, recentActivities]);

  const streak = useMemo(() => {
    const dates = recentActivities.map((a) => a.completedAt);
    return calculateActivityStreak(dates);
  }, [recentActivities]);

  const weeklyPlanStats = useMemo(() => {
    const totalWeekly = currentPlan?.weeklyPlan?.activities?.length || 7;
    const planCompletions = currentPlan?.child?.activityCompletions ?? [];
    const completedThisWeek =
      currentPlan?.weeklyPlan?.activities?.filter((item) =>
        planCompletions.some(
          (c) => c.activityId === item.activity?.id || c.activityId === item.activityId
        )
      ).length ?? 0;

    const percent = Math.min(100, Math.round((completedThisWeek / totalWeekly) * 100));

    return {
      totalWeekly,
      completedThisWeek,
      percent,
    };
  }, [currentPlan]);

  const completionsByCategory = useMemo(() => {
    const counts: Record<string, number> = {
      fine_motor: 0,
      gross_motor: 0,
      sensory: 0,
      coordination: 0,
      visual_motor: 0,
      self_care: 0,
    };

    recentActivities.forEach((item) => {
      const cat = item.activity?.developmentCategory?.toLowerCase() ?? '';
      if (cat.includes('fine')) counts.fine_motor += 1;
      else if (cat.includes('gross')) counts.gross_motor += 1;
      else if (cat.includes('sensory')) counts.sensory += 1;
      else if (cat.includes('coord')) counts.coordination += 1;
      else if (cat.includes('visual')) counts.visual_motor += 1;
      else if (cat.includes('self') || cat.includes('care')) counts.self_care += 1;
    });

    return counts;
  }, [recentActivities]);

  const milestonesCount = useMemo(() => {
    return Math.floor(totalActivitiesCompleted / 3);
  }, [totalActivitiesCompleted]);

  const isDataLoading =
    isChildLoading || isProgressLoading || isCompletedLoading || isRecentLoading || isPlansLoading;

  if (!child) return null;

  return (
    <div className="mx-auto mt-8 flex w-full min-w-0 max-w-343.5 flex-col gap-6 pb-12 sm:mt-10 sm:gap-8 2xl:mt-14 2xl:gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.005em] text-[#263238] sm:text-3xl sm:leading-10 2xl:text-[32px]">
            Development Progress
          </h1>
          <p className="font-manrope text-sm font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
            A summary of {child.name}&apos;s engagement across development areas — based on
            activities completed, not evaluations.
          </p>
        </div>
        <StatCards
          activitiesCompleted={totalActivitiesCompleted}
          weeklyPlanCompletionPercent={weeklyPlanStats.percent}
          streak={streak}
          isLoading={isDataLoading}
        />
      </div>

      <DevelopmentAreas
        progressReport={progressReport}
        completionsByCategory={completionsByCategory}
        isLoading={isDataLoading}
      />
      <Highlights
        currentWeekCompleted={weeklyPlanStats.completedThisWeek}
        totalWeekActivities={weeklyPlanStats.totalWeekly}
        currentWeekPercent={weeklyPlanStats.percent}
        milestonesCount={milestonesCount}
        isLoading={isDataLoading}
      />
      <NextSteps childName={child.name.split(' ')[0]} />
    </div>
  );
}
