import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  backendParentResourceEnvelopeSchema,
  parentResourceIdSchema,
} from '@/features/parent-resources/model/parent-resource.schemas';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const parsedId = parentResourceIdSchema.safeParse(id);
  if (!parsedId.success) {
    return NextResponse.json({ message: 'Invalid resource ID.' }, { status: 400 });
  }

  const authHeaders = await readAuthHeaders();

  try {
    const response = await serverApi.get(`/parent-resources/${parsedId.data}`, {
      headers: authHeaders ?? {},
    });
    return validatedUpstreamResponse(response.data, backendParentResourceEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load the parent resource.');
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await context.params;
  const parsedId = parentResourceIdSchema.safeParse(id);
  if (!parsedId.success) {
    return NextResponse.json({ message: 'Invalid resource ID.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const response = await serverApi.patch(`/parent-resources/${parsedId.data}`, body, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(
      response.data,
      backendParentResourceEnvelopeSchema,
      response.status
    );
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update the parent resource.');
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { id } = await context.params;
  const parsedId = parentResourceIdSchema.safeParse(id);
  if (!parsedId.success) {
    return NextResponse.json({ message: 'Invalid resource ID.' }, { status: 400 });
  }

  try {
    const response = await serverApi.delete(`/parent-resources/${parsedId.data}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(
      response.data,
      backendParentResourceEnvelopeSchema,
      response.status
    );
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to delete the parent resource.');
  }
}
