import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("connect.sid");

  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/confirm-email",
    "/opengraph-image.png",
  ];

  if (!sessionCookie && !publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
