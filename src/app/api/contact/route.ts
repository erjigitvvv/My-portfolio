import { NextRequest, NextResponse } from "next/server";
import { processContactSubmission } from "@/lib/contact-service";
import { getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await processContactSubmission(body, getClientIp(req.headers));

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        {
          status: result.status,
          headers: result.retryAfterSeconds
            ? { "Retry-After": String(result.retryAfterSeconds) }
            : undefined,
        }
      );
    }
    return NextResponse.json({ ok: true, id: result.id, telegramSent: result.telegramSent ?? false });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ ok: false, error: "Server error processing message" }, { status: 500 });
  }
}
