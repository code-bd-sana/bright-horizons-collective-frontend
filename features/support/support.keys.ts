import type { AdminTicketsFilter } from './model/support.types';

export const supportKeys = {
  all: ['support'] as const,
  myTickets: () => [...supportKeys.all, 'my-tickets'] as const,
  adminTickets: (filter?: AdminTicketsFilter) =>
    [...supportKeys.all, 'admin-tickets', filter] as const,
};
