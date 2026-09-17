export const activityKeys = {
  all: ['activities'] as const,
  lists: () => [...activityKeys.all, 'list'] as const,
  publicList: (filters: Record<string, unknown> = {}) =>
    [...activityKeys.lists(), 'public', filters] as const,
  adminLists: () => [...activityKeys.lists(), 'admin'] as const,
  adminList: (filters: Record<string, unknown> = {}) =>
    [...activityKeys.adminLists(), filters] as const,
  details: () => [...activityKeys.all, 'detail'] as const,
  detail: (id: string) => [...activityKeys.details(), id] as const,
  adminSummary: () => [...activityKeys.all, 'admin-summary'] as const,
};
