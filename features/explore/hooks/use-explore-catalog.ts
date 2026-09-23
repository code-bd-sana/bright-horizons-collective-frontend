'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { demoExploreRepository } from '@/features/explore/api/demo-explore-repository';
import type {
  ExploreFilters,
  ExploreItem,
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

const exploreQueryRoot = ['dashboard-explore'] as const;
type SaveMutationContext = {
  previousOverride?: boolean;
  previousPayload?: ExplorePagePayload;
};

function updateSavedPayload(
  payload: ExplorePagePayload | undefined,
  { itemId, saved }: SaveExploreItemRequest
) {
  if (!payload) return payload;

  const sourceItem = [...payload.items, ...payload.savedItems].find(({ id }) => id === itemId);
  const items = payload.items.map((item) =>
    item.id === itemId ? { ...item, saved } : item
  ) as ExploreItem[];
  const savedItems = saved
    ? sourceItem && !payload.savedItems.some(({ id }) => id === itemId)
      ? [...payload.savedItems, { ...sourceItem, saved: true }]
      : payload.savedItems.map((item) => (item.id === itemId ? { ...item, saved: true } : item))
    : payload.savedItems.filter(({ id }) => id !== itemId);

  return { ...payload, items, savedItems };
}

export function useExploreCatalog(tab: ExploreTab, filters: ExploreFilters) {
  const queryClient = useQueryClient();
  const [savedOverrides, setSavedOverrides] = useState<Record<string, boolean>>({});
  const queryKey = [...exploreQueryRoot, tab, filters] as const;

  const query = useQuery({
    queryKey,
    queryFn: () => demoExploreRepository.getPage({ tab, filters }),
    enabled: tab === 'parent-resources',
  });

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

  const favoritesQuery = useQuery({
    queryKey: ['therapy-toys', 'favorites'],
    queryFn: getTherapyToyFavorites,
    enabled: tab === 'therapy-toys',
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
      (favoritesQuery.data?.toyIds ?? []).filter((id) => savedOverrides[id] !== false)
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
  }, [favoritesQuery.data, filters, savedOverrides, tab, therapyToysQuery.data]);

  const saveMutation = useMutation<
    { status: string; type: string },
    Error,
    SaveExploreItemRequest,
    SaveMutationContext
  >({
    mutationFn: async (request) => {
      if (tab === 'activities') return toggleActivityFavorite(request.itemId);
      if (tab === 'therapy-toys') return toggleTherapyToyFavorite(request.itemId);
      await demoExploreRepository.setSaved(request);
      return { status: request.saved ? 'favorited' : 'unfavorited', type: 'resource' };
    },
    onMutate: async (request): Promise<SaveMutationContext> => {
      if (tab === 'activities' || tab === 'therapy-toys') {
        const previous = savedOverrides[request.itemId];
        setSavedOverrides((current) => ({ ...current, [request.itemId]: request.saved }));
        return { previousOverride: previous };
      }
      await queryClient.cancelQueries({ queryKey: exploreQueryRoot });
      const previous = queryClient.getQueryData<ExplorePagePayload>(queryKey);
      queryClient.setQueryData<ExplorePagePayload>(queryKey, (current) =>
        updateSavedPayload(current, request)
      );
      return { previousPayload: previous };
    },
    onError: (_error, request, context) => {
      if (tab === 'activities' || tab === 'therapy-toys') {
        setSavedOverrides((current) => {
          const next = { ...current };
          if (context?.previousOverride === undefined) delete next[request.itemId];
          else next[request.itemId] = context.previousOverride;
          return next;
        });
      } else if (context?.previousPayload)
        queryClient.setQueryData(queryKey, context.previousPayload);
    },
    onSettled: () => {
      if (tab === 'activities') {
        queryClient.invalidateQueries({ queryKey: ['activities', 'favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
      } else if (tab === 'therapy-toys') {
        queryClient.invalidateQueries({ queryKey: ['therapy-toys', 'favorites'] });
        queryClient.invalidateQueries({ queryKey: ['favorites'] });
      } else {
        queryClient.invalidateQueries({ queryKey: exploreQueryRoot });
      }
    },
  });

  return {
    ...query,
    data:
      tab === 'activities' ? activityData : tab === 'therapy-toys' ? therapyToyData : query.data,
    isLoading:
      tab === 'activities'
        ? activitiesQuery.isLoading
        : tab === 'therapy-toys'
          ? therapyToysQuery.isLoading
          : query.isLoading,
    isError:
      tab === 'activities'
        ? activitiesQuery.isError
        : tab === 'therapy-toys'
          ? therapyToysQuery.isError
          : query.isError,
    setSaved: saveMutation.mutate,
    savingItemId: saveMutation.isPending ? (saveMutation.variables?.itemId ?? null) : null,
  };
}
