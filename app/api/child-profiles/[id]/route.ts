import { NextRequest, NextResponse } from 'next/server';

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
  childIdSchema,
  updateChildProfileSchema,
} from '@/features/child-profiles/model/child-profile.schemas';

type ChildRouteContext = {
  params: Promise<{ id: string }>;
};

async function readChildId(context: ChildRouteContext) {
  const { id } = await context.params;
  return childIdSchema.safeParse(id);
}

function invalidIdResponse() {
  return NextResponse.json({ message: 'Invalid child profile ID.' }, { status: 400 });
}

export async function GET(_request: NextRequest, context: ChildRouteContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readChildId(context);
  if (!id.success) return invalidIdResponse();

  try {
    const response = await serverApi.get(`/child-profiles/${id.data}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendChildEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load the child profile.');
  }
}

export async function PATCH(request: NextRequest, context: ChildRouteContext) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readChildId(context);
  if (!id.success) return invalidIdResponse();

  const input = await parseJsonRequest(request, updateChildProfileSchema);
  if ('response' in input) return input.response;

  try {
    const response = await serverApi.patch(`/child-profiles/${id.data}`, input.data, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendChildEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update the child profile.');
  }
}

export async function DELETE(_request: NextRequest, context: ChildRouteContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readChildId(context);
  if (!id.success) return invalidIdResponse();

  try {
    const response = await serverApi.delete(`/child-profiles/${id.data}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendChildEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to delete the child profile.');
  }
}
