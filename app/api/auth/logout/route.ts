import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE } from '@/lib/auth/token';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set({ name: AUTH_TOKEN_COOKIE, value: '', path: '/', maxAge: 0 });
  response.cookies.set({ name: 'bhc_demo_session', value: '', path: '/', maxAge: 0 });
  response.cookies.set({ name: 'auth_token', value: '', path: '/', maxAge: 0 });
  return response;
}
