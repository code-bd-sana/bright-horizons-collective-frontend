import {
  demoActivities,
  demoParentResources,
  demoPrintables,
  demoSavedActivities,
  demoSavedResources,
  demoSavedTherapyToys,
  demoTherapyToys,
} from '@/features/explore/data/demo-explore-data';
import type { ExploreRepository } from '@/features/explore/api/explore-repository';
import type {
  ExploreCardItem,
  ExploreFilters,
  ExploreItem,
  ExplorePagePayload,
} from '@/features/explore/model/explore-types';

const initialSavedIds = [
  ...demoSavedActivities,
  ...demoSavedResources,
  ...demoSavedTherapyToys,
].map((item) => item.id);

const savedIds = new Set(initialSavedIds);
const savedOnlyItems: ExploreItem[] = [
  ...demoSavedActivities,
  ...demoSavedResources,
  ...demoSavedTherapyToys,
];

function matchesFilters(item: ExploreCardItem, filters: ExploreFilters) {
  return Object.entries(filters).every(([key, selectedValues]) => {
    if (selectedValues.length === 0) return true;
    const itemValues = item.filters[key as keyof ExploreFilters] ?? [];
    return selectedValues.some((value) => itemValues.includes(value));
  });
}

function withSavedState<T extends ExploreCardItem>(item: T): T {
  return { ...item, saved: savedIds.has(item.id) };
}

function itemsForTab(tab: ExplorePagePayload['tab']): ExploreItem[] {
  if (tab === 'activities') return demoActivities;
  if (tab === 'parent-resources') return demoParentResources;
  return demoTherapyToys;
}

function savedKindForTab(tab: ExplorePagePayload['tab'], item: ExploreItem) {
  if (tab === 'activities') return item.kind === 'activity';
  if (tab === 'parent-resources') return item.kind === 'parent-resource';
  return item.kind === 'therapy-toy';
}

export const demoExploreRepository: ExploreRepository = {
  async getPage({ tab, filters }) {
    const catalogItems = itemsForTab(tab);
    const items = catalogItems.filter((item) => matchesFilters(item, filters)).map(withSavedState);
    const savedCandidates = [...savedOnlyItems, ...catalogItems];
    const savedItems = savedCandidates
      .filter((item, index, allItems) => allItems.findIndex(({ id }) => id === item.id) === index)
      .filter((item) => savedKindForTab(tab, item) && savedIds.has(item.id))
      .map(withSavedState);

    return {
      tab,
      items,
      printableItems:
        tab === 'parent-resources'
          ? demoPrintables.filter((item) => matchesFilters(item, filters)).map(withSavedState)
          : [],
      savedItems,
    };
  },

  async setSaved({ itemId, saved }) {
    if (saved) savedIds.add(itemId);
    else savedIds.delete(itemId);
  },
};
