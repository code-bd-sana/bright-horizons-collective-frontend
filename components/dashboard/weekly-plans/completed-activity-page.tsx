'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, Loader2, Medal } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useAppStore } from '@/store/use-app-store';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import { useActivity } from '@/features/activities/hooks/activities.queries';
import { useSubmitActivityCompletionFeedback } from '@/features/activities/hooks/activities.mutations';
import {
  findCurrentWeeklyPlan,
  useMyWeeklyPlans,
  type ActivityCompletionSummary,
} from '@/features/weekly-plans';

const ACTIVITY_MASK = '/Home/figma-completed-activity-thumbnail-mask.svg';
const DEFAULT_ACTIVITY_IMAGE = '/Home/figma-completed-activity-thumbnail.png';
const HERO_IMAGE = '/Home/figma-completed-activity-hero.png';
const STAR_IMAGE = '/Home/figma-completed-activity-star.svg';
const CLOCK_ICON = '/Home/figma-completed-activity-clock.svg';
const DEVELOPMENT_ICON = '/Home/figma-completed-activity-development.svg';
const MATERIALS_ICON = '/Home/figma-completed-activity-materials.svg';
const HERO_TOP_DECORATION = '/Home/figma-completed-activity-hero-top-decoration.svg';
const HERO_GLOW = '/Home/figma-completed-activity-hero-glow.svg';
const HERO_RIGHT_DECORATION = '/Home/figma-completed-activity-hero-right-decoration.svg';
const HERO_LEFT_DECORATION = '/Home/figma-completed-activity-hero-left-decoration.svg';

const difficultyOptions = [
  { label: 'Too Easy', emoji: '😵' },
  { label: 'Easy', emoji: '🙂' },
  { label: 'Just Right', emoji: '✅' },
  { label: 'Challenging', emoji: '💪' },
  { label: 'Too Hard', emoji: '😅' },
];

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

function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[16px] border border-[#d8ddd9] bg-[#fffdf8] p-5 shadow-[0_1px_3px_rgba(23,74,77,0.06)] sm:p-6 lg:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

function SkillPill({
  label,
  value,
  warm = false,
}: {
  label: string;
  value: string;
  warm?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        warm ? 'border-[#fce9e3] bg-[#fff4f0]' : 'border-[#d5e5e5] bg-[#f0f9f9]'
      }`}
    >
      <span
        aria-hidden
        className={`size-1.25 rounded-full ${warm ? 'bg-[#f2b59f]' : 'bg-[#2f7d7e]'}`}
      />
      <span className="font-manrope text-[10px] font-normal leading-3.75 text-[#515b60]">
        {label}
      </span>
      <span
        className={`font-nunito text-[10px] font-medium leading-3.75 ${
          warm ? 'text-[#e39779]' : 'text-[#2f7d7e]'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function CompletedActivityPage() {
  const searchParams = useSearchParams();
  const paramActivityId = searchParams.get('activityId');
  const paramChildId = searchParams.get('childId');

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

  const childName = activeChild?.name || 'Emma';

  // 2. Resolve child weekly plans
  const childAssignments = useMemo(() => {
    if (!activeChild) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === activeChild.id);
  }, [assignedPlans, activeChild]);

  const relevantPlan = useMemo(() => {
    if (!childAssignments.length) return null;
    if (paramActivityId) {
      const containing = childAssignments.find((plan) =>
        plan.weeklyPlan?.activities?.some((a) => a.activityId === paramActivityId)
      );
      if (containing) return containing;
    }
    return findCurrentWeeklyPlan(childAssignments) || childAssignments[0] || null;
  }, [childAssignments, paramActivityId]);

  // 3. Fallback activity ID if not in query params
  const effectiveActivityId = useMemo(() => {
    if (paramActivityId) return paramActivityId;
    const planActivity = relevantPlan?.weeklyPlan?.activities?.[0]?.activityId;
    return planActivity || undefined;
  }, [paramActivityId, relevantPlan]);

  // 4. Fetch activity data
  const activityQuery = useActivity(effectiveActivityId);
  const activity = activityQuery.data;

  // 5. Check existing completion feedback
  const existingCompletion = useMemo(() => {
    const list = (relevantPlan?.child?.activityCompletions || []) as Array<{
      activityId?: string;
      difficulty?: string | null;
      rating?: number | null;
      reflections?: unknown;
      parentNotes?: string | null;
    }>;
    return list.find((c) => c.activityId === effectiveActivityId) || null;
  }, [relevantPlan, effectiveActivityId]);

  // User overrides in state (undefined indicates untouched by user)
  const [userDifficulty, setUserDifficulty] = useState<string | null | undefined>(undefined);
  const [userRating, setUserRating] = useState<number | null | undefined>(undefined);
  const [userReflections, setUserReflections] = useState<string[] | null | undefined>(undefined);
  const [userNotes, setUserNotes] = useState<string | null | undefined>(undefined);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const difficulty =
    userDifficulty !== undefined ? userDifficulty : existingCompletion?.difficulty || null;
  const rating: number =
    (userRating !== undefined && userRating !== null ? userRating : existingCompletion?.rating) ||
    0;
  const notes: string =
    (userNotes !== undefined && userNotes !== null ? userNotes : existingCompletion?.parentNotes) ||
    '';

  const reflections = useMemo(() => {
    if (userReflections !== undefined && userReflections !== null) {
      return userReflections;
    }
    if (existingCompletion?.reflections) {
      try {
        const parsed =
          typeof existingCompletion.reflections === 'string'
            ? JSON.parse(existingCompletion.reflections)
            : existingCompletion.reflections;
        if (Array.isArray(parsed)) {
          return [parsed[0] || '', parsed[1] || '', parsed[2] || ''];
        }
      } catch {
        // Keep defaults
      }
    }
    return ['', '', ''];
  }, [userReflections, existingCompletion]);

  const submitFeedbackMutation = useSubmitActivityCompletionFeedback();

  const updateReflection = (index: number, value: string) => {
    const updated = [...reflections];
    updated[index] = value;
    setUserReflections(updated);
  };

  // 6. Compute weekly stats
  const weeklyStats = useMemo(() => {
    const totalDays = 7;
    const completions: ActivityCompletionSummary[] = relevantPlan?.child?.activityCompletions || [];

    const planActivities = relevantPlan?.weeklyPlan?.activities || [];
    let completedCount = 0;

    if (planActivities.length > 0) {
      completedCount = planActivities.filter((item) =>
        completions.some((c: ActivityCompletionSummary) => c.activityId === item.activityId)
      ).length;
    } else {
      completedCount = completions.length > 0 ? completions.length : 1;
    }

    // Ensure at least 1 completed since user just finished this activity
    completedCount = Math.max(1, completedCount);
    const progressPercent = Math.min(100, Math.round((completedCount / totalDays) * 100));
    const remainingCount = Math.max(0, totalDays - completedCount);
    const weekNumber = relevantPlan?.weeklyPlan?.weekNumber || 1;

    return {
      totalDays,
      completedCount,
      remainingCount,
      progressPercent,
      weekNumber,
    };
  }, [relevantPlan]);

  // Scheduled day label
  const scheduledDayLabel = useMemo(() => {
    const scheduled = relevantPlan?.weeklyPlan?.activities?.find(
      (a) => a.activityId === effectiveActivityId
    );
    if (scheduled?.day) {
      return scheduled.day.trim();
    }
    const now = new Date();
    return now.toLocaleDateString('en-US', { weekday: 'long' });
  }, [relevantPlan, effectiveActivityId]);

  const handleSaveReflection = async () => {
    if (!activeChild?.id || !effectiveActivityId) {
      setSaved(true);
      return;
    }
    try {
      setIsSaving(true);
      await submitFeedbackMutation.mutateAsync({
        childId: activeChild.id,
        input: {
          activityId: effectiveActivityId,
          weeklyPlanId: relevantPlan?.weeklyPlanId,
          difficulty: difficulty || undefined,
          rating: rating > 0 ? rating : undefined,
          reflections: reflections.some(Boolean) ? reflections : undefined,
          parentNotes: notes || undefined,
        },
      });
      setSaved(true);
    } catch {
      setSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  const activityTitle = activity?.title || 'Animal Yoga Adventure';
  const difficultyLabel = formatDifficulty(activity?.difficultyLevel);
  const durationLabel = formatDuration(activity?.estimatedDuration);
  const categoryLabel = activity?.developmentCategory || 'Motor Planning & Balance';
  const materialsLabel =
    activity?.materialsSummary ||
    (activity?.materialsNeeded && activity.materialsNeeded.length > 0
      ? activity.materialsNeeded[0].name
      : 'Yoga cards & open space');
  const activityImage =
    imageError || !activity?.featuredImageUrl ? DEFAULT_ACTIVITY_IMAGE : activity.featuredImageUrl;

  const reflectionPrompts = [
    `What did ${childName} enjoy most about this activity?`,
    `Did ${childName} find any step particularly easy or difficult?`,
    'What would you try differently or adjust next time?',
  ];

  const isLoading = activityQuery.isLoading || isChildrenLoading || isPlansLoading;

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-304 flex-col items-center justify-center py-24 text-[#515b60]">
        <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
        <p className="mt-3 font-manrope text-sm font-medium">Loading completion summary...</p>
      </div>
    );
  }

  const conicDeg = Math.round((weeklyStats.progressPercent / 100) * 360);

  return (
    <div className="mx-auto w-full max-w-304 pb-12 lg:pb-16">
      {/* Hero Banner */}
      <section className="relative isolate flex min-h-72.5 items-center justify-center overflow-hidden rounded-[16px] border border-[#d5e5e5] bg-[#fffdf8] p-5 shadow-[0_1px_3px_rgba(23,74,77,0.06)] sm:p-8 lg:h-102.25">
        <div
          aria-hidden
          className="absolute left-138.75 -top-77 hidden h-[486.145px] w-[485.446px] items-center justify-center lg:flex"
        >
          <Image
            src={HERO_TOP_DECORATION}
            alt=""
            width={358}
            height={344}
            className="rotate-[-131.21deg]"
          />
        </div>
        <div
          aria-hidden
          className="absolute -left-54.25 -top-160.75 hidden h-[1564px] w-[2136px] lg:block"
        >
          <Image src={HERO_GLOW} alt="" fill sizes="2136px" className="scale-[1.2]" />
        </div>
        <div
          aria-hidden
          className="absolute left-244.5 top-34.25 hidden h-[311.274px] w-[312.979px] items-center justify-center lg:flex"
        >
          <Image
            src={HERO_RIGHT_DECORATION}
            alt=""
            width={237}
            height={228}
            className="rotate-[-30.88deg]"
          />
        </div>
        <div
          aria-hidden
          className="absolute -left-45 top-39 hidden h-[475.282px] w-[477.465px] items-center justify-center lg:flex"
        >
          <Image
            src={HERO_LEFT_DECORATION}
            alt=""
            width={358}
            height={344}
            className="rotate-[-33.09deg]"
          />
        </div>
        <div className="relative flex w-full max-w-110.5 flex-col items-center gap-6 text-center">
          <div className="flex w-34.5 flex-col items-center gap-4">
            <div className="relative size-20 overflow-hidden rounded-full bg-[#864949] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
              <Image
                src={activeChild?.photoUrl || HERO_IMAGE}
                alt={childName}
                fill
                sizes="80px"
                className="scale-[1.1] object-cover"
                priority
              />
            </div>
            <p className="w-full font-manrope text-[12px] font-bold uppercase leading-4.5 tracking-[1.2px] text-[#f2b59f]">
              Activity complete
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-3">
            <h1 className="w-full max-w-99 font-nunito text-[28px] font-medium leading-9 tracking-[-0.16px] text-[#2f7d7e] sm:text-[32px] sm:leading-10">
              Amazing work, {childName}! 🌟
            </h1>
            <p className="font-manrope text-[14px] font-normal leading-5.5 tracking-[-0.084px] text-[#7d8488]">
              You just finished{' '}
              <span className="font-semibold text-[#263238]">{activityTitle}</span> — that&apos;s
              another step forward in your development journey.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-6 lg:mt-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Activity Summary Card */}
          <SectionCard className="lg:h-79.5">
            <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
              Activity Summary
            </h2>
            <div className="mt-4 flex items-center gap-4 border-b border-[#d8ddd9] pb-5">
              <div className="relative size-18 shrink-0">
                <span
                  className="absolute inset-0 overflow-hidden bg-[#d8e2df]"
                  style={{
                    WebkitMaskImage: `url(${ACTIVITY_MASK})`,
                    maskImage: `url(${ACTIVITY_MASK})`,
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                  }}
                >
                  <Image
                    src={activityImage}
                    alt={activityTitle}
                    fill
                    sizes="72px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </span>
              </div>
              <div className="min-w-0 text-left">
                <div className="mb-2 flex gap-2">
                  <span className="rounded-full bg-[#e9f1ee] px-2 py-0.5 font-nunito text-[10px] font-medium leading-3.75 text-[#607077]">
                    {scheduledDayLabel}
                  </span>
                  <span className="rounded-full bg-[#e4f6ec] px-2 py-0.5 font-nunito text-[10px] font-medium leading-3.75 text-[#2f7d7e]">
                    {difficultyLabel}
                  </span>
                </div>
                <p className="truncate font-nunito text-[18px] font-medium leading-6 tracking-[-0.27px] text-[#174a4d]">
                  {activityTitle}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-manrope text-[10px] font-normal leading-3.75 text-[#607077]">
                  <span className="flex items-center gap-1">
                    <Image src={CLOCK_ICON} alt="" width={12} height={12} />
                    {durationLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src={DEVELOPMENT_ICON} alt="" width={12} height={12} />
                    {categoryLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src={MATERIALS_ICON} alt="" width={12} height={12} />
                    {materialsLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Progress Ring */}
            <div className="mt-4 flex items-center gap-4">
              <div
                className="grid size-19.5 shrink-0 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#20a15e 0deg ${conicDeg}deg, #d9e3df ${conicDeg}deg 360deg)`,
                }}
              >
                <div className="grid size-15.5 place-items-center rounded-full bg-[#fffdf8] font-nunito text-[14px] font-medium leading-5 text-[#263238]">
                  {weeklyStats.progressPercent}%
                </div>
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] text-[#263238]">
                  {weeklyStats.completedCount} of 7 activities done this week
                </p>
                <p className="mt-1 font-manrope text-[10px] font-normal leading-3.75 text-[#7d8488]">
                  {weeklyStats.remainingCount} activities remaining in Week {weeklyStats.weekNumber}
                </p>
                <div
                  className="mt-2 flex gap-1"
                  aria-label={`${weeklyStats.completedCount} of 7 activities completed`}
                >
                  {Array.from({ length: 7 }, (_, index) => (
                    <span
                      key={index}
                      className={`h-1 w-6 rounded-full ${
                        index < weeklyStats.completedCount ? 'bg-[#2f7d7e]' : 'bg-[#e8ebe8]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Skills Practiced Card */}
          <SectionCard className="lg:h-79.5">
            <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
              Skills Practiced
            </h2>
            <p className="mt-3 font-manrope text-[12px] font-normal leading-4.5 text-[#607077]">
              Completing this activity contributed to these developmental skill areas for{' '}
              {childName}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <SkillPill label={categoryLabel} value="82%" />
              <SkillPill label="Postural Balance" value="75%" />
              <SkillPill label="Body Awareness" value="68%" />
              <SkillPill label="Self-Regulation" value="55%" warm />
            </div>
            <div className="mt-5 flex min-h-13 items-center gap-3 rounded-[12px] bg-[#fce9e3] px-3 py-2">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f2b59f]">
                <Medal aria-hidden className="size-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-manrope text-[12px] font-normal leading-4.5 text-[#263238]">
                  {categoryLabel} is {childName}&apos;s top developing skill this week
                </p>
                <p className="font-manrope text-[10px] font-normal leading-3.75 text-[#515b60]">
                  {activity?.developmentGoal ||
                    'Sequencing and executing body movements in the right order'}
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Rate Difficulty */}
        <SectionCard>
          <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
            Rate Difficulty
          </h2>
          <p className="mt-2 font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]">
            How challenging was this activity for {childName} today?
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {difficultyOptions.map((option) => {
              const isSelected = difficulty === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setUserDifficulty(option.label)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-1.5 rounded-full border border-[#d5e5e5] bg-white px-4 py-2.5 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#263238] outline-none transition-colors hover:border-[#2f7d7e] focus-visible:ring-2 focus-visible:ring-[#2f7d7e] cursor-pointer ${
                    isSelected ? 'bg-[#e9f1ee] border-[#2f7d7e]' : ''
                  }`}
                >
                  <span aria-hidden className="text-[20px] leading-5">
                    {option.emoji}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* Parent Reflection */}
        <SectionCard>
          <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
            Parent Reflection
          </h2>
          <div className="mt-6 flex flex-col gap-8">
            {reflectionPrompts.map((prompt, index) => (
              <label
                key={prompt}
                className="flex flex-col gap-4 font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]"
              >
                {prompt}
                <textarea
                  value={reflections[index]}
                  onChange={(event) => updateReflection(index, event.target.value)}
                  placeholder="Share your observation…"
                  className="h-37.5 w-full resize-y rounded-[24px] border border-[#d8ddd9] bg-white p-4 font-manrope text-[14px] font-normal leading-5.5 tracking-[-0.084px] text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#7d8488] focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#d5e5e5]"
                />
              </label>
            ))}
          </div>
        </SectionCard>

        {/* Overall Rating & Notes */}
        <SectionCard>
          <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
            Overall Rating &amp; Notes
          </h2>
          <fieldset className="mt-6">
            <legend className="font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]">
              Rate this activity overall
            </legend>
            <div className="mt-4 flex gap-2" aria-label="Overall rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setUserRating(value)}
                  aria-label={`${value} star${value === 1 ? '' : 's'}`}
                  aria-pressed={rating >= value}
                  className="relative size-7.5 rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e] cursor-pointer"
                >
                  <Image
                    src={STAR_IMAGE}
                    alt=""
                    fill
                    sizes="26px"
                    className={`transition-opacity ${rating >= value ? 'opacity-100' : 'opacity-25 grayscale'}`}
                  />
                </button>
              ))}
            </div>
          </fieldset>
          <label className="mt-8 flex flex-col gap-4 font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]">
            Add Notes (optional)
            <textarea
              value={notes}
              onChange={(event) => setUserNotes(event.target.value)}
              placeholder="Any other observations, modifications you made, or ideas for next time…"
              className="h-37.5 w-full resize-y rounded-[24px] border border-[#d8ddd9] bg-white p-4 font-manrope text-[14px] font-normal leading-5.5 tracking-[-0.084px] text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#7d8488] focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#d5e5e5]"
            />
          </label>
        </SectionCard>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6 pt-2">
          <button
            type="button"
            onClick={handleSaveReflection}
            disabled={isSaving}
            className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#2f7d7e] px-3 py-2 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] outline-none transition-opacity hover:opacity-90 disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-[#174a4d] cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : saved ? (
              <Check aria-hidden className="size-4" />
            ) : null}
            {isSaving ? 'Saving...' : saved ? 'Reflection Saved' : 'Save Reflection & Continue'}
          </button>
          <Link
            href="/dashboard/weekly-plans"
            className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full border border-[#d8ddd9] bg-[#fffdf8] px-3 py-2 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] outline-none transition-colors hover:bg-[#f7faf8] focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Return to Weekly Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
