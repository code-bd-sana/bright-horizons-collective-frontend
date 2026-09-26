'use client';

import { useQuery } from '@tanstack/react-query';

export type FamilyItem = {
  id: string;
  name: string;
  initials?: string;
  relationship: string;
  email: string;
  phone: string;
  children: string[];
  membership: string;
  tierKey?: string;
  status: 'Active' | 'Inactive' | string;
  registrationDate: string;
};

export type FamilyStats = {
  totalFamilies: number;
  activeChildren: number;
  activeMemberships: number;
  newThisMonth: number;
};

export const adminFamilyKeys = {
  all: ['admin-families'] as const,
  list: () => [...adminFamilyKeys.all, 'list'] as const,
  stats: () => [...adminFamilyKeys.all, 'stats'] as const,
};

export async function fetchFamilies(): Promise<FamilyItem[]> {
  const res = await fetch('/api/families', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load families');
  }
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.data ?? []);
}

export async function fetchFamilyStats(): Promise<FamilyStats> {
  const res = await fetch('/api/families/stats', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load family statistics');
  }
  const data = await res.json();
  return data?.data ?? data;
}

export function useAdminFamilies() {
  return useQuery<FamilyItem[]>({
    queryKey: adminFamilyKeys.list(),
    queryFn: fetchFamilies,
    staleTime: 30 * 1000,
  });
}

export function useAdminFamilyStats() {
  return useQuery<FamilyStats>({
    queryKey: adminFamilyKeys.stats(),
    queryFn: fetchFamilyStats,
    staleTime: 30 * 1000,
  });
}
