'use client';

import { useQuery } from '@tanstack/react-query';

export interface MetricDetail {
  value: number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface AdminDashboardMetricsData {
  totalFamilies: MetricDetail;
  activeChildren: MetricDetail;
  activeWeeklyPlans: MetricDetail;
  activitiesLibrary: MetricDetail;
  parentResources: MetricDetail;
  therapyToys: MetricDetail;
  activeMemberships: MetricDetail;
  unreadMessages: MetricDetail;
}

export const adminDashboardKeys = {
  all: ['admin-dashboard'] as const,
  metrics: () => [...adminDashboardKeys.all, 'metrics'] as const,
};

export async function fetchAdminDashboardMetrics(): Promise<AdminDashboardMetricsData> {
  const res = await fetch('/api/admin/dashboard/metrics', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load dashboard metrics');
  }
  return res.json();
}

export function useAdminDashboardMetrics() {
  return useQuery<AdminDashboardMetricsData>({
    queryKey: adminDashboardKeys.metrics(),
    queryFn: fetchAdminDashboardMetrics,
    staleTime: 30 * 1000,
  });
}
