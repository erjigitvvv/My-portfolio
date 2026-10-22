/**
 * Edge-safe session primitives (no Node-only imports) so the very same
 * verification logic can run inside `middleware.ts` (Edge runtime) and in
 * server code (Node runtime, see `auth.ts`).
 *
 * Token format:  base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload))
 */

export const ADMIN_COOKIE_NAME = "cyber_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: string;
  issuedAt: number; // epoch ms
  expiresAt: number; // epoch ms
}

const DEV_FALLBACK_SECRET = "dev-only-insecure-secret-do-not-use-in-production";

export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV === "production") {
    // Fail closed: never sign sessions with a well-known default in production.
    throw new Error("AUTH_SECRET is missing or too short (min 16 chars).");
  }
  return DEV_FALLBACK_SECRET;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecodeToString(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function hmacSha256(message: string, secret: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return new Uint8Array(sig);
}

/** Constant-time string comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function isValidSessionShape(value: unknown): value is AdminSession {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.userId === "string" &&
    typeof s.email === "string" &&
    typeof s.name === "string" &&
    typeof s.role === "string" &&
    typeof s.issuedAt === "number" &&
    typeof s.expiresAt === "number"
  );
}

export async function signSession(session: AdminSession): Promise<string> {
  const payload = base64UrlEncode(new TextEncoder().encode(JSON.stringify(session)));
  const sig = base64UrlEncode(await hmacSha256(payload, getAuthSecret()));
  return `${payload}.${sig}`;
}

/**
 * Cryptographically verifies signature AND expiry. Returns null for any
 * forged, malformed or expired token.
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<AdminSession | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;

  try {
    const expected = base64UrlEncode(await hmacSha256(payload, getAuthSecret()));
    if (!safeEqual(sig, expected)) return null;

    const decoded: unknown = JSON.parse(base64UrlDecodeToString(payload));
    if (!isValidSessionShape(decoded)) return null;
    if (decoded.expiresAt <= Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}
