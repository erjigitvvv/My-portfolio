import React from "react";
import { Calendar, MapPin, Mic, Presentation, Video } from "lucide-react";
import { getSpeakings } from "@/lib/queries";
import { getDictionary, localizeField } from "@/i18n/messages";
import { constructMetadata } from "@/lib/seo";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 3600; // ISR: re-generated hourly or instantly via revalidatePath

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return constructMetadata({
    title: params.locale === "en" ? "Keynotes, Conferences & Workshops" : "Konferensiya va Ma'ruzalar",
    description: "Speaking engagements on AI Security, Zero-Trust Kubernetes, and MLOps.",
    locale: params.locale,
    path: "/speaking",
  });
}

export default async function SpeakingPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const speakings = await getSpeakings();

  return (
    <div className="space-y-10 py-6">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="ai" pulse>
            KEYNOTES & TECHNICAL WORKSHOPS
          </Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            {dict.sections.speakingTitle}
          </h1>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {speakings.map((talk, idx) => {
          const title = localizeField(talk, "title", locale);
          const event = localizeField(talk, "event", locale);
          const desc = localizeField(talk, "description", locale);

          return (
            <ScrollReveal key={talk.id} direction="up" delay={idx * 0.08}>
              <GlassCard
                variant="ai"
                className="flex h-full flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="ai">{talk.type}</Badge>
                    <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-emerald-400" /> {talk.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-violet-400" /> {talk.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/15 text-violet-300">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {title}
                      </h2>
                      <p className="font-mono text-xs font-semibold text-emerald-400 mt-1">
                        {event}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  {talk.slidesUrl && (
                    <a href={talk.slidesUrl} target="_blank" rel="noreferrer">
                      <Button variant="glass" size="sm">
                        <Presentation className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Slides Deck</span>
                      </Button>
                    </a>
                  )}
                  {talk.videoUrl && (
                    <a href={talk.videoUrl} target="_blank" rel="noreferrer">
                      <Button variant="cyber" size="sm">
                        <Video className="h-3.5 w-3.5" />
                        <span>Watch Recording</span>
                      </Button>
                    </a>
                  )}
                </div>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

