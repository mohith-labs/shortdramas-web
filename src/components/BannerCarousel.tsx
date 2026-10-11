"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Drama } from "@/lib/data";

export function BannerCarousel({ dramas }: { dramas: Drama[] }) {
  const [current, setCurrent] = useState(0);
  const items = dramas.slice(0, 5);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative mx-4 mb-6 rounded-xl overflow-hidden aspect-[16/9] bg-[var(--color-bg-card)]">
      {items.map((drama, i) => (
        <Link
          key={drama.id}
          href={`/drama/${drama.id}`}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/banner${i}/800/450`}
            alt={drama.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-bold mb-1 drop-shadow-lg">{drama.title}</h3>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <span className="bg-[var(--color-accent)] text-white px-1.5 py-0.5 rounded text-[10px] font-semibold">
                {drama.episodes} Episodes
              </span>
              <span>{drama.genre.join(" · ")}</span>
            </div>
          </div>
        </Link>
      ))}
      {/* Dots */}
      <div className="absolute bottom-2 right-4 flex gap-1 z-20">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setCurrent(i);
            }}
            className={`h-1 rounded-full transition-all ${
              i === current ? "w-4 bg-[var(--color-accent)]" : "w-1 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
