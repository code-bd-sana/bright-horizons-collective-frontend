import { useQuery } from '@tanstack/react-query';

import {
  getActivities,
  getAdminActivities,
  getAdminActivity,
  getAdminActivitySummary,
} from '../api/activities.api';
import { activityKeys } from '../activity.keys';

export function useActivities(
  filters: Record<string, unknown> = {},
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: activityKeys.publicList(filters),
    queryFn: () => getActivities(filters),
    enabled: options?.enabled ?? true,
  });
}

export function useActivity(id: string | undefined | null) {
  return useQuery({
    queryKey: activityKeys.detail(id ?? ''),
    queryFn: () => getAdminActivity(id!),
    enabled: Boolean(id),
  });
}

export function useAdminActivities(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: activityKeys.adminList(filters),
    queryFn: () => getAdminActivities(filters),
  });
}

export function useAdminActivity(id: string | undefined | null) {
  return useQuery({
    queryKey: activityKeys.detail(id ?? ''),
    queryFn: () => getAdminActivity(id!),
    enabled: Boolean(id),
  });
}

export function useAdminActivitySummary() {
  return useQuery({
    queryKey: activityKeys.adminSummary(),
    queryFn: getAdminActivitySummary,
  });
}
