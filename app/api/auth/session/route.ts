import { NextRequest, NextResponse } from 'next/server';
import { DEMO_SESSION_COOKIE, readDemoSession } from '@/lib/demo-session';

export async function GET(request: NextRequest) {
  const session = await readDemoSession(request.cookies.get(DEMO_SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthenticated' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json({ role: session.role }, { headers: { 'Cache-Control': 'no-store' } });
}
