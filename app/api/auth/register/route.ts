import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE, tokenMaxAge } from '@/lib/auth/token';
import { mapAuthUser } from '@/services/api/auth/auth.mapper';
import { backendAuthResponseSchema, registerRequestSchema } from '@/services/api/auth/auth.schemas';
import { serverApi } from '@/services/api/client/server-client';

function backendErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) return null;

  const message = error.response?.data?.message;
  if (Array.isArray(message)) return message[0] ?? null;
  return typeof message === 'string' ? message : null;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ message: 'Unsupported request format.' }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const input = registerRequestSchema.safeParse(body);
  if (!input.success) {
    return NextResponse.json(
      { message: input.error.issues[0]?.message ?? 'Invalid registration details.' },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await serverApi.post('/auth/register', input.data);
    const parsed = backendAuthResponseSchema.parse(backendResponse.data);
    const maxAge = tokenMaxAge(parsed.data.access_token);

    if (!maxAge) {
      return NextResponse.json(
        { message: 'The authentication service returned an invalid session.' },
        { status: 502, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const user = mapAuthUser(parsed.data.user);
    const response = NextResponse.json(
      { user, role: user.role },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );

    response.cookies.set({
      name: AUTH_TOKEN_COOKIE,
      value: parsed.data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      priority: 'high',
      maxAge,
    });
    response.cookies.set({ name: 'bhc_demo_session', value: '', path: '/', maxAge: 0 });
    response.cookies.set({ name: 'auth_token', value: '', path: '/', maxAge: 0 });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const message =
        status >= 500
          ? 'The authentication service is temporarily unavailable.'
          : backendErrorMessage(error) || 'Unable to create your account. Please try again.';

      return NextResponse.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
    }

    return NextResponse.json(
      { message: 'The authentication service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
