'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export type ChildProfileItem = {
  id: string;
  name: string;
  photoUrl?: string | null;
  gender?: string | null;
  ageYears?: number;
  ageMonths?: number;
  age?: number;
  caregiverName?: string | null;
  caregiverRelationship?: string | null;
  caregiverEmail?: string | null;
  caregiverPhone?: string | null;
  areasOfSupport?: string[];
  favorites?: string[];
  interests?: string | null;
  developmentalStage?: string | null;
};

export type FamilyActivityLogItem = {
  message: string;
  date: string;
  iconType: string;
  colorClass: string;
};

export type FamilyDetailsData = {
  user: {
    id: string;
    email: string;
    name: string;
    phone?: string | null;
    relationship?: string | null;
    profileImage?: string | null;
    status: string;
    createdAt: string;
  };
  children: ChildProfileItem[];
  activeSubscription?: {
    id: string;
    status: string;
    billingCycle: string;
    amountPaid?: number;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    plan: {
      id: string;
      name: string;
      tier: string;
      price: number;
    };
  } | null;
  membership?: string;
  tierKey?: string;
  activityLog?: FamilyActivityLogItem[];
};

export const adminFamilyKeys = {
  all: ['admin-families'] as const,
  list: () => [...adminFamilyKeys.all, 'list'] as const,
  stats: () => [...adminFamilyKeys.all, 'stats'] as const,
  details: (id: string) => [...adminFamilyKeys.all, 'details', id] as const,
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

export async function fetchFamilyDetails(id: string): Promise<FamilyDetailsData> {
  const res = await fetch(`/api/families/${id}`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load family details');
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

export function useAdminFamilyDetails(id: string) {
  return useQuery<FamilyDetailsData>({
    queryKey: adminFamilyKeys.details(id),
    queryFn: () => fetchFamilyDetails(id),
    enabled: Boolean(id),
    staleTime: 30 * 1000,
  });
}

export async function updateFamilyStatusApi(
  id: string,
  status: 'ACTIVE' | 'DEACTIVATED'
): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`/api/families/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update family status');
  }
  return res.json();
}

export async function deleteFamilyApi(id: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`/api/families/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete family');
  }
  return res.json();
}

export function useUpdateFamilyStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'ACTIVE' | 'DEACTIVATED' }) =>
      updateFamilyStatusApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFamilyKeys.all });
    },
  });
}

export function useDeleteFamily() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFamilyApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFamilyKeys.all });
    },
  });
}
