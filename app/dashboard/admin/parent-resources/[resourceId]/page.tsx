import { notFound } from 'next/navigation';

import { ResourceDetailsPage } from '@/components/dashboard/admin/parent-resources/resource-details-page';
import { parentResources } from '@/components/dashboard/admin/parent-resources/parent-resources-data';

export default async function ParentResourceDetailsRoute({
  params,
}: {
  params: Promise<{ resourceId: string }>;
}) {
  const { resourceId } = await params;
  const resource = parentResources.find((item) => item.id === resourceId);

  if (!resource) {
    notFound();
  }

  return <ResourceDetailsPage resource={resource} />;
}
