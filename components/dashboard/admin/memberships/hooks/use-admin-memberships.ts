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
  directory: (search?: string, tier?: string) =>
    [...adminMembershipKeys.all, 'directory', search ?? '', tier ?? 'all'] as const,
};

export type MemberDirectoryItem = {
  id: string;
  name: string;
  email: string;
  initials: string;
  children: string;
  childrenCount: number;
  membershipTier: 'Little Steps' | 'Grow Together' | 'Personalized Pathways';
  tierKey?: string;
  status: 'Active' | 'Paused';
  joinDate: string;
  renewalDate?: string;
  currentPlan: string;
  billingCycle?: string;
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

export async function fetchMemberDirectory(params?: {
  search?: string;
  tier?: string;
}): Promise<MemberDirectoryItem[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.tier && params.tier !== 'all') query.set('tier', params.tier);

  const qs = query.toString() ? `?${query.toString()}` : '';
  const res = await fetch(`/api/memberships/members${qs}`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load member directory');
  }
  const data = await res.json();
  return data?.data ?? data;
}

export function useAdminMemberDirectory(params?: { search?: string; tier?: string }) {
  return useQuery<MemberDirectoryItem[]>({
    queryKey: adminMembershipKeys.directory(params?.search, params?.tier),
    queryFn: () => fetchMemberDirectory(params),
    staleTime: 30 * 1000,
  });
}
