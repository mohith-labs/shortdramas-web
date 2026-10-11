"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import { dramas, generateEpisodes, formatViews } from "@/lib/data";
import { useApp } from "@/lib/context";
import { DramaCard } from "@/components/DramaCard";

export default function DramaDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

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

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/hero${drama.id}/600/400`}
          alt={drama.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center z-10"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Play button */}
        <Link
          href={`/watch/${drama.id}/1`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[var(--color-accent)]/90 flex items-center justify-center z-10 hover:bg-[var(--color-accent)] transition-colors"
        >
          <Play size={24} className="ml-1" fill="white" />
        </Link>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h1 className="text-xl font-bold mb-1.5">{drama.title}</h1>
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-yellow-400">{drama.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span>{formatViews(drama.views)} views</span>
            </div>
            <span>{drama.episodes} episodes</span>
            <span className="capitalize">{drama.status}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-4 py-3">
        <Link
          href={`/watch/${drama.id}/1`}
          className="flex-1 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center gap-2 text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Play size={16} fill="white" />
          Watch Now
        </Link>
        <button
          onClick={() => toggleFavorite(drama.id)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
            fav
              ? "bg-[var(--color-accent)]/20 border-[var(--color-accent)] text-[var(--color-accent)]"
              : "border-[var(--color-border)] text-[var(--color-text-secondary)]"
          }`}
        >
          <Heart size={18} fill={fav ? "currentColor" : "none"} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-secondary)]">
          <Share2 size={18} />
        </button>
      </div>

      {/* Genre Tags */}
      <div className="flex gap-2 px-4 mb-3">
        {drama.genre.map((g) => (
          <span
            key={g}
            className="px-2.5 py-1 rounded-full bg-[var(--color-bg-card)] text-[10px] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
          >
            {g}
          </span>
        ))}
        <span className="px-2.5 py-1 rounded-full bg-[var(--color-bg-card)] text-[10px] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
          {drama.year}
        </span>
      </div>

      {/* Synopsis */}
      <div className="px-4 mb-4">
        <p
          className={`text-xs leading-relaxed text-[var(--color-text-secondary)] ${
            synopsisExpanded ? "" : "line-clamp-3"
          }`}
        >
          {drama.synopsis}
        </p>
        <button
          onClick={() => setSynopsisExpanded(!synopsisExpanded)}
          className="flex items-center gap-0.5 text-[10px] text-[var(--color-accent)] mt-1"
        >
          {synopsisExpanded ? "Less" : "More"}
          {synopsisExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Cast & Director */}
      <div className="px-4 mb-5">
        <h3 className="text-sm font-semibold mb-2">Cast & Crew</h3>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar">
          <div className="shrink-0 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center mb-1">
              <span className="text-xs font-bold text-[var(--color-accent)]">Dir</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-secondary)] w-14 truncate">
              {drama.director}
            </p>
          </div>
          {drama.cast.map((actor) => (
            <div key={actor} className="shrink-0 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&background=1a1a2e&color=fff&size=48`}
                alt={actor}
                className="w-12 h-12 rounded-full border border-[var(--color-border)]"
              />
              <p className="text-[10px] text-[var(--color-text-secondary)] w-14 truncate mt-1">
                {actor}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Episodes */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Episodes ({drama.episodes})</h3>
          <span className="text-[10px] text-green-400 font-medium">
            ✓ All unlocked
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {episodes.slice(0, 30).map((ep) => (
            <Link
              key={ep.id}
              href={`/watch/${drama.id}/${ep.number}`}
              className="relative h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-all bg-[var(--color-bg-card)] text-white border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/20"
            >
              {ep.number}
            </Link>
          ))}
        </div>
        {episodes.length > 30 && (
          <p className="text-center text-[10px] text-[var(--color-text-muted)] mt-2">
            + {episodes.length - 30} more episodes
          </p>
        )}
      </div>

      {/* Similar Dramas */}
      {similar.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold px-4 mb-2.5">You May Also Like</h3>
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
