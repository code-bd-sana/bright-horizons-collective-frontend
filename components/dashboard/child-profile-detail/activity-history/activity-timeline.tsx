'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, CheckCircle2, RotateCcw } from 'lucide-react';

import type { ChildRecentActivity } from '@/features/child-profiles/api/child-profiles.api';

type ActivityTimelineProps = {
  childId: string;
  childName?: string;
  activities: ChildRecentActivity[];
  isLoading: boolean;
  timeframeLabel?: string;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
};

export function ActivityTimeline({
  childId,
  childName = 'your child',
  activities,
  isLoading,
  timeframeLabel = 'This Week',
  hasActiveFilters = false,
  onClearFilters,
}: ActivityTimelineProps) {
  if (isLoading) {
    return (
      <div className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8 animate-pulse">
        <div className="h-7 w-36 rounded bg-[#E9F1EE]" />
        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex min-w-0 flex-row gap-3 sm:gap-5">
              <div className="flex w-2.5 shrink-0 flex-col items-center">
                <div className="mt-1.5 size-2.5 rounded-full bg-[#E9F1EE]" />
                <div className="mt-1 h-32 w-px bg-[#E9F1EE]" />
              </div>
              <div className="mb-5 flex min-w-0 flex-1 flex-col gap-4 rounded-2xl border border-[#E9F1EE] bg-[#fafafa] p-4 sm:p-5">
                <div className="h-6 w-48 rounded bg-[#E9F1EE]" />
                <div className="h-4 w-32 rounded bg-[#E9F1EE]" />
                <div className="h-16 w-full rounded bg-[#E9F1EE]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex min-w-0 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#D8DDD9] bg-white p-8 text-center sm:p-12">
        <div className="flex size-14 items-center justify-center rounded-full bg-[#E9F1EE] text-[#2F7D7E]">
          <CheckCircle2 className="size-7" />
        </div>
        <div className="flex max-w-md flex-col gap-1.5">
          <h3 className="font-nunito text-xl font-semibold text-[#263238]">
            {hasActiveFilters ? 'No activities match your filters' : 'No activity history yet'}
          </h3>
          <p className="font-manrope text-sm leading-5.5 text-[#7D8488]">
            {hasActiveFilters
              ? 'Try adjusting your search query, timeframe, or category to find past activities.'
              : `When ${childName} completes daily therapy activities and reflection notes, they will appear in this timeline.`}
          </p>
        </div>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#D8DDD9] bg-white px-5 py-2.5 font-nunito text-sm font-medium text-[#2F7D7E] shadow-xs hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="size-4" />
            <span>Reset filters</span>
          </button>
        ) : (
          <Link
            href={`/dashboard/weekly-plans?childId=${childId}`}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#2F7D7E] px-6 py-2.5 font-nunito text-sm font-medium text-white shadow-xs hover:bg-[#256667] transition-colors"
          >
            Explore Weekly Plans
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          {timeframeLabel}
        </h2>
        <span className="font-manrope text-xs text-[#7D8488]">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
        </span>
      </div>

      <div className="flex flex-col">
        {activities.map((item, idx) => {
          const activity = item.activity;
          const title = activity?.title || 'Completed Activity';
          const category = activity?.developmentCategory || 'Activity';
          const date = item.completedAt ? new Date(item.completedAt) : new Date();
          const dateFormatted = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          });
          const duration = activity?.estimatedDuration
            ? activity.estimatedDuration.includes('min')
              ? activity.estimatedDuration
              : `${activity.estimatedDuration} min`
            : '15 min';
          const metadata = `${category} · ${dateFormatted} · ${duration}`;

          const reflectionText =
            item.parentNotes?.trim() ||
            (Array.isArray(item.reflections) && item.reflections.length > 0
              ? item.reflections.join('. ')
              : typeof item.reflections === 'string' && item.reflections.trim()
                ? item.reflections.trim()
                : null);

          const activityId = item.activityId || activity?.id;
          const isLast = idx === activities.length - 1;

          return (
            <div key={item.id || idx} className="flex min-w-0 flex-row gap-3 sm:gap-5">
              {/* Timeline Line & Dot */}
              <div className="flex w-2.5 shrink-0 flex-col items-center">
                <div className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#8FB9A8]" />
                {!isLast && <div className="mt-1 h-full w-px bg-[#E2E8E8]" />}
              </div>

              {/* Timeline Content */}
              <div className="mb-5 flex min-w-0 flex-1 flex-col gap-4 rounded-2xl border border-[#E9F1EE] bg-white p-3.5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-nunito text-lg font-medium leading-6 text-[#263238] sm:text-xl sm:leading-7">
                        {title}
                      </h3>
                      <div className="flex items-center rounded-lg bg-[#E9F1EE] px-2 py-0.5">
                        <span className="font-nunito text-xs font-medium leading-4 text-[#729486]">
                          Completed
                        </span>
                      </div>
                      {item.rating ? (
                        <div className="flex items-center gap-0.5 rounded-lg bg-[#fff8e6] px-2 py-0.5 text-xs text-[#b8860b]">
                          ★ {item.rating}/5
                        </div>
                      ) : null}
                    </div>
                    <p className="font-manrope text-xs font-normal leading-4 text-[#7D8488]">
                      {metadata}
                    </p>
                  </div>

                  {activityId && (
                    <Link
                      href={`/dashboard/weekly-plans/activity-detail?activityId=${activityId}&childId=${childId}`}
                      className="group flex w-fit shrink-0 items-center gap-1 rounded-full border border-transparent px-1 py-0 transition-colors hover:text-[#256667]"
                    >
                      <span className="font-nunito text-sm font-medium leading-5.5 tracking-[-0.006em] text-[#2F7D7E] sm:text-base sm:leading-6 sm:tracking-[-0.011em]">
                        View Activity Details
                      </span>
                      <ExternalLink className="h-4 w-4 text-[#2F7D7E] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>

                {/* Optional Artwork Thumbnail */}
                {item.artworkUrl && (
                  <div className="flex items-center gap-3">
                    <div className="relative size-18 overflow-hidden rounded-xl border border-[#E8EBE8] bg-[#FAFAFA]">
                      <Image
                        src={item.artworkUrl}
                        alt="Child activity artwork"
                        fill
                        className="object-cover"
                        unoptimized={
                          item.artworkUrl.startsWith('http') ||
                          item.artworkUrl.startsWith('/uploads') ||
                          item.artworkUrl.startsWith('data:')
                        }
                      />
                    </div>
                    <span className="font-manrope text-xs text-[#7D8488]">
                      Artwork saved for this activity
                    </span>
                  </div>
                )}

                {/* Parent Reflection */}
                {reflectionText && (
                  <div className="flex flex-col gap-1.5 rounded-lg border border-[#FCE9E3] bg-[#F9F5F4] px-3.5 py-3">
                    <span className="font-nunito text-xs font-semibold leading-4 text-[#263238]">
                      Parent Reflection:
                    </span>
                    <p className="font-lora text-xs italic leading-4.5 text-[#515B60]">
                      &quot;{reflectionText}&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
