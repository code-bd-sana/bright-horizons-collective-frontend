import { ActivityDetailView } from '@/components/dashboard/activity-detail/activity-detail-view';

export default async function ActivityDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ activityId?: string; childId?: string }>;
}) {
  const params = await searchParams;
  return <ActivityDetailView activityId={params.activityId} childId={params.childId} />;
}
