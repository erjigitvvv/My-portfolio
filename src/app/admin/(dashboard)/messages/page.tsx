import React from "react";
import { CheckCircle2, Trash2, Lock } from "lucide-react";
import { getContactMessages } from "@/lib/queries";
import { markMessageReadAction, deleteMessageAction } from "@/lib/actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-6">
      <GlassCard variant="cyber" padding="lg">
        <h1 className="text-xl font-bold text-white font-mono">
          Encrypted Contact Dispatches ({messages.length})
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Kelgan barcha xabarlar bazada saqlanadi va Telegram Bot orqali yuboriladi.
        </p>
      </GlassCard>

      <div className="space-y-4">
        {messages.map((msg) => (
          <GlassCard
            key={msg.id}
            variant={msg.isRead ? "default" : "cyber"}
            padding="md"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white">{msg.name}</span>
                  <span className="font-mono text-xs text-emerald-400">
                    &lt;{msg.email}&gt;
                  </span>
                  <Badge variant={msg.isRead ? "default" : "live"} pulse={!msg.isRead}>
                    {msg.isRead ? "READ" : "NEW"}
                  </Badge>
                  <Badge variant="ai">{msg.category}</Badge>
                  {msg.encrypted && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-300">
                      <Lock className="h-3 w-3" /> TLS/PGP
                    </span>
                  )}
                </div>

                <p className="font-semibold text-sm text-slate-100">
                  {msg.subject}
                </p>
                <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                  {msg.message}
                </p>
                <p className="font-mono text-[11px] text-slate-500">
                  Received: {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!msg.isRead && (
                  <form
                    action={async () => {
                      "use server";
                      await markMessageReadAction(msg.id);
                    }}
                  >
                    <Button type="submit" variant="cyber" size="sm">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Mark Read</span>
                    </Button>
                  </form>
                )}
                <form
                  action={async () => {
                    "use server";
                    await deleteMessageAction(msg.id);
                  }}
                >
                  <Button type="submit" variant="danger" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
