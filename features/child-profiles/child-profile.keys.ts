export const childProfileKeys = {
  all: ['child-profiles'] as const,
  lists: () => [...childProfileKeys.all, 'list'] as const,
  detail: (id: string) => [...childProfileKeys.all, 'detail', id] as const,
};
