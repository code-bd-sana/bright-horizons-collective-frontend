import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE, tokenMaxAge } from '@/lib/auth/token';
import { mapAuthUser } from '@/services/api/auth/auth.mapper';
import { backendLoginResponseSchema, loginSchema } from '@/services/api/auth/auth.schemas';
import { serverApi } from '@/services/api/client/server-client';

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function clientKey(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

function rateLimited(request: NextRequest) {
  const key = clientKey(request);
  const current = attempts.get(key);

  if (!current || current.resetAt <= Date.now()) {
    attempts.delete(key);
    return false;
  }

  return current.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(request: NextRequest) {
  const key = clientKey(request);
  const current = attempts.get(key);

  attempts.set(
    key,
    !current || current.resetAt <= Date.now()
      ? { count: 1, resetAt: Date.now() + WINDOW_MS }
      : { ...current, count: current.count + 1 }
  );
}

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

  if (rateLimited(request)) {
    return NextResponse.json(
      { message: 'Too many sign-in attempts. Please try again in 15 minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const input = loginSchema.safeParse(body);
  if (!input.success) {
    return NextResponse.json(
      { message: input.error.issues[0]?.message ?? 'Invalid login details.' },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await serverApi.post('/auth/login', {
      email: input.data.email,
      password: input.data.password,
    });
    const parsed = backendLoginResponseSchema.parse(backendResponse.data);
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
      { headers: { 'Cache-Control': 'no-store' } }
    );

    response.cookies.set({
      name: AUTH_TOKEN_COOKIE,
      value: parsed.data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      priority: 'high',
      ...(input.data.rememberMe ? { maxAge } : {}),
    });
    response.cookies.set({ name: 'bhc_demo_session', value: '', path: '/', maxAge: 0 });
    response.cookies.set({ name: 'auth_token', value: '', path: '/', maxAge: 0 });

    attempts.delete(clientKey(request));
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 401) recordFailedAttempt(request);

      const upstreamMessage = backendErrorMessage(error);
      const message =
        status === 401
          ? upstreamMessage === 'Your account is deactivated. Please contact support to reactivate.'
            ? upstreamMessage
            : 'Invalid email or password.'
          : status === 429
            ? 'Too many sign-in attempts. Please try again later.'
            : status >= 500
              ? 'The authentication service is temporarily unavailable.'
              : upstreamMessage || 'Unable to sign in. Please try again.';

      return NextResponse.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
    }

    return NextResponse.json(
      { message: 'The authentication service is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
