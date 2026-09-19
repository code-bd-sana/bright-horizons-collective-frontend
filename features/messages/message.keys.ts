export const messageKeys = {
  all: ['messages'] as const,
  parentThread: () => [...messageKeys.all, 'parent-thread'] as const,
  adminThreads: () => [...messageKeys.all, 'admin-threads'] as const,
  threadMessages: (threadId: string) => [...messageKeys.all, 'thread-messages', threadId] as const,
};
