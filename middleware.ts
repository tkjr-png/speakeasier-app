import { NextRequest, NextResponse } from 'next/server';

const INVITE_CODE = process.env.INVITE_CODE;
const COOKIE_NAME = 'speakeasier_access';

// Routes that never need a code
const PUBLIC_PATHS = ['/enter', '/api/auth/enter'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Gate is disabled when env var isn't set (local dev without it, Vercel preview)
  if (!INVITE_CODE) return NextResponse.next();

  // Always allow the entry page and the auth endpoint
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Valid cookie = access granted (cookie is sent automatically on all same-origin requests)
  const accessCookie = request.cookies.get(COOKIE_NAME);
  if (accessCookie?.value === INVITE_CODE) return NextResponse.next();

  // API routes without valid cookie → 401
  if (pathname.startsWith('/api/')) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Page routes without valid cookie → redirect to entry
  const url = request.nextUrl.clone();
  url.pathname = '/enter';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
