import { ParentResourceDetail } from '@/components/explore/parent-resource-detail';

export default async function ExploreParentResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ParentResourceDetail resourceId={id} />;
}
