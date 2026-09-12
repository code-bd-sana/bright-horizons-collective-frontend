import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { AUTH_TOKEN_COOKIE } from '@/lib/auth/token';

export async function GET() {
  const session = await getSession();

  if (!session) {
    const response = NextResponse.json(
      { message: 'Unauthenticated.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
    response.cookies.set({ name: AUTH_TOKEN_COOKIE, value: '', path: '/', maxAge: 0 });
    return response;
  }

  return NextResponse.json(session, { headers: { 'Cache-Control': 'no-store' } });
}
