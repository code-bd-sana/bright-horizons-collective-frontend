import { NextRequest, NextResponse } from 'next/server';

import {
  parseJsonRequest,
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validateMutationContentType,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  backendTicketEnvelopeSchema,
  updateTicketStatusSchema,
} from '@/features/support/model/support.schemas';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const invalidContent = validateMutationContentType(request, 'json');
  if (invalidContent) return invalidContent;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id: ticketId } = await context.params;
  if (!ticketId) {
    return NextResponse.json({ message: 'Invalid ticket ID.' }, { status: 400 });
  }

  const { data, response: parseErrorResponse } = await parseJsonRequest(
    request,
    updateTicketStatusSchema
  );
  if (parseErrorResponse) return parseErrorResponse;

  try {
    const response = await serverApi.patch(`/support/admin/tickets/${ticketId}`, data, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendTicketEnvelopeSchema, response.status);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update support ticket status.');
  }
}
