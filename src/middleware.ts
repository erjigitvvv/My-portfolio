import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "./lib/session";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Admin route protection (/admin/* except /admin/login).
  //    The cookie is cryptographically verified (HMAC signature + expiry);
  //    a merely *present* cookie is never trusted.
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      const res = NextResponse.redirect(loginUrl);
      if (token) res.cookies.delete(ADMIN_COOKIE_NAME); // drop forged/expired cookie
      return res;
    }
    return NextResponse.next();
  }

  // 2. Skip i18n middleware for API, static, SEO routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/projects/") ||
    pathname.startsWith("/resources/") ||
    pathname.includes(".") ||
    pathname === "/rss.xml"
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
