import { ActivityDetailPage } from '@/components/dashboard/admin/activities-library/activity-detail/activity-detail-page';

export default async function ActivityDetailRoute({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;
  return <ActivityDetailPage activityId={activityId} />;
}
