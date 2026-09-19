import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { backendMessagesListEnvelopeSchema } from '@/features/messages/model/message.schemas';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id: threadId } = await context.params;
  if (!threadId) {
    return NextResponse.json({ message: 'Invalid thread ID.' }, { status: 400 });
  }

  try {
    const response = await serverApi.get(`/messages/threads/${threadId}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendMessagesListEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load thread messages.');
  }
}
