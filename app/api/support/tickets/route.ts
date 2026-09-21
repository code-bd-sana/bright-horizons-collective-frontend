import { NextRequest } from 'next/server';

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
  backendTicketsListEnvelopeSchema,
  createTicketSchema,
} from '@/features/support/model/support.schemas';

export async function POST(request: NextRequest) {
  const invalidContent = validateMutationContentType(request, 'json');
  if (invalidContent) return invalidContent;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { data, response: parseErrorResponse } = await parseJsonRequest(
    request,
    createTicketSchema
  );
  if (parseErrorResponse) return parseErrorResponse;

  try {
    const response = await serverApi.post('/support/tickets', data, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendTicketEnvelopeSchema, response.status);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to create support ticket.');
  }
}

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/support/tickets', {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendTicketsListEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load support tickets.');
  }
}
