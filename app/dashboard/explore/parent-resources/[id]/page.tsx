import { ParentResourceDetail } from '@/components/explore/parent-resource-detail';

export default async function DashboardExploreParentResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ParentResourceDetail resourceId={id} dashboard />;
}
