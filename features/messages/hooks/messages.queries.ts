'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminThreads, getParentThread, getThreadMessages } from '../api/messages.api';
import { messageKeys } from '../message.keys';

export function useParentThread(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: messageKeys.parentThread(),
    queryFn: getParentThread,
    refetchInterval: options?.refetchInterval ?? 3000, // 3s polling for live conversation
  });
}

export function useAdminThreads(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: messageKeys.adminThreads(),
    queryFn: getAdminThreads,
    refetchInterval: options?.refetchInterval ?? 4000, // 4s polling for inbox updates
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
    refetchInterval: options?.refetchInterval ?? 3000,
  });
}

export const useMessageThreads = useAdminThreads;

export function useUnreadMessagesCount(options?: { refetchInterval?: number | false }) {
  const { data: threads = [] } = useAdminThreads({
    refetchInterval: options?.refetchInterval ?? 5000,
  });

  return threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);
}
