import { notFound } from 'next/navigation';

import { MemberDetailsPage } from '@/components/dashboard/admin/memberships/member-details-page';
import {
  members,
  memberSlug,
} from '@/components/dashboard/admin/memberships/member-directory-data';

export default async function MemberDetailsRoute({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const member = members.find((item) => memberSlug(item) === memberId);

  if (!member) {
    notFound();
  }

  return <MemberDetailsPage member={member} />;
}
