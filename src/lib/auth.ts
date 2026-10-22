import crypto from "crypto";
import { cookies } from "next/headers";
import prisma from "./db";
import {
  ADMIN_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  signSession,
  verifySessionToken,
  type AdminSession,
} from "./session";

export { ADMIN_COOKIE_NAME, SESSION_TTL_SECONDS };
export type { AdminSession };

/**
 * Hash a plaintext password using salted scrypt.
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
  if (!storedHash.startsWith("scrypt$")) return false;
  const parts = storedHash.split("$");
  if (parts.length !== 3) return false;
  const [, salt, keyHex] = parts;
  const keyBuffer = Buffer.from(keyHex, "hex");
  const derivedBuffer = crypto.scryptSync(password, salt, 64);
  if (keyBuffer.length !== derivedBuffer.length) return false;
  return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
}

// A throw-away hash so that "unknown e-mail" costs the same as "wrong password"
// (prevents user enumeration through response timing).
const DUMMY_HASH = hashPassword(crypto.randomBytes(8).toString("hex"));

/**
 * Authenticate the admin against the Prisma `User` table.
 */
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<AdminSession | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const ok = verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
    if (user && ok) {
      const now = Date.now();
      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        issuedAt: now,
        expiresAt: now + SESSION_TTL_SECONDS * 1000,
      };
    }
  } catch (err) {
    console.error("Auth DB lookup error:", err);
  }
  return null;
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  return signSession(session);
}

/** Cookie options shared by every place that sets the session cookie. */
export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};

/** Reads and cryptographically verifies the current admin session (or null). */
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
