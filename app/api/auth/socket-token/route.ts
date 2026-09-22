import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE } from '@/lib/auth/token';
import { getSession } from '@/lib/auth/session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthenticated.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'No access token found.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(
    { token, user: session.user },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
