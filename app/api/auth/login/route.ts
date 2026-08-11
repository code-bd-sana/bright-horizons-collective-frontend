import { NextRequest, NextResponse } from 'next/server';
import { authenticateDemoAccount } from '@/lib/demo-accounts';
import {
  createDemoSession,
  DEMO_SESSION_COOKIE,
  DEMO_SESSION_MAX_AGE,
  DEMO_SESSION_REMEMBER_MAX_AGE,
} from '@/lib/demo-session';

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function clientKey(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

function rateLimited(request: NextRequest) {
  const key = clientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) return false;
  return current.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(request: NextRequest) {
  const key = clientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  attempts.set(key, { ...current, count: current.count + 1 });
}

function clearAttempts(request: NextRequest) {
  attempts.delete(clientKey(request));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported request format.' }, { status: 415 });
  }

  if (rateLimited(request)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again in 15 minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { email, password, rememberMe } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    email.length > 254 ||
    password.length > 128
  ) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
  }

  const role = authenticateDemoAccount(email, password);
  if (!role) {
    recordFailedAttempt(request);
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const maxAge = rememberMe === true ? DEMO_SESSION_REMEMBER_MAX_AGE : DEMO_SESSION_MAX_AGE;
  const response = NextResponse.json({ role }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set({
    name: DEMO_SESSION_COOKIE,
    value: await createDemoSession(role, maxAge),
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  });
  response.cookies.set({ name: 'auth_token', value: '', path: '/', maxAge: 0 });
  clearAttempts(request);
  return response;
}
