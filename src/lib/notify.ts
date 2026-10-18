export interface NotificationPayload {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  encrypted?: boolean;
}

export async function sendContactNotification(payload: NotificationPayload): Promise<{
  telegramSent: boolean;
  logged: boolean;
}> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const formattedText = [
    `🛡️ *YANGI XAVFSIZ ALOQA XABARI*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Ism:* ${payload.name}`,
    `📧 *Email:* ${payload.email}`,
    `🏷️ *Yo'nalish:* \`${payload.category}\``,
    `🔐 *PGP Shifrlash:* ${payload.encrypted ? "Ha (PGP Verified)" : "Standart TLS"}`,
    `📌 *Mavzu:* ${payload.subject}`,
    ``,
    `💬 *Xabar:*`,
    payload.message,
  ].join("\n");

  let telegramSent = false;

  if (botToken && chatId) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedText,
          parse_mode: "Markdown",
        }),
      });
      telegramSent = res.ok;
    } catch (error) {
      console.error("Telegram notification error:", error);
    }
  } else {
    console.log("📨 [NOTIFY DISPATCH LOG]:\n", formattedText);
  }

  return {
    telegramSent,
    logged: true,
  };
}
