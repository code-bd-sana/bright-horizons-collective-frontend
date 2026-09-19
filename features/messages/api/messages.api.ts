import type { ZodType } from 'zod';

import { ApiError, toApiError } from '@/services/api/client/api-error';
import { browserApi } from '@/services/api/client/browser-client';
import {
  backendMessageEnvelopeSchema,
  backendMessagesListEnvelopeSchema,
  backendParentThreadEnvelopeSchema,
  backendThreadsListEnvelopeSchema,
} from '../model/message.schemas';
import type { Message, MessageThread, SendMessageInput } from '../model/message.types';

function parseResponse<T>(schema: ZodType<T>, value: unknown): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    throw new ApiError('The server returned an invalid response.', 502, 'INVALID_RESPONSE');
  }
  return parsed.data;
}

async function handleApiCall<T>(request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (error) {
    throw toApiError(error);
  }
}

export function getParentThread(): Promise<MessageThread> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/messages/parent-thread');
    const envelope = parseResponse(backendParentThreadEnvelopeSchema, response.data);
    return envelope.data as MessageThread;
  });
}

export function getAdminThreads(): Promise<MessageThread[]> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/messages/threads');
    const envelope = parseResponse(backendThreadsListEnvelopeSchema, response.data);
    return envelope.data as MessageThread[];
  });
}

export function getThreadMessages(threadId: string): Promise<Message[]> {
  return handleApiCall(async () => {
    const response = await browserApi.get(`/messages/threads/${threadId}`);
    const envelope = parseResponse(backendMessagesListEnvelopeSchema, response.data);
    return envelope.data as Message[];
  });
}

export function sendMessage(input: SendMessageInput): Promise<Message> {
  return handleApiCall(async () => {
    let response;
    if (input.file) {
      const formData = new FormData();
      if (input.threadId) formData.append('threadId', input.threadId);
      if (input.content) formData.append('content', input.content);
      formData.append('file', input.file);

      response = await browserApi.post('/messages/send', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await browserApi.post('/messages/send', {
        threadId: input.threadId,
        content: input.content,
      });
    }

    const envelope = parseResponse(backendMessageEnvelopeSchema, response.data);
    return envelope.data as Message;
  });
}
