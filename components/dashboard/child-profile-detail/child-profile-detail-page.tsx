'use client';

import { useMemo } from 'react';
import { useActiveChild } from '@/features/child-profiles/context/child-profile-detail-context';
import { findCurrentWeeklyPlan, useMyWeeklyPlans } from '@/features/weekly-plans';

import { ActivityPanel } from './activity-panel';
import { RecommendedResourcesPanel, RecentActivityPanel } from './development-panels';
import { WeeklyPlanPanel } from './weekly-plan-panel';

export function ChildProfileDetailPage() {
  const { child, isLoading: isChildLoading } = useActiveChild();
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();

  const childAssignments = useMemo(() => {
    if (!child) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === child.id);
  }, [assignedPlans, child]);

  const currentPlan = useMemo(() => {
    const active = findCurrentWeeklyPlan(childAssignments);
    if (active) return active;
    if (childAssignments.length > 0) return childAssignments[0];
    return null;
  }, [childAssignments]);

  const isLoading = isChildLoading || isPlansLoading;

  return (
    <div className="mx-auto w-full min-w-0 max-w-382.25">
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 2xl:grid-cols-2">
        <WeeklyPlanPanel child={child} currentPlan={currentPlan} isLoading={isLoading} />
        <ActivityPanel child={child} currentPlan={currentPlan} isLoading={isLoading} />
        <RecommendedResourcesPanel />
        <RecentActivityPanel child={child} />
      </div>
    </div>
  );
}
