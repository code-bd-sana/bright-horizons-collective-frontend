import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validateMutationContentType,
  validateSameOrigin,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

type CompleteActivityRouteContext = {
  params: Promise<{ childId: string }>;
};

export async function POST(request: NextRequest, context: CompleteActivityRouteContext) {
  const invalidOrigin = validateSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  const invalidContentType = validateMutationContentType(request, 'json');
  if (invalidContentType) return invalidContentType;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const { childId } = await context.params;
  if (!childId) {
    return NextResponse.json({ message: 'Child ID is required.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const response = await serverApi.post(`/child-progress/${childId}/complete-activity`, body, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to submit activity completion.');
  }
}
