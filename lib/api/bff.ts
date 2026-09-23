import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { ZodType } from 'zod';

import { AUTH_TOKEN_COOKIE } from '@/lib/auth/token';

type BackendErrorPayload = {
  message?: string | string[];
};

const SAFE_UPSTREAM_STATUSES = new Set([400, 401, 403, 404, 409, 413, 415, 422, 429]);

export function validateSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');

  if (!origin || origin !== request.nextUrl.origin) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  return null;
}

export function validateMutationContentType(request: NextRequest, expected: 'json' | 'multipart') {
  const invalidOrigin = validateSameOrigin(request);
  if (invalidOrigin) return invalidOrigin;

  const contentType = request.headers.get('content-type') ?? '';
  const supported =
    expected === 'json'
      ? contentType.toLowerCase().includes('application/json')
      : contentType.toLowerCase().startsWith('multipart/form-data;');

  return supported
    ? null
    : NextResponse.json({ message: 'Unsupported request format.' }, { status: 415 });
}

export async function readAuthHeaders() {
  const token = (await cookies()).get(AUTH_TOKEN_COOKIE)?.value;
  return token ? { Authorization: `Bearer ${token}` } : null;
}

export function unauthenticatedResponse() {
  return NextResponse.json(
    { message: 'Unauthenticated.' },
    { status: 401, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function parseJsonRequest<T>(request: NextRequest, schema: ZodType<T>) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return {
      response: NextResponse.json({ message: 'Invalid request body.' }, { status: 400 }),
    } as const;
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      response: NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? 'Invalid request body.' },
        { status: 400 }
      ),
    } as const;
  }

  return { data: parsed.data } as const;
}

export function parseQuery<T>(request: NextRequest, schema: ZodType<T>) {
  const parsed = schema.safeParse(Object.fromEntries(request.nextUrl.searchParams));

  if (!parsed.success) {
    return {
      response: NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? 'Invalid query parameters.' },
        { status: 400 }
      ),
    } as const;
  }

  return { data: parsed.data } as const;
}

export function validatedUpstreamResponse<T>(payload: unknown, schema: ZodType<T>, status = 200) {
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    console.error('validatedUpstreamResponse validation failed:', parsed.error.issues);
    return NextResponse.json(
      { message: 'The upstream service returned an invalid response.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(parsed.data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export function safeBackendErrorResponse(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<BackendErrorPayload>(error) && error.response) {
    const upstreamStatus = error.response.status;
    const status = SAFE_UPSTREAM_STATUSES.has(upstreamStatus) ? upstreamStatus : 502;
    const backendMessage = error.response.data?.message;
    const candidate = Array.isArray(backendMessage) ? backendMessage[0] : backendMessage;
    const message =
      status === upstreamStatus && typeof candidate === 'string' && candidate.length <= 500
        ? candidate
        : fallbackMessage;

    return NextResponse.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
  }

  return NextResponse.json(
    { message: fallbackMessage },
    { status: 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
