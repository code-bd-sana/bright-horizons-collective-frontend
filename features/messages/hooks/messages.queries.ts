'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminThreads, getParentThread, getThreadMessages } from '../api/messages.api';
import { messageKeys } from '../message.keys';

export function useParentThread(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: messageKeys.parentThread(),
    queryFn: getParentThread,
    refetchInterval: options?.refetchInterval ?? false,
  });
}

export function useAdminThreads(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: messageKeys.adminThreads(),
    queryFn: getAdminThreads,
    refetchInterval: options?.refetchInterval ?? false,
  });
}

export function useThreadMessages(
  threadId: string | null | undefined,
  options?: { refetchInterval?: number | false }
) {
  return useQuery({
    queryKey: messageKeys.threadMessages(threadId ?? ''),
    queryFn: () => getThreadMessages(threadId!),
    enabled: Boolean(threadId),
    refetchInterval: options?.refetchInterval ?? false,
  });
}

export const useMessageThreads = useAdminThreads;

export function useUnreadMessagesCount(options?: { refetchInterval?: number | false }) {
  const { data: threads = [] } = useAdminThreads({
    refetchInterval: options?.refetchInterval ?? false,
  });

  return threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);
}
