import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_COOKIE, readTokenClaims } from '@/lib/auth/token';

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
  const claims = readTokenClaims(token);
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    'x-bhc-dashboard-scope',
    pathname.startsWith('/dashboard/admin') ? 'admin' : 'parent'
  );

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  if (token && !claims) {
    response.cookies.delete(AUTH_TOKEN_COOKIE);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
