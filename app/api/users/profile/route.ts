import { NextRequest, NextResponse } from 'next/server';
import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function GET() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.get('/users/me', {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to fetch user profile.');
  }
}

export async function PATCH(request: NextRequest) {
  const invalidContent = validateMutationContentType(request, 'json');
  if (invalidContent) return invalidContent;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const body = await request.json();
    const response = await serverApi.patch('/users/me', body, {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    return NextResponse.json(data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to update user profile.');
  }
}
