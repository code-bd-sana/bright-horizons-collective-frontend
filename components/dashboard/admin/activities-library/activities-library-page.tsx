'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ActivityArchiveModal } from './activity-archive-modal';
import { ActivityCard } from './activity-card';
import { ActivityDeleteModal } from './activity-delete-modal';
import { ActivityLibraryControls } from './activity-library-controls';
import { activityFilters, activityItems, type ActivityItem } from './activities-library-data';
import { ActivitySummaryCards } from './activity-summary-cards';

export function ActivitiesLibraryPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof activityFilters)[number]>('All');
  const [activities, setActivities] = useState(activityItems);
  const [archiveTarget, setArchiveTarget] = useState<ActivityItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ActivityItem | null>(null);
  const visibleActivities = useMemo(
    () =>
      activities.filter(
        (activity) =>
          (activeFilter === 'All' || activity.area === activeFilter) &&
          `${activity.title} ${activity.description}`.toLowerCase().includes(query.toLowerCase())
      ),
    [activeFilter, activities, query]
  );

  function archiveActivity(activity: ActivityItem) {
    setActivities((current) => current.filter(({ id }) => id !== activity.id));
    setArchiveTarget(null);
    toast.success(`“${activity.title}” has been archived.`);
  }

  function deleteActivity(activity: ActivityItem) {
    setActivities((current) => current.filter(({ id }) => id !== activity.id));
    setDeleteTarget(null);
    toast.success(`“${activity.title}” has been deleted permanently.`);
  }

  return (
    <section className="mx-auto w-full max-w-382 pb-10 text-[#263238]">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] text-[#3d3d3d] sm:text-[40px] sm:leading-12">
            Activities Library
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 text-[#6b6b6b]">
            94 published activities across 6 development areas
          </p>
        </div>
        <Link
          href="/dashboard/admin/activities-library/create"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-5 font-nunito text-sm font-medium leading-5 text-white shadow-[inset_0_-4px_3px_rgba(255,255,255,0.06)] transition-colors hover:bg-[#276d6e]"
        >
          <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
          Create Activity
        </Link>
      </header>
      <div className="mt-8">
        <ActivitySummaryCards />
      </div>
      <div className="mt-8">
        <ActivityLibraryControls
          query={query}
          activeFilter={activeFilter}
          onQueryChange={setQuery}
          onFilterChange={setActiveFilter}
        />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {visibleActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onArchive={setArchiveTarget}
            onDelete={setDeleteTarget}
          />
        ))}
      </div>
      {visibleActivities.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-[#d8dfdf] bg-white px-6 py-16 text-center font-manrope text-sm text-[#65758a]">
          No activities match your search.
        </div>
      )}
      <ActivityArchiveModal
        activity={archiveTarget}
        onClose={() => setArchiveTarget(null)}
        onConfirm={archiveActivity}
      />
      <ActivityDeleteModal
        activity={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteActivity}
      />
    </section>
  );
}
