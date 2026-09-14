import type { AdminTherapyToyFilters, TherapyToyFilters } from './model/therapy-toy.types';

export const therapyToyKeys = {
  all: ['therapy-toys'] as const,
  lists: () => [...therapyToyKeys.all, 'list'] as const,
  publicList: (filters: TherapyToyFilters) =>
    [...therapyToyKeys.lists(), 'public', filters] as const,
  adminLists: () => [...therapyToyKeys.lists(), 'admin'] as const,
  adminList: (filters: AdminTherapyToyFilters) =>
    [...therapyToyKeys.adminLists(), filters] as const,
  details: () => [...therapyToyKeys.all, 'detail'] as const,
  detail: (id: string) => [...therapyToyKeys.details(), id] as const,
  adminSummary: () => [...therapyToyKeys.all, 'admin-summary'] as const,
};
