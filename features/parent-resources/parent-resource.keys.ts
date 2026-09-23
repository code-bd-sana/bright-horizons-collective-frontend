export const parentResourceKeys = {
  all: ['parent-resources'] as const,
  lists: () => [...parentResourceKeys.all, 'list'] as const,
  publicList: (filters: Record<string, unknown> = {}) =>
    [...parentResourceKeys.lists(), 'public', filters] as const,
  adminLists: () => [...parentResourceKeys.lists(), 'admin'] as const,
  adminList: (filters: Record<string, unknown> = {}) =>
    [...parentResourceKeys.adminLists(), filters] as const,
  details: () => [...parentResourceKeys.all, 'detail'] as const,
  detail: (id: string) => [...parentResourceKeys.details(), id] as const,
  adminSummary: () => [...parentResourceKeys.all, 'admin-summary'] as const,
};
