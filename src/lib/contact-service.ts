import prisma from "./db";
import { contactSchema } from "./validators";
import { sendContactNotification } from "./notify";
import { rateLimit } from "./rate-limit";

export type ContactResult =
  | { ok: true; id?: string; telegramSent?: boolean }
  | { ok: false; error: string; status: number; retryAfterSeconds?: number };

const MIN_FILL_MS = 3000; // humans need more than 3s to write a message
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24; // ignore absurd client timestamps

/**
 * Single entry-point for contact submissions (used by the REST route and the
 * server action) so spam protection cannot be bypassed through the other path.
 */
export async function processContactSubmission(
  input: unknown,
  ip: string
): Promise<ContactResult> {
  // 1) Rate limit BEFORE any parsing / DB work: 3 messages per 10 min per IP,
  //    plus a global ceiling to protect the DB and Telegram from distributed floods.
  const perIp = rateLimit(`contact:${ip}`, 3, 10 * 60 * 1000);
  if (!perIp.allowed) {
    return {
      ok: false,
      status: 429,
      error: "Juda ko'p urinish. Birozdan so'ng qayta urinib ko'ring.",
      retryAfterSeconds: perIp.retryAfterSeconds,
    };
  }
  const global = rateLimit("contact:global", 60, 60 * 60 * 1000);
  if (!global.allowed) {
    return { ok: false, status: 429, error: "Server band. Keyinroq urinib ko'ring.", retryAfterSeconds: global.retryAfterSeconds };
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      error: parsed.error.issues[0]?.message || "Ma'lumotlar xato kiritildi",
    };
  }

  const { website, formStartedAt, ...data } = parsed.data;

  // 2) Honeypot: a bot filled the hidden field. Pretend success, store nothing.
  if (website && website.trim() !== "") {
    return { ok: true };
  }

  // 3) Time trap: submitted impossibly fast after render. Same silent drop.
  if (typeof formStartedAt === "number") {
    const elapsed = Date.now() - formStartedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS && elapsed < MAX_FORM_AGE_MS) {
      return { ok: true };
    }
  }

  const saved = await prisma.contactMessage.create({ data: { ...data, ip } });

  // Notification failure must never lose the message or fail the request.
  const notify = await sendContactNotification(data).catch(() => ({ telegramSent: false, logged: false }));

  return { ok: true, id: saved.id, telegramSent: notify.telegramSent };
}
