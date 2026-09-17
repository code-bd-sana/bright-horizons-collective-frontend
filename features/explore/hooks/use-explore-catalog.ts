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
  getTherapyToyFavorites,
  getTherapyToys,
  toggleTherapyToyFavorite,
} from '@/features/therapy-toys/api/therapy-toys.api';
import { mapTherapyToyToExploreItem } from '@/features/therapy-toys/model/therapy-toy.mapper';
import type { TherapyToyFavoriteResult } from '@/features/therapy-toys/model/therapy-toy.types';

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
  const therapyToyData = useMemo<ExplorePagePayload | undefined>(() => {
    if (tab !== 'therapy-toys' || !therapyToysQuery.data) return undefined;
    const savedIds = new Set(
      (favoritesQuery.data?.toyIds ?? []).filter((id) => savedOverrides[id] !== false)
    );
    for (const [id, saved] of Object.entries(savedOverrides)) {
      if (saved) savedIds.add(id);
      else savedIds.delete(id);
    }

    const items = therapyToysQuery.data.items
      .map((toy) => mapTherapyToyToExploreItem(toy, savedIds.has(toy.id)))
      .filter((item) =>
        (Object.entries(filters) as [keyof ExploreFilters, string[]][]).every(
          ([key, selected]) =>
            !selected.length || selected.some((value) => item.filters[key]?.includes(value))
        )
      );
    return { tab, items, printableItems: [], savedItems: items.filter((item) => item.saved) };
  }, [favoritesQuery.data, filters, savedOverrides, tab, therapyToysQuery.data]);
  const saveMutation = useMutation<
    TherapyToyFavoriteResult,
    Error,
    SaveExploreItemRequest,
    SaveMutationContext
  >({
    mutationFn: async (request) => {
      if (tab === 'therapy-toys') return toggleTherapyToyFavorite(request.itemId);
      await demoExploreRepository.setSaved(request);
      return { status: request.saved ? 'favorited' : 'unfavorited', type: 'toy' };
    },
    onMutate: async (request): Promise<SaveMutationContext> => {
      if (tab === 'therapy-toys') {
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
      if (tab === 'therapy-toys') {
        setSavedOverrides((current) => {
          const next = { ...current };
          if (context?.previousOverride === undefined) delete next[request.itemId];
          else next[request.itemId] = context.previousOverride;
          return next;
        });
      } else if (context?.previousPayload)
        queryClient.setQueryData(queryKey, context.previousPayload);
    },
    onSettled: () =>
      tab === 'therapy-toys'
        ? queryClient.invalidateQueries({ queryKey: ['therapy-toys', 'favorites'] })
        : queryClient.invalidateQueries({ queryKey: exploreQueryRoot }),
  });

  return {
    ...query,
    data: tab === 'therapy-toys' ? therapyToyData : query.data,
    isLoading: tab === 'therapy-toys' ? therapyToysQuery.isLoading : query.isLoading,
    isError: tab === 'therapy-toys' ? therapyToysQuery.isError : query.isError,
    setSaved: saveMutation.mutate,
    savingItemId: saveMutation.isPending ? (saveMutation.variables?.itemId ?? null) : null,
  };
}
