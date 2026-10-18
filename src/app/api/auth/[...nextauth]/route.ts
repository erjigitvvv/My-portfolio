import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const session = getAdminSession();
  return NextResponse.json({
    authenticated: Boolean(session),
    user: session,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, action } = body;

    if (action === "logout") {
      cookies().delete(ADMIN_COOKIE_NAME);
      return NextResponse.json({ ok: true });
    }

    const session = await verifyAdminCredentials(email, password);
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createSessionToken(session);
    cookies().set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true, user: session });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Authentication error" },
      { status: 500 }
    );
  }
}
