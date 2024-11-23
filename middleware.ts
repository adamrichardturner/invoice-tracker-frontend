import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log("Token:", token);

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

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth (login/register pages)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
