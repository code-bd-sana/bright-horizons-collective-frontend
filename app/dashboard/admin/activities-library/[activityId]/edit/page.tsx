'use client';

import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CreateActivityForm } from '@/components/dashboard/admin/activities-library/create-activity/create-activity-form';
import { useAdminActivity } from '@/features/activities/hooks/activities.queries';

export default function EditActivityRoute() {
  const params = useParams<{ activityId: string }>();
  const activityQuery = useAdminActivity(params.activityId);

  return (
    <section className="mx-auto w-full min-w-0 max-w-265.75 pb-10 pt-2 text-[#263238]">
      <Link
        href="/dashboard/admin/activities-library"
        className="inline-flex items-center gap-1 font-nunito text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#278488]"
      >
        <ChevronLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        Back to Activity Library
      </Link>
      <h1 className="mt-4 font-nunito text-2xl font-bold leading-9 text-[#263238]">
        Edit Activity
      </h1>

      <div className="mt-5">
        {activityQuery.isLoading ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white p-12 text-[#607d8b]">
            <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
            <p className="mt-3 font-manrope text-sm">Loading activity details...</p>
          </div>
        ) : activityQuery.isError || !activityQuery.data ? (
          <div className="rounded-2xl border border-dashed border-[#e57373] bg-white p-8 text-center text-[#e57373]">
            <p className="font-manrope text-sm font-medium">
              {activityQuery.error?.message ?? 'Activity not found.'}
            </p>
            <Link
              href="/dashboard/admin/activities-library"
              className="mt-4 inline-block rounded-xl border border-[#2f7d7e] px-4 py-2 font-nunito text-sm font-bold text-[#278488] transition-colors hover:bg-[#edf6f5]"
            >
              Back to Activity Library
            </Link>
          </div>
        ) : (
          <CreateActivityForm key={activityQuery.data.id} activity={activityQuery.data} />
        )}
      </div>
    </section>
  );
}
