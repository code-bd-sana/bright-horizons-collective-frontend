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
  activityIdSchema,
  backendActivityEnvelopeSchema,
  updateActivitySchema,
} from '@/features/activities/model/activity.schemas';

type AdminActivityRouteContext = {
  params: Promise<{ id: string }>;
};

async function readActivityId(context: AdminActivityRouteContext) {
  const { id } = await context.params;
  return activityIdSchema.safeParse(id);
}

function invalidIdResponse() {
  return NextResponse.json({ message: 'Invalid activity ID.' }, { status: 400 });
}

export async function GET(_request: NextRequest, context: AdminActivityRouteContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readActivityId(context);
  if (!id.success) return invalidIdResponse();

  try {
    const response = await serverApi.get(`/activities/admin/${id.data}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendActivityEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to load the activity.');
  }
}

export async function PATCH(request: NextRequest, context: AdminActivityRouteContext) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readActivityId(context);
  if (!id.success) return invalidIdResponse();

  const input = await parseJsonRequest(request, updateActivitySchema);
  if ('response' in input) return input.response;

  try {
    const response = await serverApi.patch(`/activities/${id.data}`, input.data, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendActivityEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update the activity.');
  }
}

export async function DELETE(_request: NextRequest, context: AdminActivityRouteContext) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const id = await readActivityId(context);
  if (!id.success) return invalidIdResponse();

  try {
    const response = await serverApi.delete(`/activities/${id.data}`, {
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, backendActivityEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to delete the activity.');
  }
}
