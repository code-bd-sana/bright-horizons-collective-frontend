import { Suspense } from 'react';
import { CompletedActivityPage } from '@/components/dashboard/weekly-plans/completed-activity-page';

export default function CompletedActivityRoute() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex w-full max-w-304 items-center justify-center py-24 text-[#515b60]">
          <p className="font-manrope text-sm">Loading activity completion...</p>
        </div>
      }
    >
      <CompletedActivityPage />
    </Suspense>
  );
}
