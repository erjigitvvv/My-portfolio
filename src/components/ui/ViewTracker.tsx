"use client";

import { useEffect } from "react";
import { incrementPostReactionAction, incrementProjectViewAction } from "@/lib/actions";

/**
 * Counts a page view from the browser (once per tab session) instead of during
 * server render. This keeps the detail pages cacheable (ISR) and stops
 * crawlers / prefetches from inflating the counters.
 */
export function ViewTracker({ kind, slug }: { kind: "post" | "project"; slug: string }) {
  useEffect(() => {
    const key = `viewed:${kind}:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: still count once per mount */
    }
    if (kind === "post") void incrementPostReactionAction(slug, "view");
    else void incrementProjectViewAction(slug);
  }, [kind, slug]);

  return null;
}
