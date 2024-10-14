import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  console.log("Middleware is running for this route:", req.url);
  // Get the user's session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token is found, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If token exists, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/User/:path*'], // Protect the /User page and all its sub-routes
};
