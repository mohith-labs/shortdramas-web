"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Heart,
  Share2,
  Play,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowLeft,
  Calendar,
  Film,
} from "lucide-react";
import { dramas, generateEpisodes, formatViews } from "@/lib/data";
import { useApp } from "@/lib/context";
import { DramaCard } from "@/components/DramaCard";

const genreColors: Record<string, string> = {
  Romance: "bg-pink-600/20 text-pink-400 border-pink-500/30",
  Action: "bg-orange-600/20 text-orange-400 border-orange-500/30",
  Fantasy: "bg-purple-600/20 text-purple-400 border-purple-500/30",
  Comedy: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
  Drama: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  Thriller: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Horror: "bg-red-800/20 text-red-400 border-red-500/30",
};

export default function DramaDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const drama = dramas.find((d) => d.id === params.id);
  if (!drama) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-[var(--color-text-muted)]">Drama not found</p>
      </div>
    );
  }

  const episodes = generateEpisodes(drama);
  const similar = dramas
    .filter((d) => d.id !== drama.id && d.genre.some((g) => drama.genre.includes(g)))
    .slice(0, 8);
  const fav = isFavorite(drama.id);

  const displayEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 30);

  return (
    <div className="pb-4">
      {/* Hero Image - full width bleed */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/hero${drama.id}/600/400`}
          alt={drama.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/30 to-black/20" />

        {/* Floating back button with blur */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center z-10 border border-white/10 min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Center play button with glass effect */}
        <Link
          href={`/watch/${drama.id}/1`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass flex items-center justify-center z-10 border border-white/20 hover:scale-110 transition-transform shadow-2xl"
        >
          <Play size={28} className="ml-1" fill="white" />
        </Link>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <h1 className="text-2xl font-bold mb-2 drop-shadow-lg leading-tight">
            {drama.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-amber-400">{drama.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={13} />
              <span>{formatViews(drama.views)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Film size={13} />
              <span>{drama.episodes} EP</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={13} />
              <span>{drama.year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-4 py-4">
        <Link
          href={`/watch/${drama.id}/1`}
          className="flex-1 h-12 bg-[var(--color-accent)] rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-red-900/20 min-h-[44px]"
        >
          <Play size={16} fill="white" />
          Watch Now
        </Link>
        <button
          onClick={() => toggleFavorite(drama.id)}
          className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all min-h-[44px] ${
            fav
              ? "bg-[var(--color-accent)]/15 border-[var(--color-accent)] text-[var(--color-accent)]"
              : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]"
          }`}
        >
          <Heart size={20} fill={fav ? "currentColor" : "none"} />
        </button>
        <button className="w-12 h-12 rounded-lg flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] transition-colors min-h-[44px]">
          <Share2 size={20} />
        </button>
      </div>

      {/* Genre Tags with colored backgrounds */}
      <div className="flex flex-wrap gap-2 px-4 mb-4">
        {drama.genre.map((g) => (
          <span
            key={g}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium border ${
              genreColors[g] || "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border-[var(--color-border)]"
            }`}
          >
            {g}
          </span>
        ))}
        <span className="px-3 py-1.5 rounded-full bg-[var(--color-bg-card)] text-[11px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)]">
          {drama.status === "completed" ? "Completed" : "Ongoing"}
        </span>
      </div>

      {/* Synopsis */}
      <div className="px-4 mb-5">
        <p
          className={`text-[13px] leading-relaxed text-[var(--color-text-secondary)] ${
            synopsisExpanded ? "" : "line-clamp-2"
          }`}
        >
          {drama.synopsis}
        </p>
        <button
          onClick={() => setSynopsisExpanded(!synopsisExpanded)}
          className="flex items-center gap-0.5 text-xs text-[var(--color-accent)] mt-1.5 font-medium min-h-[44px]"
        >
          {synopsisExpanded ? "Show Less" : "Read More"}
          {synopsisExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Cast & Crew */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-bold mb-3">Cast & Crew</h3>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
          <div className="shrink-0 text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-accent)]/10 border-2 border-[var(--color-accent)]/40 flex items-center justify-center mb-1.5">
              <span className="text-[10px] font-bold text-[var(--color-accent)]">DIR</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-secondary)] w-16 truncate">
              {drama.director}
            </p>
          </div>
          {drama.cast.map((actor) => (
            <div key={actor} className="shrink-0 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&background=18181b&color=fafafa&size=56&bold=true`}
                alt={actor}
                className="w-14 h-14 rounded-full border-2 border-[var(--color-border)]"
              />
              <p className="text-[10px] text-[var(--color-text-secondary)] w-16 truncate mt-1.5">
                {actor}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Episodes */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Episodes ({drama.episodes})</h3>
          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-400/10 px-2.5 py-1 rounded-full">
            All Unlocked
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {displayEpisodes.map((ep) => (
            <Link
              key={ep.id}
              href={`/watch/${drama.id}/${ep.number}`}
              className={`h-11 rounded-lg flex items-center justify-center text-xs font-semibold transition-all min-h-[44px] ${
                ep.number === 1
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-red-900/20"
                  : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:text-white"
              }`}
            >
              {ep.number}
            </Link>
          ))}
        </div>
        {episodes.length > 30 && !showAllEpisodes && (
          <button
            onClick={() => setShowAllEpisodes(true)}
            className="w-full mt-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            Show all {episodes.length} episodes
          </button>
        )}
      </div>

      {/* Similar Dramas */}
      {similar.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-bold px-4 mb-3">You May Also Like</h3>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
            {similar.map((d) => (
              <DramaCard key={d.id} drama={d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
