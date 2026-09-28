'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getChildCompletedActivities,
  getChildProfile,
  getChildProfiles,
  getChildProgress,
  getChildRecentActivities,
} from '../api/child-profiles.api';
import { childProfileKeys } from '../child-profile.keys';

export function useChildProfiles() {
  return useQuery({
    queryKey: childProfileKeys.lists(),
    queryFn: getChildProfiles,
  });
}

export function useChildProfile(id: string | undefined | null) {
  return useQuery({
    queryKey: childProfileKeys.detail(id ?? ''),
    queryFn: () => getChildProfile(id!),
    enabled: Boolean(id),
  });
}

export function useChildProgress(id: string | undefined | null) {
  return useQuery({
    queryKey: ['child-progress', id],
    queryFn: () => getChildProgress(id!),
    enabled: Boolean(id),
  });
}

export function useChildCompletedActivities(id: string | undefined | null) {
  return useQuery({
    queryKey: ['child-progress', id, 'completed-activities'],
    queryFn: () => getChildCompletedActivities(id!),
    enabled: Boolean(id),
  });
}

export function useChildRecentActivities(id: string | undefined | null, limit = 5) {
  return useQuery({
    queryKey: ['child-progress', id, 'recent-activities', limit],
    queryFn: () => getChildRecentActivities(id!, limit),
    enabled: Boolean(id),
  });
}
