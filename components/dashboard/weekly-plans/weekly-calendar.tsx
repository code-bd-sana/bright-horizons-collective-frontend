'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock3 } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import {
  findCurrentWeeklyPlan,
  getMondayOfDate,
  getSundayOfMonday,
  useMyWeeklyPlans,
  type ActivityCompletionSummary,
} from '@/features/weekly-plans';

const activityMask = '/Home/figma-parent-dashboard-activity-mask.svg';
const defaultActivityImage = '/Home/figma-parent-dashboard-rice-bin.png';

const DAYS_CONFIG = [
  { key: 'monday', short: 'MON', full: 'Monday' },
  { key: 'tuesday', short: 'TUE', full: 'Tuesday' },
  { key: 'wednesday', short: 'WED', full: 'Wednesday' },
  { key: 'thursday', short: 'THU', full: 'Thursday' },
  { key: 'friday', short: 'FRI', full: 'Friday' },
  { key: 'saturday', short: 'SAT', full: 'Saturday' },
  { key: 'sunday', short: 'SUN', full: 'Sunday' },
] as const;

function formatDuration(duration?: string | null): string {
  if (!duration) return '20 min';
  const clean = duration.trim();
  if (clean.toLowerCase().includes('min')) return clean;
  return `${clean} min`;
}

interface WeeklyCalendarProps {
  title?: string;
}

export function WeeklyCalendar({ title = 'Weekly Calendar' }: WeeklyCalendarProps) {
  const { selectedChildId } = useAppStore();
  const { data: children = [], isLoading: isChildrenLoading } = useChildProfiles();
  const { data: assignedPlans = [], isLoading: isPlansLoading } = useMyWeeklyPlans();
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  // 1. Resolve active child from navbar selection or fallback to first child
  const activeChild = useMemo(() => {
    return children.find((c) => c.id === selectedChildId) || children[0] || null;
  }, [children, selectedChildId]);

  // 2. Filter assignments for active child
  const childAssignments = useMemo(() => {
    if (!activeChild) return [];
    return (assignedPlans || []).filter((plan) => plan.childId === activeChild.id);
  }, [assignedPlans, activeChild]);

  // 3. Find assignment matching the current week range
  const currentAssignment = useMemo(() => {
    return findCurrentWeeklyPlan(childAssignments);
  }, [childAssignments]);

  const currentWeekRange = useMemo(() => {
    const now = new Date();
    const mon = getMondayOfDate(now);
    const sun = getSundayOfMonday(mon);
    const monStr = mon.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const sunStr = sun.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return {
      headerLabel: `Current Week · ${monStr} – ${sunStr}`,
      rangeStr: `${monStr} – ${sunStr}`,
    };
  }, []);

  const isLoading = isChildrenLoading || isPlansLoading;

  // 4. Derive days and activities when assignment exists
  const calendarData = useMemo(() => {
    if (!currentAssignment) return null;

    const startDate = currentAssignment.startDate
      ? new Date(currentAssignment.startDate)
      : new Date();
    const planMonday = getMondayOfDate(startDate);
    const planSunday = getSundayOfMonday(planMonday);

    const weekNumber = currentAssignment.weeklyPlan?.weekNumber;
    const weekTitle = weekNumber
      ? `Week ${weekNumber}`
      : currentAssignment.weeklyPlan?.title || 'Weekly Plan';

    const startLabel = planMonday.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const endLabel = planSunday.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const timeframeLabel = `${weekTitle} · ${startLabel} – ${endLabel}`;

    const now = new Date();
    const completions: ActivityCompletionSummary[] =
      currentAssignment.child?.activityCompletions ?? [];

    const days = DAYS_CONFIG.map((dayConfig, index) => {
      const dayDate = new Date(planMonday);
      dayDate.setDate(planMonday.getDate() + index);

      const isToday =
        dayDate.getFullYear() === now.getFullYear() &&
        dayDate.getMonth() === now.getMonth() &&
        dayDate.getDate() === now.getDate();

      const dateStr = dayDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      // Find matching scheduled activity in the weekly plan
      const scheduled = currentAssignment.weeklyPlan?.activities?.find((item) => {
        const itemDay = item.day?.trim().toLowerCase();
        return (
          itemDay === dayConfig.full.toLowerCase() ||
          itemDay === dayConfig.key.toLowerCase() ||
          itemDay === dayConfig.short.toLowerCase()
        );
      });

      const activity = scheduled?.activity;
      const isRestDay = !activity;

      const isCompleted = activity
        ? completions.some((c: ActivityCompletionSummary) => c.activityId === activity.id)
        : false;

      const status: 'completed' | 'current' | 'upcoming' = isCompleted
        ? 'completed'
        : isToday
          ? 'current'
          : 'upcoming';

      const activityId = activity?.id ?? `rest-${dayConfig.key}`;
      const activityTitle = activity?.title ?? 'Rest & Free Play';
      const duration = formatDuration(activity?.estimatedDuration);
      const category = activity?.developmentCategory ?? 'Free Exploration';
      const rawImage =
        activity?.featuredImageUrl || activity?.featuredImage || defaultActivityImage;
      const imageSrc = imageErrorMap[activityId] ? defaultActivityImage : rawImage;

      return {
        dayKey: dayConfig.key,
        dayAbbr: dayConfig.short,
        dateStr,
        isToday,
        isRestDay,
        status,
        activityId: activity?.id,
        title: activityTitle,
        duration,
        category,
        imageSrc,
      };
    });

    return {
      timeframeLabel,
      days,
    };
  }, [currentAssignment, imageErrorMap]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="flex w-full min-w-0 flex-col items-start rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:p-8">
        <div className="flex w-full shrink-0 flex-col items-start gap-5 sm:gap-6 animate-pulse">
          <div className="flex w-full items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 rounded bg-[#e9f1ee]" />
              <div className="h-7 w-48 rounded bg-[#e9f1ee]" />
            </div>
            <div className="hidden h-4 w-36 rounded bg-[#e9f1ee] md:block" />
          </div>
          <div className="flex w-full flex-col gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="h-24 w-full rounded-2xl border border-[#e8ebe8] bg-[#f7f9f8]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty state: No active child or no weekly plan in current week range
  if (!activeChild || !currentAssignment || !calendarData) {
    return (
      <section className="flex w-full min-w-0 flex-col items-start rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:p-8">
        <div className="flex w-full shrink-0 flex-col items-start gap-5 sm:gap-6">
          <div className="flex w-full shrink-0 items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col items-start gap-1">
              <p className="min-w-full shrink-0 font-nunito text-[12px] font-medium leading-4 text-[#2f7d7e]">
                {currentWeekRange.headerLabel}
              </p>
              <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                {title}
              </h2>
            </div>
            {activeChild && (
              <span className="inline-flex items-center rounded-full border border-[#d2e3dc] bg-[#e9f1ee] px-3 py-1 font-nunito text-xs font-medium text-[#174a4d]">
                {activeChild.name}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d2e3dc] bg-[#fbfdfc] px-6 py-12 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#e9f1ee] text-[#2f7d7e]">
              <CalendarDays className="size-6" />
            </div>
            <h3 className="font-nunito text-lg font-semibold text-[#174a4d]">
              No Weekly Plan This Week
            </h3>
            <p className="mt-1.5 max-w-md font-manrope text-sm leading-relaxed text-[#607077]">
              {activeChild
                ? `There is no active weekly plan assigned for ${activeChild.name} for the current week (${currentWeekRange.rangeStr}). Your occupational therapist or care team will assign activities tailored to their goals.`
                : 'Please select a child profile from the navbar above to view their weekly activities.'}
            </p>
            <Link
              href="/dashboard/explore?tab=activities"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2f7d7e] px-5 py-2.5 font-nunito text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Explore Activities Library
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Active weekly plan found for active child
  return (
    <section className="flex w-full min-w-0 flex-col items-start rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:p-8">
      <div className="flex w-full shrink-0 flex-col items-center">
        <div className="flex w-full shrink-0 flex-col items-start">
          <div className="flex w-full shrink-0 flex-col items-start gap-5 sm:gap-6">
            <div className="flex w-full shrink-0 items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col items-start gap-1">
                <p className="min-w-full shrink-0 font-nunito text-[12px] font-medium leading-4 text-[#2f7d7e]">
                  {calendarData.timeframeLabel}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                    {title}
                  </h2>
                  <span className="inline-flex items-center rounded-full border border-[#d2e3dc] bg-[#e9f1ee] px-2.5 py-0.5 font-nunito text-xs font-semibold text-[#174a4d]">
                    {activeChild.name}
                  </span>
                </div>
              </div>
              <div className="hidden w-34.25 shrink-0 flex-col items-start md:flex">
                <p className="w-full shrink-0 font-nunito text-[12px] font-medium leading-4 text-[#7d8488]">
                  Tap a day to view activity
                </p>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col items-start gap-3 sm:gap-4 min-[1800px]:gap-5">
              {calendarData.days.map((item) => {
                let rowClasses = '';
                if (item.status === 'completed') {
                  rowClasses =
                    'bg-[#e9f1ee] border-t border-r border-b border-l-[3px] border-[#e9f1ee] border-solid';
                } else if (item.status === 'current') {
                  rowClasses =
                    'border-t border-r border-b border-l-[3px] border-[#2f7d7e] border-solid';
                } else {
                  rowClasses =
                    'border-t border-r border-b border-l-[3px] border-[#e9f1ee] border-solid';
                }

                const actionClassName =
                  'relative col-start-2 flex min-h-10 w-full min-w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d2e3dc] px-3 py-2 sm:col-start-4 sm:row-start-1 sm:min-h-0 sm:w-auto transition-opacity hover:opacity-95';

                const actionContent = (
                  <>
                    {item.status === 'completed' && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full bg-[#bcd5cb]"
                      />
                    )}
                    {item.status === 'current' && !item.isRestDay && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full bg-[#2f7d7e]"
                      />
                    )}

                    <span
                      className={`relative shrink-0 whitespace-nowrap px-1 font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] ${
                        item.status === 'current' && !item.isRestDay
                          ? 'text-white'
                          : 'text-[#263238]'
                      }`}
                    >
                      {item.isRestDay
                        ? 'Rest Day'
                        : item.status === 'completed'
                          ? 'Completed'
                          : item.status === 'current'
                            ? 'Continue'
                            : 'Start Activity'}
                    </span>

                    {item.status === 'completed' && (
                      <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0px_-6px_2px_0px_rgba(255,255,255,0.07)]" />
                    )}
                  </>
                );

                return (
                  <article
                    key={item.dayKey}
                    className={`grid min-h-28 w-full grid-cols-[42px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-2xl p-3 sm:min-h-24 sm:grid-cols-[44px_60px_minmax(0,1fr)_auto] sm:gap-x-4 sm:p-4 min-[1800px]:h-25 min-[1800px]:p-5 ${rowClasses}`}
                  >
                    {/* Day & Date Column */}
                    <div className="flex shrink-0 flex-col items-center self-center">
                      <p className="shrink-0 whitespace-nowrap font-nunito text-[12px] font-bold leading-4 tracking-[-0.18px] text-[#174a4d]">
                        {item.dayAbbr}
                      </p>
                      <div className="flex h-4 shrink-0 flex-col items-start">
                        <p className="shrink-0 whitespace-nowrap text-center font-nunito text-[10px] font-medium uppercase leading-4 text-[#a8adaf]">
                          {item.dateStr}
                        </p>
                      </div>
                    </div>

                    {/* Masked Thumbnail */}
                    <div className="relative hidden size-15 shrink-0 sm:block">
                      <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
                        <span
                          className="absolute inset-0 max-w-none"
                          style={{
                            WebkitMaskImage: `url(${activityMask})`,
                            maskImage: `url(${activityMask})`,
                            WebkitMaskPosition: 'center',
                            maskPosition: 'center',
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                            WebkitMaskSize: '100% 100%',
                            maskSize: '100% 100%',
                            backgroundColor: '#d8e2df',
                          }}
                        >
                          <Image
                            src={item.imageSrc}
                            alt=""
                            fill
                            sizes="60px"
                            className="object-cover opacity-50"
                            onError={() => {
                              if (item.activityId) {
                                setImageErrorMap((prev) => ({
                                  ...prev,
                                  [item.activityId!]: true,
                                }));
                              }
                            }}
                          />
                        </span>
                      </div>
                    </div>

                    {/* Activity Info */}
                    <div className="flex min-w-0 flex-col items-start gap-2">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <p className="min-w-0 font-nunito text-[15px] font-bold leading-5 tracking-[-0.2px] text-[#174a4d] sm:truncate sm:text-base sm:leading-5 sm:tracking-[-0.24px]">
                          {item.title}
                        </p>
                        {item.isToday && (
                          <div className="flex shrink-0 items-center justify-center rounded-[16px] bg-[#2f7d7e] px-1.5 py-0.5">
                            <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-medium leading-3.75 tracking-[0.22px] text-white">
                              TODAY
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex h-5 shrink-0 items-center gap-2 pt-0.75">
                        <div className="shrink-0">
                          <div className="flex size-full items-center gap-1 bg-clip-padding">
                            <div className="flex size-2.5 shrink-0 items-center justify-center">
                              <Clock3
                                aria-hidden="true"
                                className="size-2.5 stroke-[1.25] text-[#607077]"
                              />
                            </div>
                            <div className="shrink-0">
                              <div className="flex size-full flex-col items-start bg-clip-padding">
                                <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-normal leading-[16.5px] text-[#607077]">
                                  {item.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="size-0.75 shrink-0 rounded-[1.5px] bg-[#d8ddd9]" />
                        <div className="hidden h-[16.5px] min-w-0 md:block">
                          <div className="flex size-full flex-col items-start overflow-clip rounded-[inherit] bg-clip-padding">
                            <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-normal leading-[16.5px] text-[#607077]">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {item.isRestDay || item.status === 'completed' ? (
                      <div className={actionClassName}>{actionContent}</div>
                    ) : (
                      <Link
                        href={
                          item.activityId
                            ? `/dashboard/weekly-plans/activity-detail?activityId=${item.activityId}`
                            : '/dashboard/weekly-plans/activity-detail'
                        }
                        className={actionClassName}
                      >
                        {actionContent}
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
