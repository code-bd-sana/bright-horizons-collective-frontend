import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_COOKIE, readTokenClaims } from '@/lib/auth/token';
import { mapAuthRole } from '@/services/api/auth/auth.mapper';

export function proxy(request: NextRequest) {
  const claims = readTokenClaims(request.cookies.get(AUTH_TOKEN_COOKIE)?.value);
  const role = claims ? mapAuthRole(claims.role) : null;
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL(role ? '/dashboard' : '/login', request.url));
  }

  if (
    role === 'admin' &&
    pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/dashboard/admin')
  ) {
    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
  }

  if (pathname.startsWith('/dashboard') && !role) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
