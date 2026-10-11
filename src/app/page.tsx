"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { BannerCarousel } from "@/components/BannerCarousel";
import { HorizontalSection } from "@/components/HorizontalSection";
import { dramas } from "@/lib/data";
import { useApp } from "@/lib/context";
import { DramaCard } from "@/components/DramaCard";

export default function HomePage() {
  const { state } = useApp();

  const hot = dramas.slice(0, 8);
  const newReleases = dramas.slice(8, 16);
  const topRated = [...dramas].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const forYou = dramas.slice(16, 24);
  const featured = dramas.slice(0, 5);

  // Build continue watching from watch history
  const continueWatching = state.watchHistory
    .map((h) => dramas.find((d) => d.id === h.dramaId))
    .filter((d): d is NonNullable<typeof d> => d != null)
    .filter((d, i, arr) => arr.findIndex((x) => x.id === d.id) === i)
    .slice(0, 8);

  return (
    <div>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 glass border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center shadow-lg shadow-red-900/30">
              <span className="text-white text-xs font-black tracking-tight">SD</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">ShortDramas</h1>
          </div>
          <Link
            href="/search"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-[var(--color-text-secondary)]"
          >
            <Search size={20} />
          </Link>
        </div>
      </header>

      {/* Hero Banner - full bleed */}
      <BannerCarousel dramas={featured} />

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <section className="mb-7">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-[15px] font-bold tracking-tight">Continue Watching</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
            {continueWatching.map((d) => (
              <DramaCard key={d.id} drama={d} />
            ))}
          </div>
        </section>
      )}

      {/* Sections */}
      <HorizontalSection title="Trending Now" dramas={hot} size="large" />
      <HorizontalSection title="New This Week" dramas={newReleases} />
      <HorizontalSection title="Top Picks" dramas={topRated} />
      <HorizontalSection title="Recommended For You" dramas={forYou} size="large" />
    </div>
  );
}
