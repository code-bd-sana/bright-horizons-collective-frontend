'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  ExploreFilters,
  ExplorePagePayload,
  ExploreTab,
  SaveExploreItemRequest,
} from '@/features/explore/model/explore-types';
import {
  getActivities,
  getActivityFavorites,
  toggleActivityFavorite,
} from '@/features/activities/api/activities.api';
import { mapActivityToExploreItem } from '@/features/activities/model/activity.mapper';
import {
  getTherapyToyFavorites,
  getTherapyToys,
  toggleTherapyToyFavorite,
} from '@/features/therapy-toys/api/therapy-toys.api';
import { mapTherapyToyToExploreItem } from '@/features/therapy-toys/model/therapy-toy.mapper';
import {
  getParentResources,
  getParentResourceFavorites,
  toggleParentResourceFavorite,
  mapParentResourceToExploreItem,
  mapParentResourceToPrintableItem,
} from '@/features/parent-resources';

type SaveMutationContext = {
  previousOverride?: boolean;
};

export function useExploreCatalog(tab: ExploreTab, filters: ExploreFilters) {
  const queryClient = useQueryClient();
  const [savedOverrides, setSavedOverrides] = useState<Record<string, boolean>>({});

  const activitiesQuery = useQuery({
    queryKey: ['activities', 'public', 'dashboard'],
    queryFn: () => getActivities({ limit: 100 }),
    enabled: tab === 'activities',
  });

  const activityFavoritesQuery = useQuery({
    queryKey: ['activities', 'favorites'],
    queryFn: getActivityFavorites,
    enabled: tab === 'activities',
  });

  const therapyToysQuery = useQuery({
    queryKey: ['therapy-toys', 'public', 'dashboard'],
    queryFn: () => getTherapyToys({ limit: 100 }),
    enabled: tab === 'therapy-toys',
  });

  const therapyToyFavoritesQuery = useQuery({
    queryKey: ['therapy-toys', 'favorites'],
    queryFn: getTherapyToyFavorites,
    enabled: tab === 'therapy-toys',
  });

  const parentResourcesQuery = useQuery({
    queryKey: ['parent-resources', 'public', 'dashboard'],
    queryFn: () => getParentResources({ limit: 100, status: 'PUBLISHED' }),
    enabled: tab === 'parent-resources',
  });

  const parentResourceFavoritesQuery = useQuery({
    queryKey: ['parent-resources', 'favorites'],
    queryFn: getParentResourceFavorites,
    enabled: tab === 'parent-resources',
  });

  const activityData = useMemo<ExplorePagePayload | undefined>(() => {
    if (tab !== 'activities' || !activitiesQuery.data) return undefined;

    const savedIds = new Set(
      (activityFavoritesQuery.data?.activityIds ?? []).filter((id) => savedOverrides[id] !== false)
    );
    for (const [id, saved] of Object.entries(savedOverrides)) {
      if (saved) savedIds.add(id);
      else savedIds.delete(id);
    }

    const allMapped = (activitiesQuery.data.data ?? []).map((activity) =>
      mapActivityToExploreItem(activity, savedIds.has(activity.id))
    );
    const items = allMapped.filter((item) =>
      (Object.entries(filters) as [keyof ExploreFilters, string[]][]).every(
        ([key, selected]) =>
          !selected.length || selected.some((value) => item.filters[key]?.includes(value))
      )
    );
    const savedItems = allMapped.filter((item) => item.saved);

    return {
      tab,
      items,
      printableItems: [],
      savedItems,
    };
  }, [activitiesQuery.data, activityFavoritesQuery.data, filters, savedOverrides, tab]);

  const therapyToyData = useMemo<ExplorePagePayload | undefined>(() => {
    if (tab !== 'therapy-toys' || !therapyToysQuery.data) return undefined;
    const savedIds = new Set(
      (therapyToyFavoritesQuery.data?.toyIds ?? []).filter((id) => savedOverrides[id] !== false)
    );
    for (const [id, saved] of Object.entries(savedOverrides)) {
      if (saved) savedIds.add(id);
      else savedIds.delete(id);
    }

    const allMapped = therapyToysQuery.data.items.map((toy) =>
      mapTherapyToyToExploreItem(toy, savedIds.has(toy.id))
    );
    const items = allMapped.filter((item) =>
      (Object.entries(filters) as [keyof ExploreFilters, string[]][]).every(
        ([key, selected]) =>
          !selected.length || selected.some((value) => item.filters[key]?.includes(value))
      )
    );
    const savedItems = allMapped.filter((item) => item.saved);

    return { tab, items, printableItems: [], savedItems };
  }, [filters, savedOverrides, tab, therapyToyFavoritesQuery.data, therapyToysQuery.data]);

  const parentResourceData = useMemo<ExplorePagePayload | undefined>(() => {
    if (tab !== 'parent-resources' || !parentResourcesQuery.data) return undefined;

    const savedIds = new Set(
      (parentResourceFavoritesQuery.data?.resourceIds ?? []).filter(
        (id) => savedOverrides[id] !== false
      )
    );
    for (const [id, saved] of Object.entries(savedOverrides)) {
      if (saved) savedIds.add(id);
      else savedIds.delete(id);
    }

    const rawResources = parentResourcesQuery.data.data ?? [];
    // Only published/active cards
    const publishedResources = rawResources.filter((r) => r.status === 'PUBLISHED');

    const allMapped = publishedResources.map((resource) =>
      mapParentResourceToExploreItem(resource, savedIds.has(resource.id))
    );

    const items = allMapped.filter((item) =>
      (Object.entries(filters) as [keyof ExploreFilters, string[]][]).every(
        ([key, selected]) =>
          !selected.length || selected.some((value) => item.filters[key]?.includes(value))
      )
    );

    const printableItems = publishedResources
      .filter((r) => r.resourceType === 'PRINTABLE' || (r.attachments && r.attachments.length > 0))
      .map((resource) => mapParentResourceToPrintableItem(resource, savedIds.has(resource.id)))
      .filter((item) =>
        (Object.entries(filters) as [keyof ExploreFilters, string[]][]).every(
          ([key, selected]) =>
            !selected.length || selected.some((value) => item.filters[key]?.includes(value))
        )
      );

    const savedItems = allMapped.filter((item) => item.saved);

    return {
      tab,
      items,
      printableItems,
      savedItems,
    };
  }, [filters, parentResourceFavoritesQuery.data, parentResourcesQuery.data, savedOverrides, tab]);

  const saveMutation = useMutation<
    { status: string; type: string },
    Error,
    SaveExploreItemRequest,
    SaveMutationContext
  >({
    mutationFn: async (request) => {
      if (tab === 'activities') return toggleActivityFavorite(request.itemId);
      if (tab === 'therapy-toys') return toggleTherapyToyFavorite(request.itemId);
      if (tab === 'parent-resources') return toggleParentResourceFavorite(request.itemId);
      return { status: request.saved ? 'favorited' : 'unfavorited', type: 'resource' };
    },
    onMutate: async (request): Promise<SaveMutationContext> => {
      const previous = savedOverrides[request.itemId];
      setSavedOverrides((current) => ({ ...current, [request.itemId]: request.saved }));
      return { previousOverride: previous };
    },
    onError: (_error, request, context) => {
      setSavedOverrides((current) => {
        const next = { ...current };
        if (context?.previousOverride === undefined) delete next[request.itemId];
        else next[request.itemId] = context.previousOverride;
        return next;
      });
    },
    onSettled: () => {
      if (tab === 'activities') {
        queryClient.invalidateQueries({ queryKey: ['activities', 'favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.invalidateQueries({ queryKey: ['activities'] });
      } else if (tab === 'therapy-toys') {
        queryClient.invalidateQueries({ queryKey: ['therapy-toys', 'favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
      } else if (tab === 'parent-resources') {
        queryClient.invalidateQueries({ queryKey: ['parent-resources', 'favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
        queryClient.invalidateQueries({ queryKey: ['parent-resources'] });
      }
    },
  });

  return {
    data:
      tab === 'activities'
        ? activityData
        : tab === 'therapy-toys'
          ? therapyToyData
          : tab === 'parent-resources'
            ? parentResourceData
            : undefined,
    isLoading:
      tab === 'activities'
        ? activitiesQuery.isLoading
        : tab === 'therapy-toys'
          ? therapyToysQuery.isLoading
          : tab === 'parent-resources'
            ? parentResourcesQuery.isLoading
            : false,
    isError:
      tab === 'activities'
        ? activitiesQuery.isError
        : tab === 'therapy-toys'
          ? therapyToysQuery.isError
          : tab === 'parent-resources'
            ? parentResourcesQuery.isError
            : false,
    setSaved: saveMutation.mutate,
    savingItemId: saveMutation.isPending ? (saveMutation.variables?.itemId ?? null) : null,
  };
}
