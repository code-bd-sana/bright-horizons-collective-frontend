'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api/messages.api';
import { messageKeys } from '../message.keys';
import type { SendMessageInput } from '../model/message.types';

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SendMessageInput) => sendMessage(input),
    onSuccess: (_, variables) => {
      // Invalidate relevant query keys so messages update immediately
      queryClient.invalidateQueries({ queryKey: messageKeys.all });
      if (variables.threadId) {
        queryClient.invalidateQueries({
          queryKey: messageKeys.threadMessages(variables.threadId),
        });
      }
    },
  });
}
