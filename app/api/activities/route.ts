import { NextRequest } from 'next/server';

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
  backendActivitiesListEnvelopeSchema,
  backendActivityEnvelopeSchema,
} from '@/features/activities/model/activity.schemas';
import { z } from 'zod';

const publicActivityFiltersSchema = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).default(10).optional(),
  search: z.string().optional(),
  developmentCategory: z.string().optional(),
  difficultyLevel: z.string().optional(),
  status: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const query = parseQuery(request, publicActivityFiltersSchema);
  if ('response' in query) return query.response;

  try {
    const response = await serverApi.get('/activities', { params: query.data });
    return validatedUpstreamResponse(response.data, backendActivitiesListEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load activities.');
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const body = await request.json();
    const response = await serverApi.post('/activities', body, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendActivityEnvelopeSchema, response.status);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to create the activity.');
  }
}
