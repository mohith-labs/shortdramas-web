"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Drama } from "@/lib/data";
import { formatViews } from "@/lib/data";

export function DramaCard({ drama, size = "normal" }: { drama: Drama; size?: "normal" | "large" }) {
  const w = size === "large" ? "w-36" : "w-28";
  const h = size === "large" ? "h-52" : "h-40";

  return (
    <Link href={`/drama/${drama.id}`} className={`${w} shrink-0 group`}>
      <div className={`relative ${h} rounded-lg overflow-hidden bg-[var(--color-bg-card)] mb-1.5`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={drama.poster}
          alt={drama.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-1.5 left-1.5 bg-[var(--color-accent)] text-[10px] font-semibold px-1.5 py-0.5 rounded">
          {drama.episodes} EP
        </span>
        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5">
          <Star size={10} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-medium">{drama.rating}</span>
        </div>
        <span className="absolute bottom-1.5 right-1.5 text-[9px] text-[var(--color-text-secondary)]">
          {formatViews(drama.views)}
        </span>
      </div>
      <p className="text-xs font-medium leading-tight line-clamp-2 text-[var(--color-text-primary)]">
        {drama.title}
      </p>
    </Link>
  );
}

export function DramaCardGrid({ drama }: { drama: Drama }) {
  return (
    <Link href={`/drama/${drama.id}`} className="group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[var(--color-bg-card)] mb-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={drama.poster}
          alt={drama.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-1.5 left-1.5 bg-[var(--color-accent)] text-[10px] font-semibold px-1.5 py-0.5 rounded">
          {drama.episodes} EP
        </span>
        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5">
          <Star size={10} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-medium">{drama.rating}</span>
        </div>
      </div>
      <p className="text-xs font-medium leading-tight line-clamp-2">
        {drama.title}
      </p>
    </Link>
  );
}
