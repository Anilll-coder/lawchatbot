// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Paths that should be PUBLIC
const PUBLIC_PATHS = ["/", "/login", "/signup", "/api/auth"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow requests to _next, static, favicon, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Allow public routes without authentication
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // All other routes require authentication
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
