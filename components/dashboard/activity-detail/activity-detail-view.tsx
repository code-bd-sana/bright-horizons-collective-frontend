'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { useAppStore } from '@/store/use-app-store';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import { useActivity } from '@/features/activities/hooks/activities.queries';
import {
  findCurrentWeeklyPlan,
  useMyWeeklyPlans,
  type ActivityCompletionSummary,
} from '@/features/weekly-plans';
import { formatAgeRange } from '@/features/activities/model/activity.mapper';

import { ActivityHero } from './activity-hero';
import { ActivityOverview } from './activity-overview';
import { MaterialsNeeded } from './materials-needed';
import { StepByStepInstructions } from './step-by-step';
import { ActivityModifications } from './activity-modifications';
import { ActivitySidebar } from './activity-sidebar';

function formatDifficulty(difficulty?: string | null): string {
  if (!difficulty) return 'Easy';
  const lower = difficulty.toLowerCase();
  if (lower.includes('mod')) return 'Moderate';
  if (lower.includes('chal') || lower.includes('hard') || lower.includes('adv'))
    return 'Challenging';
  return 'Easy';
}

function formatDuration(duration?: string | null): string {
  if (!duration) return '20 min';
  const clean = duration.trim();
  if (clean.toLowerCase().includes('min')) return clean;
  return `${clean} min`;
}

interface ActivityDetailViewProps {
  activityId?: string;
  childId?: string;
}

export function ActivityDetailView({ activityId, childId: paramChildId }: ActivityDetailViewProps) {
  const { selectedChildId } = useAppStore();
  const { data: children = [], isLoading: isChildrenLoading } = useChildProfiles();
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();

  // 1. Resolve active child
  const activeChild = useMemo(() => {
    if (paramChildId) {
      const match = children.find((c) => c.id === paramChildId);
      if (match) return match;
    }
    return children.find((c) => c.id === selectedChildId) || children[0] || null;
  }, [children, paramChildId, selectedChildId]);

  // 2. Fetch activity
  const activityQuery = useActivity(activityId);
  const activity = activityQuery.data;

  // 3. Find weekly plan context for active child
  const childAssignments = useMemo(() => {
    if (!activeChild) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === activeChild.id);
  }, [assignedPlans, activeChild]);

  const relevantPlan = useMemo(() => {
    if (!childAssignments.length) return null;
    if (activityId) {
      const containing = childAssignments.find((plan) =>
        plan.weeklyPlan?.activities?.some((a) => a.activityId === activityId)
      );
      if (containing) return containing;
    }
    return findCurrentWeeklyPlan(childAssignments) || childAssignments[0] || null;
  }, [childAssignments, activityId]);

  // 4. Derive scheduled day and completion
  const scheduledItem = useMemo(() => {
    if (!relevantPlan?.weeklyPlan?.activities || !activityId) return null;
    return relevantPlan.weeklyPlan.activities.find((a) => a.activityId === activityId) || null;
  }, [relevantPlan, activityId]);

  const scheduledDayLabel = useMemo(() => {
    if (scheduledItem?.day) {
      const day = scheduledItem.day.trim();
      return `${day} Activity`;
    }
    const now = new Date();
    return now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }, [scheduledItem]);

  const isCompleted = useMemo(() => {
    if (activity?.isCompleted) return true;
    if (!activeChild || !activityId) return false;
    const completions: ActivityCompletionSummary[] = relevantPlan?.child?.activityCompletions || [];
    return completions.some((c) => c.activityId === activityId);
  }, [activity, activeChild, relevantPlan, activityId]);

  const isLoading = activityQuery.isLoading || isChildrenLoading || isPlansLoading;

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-265.75 min-w-0 flex-col gap-6 pb-12 2xl:gap-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-28 rounded bg-[#e9f1ee] animate-pulse" />
          <span className="text-[#d8ddd9]">/</span>
          <div className="h-4 w-44 rounded bg-[#e9f1ee] animate-pulse" />
        </div>

        <div className="flex h-100 w-full items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white">
          <div className="flex flex-col items-center gap-3 text-[#515b60]">
            <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
            <p className="font-manrope text-sm font-medium">Loading activity details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (activityQuery.isError || !activity) {
    return (
      <div className="mx-auto flex w-full max-w-265.75 min-w-0 flex-col gap-6 pb-12 2xl:gap-8">
        <nav aria-label="Breadcrumb" className="flex min-h-5.5 flex-wrap items-center gap-1.5">
          <Link
            href="/dashboard/weekly-plans"
            className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#2f7d7e] hover:underline"
          >
            Weekly Plans
          </Link>
          <span className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#d8ddd9]">
            /
          </span>
          <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
            Activity Not Found
          </span>
        </nav>

        <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8ddd9] bg-white p-12 text-center shadow-xs">
          <h2 className="font-nunito text-2xl font-semibold text-[#263238]">Activity Not Found</h2>
          <p className="mt-2 max-w-md font-manrope text-sm text-[#7d8488]">
            The requested activity could not be found or may no longer be available.
          </p>
          <Link
            href="/dashboard/weekly-plans"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2f7d7e] px-5 py-2.5 font-nunito text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" />
            Return to Weekly Plans
          </Link>
        </div>
      </div>
    );
  }

  const difficultyBadge = formatDifficulty(activity.difficultyLevel);
  const ageRangeBadge = formatAgeRange(activity.minAgeMonths, activity.maxAgeMonths);
  const durationLabel = formatDuration(activity.estimatedDuration);
  const materialsLabel =
    activity.materialsSummary ||
    (activity.materialsNeeded && activity.materialsNeeded.length > 0
      ? activity.materialsNeeded.map((m) => (typeof m === 'string' ? m : m.name)).join(', ')
      : 'Household items');

  return (
    <div className="mx-auto flex w-full max-w-265.75 min-w-0 flex-col gap-6 pb-12 2xl:gap-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex min-h-5.5 flex-wrap items-center gap-1.5">
        <Link
          href="/dashboard/weekly-plans"
          className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#2f7d7e] hover:underline"
        >
          Weekly Plans
        </Link>
        <span className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#d8ddd9]">
          /
        </span>
        <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
          {activity.title}
        </span>
      </nav>

      {/* Top Card: Hero & Overview */}
      <div className="flex w-full min-w-0 flex-col gap-6 rounded-2xl border border-(--border\/300,#e8ebe8) bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:gap-8 2xl:p-8">
        <ActivityHero
          imageSrc={activity.featuredImageUrl}
          title={activity.title}
          difficulty={difficultyBadge}
          ageRange={ageRangeBadge}
        />
        <ActivityOverview
          scheduledDay={scheduledDayLabel}
          title={activity.title}
          description={activity.shortDescription}
          duration={durationLabel}
          materials={materialsLabel}
          developmentGoal={activity.developmentGoal || activity.developmentCategory}
          isOtDesigned={activity.isOtDesigned}
          learningObjective={activity.learningObjective}
          childName={activeChild?.name}
        />
      </div>

      {/* Two Column Layout */}
      <div className="flex w-full min-w-0 flex-col items-start gap-6 min-[1600px]:flex-row">
        {/* Main Content Column (Left) */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-6 min-[1600px]:max-w-188">
          <MaterialsNeeded
            materials={activity.materialsNeeded}
            materialsSummary={activity.materialsSummary}
          />
          <StepByStepInstructions
            instructions={activity.instructions}
            childName={activeChild?.name}
          />
          <ActivityModifications
            makeItEasier={activity.makeItEasier}
            makeItHarder={activity.makeItHarder}
            childName={activeChild?.name}
          />
        </div>

        {/* Sidebar Column (Right) */}
        <div className="w-full shrink-0 min-[1600px]:w-71.75">
          <ActivitySidebar
            activityId={activity.id}
            isCompleted={isCompleted}
            isFavorited={activity.isFavorited}
            childId={activeChild?.id}
            childName={activeChild?.name}
            parentTips={activity.parentTips}
            safetyNotes={activity.safetyNotes}
            developmentGoal={activity.developmentGoal || activity.developmentCategory}
          />
        </div>
      </div>
    </div>
  );
}
