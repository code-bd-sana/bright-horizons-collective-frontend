import { ActivityDetailPage } from '@/components/dashboard/admin/activities-library/activity-detail/activity-detail-page';
import { activityItems } from '@/components/dashboard/admin/activities-library/activities-library-data';
import { notFound } from 'next/navigation';

export default async function ActivityDetailRoute({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;
  if (!activityItems.some((activity) => activity.id === activityId)) notFound();
  return <ActivityDetailPage />;
}
