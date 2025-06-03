import { auth } from '@/auth';
import { NextResponse, NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login'];
const PROTECTED_ROUTES = ['/dashboard'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth();

  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;

  // 1. 로그인한 사용자가 공개 경로(로그인 페이지 등)에 접근하면 대시보드로 리다이렉트
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      normalizedPath.startsWith(`${route}/`) ||
      normalizedPath === `${route}/` ||
      pathname === route,
  );

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 2. 로그인하지 않은 사용자가 보호된 경로에 접근하면 로그인으로 리다이렉트
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) =>
      normalizedPath.startsWith(`${route}/`) ||
      normalizedPath === `${route}/` ||
      pathname === route,
  );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3. 공개 또는 보호된 라우트가 아니면 로그인 페이지로 리다이렉트
  if (!isProtectedRoute && !isPublicRoute) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 다른 모든 경로는 정상 처리
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs',
};
