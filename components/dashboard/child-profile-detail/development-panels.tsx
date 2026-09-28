'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, Star, Download } from 'lucide-react';

import type { ChildProfile } from '@/features/child-profiles/model/child-profile.types';
import { useChildRecentActivities } from '@/features/child-profiles/hooks/child-profiles.queries';

const recommendedCards = [
  {
    category: 'Parent Resources',
    title: 'Daily Routine Chart',
    description: 'Customizable morning and evening checklist for preschool ages.',
    action: 'Download (1.2 MB)',
    actionIcon: 'download' as const,
    tone: 'bg-[#F5F3FF]',
    label: 'Therapist Verified',
    labelIcon: 'shield' as const,
    image: '/resources/resource-parent.png',
    link: '/dashboard/explore?tab=parent-resources',
  },
  {
    category: 'Therapy Toys & Equipment',
    title: 'Sensory Rice Bin Exploration',
    description: 'Customizable morning and evening checklist for preschool ages.',
    action: 'See Why We Recommend It',
    actionIcon: 'arrow-right' as const,
    tone: 'bg-[#F0FDFA]',
    label: 'Therapist Verified',
    labelIcon: 'shield' as const,
    image: '/resources/resource-toy.png',
    link: '/dashboard/explore?tab=therapy-toys',
  },
];

const fallbackImages = [
  '/activities/activity-1.png',
  '/activities/activity-2.png',
  '/activities/activity-3.png',
];

export function RecommendedResourcesPanel() {
  return (
    <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-[#fffdf8] p-4 shadow-sm sm:p-6 2xl:p-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-nunito text-xs font-medium leading-4 text-[#2F7D7E]">
            Recommended Resources &amp; Therapy Toys
          </p>
          <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
            Therapy Toys &amp; Equipment
          </h2>
        </div>
        <Link
          href="/dashboard/explore?tab=therapy-toys"
          className="flex shrink-0 items-center gap-1 font-nunito text-sm font-medium text-[#2F7D7E] hover:underline sm:text-base"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {recommendedCards.map((item) => (
          <article
            key={item.title}
            className="flex min-w-0 flex-col items-center gap-4 rounded-2xl border border-[#E9F1EE] bg-white p-3.5 sm:flex-row sm:p-4 hover:shadow-sm transition-shadow"
          >
            <div
              className={`relative flex h-28 w-full shrink-0 items-center justify-center rounded-xl sm:w-28 ${item.tone}`}
            >
              <div className="relative h-22 w-22">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="88px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex w-full min-w-0 flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F1EE] px-2 py-0.5 font-nunito text-[11px] font-semibold text-[#006A62]">
                  {item.labelIcon === 'shield' ? (
                    <ShieldCheck className="size-3 text-[#006A62]" />
                  ) : (
                    <Star className="size-3 text-[#006A62]" />
                  )}
                  {item.label}
                </span>
                <span className="font-nunito text-xs text-[#7D8488]">· {item.category}</span>
              </div>
              <h3 className="font-nunito text-base font-semibold leading-tight text-[#263238] sm:text-lg">
                {item.title}
              </h3>
              <p className="line-clamp-2 font-manrope text-xs leading-relaxed text-[#7D8488]">
                {item.description}
              </p>
              <Link
                href={item.link}
                className="mt-1 inline-flex items-center gap-1 font-manrope text-xs font-semibold text-[#2F7D7E] hover:underline"
              >
                {item.actionIcon === 'download' ? (
                  <Download className="size-3.5" />
                ) : (
                  <ArrowRight className="size-3.5" />
                )}
                <span>{item.action}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Export alias so any previous reference remains compatible
export const DevelopmentProgressPanel = RecommendedResourcesPanel;

export function RecentActivityPanel({ child }: { child?: ChildProfile | null }) {
  const { data: recentActivities = [], isLoading } = useChildRecentActivities(child?.id, 5);

  return (
    <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-[#fffdf8] p-4 shadow-sm sm:p-6 2xl:p-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-nunito text-xs font-medium leading-4 text-[#2F7D7E]">Activity Log</p>
          <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
            Recent activity
          </h2>
        </div>
        {child ? (
          <Link
            href={`/dashboard/child-profiles/${child.id}/activity-history`}
            className="flex shrink-0 items-center gap-1 py-1.5 font-nunito text-sm font-medium text-[#2F7D7E] hover:underline sm:text-base"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="flex shrink-0 items-center gap-1 py-1.5 font-nunito text-sm font-medium text-[#7D8488] sm:text-base">
            View all
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2">
              <div className="flex items-center gap-3">
                <div className="size-13.5 rounded-xl bg-[#e9f1ee]" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-36 rounded bg-[#e9f1ee]" />
                  <div className="h-3 w-24 rounded bg-[#e9f1ee]" />
                </div>
              </div>
              <div className="h-5 w-20 rounded-full bg-[#e9f1ee]" />
            </div>
          ))}
        </div>
      ) : recentActivities.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#e8ebe8] bg-[#fafafa] p-8 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#e9f1ee] text-[#2f7d7e]">
            <CheckCircle2 className="size-6" />
          </div>
          <p className="font-nunito text-base font-semibold text-[#263238]">
            No completed activities yet
          </p>
          <p className="mt-1 max-w-xs font-manrope text-xs text-[#7d8488]">
            When {child ? child.name.split(' ')[0] : 'your child'} completes daily activities, they
            will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {recentActivities.slice(0, 5).map((item, index) => {
            const activity = item.activity;
            const title = activity?.title || 'Completed Activity';
            const category = activity?.developmentCategory || 'Sensory Play';
            const duration = activity?.estimatedDuration
              ? activity.estimatedDuration.includes('min')
                ? activity.estimatedDuration
                : `${activity.estimatedDuration} min`
              : '20 min';
            const subtitle = `${category} · ${duration}`;
            const imageSrc =
              activity?.featuredImageUrl || fallbackImages[index % fallbackImages.length];

            return (
              <div
                key={item.id || index}
                className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#f0f2f0] last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-13.5 shrink-0 overflow-hidden rounded-xl bg-[#e9f1ee]">
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      sizes="54px"
                      className="object-cover"
                      unoptimized={imageSrc.startsWith('http') || imageSrc.startsWith('/uploads')}
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1">
                    {activity?.id ? (
                      <Link
                        href={`/dashboard/weekly-plans/activity-detail?activityId=${activity.id}${child?.id ? `&childId=${child.id}` : ''}`}
                        className="truncate font-nunito text-base font-medium leading-tight text-[#263238] hover:text-[#2f7d7e] transition-colors"
                      >
                        {title}
                      </Link>
                    ) : (
                      <p className="truncate font-nunito text-base font-medium leading-tight text-[#263238]">
                        {title}
                      </p>
                    )}
                    <p className="font-manrope text-xs font-normal text-[#515B60]">{subtitle}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 sm:pl-4">
                  <CheckCircle2 className="h-4 w-4 text-[#2f7d7e]" />
                  <span className="font-manrope text-xs font-medium text-[#2f7d7e]">Completed</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
