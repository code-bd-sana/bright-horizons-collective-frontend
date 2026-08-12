import { notFound } from 'next/navigation';

import { ChildProfileDetailPage } from '@/components/dashboard/child-profile-detail/child-profile-detail-page';
import { childDetails } from '@/components/dashboard/child-profile-detail/types';

export default async function ChildProfileDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const child = childDetails[id];
  if (!child) notFound();
  return <ChildProfileDetailPage child={child} />;
}
