'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { useActivities, useActivity } from '@/features/activities/hooks/activities.queries';
import { ActivityDetailHero } from '@/components/dashboard/admin/activities-library/activity-detail/activity-detail-hero';
import { ActivityInstructions } from '@/components/dashboard/admin/activities-library/activity-detail/activity-instructions';
import { ActivityMaterials } from '@/components/dashboard/admin/activities-library/activity-detail/activity-materials';
import { ActivityModifications } from '@/components/dashboard/admin/activities-library/activity-detail/activity-modifications';
import { ActivitySidePanels } from '@/components/dashboard/admin/activities-library/activity-detail/activity-side-panels';
import { formatAgeRange } from '@/features/activities/model/activity.mapper';
import { cn } from '@/lib/utils';

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

  const effectiveId = activityId || (allActivities.length > 0 ? allActivities[0]?.id : undefined);
  const activityQuery = useActivity(effectiveId);
  const activity = activityQuery.data;

  const relatedActivities = useMemo(() => {
    if (!activity) return [];
    const otherActivities = allActivities.filter((item) => item.id !== activity.id);

    const sameCategory = otherActivities.filter(
      (item) =>
        item.developmentCategory?.trim().toLowerCase() ===
        activity.developmentCategory?.trim().toLowerCase()
    );

    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 3);
    }

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
      <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC] pt-32 pb-20 px-4 sm:px-8')}>
        <section className="mx-auto w-full min-w-0 max-w-265.75 pb-10">
          <div className="flex items-center gap-2 font-manrope text-sm text-[#7d8488]">
            <Link
              href={exploreHref}
              className="inline-flex items-center gap-1 text-[#2f7d7e] hover:underline"
            >
              <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
              {dashboard ? 'Activities' : 'Explore'}
            </Link>
            <span className="text-[#d8ddd9]">/</span>
            <span>Loading activity...</span>
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 py-20 text-[#515b60]">
            <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
            <p className="font-manrope text-sm">Loading activity details...</p>
          </div>
        </section>
      </Root>
    );
  }

  if (activityQuery.isError || !activity || activity.status !== 'PUBLISHED') {
    return (
      <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC] pt-32 pb-20 px-4 sm:px-8')}>
        <section className="mx-auto w-full min-w-0 max-w-265.75 pb-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]"
          >
            <Link
              href={exploreHref}
              className="inline-flex items-center gap-1 text-[#2f7d7e] hover:underline"
            >
              <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
              {dashboard ? 'Activities' : 'Explore'}
            </Link>
            <span className="text-lg leading-5 text-[#d8ddd9]">/</span>
            <span className="text-[#263238]">Not Found</span>
          </nav>
          <div className="rounded-2xl border border-[#e8ebe8] bg-white p-12 text-center shadow-xs">
            <h2 className="font-nunito text-xl font-semibold text-[#263238]">Activity Not Found</h2>
            <p className="mt-2 font-manrope text-sm text-[#7d8488]">
              The activity you are looking for does not exist or has been removed.
            </p>
            <Link
              href={exploreHref}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-medium text-white transition-colors hover:bg-[#276a6b]"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to {dashboard ? 'Activities' : 'Explore'}
            </Link>
          </div>
        </section>
      </Root>
    );
  }

  return (
    <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC] pt-32 pb-20 px-4 sm:px-8')}>
      <section className="mx-auto w-full min-w-0 max-w-265.75 pb-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]"
        >
          <Link
            href={exploreHref}
            className="inline-flex items-center gap-1 text-[#2f7d7e] hover:underline"
          >
            <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
            {dashboard ? 'Activities' : 'Explore Activities'}
          </Link>
          <span className="text-lg leading-5 text-[#d8ddd9]">/</span>
          <span className="max-w-100 truncate font-medium text-[#263238]" title={activity.title}>
            {activity.title}
          </span>
        </nav>

        <ActivityDetailHero activity={activity} hideStatus />

        <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_286px]">
          <div className="min-w-0 space-y-6">
            <ActivityMaterials activity={activity} />
            <ActivityInstructions activity={activity} />
            <ActivityModifications activity={activity} />
          </div>
          <ActivitySidePanels activity={activity} />
        </div>

        {relatedActivities.length > 0 && (
          <section className="mt-12 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                Related Activities
              </h2>
              <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                More therapist-designed activities to build complementary skills.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8ebe8] bg-white shadow-[0px_1px_2px_rgba(38,50,56,0.05)] transition-all hover:shadow-[0px_4px_16px_rgba(38,50,56,0.12)] hover:-translate-y-0.5"
                  >
                    <div className="relative h-44 w-full bg-[#dceeee] overflow-hidden">
                      <Image
                        src={relImageSrc}
                        alt={relActivity.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1280px) 340px, (min-width: 640px) 50vw, 100vw"
                        unoptimized={Boolean(
                          relImageSrc.startsWith('http') || relImageSrc.startsWith('/uploads')
                        )}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="font-nunito text-base font-medium leading-6 text-[#263238] line-clamp-1 transition-colors group-hover:text-[#2f7d7e]">
                          {relActivity.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 font-manrope text-xs leading-4.5 text-[#515b60]">
                          {relActivity.shortDescription}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-[#dceeee] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174a4d]">
                          {formatAgeRange(relActivity.minAgeMonths, relActivity.maxAgeMonths)}
                        </span>
                        <span className="rounded-full bg-[#dceeee] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174a4d]">
                          {relActivity.developmentCategory}
                        </span>
                        {relActivity.estimatedDuration && (
                          <span className="font-manrope text-xs text-[#7d8488]">
                            · {relActivity.estimatedDuration}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </Root>
  );
}

export default ActivityDetail;
