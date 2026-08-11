import { NextResponse } from 'next/server';
import { DEMO_SESSION_COOKIE } from '@/lib/demo-session';

export async function POST() {
  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set({ name: DEMO_SESSION_COOKIE, value: '', path: '/', maxAge: 0 });
  response.cookies.set({ name: 'auth_token', value: '', path: '/', maxAge: 0 });
  return response;
}
