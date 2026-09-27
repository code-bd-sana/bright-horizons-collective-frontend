import { Suspense } from 'react';
import { AdminMessagesPage } from '@/components/dashboard/admin/messages/admin-messages-page';

export default function AdminMessagesRoute() {
  return (
    <Suspense>
      <AdminMessagesPage />
    </Suspense>
  );
}
