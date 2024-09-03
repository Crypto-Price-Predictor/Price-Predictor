// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    const loginUrl = new URL('/api/auth/signin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// This middleware will run on specific routes
export const config = {
  matcher: '/User/:path*',  // Protecting all routes under '/User'
};
