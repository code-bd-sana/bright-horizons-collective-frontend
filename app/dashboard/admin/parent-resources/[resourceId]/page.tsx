import { notFound } from 'next/navigation';

import { ResourceDetailsPage } from '@/components/dashboard/admin/parent-resources/resource-details-page';
import { parentResources } from '@/components/dashboard/admin/parent-resources/parent-resources-data';
import { serverApi } from '@/services/api/client/server-client';
import type { ParentResource } from '@/features/parent-resources';

export default async function ParentResourceDetailsRoute({
  params,
}: {
  params: Promise<{ resourceId: string }>;
}) {
  const { resourceId } = await params;

  let resource: ParentResource | null = null;
  try {
    const response = await serverApi.get(`/parent-resources/${resourceId}`);
    resource = (response.data?.data as ParentResource) ?? null;
  } catch {
    // Proceed to fallback
  }

  if (!resource) {
    resource = parentResources.find((item) => item.id === resourceId) ?? null;
  }

  if (!resource) {
    notFound();
  }

  return <ResourceDetailsPage resource={resource} />;
}
