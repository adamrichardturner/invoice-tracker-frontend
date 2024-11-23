// middleware.ts (or middleware.js)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  console.log("Token:", token);

  if (token) {
    // If token exists and user is on an auth page, redirect to home
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Allow access to all other routes
    return NextResponse.next();
  } else {
    // If no token and user is not on an auth page, redirect to /auth/demo
    if (!pathname.startsWith("/auth/demo")) {
      return NextResponse.redirect(new URL("/auth/demo", request.url));
    }
    // Allow access to /auth/demo
    return NextResponse.next();
  }
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
