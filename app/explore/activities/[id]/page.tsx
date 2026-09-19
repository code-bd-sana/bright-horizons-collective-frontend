import { ActivityDetail } from '@/components/explore/activity-detail';

export default async function ExploreActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ActivityDetail activityId={id} />;
}
