export interface NotificationPayload {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  encrypted?: boolean;
}

/** Escape user-controlled text for Telegram's HTML parse mode. */
export function escapeHtml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function truncate(input: string, max: number): string {
  return input.length > max ? `${input.slice(0, max - 1)}\u2026` : input;
}

export function buildTelegramMessage(payload: NotificationPayload): string {
  // HTML mode + escaping: user text containing * _ [ ] ` can no longer break
  // entity parsing (the old Markdown mode answered 400 and silently dropped the alert).
  return [
    `\u{1F6E1}\uFE0F <b>YANGI XAVFSIZ ALOQA XABARI</b>`,
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
    `\u{1F464} <b>Ism:</b> ${escapeHtml(truncate(payload.name, 100))}`,
    `\u{1F4E7} <b>Email:</b> ${escapeHtml(truncate(payload.email, 200))}`,
    `\u{1F3F7}\uFE0F <b>Yo'nalish:</b> <code>${escapeHtml(payload.category)}</code>`,
    `\u{1F510} <b>PGP Shifrlash:</b> ${payload.encrypted ? "Ha (PGP Verified)" : "Standart TLS"}`,
    `\u{1F4CC} <b>Mavzu:</b> ${escapeHtml(truncate(payload.subject, 200))}`,
    ``,
    `\u{1F4AC} <b>Xabar:</b>`,
    escapeHtml(truncate(payload.message, 3000)), // Telegram hard limit is 4096 chars
  ].join("\n");
}

export async function sendContactNotification(payload: NotificationPayload): Promise<{
  telegramSent: boolean;
  logged: boolean;
}> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const text = buildTelegramMessage(payload);

  let telegramSent = false;

  if (botToken && chatId) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(8000),
      });
      telegramSent = res.ok;
      if (!res.ok) {
        // Never fail silently again: surface Telegram's reason in the server log.
        console.error("Telegram sendMessage failed:", res.status, await res.text());
      }
    } catch (error) {
      console.error("Telegram notification error:", error);
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.log("[NOTIFY DISPATCH LOG]:\n", text);
  }

  return { telegramSent, logged: true };
}
