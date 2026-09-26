import { notFound } from 'next/navigation';

import { MemberDetailsPage } from '@/components/dashboard/admin/memberships/member-details-page';
import {
  members,
  memberSlug,
  type Member,
} from '@/components/dashboard/admin/memberships/member-directory-data';
import { readAuthHeaders } from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export default async function MemberDetailsRoute({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;

  let member: Member | null = null;

  try {
    const authHeaders = await readAuthHeaders();
    if (authHeaders) {
      const response = await serverApi.get(`/memberships/members/${memberId}`, {
        headers: authHeaders,
      });
      const data = response.data?.data ?? response.data;
      if (data && data.id) {
        member = {
          initials: data.initials || 'ME',
          name: data.name || 'Member',
          email: data.email,
          children: data.children || 'None',
          membershipTier: data.membershipTier || 'Little Steps',
          status: data.status || 'Active',
          joinDate: data.joinDate
            ? new Date(data.joinDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'N/A',
          renewalDate: data.renewalDate
            ? new Date(data.renewalDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'N/A',
          currentPlan: data.currentPlan || 'Little Steps',
        };
      }
    }
  } catch {
    // API lookup failed or not found, try fallback
  }

  if (!member) {
    member =
      members.find(
        (item) =>
          memberSlug(item) === memberId ||
          item.email === memberId ||
          (item as unknown as { id: string }).id === memberId
      ) ?? null;
  }

  if (!member) {
    notFound();
  }

  return <MemberDetailsPage member={member} />;
}
