'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAdminActivity } from '@/features/activities/hooks/activities.queries';
import { ActivityDetailHero } from './activity-detail-hero';
import { ActivityInstructions } from './activity-instructions';
import { ActivityMaterials } from './activity-materials';
import { ActivityModifications } from './activity-modifications';
import { ActivitySidePanels } from './activity-side-panels';

export function ActivityDetailPage({ activityId }: { activityId: string }) {
  const { data: activity, isLoading, isError } = useAdminActivity(activityId);

  if (isLoading) {
    return (
      <section className="mx-auto w-full min-w-0 max-w-265.75 pb-10">
        <div className="flex items-center gap-2 font-manrope text-sm text-[#7d8488]">
          <Link
            href="/dashboard/admin/activities-library"
            className="inline-flex items-center gap-1 text-[#2f7d7e]"
          >
            <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
            Activities Library
          </Link>
          <span className="text-[#d8ddd9]">/</span>
          <span>Loading activity...</span>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 py-20 text-[#515b60]">
          <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
          <p className="font-manrope text-sm">Loading activity details...</p>
        </div>
      </section>
    );
  }

  if (isError || !activity) {
    return (
      <section className="mx-auto w-full min-w-0 max-w-265.75 pb-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]"
        >
          <Link
            href="/dashboard/admin/activities-library"
            className="inline-flex items-center gap-1 text-[#2f7d7e]"
          >
            <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
            Activities Library
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
            href="/dashboard/admin/activities-library"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-medium text-white transition-colors hover:bg-[#276a6b]"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to Activities Library
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-265.75 pb-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]"
      >
        <Link
          href="/dashboard/admin/activities-library"
          className="inline-flex items-center gap-1 text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
          Activities Library
        </Link>
        <span className="text-lg leading-5 text-[#d8ddd9]">/</span>
        <span className="max-w-100 truncate text-[#263238] font-medium" title={activity.title}>
          {activity.title}
        </span>
      </nav>
      <ActivityDetailHero activity={activity} />
      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_286px]">
        <div className="min-w-0 space-y-6">
          <ActivityMaterials activity={activity} />
          <ActivityInstructions activity={activity} />
          <ActivityModifications activity={activity} />
        </div>
        <ActivitySidePanels activity={activity} />
      </div>
    </section>
  );
}
