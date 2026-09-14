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
  adminTherapyToyFiltersSchema,
  therapyToyPageEnvelopeSchema,
} from '@/features/therapy-toys/model/therapy-toy.schemas';

export async function GET(request: NextRequest) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const query = parseQuery(request, adminTherapyToyFiltersSchema);
  if ('response' in query) return query.response;

  try {
    const response = await serverApi.get('/therapy-toys/admin', {
      params: query.data,
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, therapyToyPageEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load therapy toys.');
  }
}
