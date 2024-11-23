import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If we have a token and we're on the auth page, redirect to home
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to auth routes and static files
  if (pathname.startsWith("/auth") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Redirect to demo page if no token
  if (!token) {
    return NextResponse.redirect(new URL("/auth/demo", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: [
    "/((?!auth|_next/static|_next/image|favicon.ico).*)",
    "/auth/:path*",
  ],
};
