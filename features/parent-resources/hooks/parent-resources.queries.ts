import { useQuery } from '@tanstack/react-query';

import {
  getParentResource,
  getParentResources,
  getAdminParentResourceSummary,
  getParentResourceFavorites,
} from '../api/parent-resources.api';
import { parentResourceKeys } from '../parent-resource.keys';

export function useParentResources(
  filters: Record<string, unknown> = {},
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: parentResourceKeys.publicList(filters),
    queryFn: () => getParentResources(filters),
    enabled: options?.enabled ?? true,
  });
}

export function useAdminParentResources(
  filters: Record<string, unknown> = {},
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: parentResourceKeys.adminList(filters),
    queryFn: () => getParentResources(filters),
    enabled: options?.enabled ?? true,
  });
}

export function useParentResource(id: string | undefined | null) {
  return useQuery({
    queryKey: parentResourceKeys.detail(id ?? ''),
    queryFn: () => getParentResource(id!),
    enabled: Boolean(id),
  });
}

export function useAdminParentResourceSummary() {
  return useQuery({
    queryKey: parentResourceKeys.adminSummary(),
    queryFn: getAdminParentResourceSummary,
  });
}

export function useParentResourceFavorites(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [...parentResourceKeys.all, 'favorites'],
    queryFn: getParentResourceFavorites,
    enabled: options?.enabled ?? true,
  });
}
