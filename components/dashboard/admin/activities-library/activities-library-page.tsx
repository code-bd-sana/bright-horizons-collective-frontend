'use client';

import { Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  useAdminActivities,
  useAdminActivitySummary,
} from '@/features/activities/hooks/activities.queries';
import {
  useDeleteActivity,
  useUpdateActivity,
} from '@/features/activities/hooks/activities.mutations';
import type { Activity } from '@/features/activities/model/activity.types';
import { ActivityCard } from './activity-card';
import { ActivityDeleteModal } from './activity-delete-modal';
import { ActivityPublishModal } from './activity-publish-modal';
import { ActivityFilters, type ActivityFiltersState, type FilterName } from './activity-filters';
import { ActivitySummaryCards } from './activity-summary-cards';

const defaultFilters: ActivityFiltersState = {
  search: '',
  category: 'all',
  ageRange: 'all',
  durationRange: 'all',
  difficulty: 'all',
  membership: 'all',
  status: 'all',
};

function matchDurationRange(durationStr: string | null | undefined, range: string): boolean {
  if (range === 'all') return true;
  if (!durationStr) return false;
  const match = durationStr.match(/\d+/);
  if (!match) return true;
  const mins = parseInt(match[0], 10);
  switch (range) {
    case 'under-10':
      return mins < 10;
    case '10-20':
      return mins >= 10 && mins <= 20;
    case '20-30':
      return mins > 20 && mins <= 30;
    case '30-plus':
      return mins > 30;
    default:
      return true;
  }
}

export function ActivitiesLibraryPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<ActivityFiltersState>(defaultFilters);
  const [publishTarget, setPublishTarget] = useState<Activity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Activity | null>(null);
  const [archivingId, setArchivingId] = useState<string | null>(null);

  const updateActivityMutation = useUpdateActivity();
  const deleteActivityMutation = useDeleteActivity();

  const { data: summary, isLoading: isSummaryLoading } = useAdminActivitySummary();

  const apiParams = useMemo(() => {
    const params: Record<string, unknown> = {
      limit: 100,
    };
    if (filters.search.trim()) params.search = filters.search.trim();
    if (filters.category !== 'all') params.developmentCategory = filters.category;
    if (filters.difficulty !== 'all') params.difficultyLevel = filters.difficulty;
    if (filters.membership !== 'all') params.membership = filters.membership;
    if (filters.status !== 'all') params.status = filters.status;

    if (filters.ageRange !== 'all') {
      const [min, max] = filters.ageRange.split('-').map(Number);
      if (!isNaN(min)) params.minAgeMonths = min;
      if (!isNaN(max)) params.maxAgeMonths = max;
    }

    return params;
  }, [filters]);

  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    isError,
  } = useAdminActivities(apiParams);

  const visibleActivities = useMemo(() => {
    const list = activitiesData?.data ?? [];
    return list.filter((activity) =>
      matchDurationRange(activity.estimatedDuration, filters.durationRange)
    );
  }, [activitiesData?.data, filters.durationRange]);

  const handleFilterChange = (filter: FilterName, value: string) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  function handleArchive(activity: Activity) {
    setArchivingId(activity.id);
    updateActivityMutation.mutate(
      {
        id: activity.id,
        input: { status: 'ARCHIVED' },
      },
      {
        onSuccess: () => {
          toast.success(`Activity “${activity.title}” has been archived.`);
          setArchivingId(null);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to archive activity.');
          setArchivingId(null);
        },
      }
    );
  }

  function handleConfirmPublish(activity: Activity) {
    updateActivityMutation.mutate(
      {
        id: activity.id,
        input: { status: 'PUBLISHED' },
      },
      {
        onSuccess: () => {
          toast.success(`Activity “${activity.title}” has been published!`);
          setPublishTarget(null);
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to publish activity.');
        },
      }
    );
  }

  function handleConfirmDelete(activity: Activity) {
    deleteActivityMutation.mutate(activity.id, {
      onSuccess: () => {
        toast.success(`Activity “${activity.title}” has been deleted.`);
        setDeleteTarget(null);
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete activity.');
      },
    });
  }

  function handleDuplicate(activity: Activity) {
    router.push(`/dashboard/admin/activities-library/create?duplicateId=${activity.id}`);
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-382 pb-10 text-[#263238]">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#3d3d3d] sm:text-[32px] sm:leading-10 sm:tracking-[-0.4px] 2xl:text-[40px] 2xl:leading-12">
            Activities Library
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 text-[#6b6b6b]">
            {summary
              ? `${summary.published} published activities across ${summary.categories} development areas`
              : isSummaryLoading
                ? 'Loading activities overview...'
                : 'Manage and view all activities in the library'}
          </p>
        </div>
        <Link
          href="/dashboard/admin/activities-library/create"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-5 font-nunito text-sm font-medium leading-5 text-white shadow-[inset_0_-4px_3px_rgba(255,255,255,0.06)] transition-colors hover:bg-[#276d6e] sm:w-auto"
        >
          <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
          Create Activity
        </Link>
      </header>

      <div className="mt-8">
        <ActivitySummaryCards summary={summary} isLoading={isSummaryLoading} />
      </div>

      <div className="mt-8">
        <ActivityFilters
          filters={filters}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>

      {isActivitiesLoading ? (
        <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white p-12 text-[#607d8b]">
          <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
          <p className="mt-3 font-manrope text-sm">Loading activities...</p>
        </div>
      ) : isError ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[#e57373] bg-white p-12 text-center text-[#e57373]">
          <p className="font-manrope text-sm font-medium">
            Unable to load activities. Please try refreshing the page.
          </p>
        </div>
      ) : visibleActivities.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dfdf] bg-white px-6 py-16 text-center">
          <p className="font-nunito text-lg font-semibold text-[#263238]">No activities found</p>
          <p className="mt-1 max-w-md font-manrope text-sm text-[#65758a]">
            No activities match your current search and filter criteria. Try adjusting the filters
            or adding a new activity.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 rounded-xl border border-[#2f7d7e] px-4 py-2 font-nunito text-sm font-bold text-[#278488] transition-colors hover:bg-[#edf6f5]"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {visibleActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isArchiving={archivingId === activity.id}
              isDeleting={
                deleteActivityMutation.isPending && deleteActivityMutation.variables === activity.id
              }
              onArchive={handleArchive}
              onPublish={setPublishTarget}
              onDelete={setDeleteTarget}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}

      <ActivityPublishModal
        activity={publishTarget}
        isPublishing={updateActivityMutation.isPending}
        onClose={() => setPublishTarget(null)}
        onConfirm={handleConfirmPublish}
      />
      <ActivityDeleteModal
        activity={deleteTarget}
        isDeleting={deleteActivityMutation.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
