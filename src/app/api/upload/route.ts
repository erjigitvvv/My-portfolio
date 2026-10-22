import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { getAdminSession } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
};

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const ext = ALLOWED[file.type];
    if (!ext) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extension is derived from the validated MIME type, never from the client filename.
    const fileName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ ok: true, url: `/uploads/${fileName}` });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
