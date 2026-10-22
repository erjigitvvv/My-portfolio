/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * NOTE: state lives in the Node process. That is fine for a single instance /
 * `next start`; on serverless (Vercel) each warm lambda has its own window, so
 * swap `store` for Upstash/Redis if strict global limits are required.
 */
type Bucket = { hits: number[] };

const store = new Map<string, Bucket>();
let lastSweep = 0;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup so the map cannot grow without bound.
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    store.forEach((bucket, k) => {
      bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
      if (bucket.hits.length === 0) store.delete(k);
    });
  }

  const bucket = store.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0];
    store.set(key, bucket);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  bucket.hits.push(now);
  store.set(key, bucket);
  return { allowed: true, remaining: limit - bucket.hits.length, retryAfterSeconds: 0 };
}

/** Best-effort client IP from proxy headers. */
export function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}
