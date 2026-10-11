"use client";

import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { BannerCarousel } from "@/components/BannerCarousel";
import { HorizontalSection } from "@/components/HorizontalSection";
import { dramas } from "@/lib/data";

export default function HomePage() {
  const hot = dramas.slice(0, 8);
  const newReleases = dramas.slice(8, 16);
  const topRated = [...dramas].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const forYou = dramas.slice(16, 24);
  const featured = dramas.slice(0, 5);

  return (
    <div>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[var(--color-bg-primary)]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
              <span className="text-white text-xs font-black">SD</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">ShortDramas</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/search" className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
              <Search size={20} />
            </Link>
            <button className="text-[var(--color-text-secondary)] hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--color-accent)] rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Banner Carousel */}
      <div className="pt-2">
        <BannerCarousel dramas={featured} />
      </div>

      {/* Sections */}
      <HorizontalSection title="🔥 Hot Now" dramas={hot} size="large" />
      <HorizontalSection title="✨ New Releases" dramas={newReleases} />
      <HorizontalSection title="⭐ Top Rated" dramas={topRated} />
      <HorizontalSection title="💝 For You" dramas={forYou} size="large" />
    </div>
  );
}
