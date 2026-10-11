"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Drama } from "@/lib/data";

export function BannerCarousel({ dramas }: { dramas: Drama[] }) {
  const [current, setCurrent] = useState(0);
  const items = dramas.slice(0, 5);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full mb-6 aspect-[16/9] bg-[var(--color-bg-card)] overflow-hidden">
      {items.map((drama, i) => (
        <Link
          key={drama.id}
          href={`/drama/${drama.id}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/banner${i}/800/450`}
            alt={drama.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {drama.genre.map((g) => (
                <span
                  key={g}
                  className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-white/80 backdrop-blur-sm"
                >
                  {g}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2 drop-shadow-lg leading-tight">
              {drama.title}
            </h3>
            <p className="text-xs text-white/70 line-clamp-1 mb-3 max-w-[80%]">
              {drama.synopsis}
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-xs font-semibold shadow-lg shadow-red-900/30">
                <Play size={14} fill="white" />
                Watch Now
              </span>
              <span className="text-[11px] text-white/60">
                {drama.episodes} Episodes
              </span>
            </div>
          </div>
        </Link>
      ))}
      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5 z-20">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setCurrent(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-1.5 bg-[var(--color-accent)]"
                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
