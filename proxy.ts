import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEMO_SESSION_COOKIE, readDemoSession } from '@/lib/demo-session';
import { getRoleConfig } from '@/lib/role-config';

export async function proxy(request: NextRequest) {
  const session = await readDemoSession(request.cookies.get(DEMO_SESSION_COOKIE)?.value);
  const isAuthenticated = Boolean(session);
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/dashboard/admin') && session?.role !== 'admin') {
    return NextResponse.redirect(new URL(session ? '/dashboard' : '/login', request.url));
  }

  if (
    session?.role === 'admin' &&
    pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/dashboard/admin')
  ) {
    return NextResponse.redirect(new URL(getRoleConfig('admin').homePath, request.url));
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register') ||
    request.nextUrl.pathname.startsWith('/forgot-password')
  ) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(getRoleConfig(session?.role).homePath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password', '/api/auth/:path*'],
};
