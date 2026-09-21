'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminTickets, getMyTickets } from '../api/support.api';
import type { AdminTicketsFilter } from '../model/support.types';
import { supportKeys } from '../support.keys';

export function useMyTickets(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: supportKeys.myTickets(),
    queryFn: getMyTickets,
    refetchInterval: options?.refetchInterval,
  });
}

export function useAdminTickets(
  filter?: AdminTicketsFilter,
  options?: { refetchInterval?: number | false }
) {
  return useQuery({
    queryKey: supportKeys.adminTickets(filter),
    queryFn: () => getAdminTickets(filter),
    refetchInterval: options?.refetchInterval,
  });
}
