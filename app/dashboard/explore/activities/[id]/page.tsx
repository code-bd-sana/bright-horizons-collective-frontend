import { ActivityDetail } from '@/components/explore/activity-detail';

export default async function DashboardExploreActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ActivityDetail activityId={id} dashboard />;
}
