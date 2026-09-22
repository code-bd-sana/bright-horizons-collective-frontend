import { NextRequest, NextResponse } from 'next/server';
import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { AUTH_TOKEN_COOKIE } from '@/lib/auth/token';

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

export async function DELETE() {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const response = await serverApi.delete('/users/me', {
      headers: authHeaders,
    });
    const data = response.data?.data ?? response.data;
    const res = NextResponse.json(data);
    res.cookies.set({ name: AUTH_TOKEN_COOKIE, value: '', path: '/', maxAge: 0 });
    res.cookies.set({ name: 'bhc_demo_session', value: '', path: '/', maxAge: 0 });
    res.cookies.set({ name: 'auth_token', value: '', path: '/', maxAge: 0 });
    return res;
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to deactivate account.');
  }
}
