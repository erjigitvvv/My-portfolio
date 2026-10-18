import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { contactSchema } from "@/lib/validators";
import { sendContactNotification } from "@/lib/notify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Validation error",
        },
        { status: 400 }
      );
    }

    const saved = await prisma.contactMessage.create({
      data: parsed.data,
    });

    const notifyResult = await sendContactNotification(parsed.data);

    return NextResponse.json({
      ok: true,
      id: saved.id,
      telegramSent: notifyResult.telegramSent,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, error: "Server error processing message" },
      { status: 500 }
    );
  }
}
