'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronRight, Clock3 } from 'lucide-react';

import { useAppStore } from '@/store/use-app-store';
import {
  useChildProfiles,
  useChildProgress,
} from '@/features/child-profiles/hooks/child-profiles.queries';
import type { ChildProfile } from '@/features/child-profiles/model/child-profile.types';
import {
  findCurrentWeeklyPlan,
  useMyWeeklyPlans,
  type ActivityCompletionSummary,
  type AssignedWeeklyPlan,
  CATEGORY_BACKEND_TO_UI,
} from '@/features/weekly-plans';
import { useUserProfile } from '@/components/dashboard/settings/hooks/use-user-profile';
import { useParentResourceFavorites } from '@/features/parent-resources/hooks/parent-resources.queries';

const activityMask = '/Home/figma-parent-dashboard-activity-mask.svg';
const recommendationMask = '/Home/figma-parent-dashboard-recommendation-mask.svg';
const yogaMask = '/Home/figma-parent-dashboard-star-mask.svg';
const defaultYogaImage = '/Home/figma-parent-dashboard-yoga.png';

const DAYS_OF_WEEK = [
  { label: 'Mon', dayName: 'Monday', dayIndex: 1 },
  { label: 'Tue', dayName: 'Tuesday', dayIndex: 2 },
  { label: 'Wed', dayName: 'Wednesday', dayIndex: 3 },
  { label: 'Thu', dayName: 'Thursday', dayIndex: 4 },
  { label: 'Fri', dayName: 'Friday', dayIndex: 5 },
  { label: 'Sat', dayName: 'Saturday', dayIndex: 6 },
  { label: 'Sun', dayName: 'Sunday', dayIndex: 0 },
] as const;

const recentActivities = [
  {
    title: 'Sensory Rice Bin Exploration',
    detail: 'Sensory Processing · 20 min',
    image: '/Home/figma-parent-dashboard-rice-bin.png',
  },
  {
    title: 'Finger Painting with Pudding',
    detail: 'Fine Motor · 15 min',
    image: '/Home/figma-parent-dashboard-finger-painting.png',
  },
  {
    title: 'Water Pouring Station',
    detail: 'Coordination · 20 min',
    image: '/Home/figma-parent-dashboard-water-pouring.png',
  },
  {
    title: 'Sensory Rice Bin Exploration',
    detail: 'Sensory Processing · 20 min',
    image: '/Home/figma-parent-dashboard-rice-bin.png',
  },
];

const recommendations = [
  {
    type: 'Activity',
    title: 'Lacing Cards Challenge',
    description: 'Build pincer grip and patience through guided lacing.',
    image: '/Home/figma-parent-dashboard-lacing-cards.png',
    tone: 'bg-[#e0f0e9] border-[#dceeee]',
  },
  {
    type: 'Article',
    title: 'Why Sensory Play Matters',
    description: 'Evidence-based guide to sensory integration for toddlers.',
    image: '/Home/figma-parent-dashboard-sensory-play.png',
    tone: 'bg-[#fce9e3] border-[#fce9e3]',
  },
];

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

function formatDateRange(startDate?: string | null, endDate?: string | null): string {
  if (!startDate) {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const mon = new Date(now.getFullYear(), now.getMonth(), diff);
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    return `${mon.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${sun.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }
  const s = new Date(startDate);
  const e = endDate ? new Date(endDate) : new Date(s.getTime() + 6 * 86400000);
  const sMonth = s.toLocaleDateString('en-US', { month: 'short' });
  const eMonth = e.toLocaleDateString('en-US', { month: 'short' });
  if (sMonth === eMonth) {
    return `${sMonth} ${s.getDate()}–${e.getDate()}`;
  }
  return `${sMonth} ${s.getDate()} – ${eMonth} ${e.getDate()}`;
}

function calculateStreak(completions: ActivityCompletionSummary[]): number {
  if (!completions || completions.length === 0) return 0;
  const dates = Array.from(
    new Set(
      completions
        .map((c) => {
          try {
            return new Date(c.completedAt).toISOString().split('T')[0];
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    )
  )
    .sort()
    .reverse();

  if (dates.length === 0) return 0;
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let currentTarget = dates[0] === today ? today : yesterday;
  if (dates[0] !== today && dates[0] !== yesterday) {
    return 1;
  }

  for (const d of dates) {
    if (d === currentTarget) {
      streak++;
      currentTarget = new Date(new Date(currentTarget).getTime() - 86400000)
        .toISOString()
        .split('T')[0];
    }
  }

  return Math.max(streak, 1);
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-6 lg:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${className}`}
    >
      {children}
    </section>
  );
}

function ArrowLink({
  children,
  href,
  full = false,
}: {
  children: React.ReactNode;
  href: string;
  full?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${full ? 'flex w-full' : 'inline-flex'} h-10 items-center justify-center gap-1 rounded-full border border-[#d8ddd9] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] transition-colors hover:bg-[#f6fbfa]`}
    >
      {children}
      <Image src="/Home/figma-parent-dashboard-progress-arrow.svg" alt="" width={16} height={16} />
    </Link>
  );
}

function WelcomeBanner({
  userName,
  activeChild,
  currentPlan,
  activitiesDoneCount,
  resourcesSavedCount,
}: {
  userName: string;
  activeChild: ChildProfile | null;
  currentPlan: AssignedWeeklyPlan | null;
  activitiesDoneCount: number;
  resourcesSavedCount: number;
}) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const completions = currentPlan?.child?.activityCompletions ?? [];
  const streak = calculateStreak(completions);

  const stats = [
    {
      icon: '/Home/figma-parent-dashboard-icon-fire.svg',
      value: String(streak > 0 ? streak : 6),
      label: 'Week streak',
    },
    {
      icon: '/Home/figma-parent-dashboard-icon-star.svg',
      value: String(activitiesDoneCount > 0 ? activitiesDoneCount : 42),
      label: 'Activities done',
    },
    {
      icon: '/Home/figma-parent-dashboard-icon-bookmark.svg',
      value: String(resourcesSavedCount > 0 ? resourcesSavedCount : 8),
      label: 'Resources saved',
    },
  ];

  const focusTitle =
    currentPlan?.weeklyPlan?.title ||
    (currentPlan?.weeklyPlan?.category
      ? CATEGORY_BACKEND_TO_UI[currentPlan.weeklyPlan.category]
      : null) ||
    currentPlan?.weeklyPlan?.customCategory ||
    'Fine Motor Development';

  return (
    <section className="relative min-h-85 overflow-hidden rounded-2xl border border-[#fce9e3] bg-[#fffdf8] p-4 sm:p-6 lg:h-85 lg:p-8">
      <Image
        src="/Home/figma-parent-dashboard-hero-background.svg"
        alt=""
        width={1893}
        height={1454}
        className="pointer-events-none absolute -left-8 -top-136 max-w-none"
      />
      <Image
        src="/Home/figma-parent-dashboard-hero-wave.svg"
        alt=""
        width={358}
        height={344}
        className="pointer-events-none absolute left-127.25 -top-58.75 max-w-none rotate-[-131.21deg]"
      />
      <Image
        src="/Home/figma-parent-dashboard-hero-squiggle-right.svg"
        alt=""
        width={358}
        height={344}
        className="pointer-events-none absolute -right-16.5 top-34.5 max-w-none rotate-[-34.13deg]"
      />
      <Image
        src="/Home/figma-parent-dashboard-hero-squiggle-left.svg"
        alt=""
        width={358}
        height={344}
        className="pointer-events-none absolute -bottom-14 max-w-none rotate-[-33.09deg]"
      />

      <div className="relative z-10 flex h-full min-w-0 flex-col justify-between xl:flex-row">
        <div className="min-w-0 max-w-110.5">
          <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.084px] text-[#515b60]">
            {greeting} · {dateFormatted}
          </p>
          <h1 className="mt-2 font-nunito text-3xl font-semibold leading-10 tracking-[-0.3px] text-[#2f7d7e] sm:text-[40px] sm:leading-12 sm:tracking-[-0.4px]">
            Welcome back{userName ? `, ${userName}` : ''}!
          </h1>
          <p className="mt-3 max-w-110.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
            {activeChild
              ? `${activeChild.name} is making wonderful progress. Let's continue this week's ${focusTitle} plan!`
              : "Welcome to Bright Horizons Collective. Let's continue this week's developmental activities!"}
          </p>
          <Link
            href="/dashboard/weekly-plans"
            className="mt-6 inline-flex h-10 items-center gap-1 rounded-full border border-[#accbcb] bg-[#2f7d7e] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]"
          >
            View Weekly Plan
            <Image
              src="/Home/figma-parent-dashboard-arrow-right.svg"
              alt=""
              width={16}
              height={16}
            />
          </Link>
        </div>

        <div className="mt-6 flex w-full min-w-0 max-w-142.25 gap-3 sm:gap-4 xl:mt-0 max-sm:flex-col">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex h-20 min-w-0 flex-1 items-center justify-center gap-3 rounded-2xl border border-white bg-transparent p-4 sm:h-20.5"
            >
              <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#fafafa] bg-white">
                <Image src={stat.icon} alt="" width={16} height={16} />
              </span>
              <span className="min-w-0">
                <span className="block font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
                  {stat.value}
                </span>
                <span className="block whitespace-nowrap font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] text-[#515b60]">
                  {stat.label}
                </span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TodayActivityCard({
  activeChild,
  currentPlan,
  isLoading,
}: {
  activeChild: ChildProfile | null;
  currentPlan: AssignedWeeklyPlan | null;
  isLoading: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[now.getDay()];
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const scheduled = currentPlan?.weeklyPlan?.activities?.find((item) => {
    const itemDay = item.day?.trim().toLowerCase();
    return itemDay === todayName.toLowerCase() || itemDay === todayName.slice(0, 3).toLowerCase();
  });

  const activity = scheduled?.activity ?? null;
  const completions = currentPlan?.child?.activityCompletions ?? [];
  const isCompleted = activity ? completions.some((c) => c.activityId === activity.id) : false;

  const rawImage = activity?.featuredImageUrl || activity?.featuredImage || defaultYogaImage;
  const imageSrc = imageError ? defaultYogaImage : rawImage;
  const difficultyLabel = formatDifficulty(activity?.difficultyLevel);
  const durationLabel = formatDuration(activity?.estimatedDuration);
  const materialTag =
    activity?.materialsSummary ||
    (activity?.materialsNeeded && activity.materialsNeeded.length > 0
      ? activity.materialsNeeded[0].name
      : null);

  if (isLoading) {
    return (
      <Card className="flex min-h-120 flex-col gap-5 sm:gap-6 lg:h-154.25 animate-pulse">
        <div className="h-6 w-36 rounded bg-[#e9f1ee]" />
        <div className="h-8 w-48 rounded bg-[#e9f1ee]" />
        <div className="h-62.5 w-full rounded-2xl bg-[#e9f1ee] sm:h-82.25" />
        <div className="h-10 w-full rounded-full bg-[#e9f1ee]" />
      </Card>
    );
  }

  return (
    <Card className="flex min-h-120 flex-col gap-5 sm:gap-6 lg:h-154.25">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4 max-sm:flex-col">
          <div className="min-w-0">
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Today&apos;s Activity · {dateFormatted}
            </p>
            <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238] truncate">
              {activity
                ? activity.title
                : currentPlan
                  ? 'Rest & Play Day'
                  : 'No Weekly Plan This Week'}
            </h2>
          </div>
          {activity ? (
            isCompleted ? (
              <Link
                href={`/dashboard/weekly-plans/completed-activity?activityId=${activity.id}${activeChild ? `&childId=${activeChild.id}` : ''}`}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#bcd5cb] bg-[#e9f1ee] px-3 font-nunito text-sm font-semibold text-[#174a4d] transition-opacity hover:opacity-90 shrink-0"
              >
                <Check aria-hidden="true" className="size-4 stroke-[2.5]" />
                Completed
              </Link>
            ) : (
              <ArrowLink
                href={`/dashboard/weekly-plans/activity-detail?activityId=${activity.id}${activeChild ? `&childId=${activeChild.id}` : ''}`}
              >
                Start Activity
              </ArrowLink>
            )
          ) : (
            <ArrowLink href="/dashboard/explore?tab=activities">Explore</ArrowLink>
          )}
        </div>
        <p className="max-w-101 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60] line-clamp-2">
          {activity
            ? activity.shortDescription ||
              activity.description ||
              'Engaging therapeutic activity tailored to support your child.'
            : currentPlan
              ? 'No structured activity scheduled for today. Enjoy open-ended sensory play or explore additional fun activities in our library!'
              : `There is no active weekly plan assigned for ${activeChild?.name ?? 'your child'} this week. Your occupational therapist or care team will assign activities tailored to their goals.`}
        </p>
      </div>

      <div className="relative h-62.5 w-full overflow-hidden rounded-2xl bg-[#d2e3dc] sm:h-82.25">
        <div className="absolute left-1/2 top-1/2 h-80.75 w-[330.57px] -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute left-[-11.36px] top-[-131.22px] h-[612.357px] w-[360.603px]"
            style={{
              WebkitMaskImage: `url(${yogaMask})`,
              maskImage: `url(${yogaMask})`,
              WebkitMaskPosition: '14.157px 138.729px',
              maskPosition: '14.157px 138.729px',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '322.443px 309.926px',
              maskSize: '322.443px 309.926px',
            }}
          >
            <Image
              src={imageSrc}
              alt={activity?.title || 'Daily Activity'}
              fill
              sizes="361px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        </div>
      </div>

      <div className="h-17 w-97.5 max-w-full shrink-0">
        {activity ? (
          <>
            <div className="flex items-center gap-1.25">
              <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                {difficultyLabel}
              </span>
              <span className="flex items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-4.5 text-[#607077]">
                <Clock3 aria-hidden="true" className="size-3 stroke-[1.5]" />
                {durationLabel}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.25">
              {materialTag && (
                <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                  {materialTag}
                </span>
              )}
              <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                {activity.developmentCategory ||
                  currentPlan?.weeklyPlan?.category ||
                  'Motor planning & balance'}
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-1.25 pt-2">
            <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
              {currentPlan ? 'Rest Day' : 'Library Exploration'}
            </span>
            <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Open-ended Play
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

function ProgressCard({
  activeChild,
  isLoading,
}: {
  activeChild: ChildProfile | null;
  isLoading: boolean;
}) {
  const { data: progressData } = useChildProgress(activeChild?.id);

  const fineMotor = progressData?.fineMotorProgress || 0;
  const coordination = progressData?.coordinationProgress || 0;
  const sensory = progressData?.sensoryProgress || 0;
  const selfRegulation = progressData?.visualMotorProgress || progressData?.grossMotorProgress || 0;

  const items = [
    { label: 'Fine Motor', value: `${fineMotor > 0 ? fineMotor : 68}%`, color: '#2f7d7e' },
    {
      label: 'Bilateral Coordination',
      value: `${coordination > 0 ? coordination : 54}%`,
      color: '#6babb0',
    },
    { label: 'Sensory Processing', value: `${sensory > 0 ? sensory : 72}%`, color: '#8fb9a8' },
    {
      label: 'Self-Regulation',
      value: `${selfRegulation > 0 ? selfRegulation : 45}%`,
      color: '#f2b59f',
    },
  ];

  if (isLoading) {
    return (
      <Card className="flex min-h-120 flex-col lg:h-154.25 animate-pulse">
        <div className="h-6 w-36 rounded bg-[#e9f1ee]" />
        <div className="h-8 w-44 rounded bg-[#e9f1ee]" />
        <div className="mx-auto my-6 size-38 rounded-full bg-[#e9f1ee]" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-[#e9f1ee]" />
          <div className="h-4 w-full rounded bg-[#e9f1ee]" />
          <div className="h-4 w-full rounded bg-[#e9f1ee]" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex min-h-120 flex-col lg:h-154.25">
      <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
        Development Tracking
      </p>
      <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238]">
        {activeChild ? `${activeChild.name}'s Progress` : "Child's Progress"}
      </h2>

      <div className="relative mx-auto mt-6 size-38" aria-label="Development progress chart">
        <Image
          src="/Home/figma-parent-dashboard-progress-top-right.svg"
          alt=""
          width={88}
          height={76}
          className="absolute left-16 top-0"
        />
        <Image
          src="/Home/figma-parent-dashboard-progress-top-left.svg"
          alt=""
          width={66}
          height={76}
          className="absolute left-0 top-0.5"
        />
        <Image
          src="/Home/figma-parent-dashboard-progress-bottom-left.svg"
          alt=""
          width={100}
          height={73}
          className="absolute left-0 top-19.75"
        />
        <Image
          src="/Home/figma-parent-dashboard-progress-bottom-right.svg"
          alt=""
          width={58}
          height={68}
          className="absolute left-23.5 top-19.75"
        />
      </div>

      <div className="mt-6 space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between font-nunito text-xs font-medium leading-4 text-[#263238]"
          >
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <span className="font-bold" style={{ color: item.color }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <ArrowLink
          href={
            activeChild
              ? `/dashboard/child-profiles/${activeChild.id}/development-progress`
              : '/dashboard/child-profiles'
          }
          full
        >
          View Progress Report
        </ArrowLink>
      </div>
    </Card>
  );
}

function WeeklyPlanCard({
  activeChild,
  currentPlan,
  isLoading,
}: {
  activeChild: ChildProfile | null;
  currentPlan: AssignedWeeklyPlan | null;
  isLoading: boolean;
}) {
  const currentDayIndex = new Date().getDay(); // 0 is Sun, 1 is Mon...
  const completions = currentPlan?.child?.activityCompletions ?? [];

  const daysData = DAYS_OF_WEEK.map((d) => {
    const scheduledItem = currentPlan?.weeklyPlan?.activities?.find((item) => {
      const dayStr = item.day?.trim().toLowerCase();
      return dayStr === d.dayName.toLowerCase() || dayStr === d.label.toLowerCase();
    });
    const isDone = scheduledItem?.activity
      ? completions.some((c) => c.activityId === scheduledItem.activity.id)
      : false;
    const isToday = currentDayIndex === d.dayIndex;

    let state: 'complete' | 'current' | 'upcoming' = 'upcoming';
    if (isDone) {
      state = 'complete';
    } else if (isToday) {
      state = 'current';
    }

    return {
      label: d.label,
      state,
      hasActivity: Boolean(scheduledItem),
    };
  });

  const totalActivities = currentPlan?.weeklyPlan?.activities?.length ?? 0;
  const completedCount =
    currentPlan?.weeklyPlan?.activities?.filter((item) =>
      completions.some((c) => c.activityId === item.activity?.id)
    ).length ?? 0;
  const percent = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;
  const remainingCount = Math.max(0, totalActivities - completedCount);

  const weekSubtitle = currentPlan
    ? `Week ${currentPlan.weeklyPlan.weekNumber ?? 1} · ${formatDateRange(currentPlan.startDate, currentPlan.endDate)}`
    : `Current Week · ${formatDateRange(null, null)}`;

  const focusTitle =
    currentPlan?.weeklyPlan?.title ||
    (currentPlan?.weeklyPlan?.category
      ? CATEGORY_BACKEND_TO_UI[currentPlan.weeklyPlan.category]
      : null) ||
    currentPlan?.weeklyPlan?.customCategory ||
    (currentPlan
      ? 'Targeted Developmental Plan'
      : activeChild
        ? `No active plan for ${activeChild.name}`
        : 'No active plan assigned');

  if (isLoading) {
    return (
      <Card className="flex min-h-120 flex-col lg:h-154.25 animate-pulse">
        <div className="h-6 w-36 rounded bg-[#e9f1ee]" />
        <div className="h-8 w-44 rounded bg-[#e9f1ee]" />
        <div className="mt-6 h-18 w-full rounded-xl bg-[#e9f1ee]" />
        <div className="mt-6 h-12 w-full rounded bg-[#e9f1ee]" />
      </Card>
    );
  }

  return (
    <Card className="flex min-h-120 flex-col lg:h-154.25">
      <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">{weekSubtitle}</p>
      <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238]">
        This Week&apos;s Plan
      </h2>

      <div className="mt-6 rounded-xl bg-[#fce9e3] px-3 py-2">
        <p className="font-nunito text-xs font-medium leading-4 text-[#515b60]">Weekly Focus</p>
        <p className="mt-1 font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#493630]">
          {focusTitle}
        </p>
      </div>

      <div className="mt-6">
        <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">Daily activities</p>
        <div className="mt-3 flex items-center justify-between">
          {daysData.map((day) => {
            const active = day.state !== 'upcoming';
            return (
              <div key={day.label} className="flex w-7.5 flex-col items-center gap-1">
                <span
                  className={`grid size-7.5 place-items-center rounded-full border-2 ${
                    day.state === 'complete'
                      ? 'border-[#2f7d7e] bg-[#2f7d7e]'
                      : day.state === 'current'
                        ? 'border-[#2f7d7e] bg-[#2f7d7e]'
                        : 'border-[#d4d6d7] bg-[#d4d6d7]'
                  }`}
                >
                  {day.state === 'complete' ? (
                    <Check aria-hidden="true" className="size-5 text-white stroke-[2.5]" />
                  ) : (
                    <span className="size-2.5 rounded-full bg-white" />
                  )}
                </span>
                <span
                  className={`font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] ${
                    active ? 'text-[#2f7d7e]' : 'text-[#7d8488]'
                  }`}
                >
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between font-nunito text-xs font-medium leading-4">
          <span className="text-[#263238]">
            {currentPlan
              ? `${completedCount} of ${totalActivities} complete`
              : '0 activities assigned'}
          </span>
          <span className="text-[#2f7d7e]">{percent}%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eaecee]">
          <span className="block h-full bg-[#2f7d7e]" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="rounded-2xl bg-[#f4f5f4] px-4 py-3">
          <p className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
            {remainingCount}
          </p>
          <p className="mt-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">Remaining</p>
        </div>
        <div className="rounded-2xl bg-[#f4f5f4] px-4 py-3">
          <p className="font-nunito text-2xl font-medium leading-8 text-[#2f7d7e]">
            {completedCount}
          </p>
          <p className="mt-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">Completed</p>
        </div>
      </div>

      <div className="mt-6">
        <ArrowLink
          href={currentPlan ? '/dashboard/weekly-plans' : '/dashboard/weekly-plans/all'}
          full
        >
          {currentPlan ? 'View Full Weekly Plan' : 'View All Plans'}
        </ArrowLink>
      </div>
    </Card>
  );
}

function RecentActivityCard({ activeChild }: { activeChild: ChildProfile | null }) {
  return (
    <Card className="min-h-90 lg:h-111">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Recent activity
        </h2>
        <Link
          href={
            activeChild
              ? `/dashboard/child-profiles/${activeChild.id}/activity-history`
              : '/dashboard/child-profiles'
          }
          className="inline-flex items-center font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e]"
        >
          View all <ChevronRight aria-hidden="true" className="size-4 stroke-[1.5]" />
        </Link>
      </div>
      <div className="mt-6 space-y-5">
        {recentActivities.map((activity, index) => (
          <article
            key={`${activity.title}-${index}`}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="relative size-13.5 shrink-0"
                style={{
                  WebkitMaskImage: `url(${activityMask})`,
                  maskImage: `url(${activityMask})`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              >
                <Image src={activity.image} alt="" fill sizes="54px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                  {activity.title}
                </span>
                <span className="mt-2 block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                  {activity.detail}
                </span>
              </span>
            </div>
            <span className="flex shrink-0 items-center gap-1 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#2f7d7e]">
              <Check aria-hidden="true" className="size-4 stroke-2" /> Done
            </span>
          </article>
        ))}
      </div>
    </Card>
  );
}

function MessagesCard() {
  const messages = [
    {
      initials: 'OT',
      name: 'OT Support Team',
      message:
        "Great job this week! Emma's progress on the lacing activities has been wonderful...",
      time: '9:14 am',
      tone: 'bg-[#dceeee] text-[#2f7d7e]',
    },
    {
      initials: 'BH',
      name: 'Bright Horizons',
      message:
        "Your weekly plan for July 20–26 is ready. Click to explore this week's activities...",
      time: 'Yesterday',
      tone: 'bg-[#fce9e3] text-[#b16262]',
    },
  ];

  return (
    <Card className="flex min-h-90 flex-col min-[1750px]:h-111">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Messages
        </h2>
        <span className="rounded-full bg-[#2f7d7e] px-3 py-1 font-nunito text-xs font-medium leading-4 text-white">
          2 New
        </span>
      </div>
      <div className="mt-6 space-y-5">
        {messages.map((message) => (
          <article key={message.name} className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-2">
              <span
                className={`grid size-13.5 shrink-0 place-items-center rounded-full font-nunito text-lg font-medium ${message.tone}`}
              >
                {message.initials}
              </span>
              <span className="min-w-0">
                <span className="block font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                  {message.name}
                </span>
                <span className="mt-2 block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                  {message.message}
                </span>
              </span>
            </div>
            <span className="shrink-0 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
              {message.time}
            </span>
          </article>
        ))}
      </div>
      <div className="mt-auto max-[1749px]:mt-6">
        <ArrowLink href="/dashboard/messages" full>
          Open Inbox
        </ArrowLink>
      </div>
    </Card>
  );
}

function RecommendationsCard({ activeChild }: { activeChild: ChildProfile | null }) {
  return (
    <Card className="min-h-90 min-[1750px]:h-111">
      <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
        Personalised For {activeChild?.name ?? 'You'}
      </p>
      <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238]">
        Recommended For You
      </h2>
      <div className="mt-6 space-y-6">
        {recommendations.map((item) => (
          <article key={item.title} className="relative flex min-w-0 items-start pr-6">
            <div className="flex min-w-0 w-full gap-3 sm:gap-4">
              <span
                className="relative mt-1 size-29.75 shrink-0"
                style={{
                  WebkitMaskImage: `url(${recommendationMask})`,
                  maskImage: `url(${recommendationMask})`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              >
                <Image src={item.image} alt="" fill sizes="119px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span
                  className={`inline-flex rounded-full border px-2.25 py-1.25 font-nunito text-xs font-medium leading-4 text-[#263238] ${item.tone}`}
                >
                  {item.type}
                </span>
                <span className="mt-2 block font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                  {item.title}
                </span>
                <span className="mt-2 block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                  {item.description}
                </span>
                <Link
                  href="/explore"
                  className="mt-2 inline-block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#2f7d7e]"
                >
                  Quick View
                </Link>
              </span>
            </div>
            <Image
              src="/Home/figma-parent-dashboard-bookmark.svg"
              alt="Save recommendation"
              width={16}
              height={16}
              className="absolute right-0 top-1 shrink-0"
            />
          </article>
        ))}
      </div>
    </Card>
  );
}

export function ParentDashboardPage() {
  const { selectedChildId } = useAppStore();
  const { data: children = [], isLoading: isChildrenLoading } = useChildProfiles();
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();
  const { data: userProfile } = useUserProfile();
  const { data: favoritesData } = useParentResourceFavorites();

  const activeChild = useMemo(() => {
    return children.find((c) => c.id === selectedChildId) || children[0] || null;
  }, [children, selectedChildId]);

  const childAssignments = useMemo(() => {
    if (!activeChild) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === activeChild.id);
  }, [assignedPlans, activeChild]);

  const currentPlan = useMemo(() => {
    return findCurrentWeeklyPlan(childAssignments);
  }, [childAssignments]);

  const userName = userProfile?.name?.split(' ')[0] || '';
  const totalCompletions = useMemo(() => {
    const completionsSet = new Set<string>();
    childAssignments.forEach((plan) => {
      plan.child?.activityCompletions?.forEach((comp) => {
        completionsSet.add(comp.id || `${comp.activityId}-${comp.completedAt}`);
      });
    });
    return completionsSet.size;
  }, [childAssignments]);

  const savedResourcesCount = favoritesData?.resourceIds?.length || 0;
  const isLoading = isChildrenLoading || isPlansLoading;

  return (
    <div className="-mt-4 mx-auto w-full min-w-0 max-w-382.25 space-y-4 overflow-x-clip sm:space-y-6">
      <WelcomeBanner
        userName={userName}
        activeChild={activeChild}
        currentPlan={currentPlan}
        activitiesDoneCount={totalCompletions}
        resourcesSavedCount={savedResourcesCount}
      />
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 2xl:grid-cols-3">
        <TodayActivityCard
          activeChild={activeChild}
          currentPlan={currentPlan}
          isLoading={isLoading}
        />
        <ProgressCard activeChild={activeChild} isLoading={isLoading} />
        <WeeklyPlanCard activeChild={activeChild} currentPlan={currentPlan} isLoading={isLoading} />
        <RecentActivityCard activeChild={activeChild} />
        <MessagesCard />
        <RecommendationsCard activeChild={activeChild} />
      </div>
    </div>
  );
}
