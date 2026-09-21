import type { ZodType } from 'zod';

import { ApiError, toApiError } from '@/services/api/client/api-error';
import { browserApi } from '@/services/api/client/browser-client';
import {
  backendTicketEnvelopeSchema,
  backendTicketsListEnvelopeSchema,
} from '../model/support.schemas';
import type {
  AdminTicketsFilter,
  CreateTicketInput,
  SupportTicket,
  TicketStatus,
} from '../model/support.types';

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

export function createTicket(input: CreateTicketInput): Promise<SupportTicket> {
  return handleApiCall(async () => {
    const response = await browserApi.post('/support/tickets', input);
    const envelope = parseResponse(backendTicketEnvelopeSchema, response.data);
    return envelope.data as SupportTicket;
  });
}

export function getMyTickets(): Promise<SupportTicket[]> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/support/tickets');
    const envelope = parseResponse(backendTicketsListEnvelopeSchema, response.data);
    return envelope.data as SupportTicket[];
  });
}

export function getAdminTickets(filter?: AdminTicketsFilter): Promise<SupportTicket[]> {
  return handleApiCall(async () => {
    const params = new URLSearchParams();
    if (filter?.type) params.set('type', filter.type);
    if (filter?.status) params.set('status', filter.status);

    const queryString = params.toString();
    const url = `/support/admin/tickets${queryString ? `?${queryString}` : ''}`;

    const response = await browserApi.get(url);
    const envelope = parseResponse(backendTicketsListEnvelopeSchema, response.data);
    return envelope.data as SupportTicket[];
  });
}

export function updateTicketStatus(id: string, status: TicketStatus): Promise<SupportTicket> {
  return handleApiCall(async () => {
    const response = await browserApi.patch(`/support/admin/tickets/${id}`, { status });
    const envelope = parseResponse(backendTicketEnvelopeSchema, response.data);
    return envelope.data as SupportTicket;
  });
}
