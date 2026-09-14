import { NextRequest, NextResponse } from 'next/server';

import {
  parseJsonRequest,
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
  validateSameOrigin,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  therapyToyEnvelopeSchema,
  therapyToyIdSchema,
  updateTherapyToySchema,
} from '@/features/therapy-toys/model/therapy-toy.schemas';

type TherapyToyRouteContext = {
  params: Promise<{ id: string }>;
};

async function readToyId(context: TherapyToyRouteContext) {
  const { id } = await context.params;
  return therapyToyIdSchema.safeParse(id);
}

function invalidIdResponse() {
  return NextResponse.json({ message: 'Invalid therapy toy ID.' }, { status: 400 });
}

export async function GET(_request: NextRequest, context: TherapyToyRouteContext) {
  const id = await readToyId(context);
  if (!id.success) return invalidIdResponse();

  try {
    const response = await serverApi.get(`/therapy-toys/${id.data}`);
    return validatedUpstreamResponse(response.data, therapyToyEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load the therapy toy.');
  }
}

export async function PATCH(request: NextRequest, context: TherapyToyRouteContext) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readToyId(context);
  if (!id.success) return invalidIdResponse();

  const input = await parseJsonRequest(request, updateTherapyToySchema);
  if ('response' in input) return input.response;

  try {
    const response = await serverApi.patch(`/therapy-toys/${id.data}`, input.data, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, therapyToyEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update the therapy toy.');
  }
}

export async function DELETE(request: NextRequest, context: TherapyToyRouteContext) {
  const invalidOrigin = validateSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readToyId(context);
  if (!id.success) return invalidIdResponse();

  try {
    const response = await serverApi.delete(`/therapy-toys/${id.data}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, therapyToyEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to delete the therapy toy.');
  }
}
