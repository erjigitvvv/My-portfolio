import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getAdminSession,
  sessionCookieOptions,
  verifyAdminCredentials,
} from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({
    authenticated: Boolean(session),
    user: session ? { email: session.email, name: session.name, role: session.role } : null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body?.action === "logout") {
      cookies().delete(ADMIN_COOKIE_NAME);
      return NextResponse.json({ ok: true });
    }

    // Brute-force protection: 5 attempts / 10 min per IP.
    const ip = getClientIp(req.headers);
    const limit = rateLimit(`login:${ip}`, 5, 10 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: `Too many attempts. Retry in ${limit.retryAfterSeconds}s.` },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 400 });
    }

    const session = await verifyAdminCredentials(email, password);
    if (!session) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createSessionToken(session);
    cookies().set(ADMIN_COOKIE_NAME, token, sessionCookieOptions);

    return NextResponse.json({
      ok: true,
      user: { email: session.email, name: session.name, role: session.role },
    });
  } catch (error) {
    console.error("Auth route error:", error);
    return NextResponse.json({ ok: false, error: "Authentication error" }, { status: 500 });
  }
}
