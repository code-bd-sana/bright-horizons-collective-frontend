'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getAdminActivities,
  getAdminActivity,
  getAdminActivitySummary,
} from '../api/activities.api';
import { activityKeys } from '../activity.keys';

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
