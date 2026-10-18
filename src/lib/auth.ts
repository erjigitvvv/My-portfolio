import crypto from "crypto";
import { cookies } from "next/headers";
import prisma from "./db";

export const ADMIN_COOKIE_NAME = "cyber_admin_session";

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  issuedAt: number;
}

/**
 * Hash a plaintext password using salted scrypt (Section 8 Security rule).
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${derivedKey}`;
}

/**
 * Constant-time verification of a plaintext password against a stored scrypt hash.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash.startsWith("scrypt$")) {
    return false;
  }
  const parts = storedHash.split("$");
  if (parts.length !== 3) return false;
  const [, salt, keyHex] = parts;
  const keyBuffer = Buffer.from(keyHex, "hex");
  const derivedBuffer = crypto.scryptSync(password, salt, 64);
  if (keyBuffer.length !== derivedBuffer.length) return false;
  return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
}

/**
 * Authenticate the single admin user against the Prisma `User` table.
 */
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<AdminSession | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && verifyPassword(password, user.passwordHash)) {
      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: "SUPERADMIN",
        issuedAt: Date.now(),
      };
    }
  } catch (err) {
    console.error("Auth DB lookup error:", err);
  }

  return null;
}

function getSecret(): string {
  return process.env.AUTH_SECRET || "default-dev-secret-change-in-production";
}

export function createSessionToken(session: AdminSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function parseSessionToken(token: string | undefined): AdminSession | null {
  if (!token || !token.includes(".")) return null;
  try {
    const [payload, sig] = token.split(".");
    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("base64url");
    if (sig !== expectedSig) return null;
    const decoded = Buffer.from(payload, "base64url").toString("utf-8");
    return JSON.parse(decoded) as AdminSession;
  } catch {
    return null;
  }
}

export function getAdminSession(): AdminSession | null {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return parseSessionToken(token);
}
