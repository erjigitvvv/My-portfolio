"use client";

import React, { useState } from "react";
import { Heart, Eye, Share2, Check } from "lucide-react";
import { incrementPostReactionAction } from "@/lib/actions";

export function PostReactionBar({
  slug,
  initialViews,
  initialLikes,
}: {
  slug: string;
  initialViews: number;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((l) => l + 1);
    await incrementPostReactionAction(slug, "like");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-slate-900/60 px-5 py-3.5 backdrop-blur-xl font-mono text-xs">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Eye className="h-4 w-4 text-emerald-400" />
          <span>{initialViews} views</span>
        </span>
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 transition ${
            liked
              ? "border-rose-400/50 bg-rose-500/20 text-rose-300"
              : "border-white/15 bg-white/5 text-slate-200 hover:border-rose-400/40 hover:text-rose-300"
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-rose-400 text-rose-400" : ""}`} />
          <span>{likes} Applause</span>
        </button>
      </div>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 text-slate-300 hover:border-emerald-400/40 hover:text-emerald-300"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span>Link Copied</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Article</span>
          </>
        )}
      </button>
    </div>
  );
}
