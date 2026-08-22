'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { demoExploreRepository } from '@/features/explore/api/demo-explore-repository';
import type {
  ExploreFilters,
  ExploreItem,
  ExplorePagePayload,
  ExploreTab,
  SaveExploreItemRequest,
} from '@/features/explore/model/explore-types';

const exploreQueryRoot = ['dashboard-explore'] as const;

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
  const queryKey = [...exploreQueryRoot, tab, filters] as const;
  const query = useQuery({
    queryKey,
    queryFn: () => demoExploreRepository.getPage({ tab, filters }),
  });
  const saveMutation = useMutation({
    mutationFn: (request: SaveExploreItemRequest) => demoExploreRepository.setSaved(request),
    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: exploreQueryRoot });
      const previous = queryClient.getQueryData<ExplorePagePayload>(queryKey);
      queryClient.setQueryData<ExplorePagePayload>(queryKey, (current) =>
        updateSavedPayload(current, request)
      );
      return { previous };
    },
    onError: (_error, _request, context) => {
      if (context?.previous) queryClient.setQueryData(queryKey, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: exploreQueryRoot }),
  });

  return {
    ...query,
    setSaved: saveMutation.mutate,
    savingItemId: saveMutation.isPending ? saveMutation.variables.itemId : null,
  };
}
