'use client';

import { useQuery } from '@tanstack/react-query';
import { getChildProfile, getChildProfiles } from '../api/child-profiles.api';
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
