'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import {
  getMondayOfDate,
  getSundayOfMonday,
  useMyWeeklyPlans,
  type AssignedWeeklyPlan,
} from '@/features/weekly-plans';

const maskImage = '/Home/figma-weekly-plans-history-mask.svg';
const defaultMaskedImage = '/Home/figma-weekly-plans-history.png';

const DAYS_OF_WEEK = [
  { key: 'monday', short: 'M' },
  { key: 'tuesday', short: 'T' },
  { key: 'wednesday', short: 'W' },
  { key: 'thursday', short: 'T' },
  { key: 'friday', short: 'F' },
  { key: 'saturday', short: 'S' },
  { key: 'sunday', short: 'S' },
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

export function UpcomingWeeklyPlans() {
  const { selectedChildId } = useAppStore();
  const { data: children = [], isLoading: isChildrenLoading } = useChildProfiles();
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // 1. Resolve active child
  const activeChild = useMemo(() => {
    return children.find((c) => c.id === selectedChildId) || children[0] || null;
  }, [children, selectedChildId]);

  // 2. Filter plans for active child
  const childPlans = useMemo(() => {
    if (!activeChild) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === activeChild.id);
  }, [assignedPlans, activeChild]);

  // 3. Find upcoming plans (strictly starting after current week ends)
  const upcomingPlans = useMemo(() => {
    const now = new Date();
    const currentMonday = getMondayOfDate(now);
    const currentSunday = getSundayOfMonday(currentMonday);

    const upcoming = (childPlans || []).filter((plan) => {
      const start = plan.startDate ? new Date(plan.startDate) : new Date(plan.createdAt);
      return start > currentSunday;
    });

    // Sort ascending (soonest first)
    upcoming.sort((a, b) => {
      const aTime = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bTime = b.startDate ? new Date(b.startDate).getTime() : 0;
      return aTime - bTime;
    });

    // Take up to 2 upcoming weekly plans
    return upcoming.slice(0, 2);
  }, [childPlans]);

  const isLoading = isChildrenLoading || isPlansLoading;

  if (isLoading) {
    return (
      <section className="flex w-full min-w-0 flex-col items-start gap-5 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:gap-6 sm:p-6 min-[1800px]:p-8">
        <div className="flex w-full items-start justify-between">
          <div className="h-7 w-48 rounded bg-[#e9f1ee] animate-pulse" />
          <div className="h-9 w-20 rounded-full bg-[#e9f1ee] animate-pulse" />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="h-44 w-full rounded-2xl border border-[#e9f1ee] bg-[#f7f9f8] animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="flex w-full min-w-0 flex-col items-start gap-5 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:gap-6 sm:p-6 min-[1800px]:p-8">
      {/* Header */}
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
            Upcoming Plans
          </h2>
          {activeChild && (
            <span className="inline-flex items-center rounded-full border border-[#d2e3dc] bg-[#e9f1ee] px-2.5 py-0.5 font-nunito text-xs font-semibold text-[#174a4d]">
              {activeChild.name}
            </span>
          )}
        </div>
        <Link
          href="/dashboard/weekly-plans/all"
          className="flex min-w-16 items-center justify-center overflow-hidden rounded-full border border-[#d8ddd9] px-2 py-1.5 transition-colors hover:bg-[#f6fbfa]"
        >
          <span className="px-1 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e]">
            View all
          </span>
        </Link>
      </div>

      {/* Cards List or Empty State */}
      <div className="flex w-full flex-col items-start gap-4">
        {upcomingPlans.length > 0 ? (
          upcomingPlans.map((plan: AssignedWeeklyPlan) => {
            const planImg = plan.weeklyPlan?.featuredImage;
            const imgSrc = imageErrors[plan.id] || !planImg ? defaultMaskedImage : planImg;
            const weekLabel = plan.weeklyPlan?.weekNumber
              ? `Week ${plan.weeklyPlan.weekNumber}`
              : 'Upcoming Week';
            const title = plan.weeklyPlan?.title || 'Weekly Plan';
            const dateRange = formatDateRange(plan.startDate, plan.endDate);

            // Extract categories
            const categories: string[] = [];
            if (plan.weeklyPlan?.category) categories.push(plan.weeklyPlan.category);
            if (plan.weeklyPlan?.customCategory) categories.push(plan.weeklyPlan.customCategory);
            plan.weeklyPlan?.activities?.forEach((a) => {
              const cat = a.activity?.developmentCategory;
              if (cat && !categories.includes(cat)) categories.push(cat);
            });
            const displayCategories =
              categories.length > 0
                ? categories.slice(0, 3)
                : ['Sensory Processing', 'Motor Planning', 'Focus'];

            const planActivities = plan.weeklyPlan?.activities || [];
            const scheduledDays = DAYS_OF_WEEK.map((d) =>
              planActivities.some((a) => {
                const dayStr = a.day?.trim().toLowerCase();
                return dayStr === d.key || dayStr?.startsWith(d.key.slice(0, 3));
              })
            );

            const feedbackText =
              plan.notes ||
              plan.weeklyPlan?.description ||
              `Upcoming therapeutic weekly plan prepared for ${activeChild?.name || 'your child'}.`;

            return (
              <article
                key={plan.id}
                className="grid w-full min-w-0 gap-4 rounded-2xl border border-[#e9f1ee] bg-transparent p-4 sm:p-5 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 min-[1800px]:grid-cols-[171px_minmax(0,1fr)]"
              >
                {/* Left Masked Image */}
                <div className="relative mx-auto h-41 w-42.75 max-w-full shrink-0 md:mx-0 md:w-37.5 min-[1800px]:w-42.75">
                  <div
                    className="absolute -left-2.25 top-[-79.5px] h-[319.06px] w-[187.887px]"
                    style={{
                      WebkitMaskImage: `url(${maskImage})`,
                      maskImage: `url(${maskImage})`,
                      WebkitMaskPosition: '11.313px 83.244px',
                      maskPosition: '11.313px 83.244px',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: '166.132px 163.068px',
                      maskSize: '166.132px 163.068px',
                    }}
                  >
                    <Image
                      src={imgSrc}
                      alt={title}
                      fill
                      sizes="187.887px"
                      className="object-cover"
                      onError={() =>
                        setImageErrors((prev) => ({
                          ...prev,
                          [plan.id]: true,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-col items-start justify-center gap-4 sm:gap-5">
                  <div className="flex min-w-0 flex-col items-start gap-2">
                    <div className="flex w-full shrink-0 items-center gap-2.5">
                      <div
                        className="flex shrink-0 flex-col items-start rounded-[8px] px-2.5 py-0.75"
                        style={{
                          backgroundImage:
                            'linear-gradient(160.46deg, rgb(26, 74, 76) 0%, rgb(47, 125, 126) 100%)',
                        }}
                      >
                        <span className="font-nunito text-[12px] font-medium leading-4 text-white">
                          {weekLabel}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.25 rounded-full bg-[#f0f4f3] px-2.5 py-0.75">
                        <div className="h-1.25 w-1.25 shrink-0 rounded-[2.5px] bg-[#2f7d7e]" />
                        <span className="font-nunito text-[12px] font-medium leading-4 text-[#2f7d7e]">
                          Upcoming
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full shrink-0 flex-col items-start gap-1">
                      <h3 className="w-min min-w-full font-nunito text-[18px] font-medium leading-6 tracking-[-0.27px] text-[#263238] sm:text-[20px]">
                        {title}
                      </h3>
                      <div className="flex shrink-0 items-center gap-1">
                        <CalendarDays
                          aria-hidden="true"
                          className="size-3.5 stroke-[1.25] text-[#607077]"
                        />
                        <p className="font-manrope text-[12px] font-normal leading-4.5 text-[#607077]">
                          {dateRange}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full shrink-0 flex-col items-start gap-3">
                    {/* Categories */}
                    <div className="flex w-full shrink-0 flex-wrap items-center gap-2">
                      {displayCategories.map((category) => (
                        <div
                          key={category}
                          className="flex shrink-0 flex-col items-start justify-center rounded-full bg-[#f0f2f3] px-2.5 py-1"
                        >
                          <span className="font-manrope text-[12px] font-normal leading-4.5 text-[#263238]">
                            {category}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 7-Days Strip */}
                    <div className="flex shrink-0 items-center gap-1.5">
                      {DAYS_OF_WEEK.map((d, i) => {
                        const isScheduled = scheduledDays[i];
                        return (
                          <div key={i} className="flex shrink-0 flex-col items-center gap-0.75">
                            <div
                              className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-[11px] ${
                                isScheduled
                                  ? 'bg-[#e9f1ee] border border-[#d2e3dc]'
                                  : 'bg-[#f5f6f6]'
                              }`}
                            >
                              {isScheduled ? (
                                <span className="font-manrope text-[8px] font-bold text-[#2f7d7e]">
                                  {d.short}
                                </span>
                              ) : (
                                <span className="font-manrope text-[8px] font-normal text-[#a8adaf]">
                                  -
                                </span>
                              )}
                            </div>
                            <span className="font-manrope text-[8px] font-semibold leading-3 text-[#7d8488]">
                              {d.short}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Description / Notes */}
                    <div className="flex shrink-0 flex-col items-start justify-center">
                      <p className="font-manrope text-[12px] font-normal leading-4.5 text-[#515b60] line-clamp-2">
                        &quot;{feedbackText}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d2e3dc] bg-[#fbfdfc] px-6 py-10 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#e9f1ee] text-[#2f7d7e]">
              <CalendarDays className="size-6" />
            </div>
            <h3 className="font-nunito text-base font-semibold text-[#174a4d]">
              No Upcoming Plans Scheduled
            </h3>
            <p className="mt-1 max-w-md font-manrope text-sm text-[#607077]">
              {activeChild
                ? `There are no upcoming weekly plans scheduled yet for ${activeChild.name}. New weekly plans will appear here once assigned by your care team.`
                : 'Select a child profile to view their upcoming weekly plans.'}
            </p>
            <Link
              href="/dashboard/weekly-plans/all"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#2f7d7e] px-4 py-2 font-nunito text-xs font-semibold text-[#2f7d7e] transition-colors hover:bg-[#e9f1ee]"
            >
              View All Weekly Plans
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Backward compatibility alias
export { UpcomingWeeklyPlans as PastWeeklyPlans };
