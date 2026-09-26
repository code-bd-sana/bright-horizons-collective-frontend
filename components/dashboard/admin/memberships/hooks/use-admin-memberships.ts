'use client';

import { useQuery } from '@tanstack/react-query';

export type MembershipDashboardStats = {
  totalMembers: number;
  paidMembers: number;
  littleStepsMembers: number;
  growTogetherMembers: number;
  personalizedPathwaysMembers: number;
  pendingUpgrades: number;
};

export type MembershipActivityItem = {
  id: string;
  userName: string;
  action: string;
  timestamp: string;
  type?: string;
};

export const adminMembershipKeys = {
  all: ['admin-memberships'] as const,
  stats: () => [...adminMembershipKeys.all, 'stats'] as const,
  recentActivity: () => [...adminMembershipKeys.all, 'recent-activity'] as const,
};

export async function fetchMembershipDashboardStats(): Promise<MembershipDashboardStats> {
  const res = await fetch('/api/memberships/dashboard-stats', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load membership stats');
  }
  const data = await res.json();
  return data?.data ?? data;
}

export async function fetchRecentMembershipActivity(): Promise<MembershipActivityItem[]> {
  const res = await fetch('/api/memberships/recent-activity', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load recent activity');
  }
  const data = await res.json();
  return data?.data ?? data;
}

export function useMembershipDashboardStats() {
  return useQuery<MembershipDashboardStats>({
    queryKey: adminMembershipKeys.stats(),
    queryFn: fetchMembershipDashboardStats,
    staleTime: 30 * 1000,
  });
}

export function useRecentMembershipActivity() {
  return useQuery<MembershipActivityItem[]>({
    queryKey: adminMembershipKeys.recentActivity(),
    queryFn: fetchRecentMembershipActivity,
    staleTime: 30 * 1000,
  });
}
