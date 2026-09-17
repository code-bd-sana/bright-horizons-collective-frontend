'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminActivities, getAdminActivitySummary } from '../api/activities.api';
import { activityKeys } from '../activity.keys';

export function useAdminActivities(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: activityKeys.adminList(filters),
    queryFn: () => getAdminActivities(filters),
  });
}

export function useAdminActivitySummary() {
  return useQuery({
    queryKey: activityKeys.adminSummary(),
    queryFn: getAdminActivitySummary,
  });
}
