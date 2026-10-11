"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Drama } from "@/lib/data";
import { formatViews } from "@/lib/data";

export function DramaCard({ drama, size = "normal" }: { drama: Drama; size?: "normal" | "large" }) {
  const w = size === "large" ? "w-40" : "w-32";
  const h = size === "large" ? "h-56" : "h-48";

  return (
    <Link href={`/drama/${drama.id}`} className={`${w} shrink-0 group`}>
      <div className={`relative ${h} rounded-xl overflow-hidden bg-[var(--color-bg-card)] mb-2 shadow-lg shadow-black/20`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={drama.poster}
          alt={drama.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute top-2 left-2 bg-[var(--color-accent)]/90 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
          {drama.episodes} EP
        </span>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-semibold text-amber-400">{drama.rating}</span>
          </div>
          <span className="text-[9px] text-white/60">
            {formatViews(drama.views)}
          </span>
        </div>
      </div>
      <p className="text-xs font-medium leading-tight line-clamp-2 text-[var(--color-text-primary)] px-0.5">
        {drama.title}
      </p>
    </Link>
  );
}

export function DramaCardGrid({ drama }: { drama: Drama }) {
  return (
    <Link href={`/drama/${drama.id}`} className="group">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[var(--color-bg-card)] mb-2 shadow-lg shadow-black/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={drama.poster}
          alt={drama.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute top-2 left-2 bg-[var(--color-accent)]/90 text-[10px] font-bold px-2 py-0.5 rounded-md">
          {drama.episodes} EP
        </span>
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span className="text-[10px] font-semibold text-amber-400">{drama.rating}</span>
        </div>
      </div>
      <p className="text-xs font-medium leading-tight line-clamp-2 px-0.5">
        {drama.title}
      </p>
    </Link>
  );
}
