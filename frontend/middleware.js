import { NextResponse } from 'next/server';

const COOKIE_NAME = process.env.JWT_SECRET_COOKIE_NAME || 'unimrkt_admin_session';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Protect all /admin routes except the login page
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/auth/login';

    if (!token && !isLoginPage) {
      const loginUrl = new URL('/admin/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (token && isLoginPage) {
      // User is already logged in, redirect to dashboard
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
