import { NextRequest } from 'next/server';
import { z } from 'zod';

import {
  parseQuery,
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  backendParentResourcesListEnvelopeSchema,
  backendParentResourceEnvelopeSchema,
} from '@/features/parent-resources/model/parent-resource.schemas';

const parentResourceFiltersSchema = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).default(10).optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  accessLevel: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const query = parseQuery(request, parentResourceFiltersSchema);
  if ('response' in query) return query.response;

  const authHeaders = await readAuthHeaders();

  try {
    const response = await serverApi.get('/parent-resources', {
      params: query.data,
      headers: authHeaders ?? {},
    });
    return validatedUpstreamResponse(response.data, backendParentResourcesListEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load parent resources.');
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const body = await request.json();
    const response = await serverApi.post('/parent-resources', body, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(
      response.data,
      backendParentResourceEnvelopeSchema,
      response.status
    );
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to create the parent resource.');
  }
}
