import { notFound } from 'next/navigation';

import { UpgradeDowngradePage } from '@/components/dashboard/admin/memberships/upgrade-downgrade-page';
import {
  members,
  memberSlug,
} from '@/components/dashboard/admin/memberships/member-directory-data';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ member?: string }>;
}) {
  const { member: memberId } = await searchParams;
  const member =
    members.find((item) => memberSlug(item) === memberId) ??
    members.find((item) => item.name === 'Elena Martinez');

  if (!member) notFound();

  return <UpgradeDowngradePage member={member} />;
}
