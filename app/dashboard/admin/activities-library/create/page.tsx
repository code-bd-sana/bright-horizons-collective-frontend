import { Suspense } from 'react';
import { CreateActivityPage } from '@/components/dashboard/admin/activities-library/create-activity/create-activity-page';

export default function CreateActivityRoute() {
  return (
    <Suspense>
      <CreateActivityPage />
    </Suspense>
  );
}
