import { NextRequest } from 'next/server';

import {
  parseJsonRequest,
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  backendChildEnvelopeSchema,
  backendChildrenListEnvelopeSchema,
  createChildProfileSchema,
} from '@/features/child-profiles/model/child-profile.schemas';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/child-profiles', {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendChildrenListEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load child profiles.');
  }
}

export async function POST(request: NextRequest) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const input = await parseJsonRequest(request, createChildProfileSchema);
  if ('response' in input) return input.response;

  try {
    const response = await serverApi.post('/child-profiles', input.data, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendChildEnvelopeSchema, response.status);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to create the child profile.');
  }
}
