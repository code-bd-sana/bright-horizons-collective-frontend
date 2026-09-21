import { NextRequest } from 'next/server';

import {
  parseQuery,
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  adminTicketsFilterQuerySchema,
  backendTicketsListEnvelopeSchema,
} from '@/features/support/model/support.schemas';

export async function GET(request: NextRequest) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { data: filter, response: parseErrorResponse } = parseQuery(
    request,
    adminTicketsFilterQuerySchema
  );
  if (parseErrorResponse) return parseErrorResponse;

  try {
    const response = await serverApi.get('/support/admin/tickets', {
      params: filter,
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendTicketsListEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load support tickets.');
  }
}
