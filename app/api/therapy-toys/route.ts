import { NextRequest } from 'next/server';

import {
  parseJsonRequest,
  parseQuery,
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  createTherapyToySchema,
  publicTherapyToyFiltersSchema,
  therapyToyEnvelopeSchema,
  therapyToyPageEnvelopeSchema,
} from '@/features/therapy-toys/model/therapy-toy.schemas';

export async function GET(request: NextRequest) {
  const query = parseQuery(request, publicTherapyToyFiltersSchema);
  if ('response' in query) return query.response;

  try {
    const response = await serverApi.get('/therapy-toys', { params: query.data });
    return validatedUpstreamResponse(response.data, therapyToyPageEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load therapy toys.');
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const input = await parseJsonRequest(request, createTherapyToySchema);
  if ('response' in input) return input.response;

  try {
    const response = await serverApi.post('/therapy-toys', input.data, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, therapyToyEnvelopeSchema, response.status);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to create the therapy toy.');
  }
}
