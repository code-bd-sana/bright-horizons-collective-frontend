import { notFound } from 'next/navigation';

import { ResourceDetailsPage } from '@/components/dashboard/admin/parent-resources/resource-details-page';
import { readAuthHeaders } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import type { ParentResource } from '@/features/parent-resources';

export default async function ParentResourceDetailsRoute({
  params,
}: {
  params: Promise<{ resourceId: string }>;
}) {
  const { resourceId } = await params;
  const authHeaders = await readAuthHeaders();

  let resource: ParentResource | null = null;
  try {
    const response = await serverApi.get(`/parent-resources/${resourceId}`, {
      headers: authHeaders ?? {},
    });
    resource = (response.data?.data as ParentResource) ?? (response.data as ParentResource) ?? null;
  } catch {
    // Backend returned not found or error
  }

  if (!resource) {
    notFound();
  }

  return <ResourceDetailsPage resource={resource} />;
}
