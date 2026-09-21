'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket, updateTicketStatus } from '../api/support.api';
import type { CreateTicketInput, UpdateTicketStatusInput } from '../model/support.types';
import { supportKeys } from '../support.keys';

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTicketInput) => createTicket(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.all });
    },
  });
}

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateTicketStatusInput) => updateTicketStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.all });
    },
  });
}
