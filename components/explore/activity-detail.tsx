'use client';

import { Clock3, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { useActivities, useActivity } from '@/features/activities/hooks/activities.queries';
import type {
  ActivityInstruction,
  ActivityMaterial,
} from '@/features/activities/model/activity.types';
import { cn } from '@/lib/utils';

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#174A4D]">
      {children}
    </span>
  );
}

function formatAgeRange(minMonths?: number, maxMonths?: number): string {
  const min = minMonths ?? 0;
  const max = maxMonths ?? 2160;
  if (min === 0 && max <= 12) return '0–12 mo';
  if (min >= 12 && max <= 24) return '12–24 mo';
  if (max <= 24) return `${min}–${max} mo`;
  const minYears = Math.floor(min / 12);
  const maxYears = Math.ceil(max / 12);
  if (minYears === maxYears) return `${minYears} yr`;
  if (maxYears >= 18) return `${minYears}+ yr`;
  return `${minYears}–${maxYears} yr`;
}

type ActivityDetailProps = {
  activityId?: string;
  dashboard?: boolean;
};

export function ActivityDetail({ activityId, dashboard = false }: ActivityDetailProps) {
  const Root = dashboard ? 'div' : 'main';
  const exploreHref = dashboard ? '/dashboard/explore?tab=activities' : '/explore';

  const allActivitiesQuery = useActivities({ status: 'PUBLISHED', limit: 50 });
  const rawActivities = allActivitiesQuery.data?.data;
  const allActivities = useMemo(
    () => (rawActivities ?? []).filter((a) => a.status === 'PUBLISHED'),
    [rawActivities]
  );

  // If no activityId passed (e.g. from static route), fallback to first available activity
  const effectiveId = activityId || (allActivities.length > 0 ? allActivities[0]?.id : undefined);
  const activityQuery = useActivity(effectiveId);
  const activity = activityQuery.data;

  const materials = useMemo(() => {
    if (!activity) return [];
    if (Array.isArray(activity.materialsNeeded) && activity.materialsNeeded.length > 0) {
      return (activity.materialsNeeded as (ActivityMaterial | string)[])
        .map((m) => (typeof m === 'string' ? m : m?.name))
        .filter((m): m is string => Boolean(m && m.trim()));
    }
    if (activity.materialsSummary?.trim()) {
      return activity.materialsSummary
        .split(/\r?\n+/)
        .map((line) => line.trim().replace(/^[-*•\d.]+\s*/, ''))
        .filter(Boolean);
    }
    return [];
  }, [activity]);

  const steps = useMemo(() => {
    if (!activity) return [];
    if (Array.isArray(activity.instructions) && activity.instructions.length > 0) {
      return (activity.instructions as (ActivityInstruction | string)[])
        .map((item) => {
          if (typeof item === 'string') return { title: item, description: '' };
          return {
            title: item?.title ?? '',
            description: item?.description ?? '',
          };
        })
        .filter((s) => Boolean(s.title?.trim() || s.description?.trim()));
    }
    return [];
  }, [activity]);

  // Prompt: "in details page Related Activities, we will show same category 3 activities here."
  const relatedActivities = useMemo(() => {
    if (!activity) return [];
    const otherActivities = allActivities.filter((item) => item.id !== activity.id);

    // 1. Same category matches
    const sameCategory = otherActivities.filter(
      (item) =>
        item.developmentCategory?.trim().toLowerCase() ===
        activity.developmentCategory?.trim().toLowerCase()
    );

    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 3);
    }

    // 2. If fewer than 3 in same category, supplement with others up to 3
    const needed = 3 - sameCategory.length;
    const remaining = otherActivities.filter(
      (item) =>
        item.developmentCategory?.trim().toLowerCase() !==
        activity.developmentCategory?.trim().toLowerCase()
    );
    return [...sameCategory, ...remaining.slice(0, needed)];
  }, [activity, allActivities]);

  const isLoading = activityQuery.isLoading || (!activityId && allActivitiesQuery.isLoading);

  if (isLoading) {
    return (
      <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC]')}>
        <div
          className={cn(
            'mx-auto flex w-full max-w-311 min-w-0 flex-col',
            dashboard
              ? 'gap-10 pb-12 sm:gap-12 2xl:gap-15'
              : 'gap-15 px-20 pt-40 pb-20 max-xl:px-8 max-lg:pt-36 max-md:gap-10 max-md:px-5 max-md:pt-36 max-md:pb-12'
          )}
        >
          <div className="flex items-center justify-center gap-3 py-28 text-[#515B60]">
            <Loader2 className="size-8 animate-spin text-[#2F7D7E]" />
            <span className="font-manrope text-base">Loading activity details...</span>
          </div>
        </div>
      </Root>
    );
  }

  if (activityQuery.isError || !activity || activity.status !== 'PUBLISHED') {
    return (
      <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC]')}>
        <div
          className={cn(
            'mx-auto flex w-full max-w-311 min-w-0 flex-col',
            dashboard
              ? 'gap-10 pb-12 sm:gap-12 2xl:gap-15'
              : 'gap-15 px-20 pt-40 pb-20 max-xl:px-8 max-lg:pt-36 max-md:gap-10 max-md:px-5 max-md:pt-36 max-md:pb-12'
          )}
        >
          <div className="rounded-2xl border border-[#D8DDD9] bg-white p-12 text-center shadow-xs">
            <h2 className="font-nunito text-2xl font-bold text-[#174A4D]">Activity Not Found</h2>
            <p className="mt-2 font-manrope text-sm text-[#607077]">
              The requested activity could not be found or may have been removed.
            </p>
            <Link
              href={exploreHref}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2F7D7E] px-6 py-2.5 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#276a6b]"
            >
              Back to Explore
            </Link>
          </div>
        </div>
      </Root>
    );
  }

  const featuredImage =
    activity.featuredImageUrl || '/images/admin/activities/stacking-sorting-challenge.png';

  return (
    <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC]')}>
      <div
        className={cn(
          'mx-auto flex w-full max-w-311 min-w-0 flex-col',
          dashboard
            ? 'gap-10 pb-12 sm:gap-12 2xl:gap-15'
            : 'gap-15 px-20 pt-40 pb-20 max-xl:px-8 max-lg:pt-36 max-md:gap-10 max-md:px-5 max-md:pt-36 max-md:pb-12'
        )}
      >
        <section className="flex flex-col gap-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 font-nunito text-2xl font-medium leading-8 max-md:text-lg max-sm:text-base max-sm:leading-6"
          >
            <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
              Explore
            </Link>
            <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
            <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
              Activities
            </Link>
            <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
            <span className="truncate max-w-md text-[#263238]">{activity.title}</span>
          </nav>

          <div className="relative h-60 overflow-hidden rounded-2xl bg-[#DCEEEE] sm:h-80 md:h-101.25">
            <Image
              src={featuredImage}
              alt={activity.title}
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1280px) 1244px, 100vw"
              unoptimized={Boolean(
                featuredImage.startsWith('http') || featuredImage.startsWith('/uploads')
              )}
            />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="border-b border-[#ADB1AE] pb-6">
            <h1 className="font-nunito text-[40px] font-medium leading-12 tracking-[-0.4px] text-[#174A4D] max-md:text-[32px] max-md:leading-10 max-sm:text-3xl max-sm:leading-9">
              {activity.title}
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>{formatAgeRange(activity.minAgeMonths, activity.maxAgeMonths)}</Chip>
                <Chip>{activity.developmentCategory}</Chip>
                {activity.estimatedDuration && (
                  <span className="flex items-center gap-1.5 rounded-full bg-[#F0F4F3] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#607077]">
                    <Clock3 className="size-2.75" /> {activity.estimatedDuration}
                  </span>
                )}
                {activity.difficultyLevel && (
                  <Chip>
                    {activity.difficultyLevel === 'EASY'
                      ? 'Easy'
                      : activity.difficultyLevel === 'MODERATE'
                        ? 'Moderate'
                        : 'Challenging'}
                  </Chip>
                )}
                {activity.isOtDesigned && (
                  <span className="rounded-full bg-[#E3F7EC] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#16643B]">
                    OT Designed
                  </span>
                )}
              </div>
              {/* Bookmark & Completed buttons removed as this page is strictly for show */}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="w-full max-w-180 font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
              {activity.shortDescription}
            </p>
            {(activity.developmentGoal || activity.learningObjective) && (
              <div className="rounded-2xl bg-[#DCEEEE] p-5">
                <h2 className="font-nunito text-base font-bold leading-6 text-[#174A4D]">
                  Why It Matters
                </h2>
                <p className="pt-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#174A4D]">
                  {activity.developmentGoal || activity.learningObjective}
                </p>
              </div>
            )}
          </div>
        </section>

        {(materials.length > 0 || steps.length > 0) && (
          <section className="flex max-w-180 flex-col gap-6">
            {materials.length > 0 && (
              <div>
                <h2 className="font-nunito text-xl font-bold leading-7 text-[#263238]">
                  Materials Needed
                </h2>
                <ul className="mt-3 flex flex-col gap-2 font-manrope text-sm leading-5">
                  {materials.map((material, idx) => (
                    <li key={`${material}-${idx}`} className="flex items-start gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#8FB9A8]" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {steps.length > 0 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="font-nunito text-xl font-bold leading-7 text-[#263238]">
                    Step-by-Step
                  </h2>
                  <ol className="mt-4 flex flex-col gap-4">
                    {steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2F7D7E] font-manrope text-sm font-bold leading-5 text-white">
                          {index + 1}
                        </span>
                        <div className="pt-0.5">
                          <span className="font-nunito text-base font-bold leading-5 text-[#174A4D]">
                            {step.title}
                          </span>
                          {step.description && (
                            <p className="mt-1 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#515B60]">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </section>
        )}

        {(activity.makeItEasier ||
          activity.makeItHarder ||
          activity.parentTips ||
          activity.safetyNotes) && (
          <section className="flex flex-col gap-8">
            {(activity.makeItEasier || activity.makeItHarder) && (
              <div className="flex flex-col gap-6">
                <h2 className="font-nunito text-xl font-bold leading-7 text-[#263238]">
                  Modifications
                </h2>
                <div
                  className={cn(
                    'grid max-w-180.5 grid-cols-1 gap-4',
                    activity.makeItEasier && activity.makeItHarder ? 'sm:grid-cols-2' : ''
                  )}
                >
                  {activity.makeItEasier && (
                    <div className="rounded-[14px] bg-[#F6E6D4] p-4">
                      <h3 className="font-nunito text-sm font-bold leading-5 text-[#263238]">
                        Easier Version
                      </h3>
                      <p className="pt-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#493630]">
                        {activity.makeItEasier}
                      </p>
                    </div>
                  )}
                  {activity.makeItHarder && (
                    <div className="rounded-[14px] bg-[#F6E6D4] p-4">
                      <h3 className="font-nunito text-sm font-bold leading-5 text-[#263238]">
                        Harder Version
                      </h3>
                      <p className="pt-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#493630]">
                        {activity.makeItHarder}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activity.parentTips && (
              <blockquote className="max-w-180.5 rounded-[14px] border-l-4 border-[#F2B59F] bg-[#FFF8F5] py-5 pl-6 pr-5">
                <p className="font-lora text-base italic leading-7 text-[#263238]">
                  “{activity.parentTips}”
                </p>
                <footer className="pt-3 font-manrope text-xs font-semibold leading-4 text-[#607077]">
                  — OT Coaching Tip
                </footer>
              </blockquote>
            )}

            {activity.safetyNotes && (
              <div className="max-w-180.5 rounded-[14px] border border-[#f0c2bc] bg-[#fff6f5] p-5">
                <h3 className="font-nunito text-base font-bold text-[#b4342a]">Safety Notes</h3>
                <p className="pt-1.5 font-manrope text-sm leading-5.5 text-[#515B60]">
                  {activity.safetyNotes}
                </p>
              </div>
            )}
          </section>
        )}

        <section className="flex flex-col gap-6">
          <h2 className="font-nunito text-xl font-bold leading-7 text-[#263238]">
            Related Activities
          </h2>
          {relatedActivities.length > 0 ? (
            <div
              className={cn(
                'grid grid-cols-1 gap-4 sm:grid-cols-2',
                dashboard ? '2xl:grid-cols-3' : 'xl:grid-cols-3'
              )}
            >
              {relatedActivities.map((relActivity) => {
                const itemHref = dashboard
                  ? `/dashboard/explore/activities/${relActivity.id}`
                  : `/explore/activities/${relActivity.id}`;
                const relImageSrc =
                  relActivity.featuredImageUrl ||
                  '/images/admin/activities/stacking-sorting-challenge.png';

                return (
                  <Link
                    href={itemHref}
                    key={relActivity.id}
                    className="group flex flex-col h-61 overflow-hidden rounded-2xl border border-[#D8DDD9] bg-white shadow-[0px_2px_8px_rgba(38,50,56,0.06)] transition-all hover:shadow-[0px_4px_16px_rgba(38,50,56,0.12)] hover:-translate-y-0.5"
                  >
                    <div className="relative h-32 w-full bg-[#DCEEEE] overflow-hidden">
                      <Image
                        src={relImageSrc}
                        alt={relActivity.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1280px) 404px, (min-width: 640px) 50vw, 100vw"
                        unoptimized={Boolean(
                          relImageSrc.startsWith('http') || relImageSrc.startsWith('/uploads')
                        )}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-3">
                      <h3 className="font-nunito text-sm font-bold leading-[19.25px] text-[#263238] line-clamp-1 group-hover:text-[#2F7D7E] transition-colors">
                        {relActivity.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        <Chip>
                          {formatAgeRange(relActivity.minAgeMonths, relActivity.maxAgeMonths)}
                        </Chip>
                        <Chip>{relActivity.developmentCategory}</Chip>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="font-manrope text-sm text-[#7D8488]">
              No related activities available yet.
            </p>
          )}
        </section>
      </div>
    </Root>
  );
}

export default ActivityDetail;
