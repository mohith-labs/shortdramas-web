"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  List,
  X,
  Play,
  Pause,
  Maximize,
  Volume2,
} from "lucide-react";
import { dramas, generateEpisodes } from "@/lib/data";
import { useApp } from "@/lib/context";

export default function WatchPage() {
  const params = useParams<{ id: string; episode: string }>();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showEpisodeDrawer, setShowEpisodeDrawer] = useState(false);
  const [progress, setProgress] = useState(0);

  const drama = dramas.find((d) => d.id === params.id);
  const epNum = parseInt(params.episode, 10);

  const episodes = drama ? generateEpisodes(drama) : [];
  const currentEp = episodes.find((e) => e.number === epNum);
  const episodeId = `${params.id}-ep-${epNum}`;
  const isLiked = state.likes[episodeId] || false;

  useEffect(() => {
    if (drama) {
      dispatch({ type: "ADD_HISTORY", dramaId: drama.id, episode: epNum });
    }
  }, [drama, epNum, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  if (!drama || !currentEp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-[var(--color-text-muted)]">Episode not found</p>
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100;
      setProgress(p);
    }
  };

  return (
    <div className="bg-black min-h-dvh">
      {/* Video Player */}
      <div
        className="relative aspect-video bg-black"
        onClick={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          src="https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.ts"
          className="w-full h-full object-contain"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          poster={`https://picsum.photos/seed/watch${drama.id}/800/450`}
        />

        {/* Overlay controls */}
        <div
          className={`absolute inset-0 bg-black/30 flex flex-col justify-between transition-opacity ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top bar */}
          <div className="flex items-center gap-3 px-3 pt-3">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1">
              <p className="text-xs font-medium truncate">{drama.title}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">
                Episode {epNum}
              </p>
            </div>
          </div>

          {/* Center play button */}
          <div className="flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause size={28} fill="white" />
              ) : (
                <Play size={28} fill="white" className="ml-1" />
              )}
            </button>
          </div>

          {/* Bottom bar */}
          <div className="px-3 pb-2">
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/20 rounded-full mb-2 overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 size={16} className="text-white/70" />
              </div>
              <Maximize size={16} className="text-white/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Episode Info */}
      <div className="bg-[var(--color-bg-primary)] px-4 py-3">
        <h2 className="text-base font-bold mb-1">{drama.title}</h2>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          Episode {epNum} of {drama.episodes} · {currentEp.duration}
        </p>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-4">
          {epNum > 1 && (
            <Link
              href={`/watch/${drama.id}/${epNum - 1}`}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-bg-card)] text-xs font-medium border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors"
            >
              <ChevronLeft size={14} />
              Previous
            </Link>
          )}
          {epNum < drama.episodes && (
            <Link
              href={`/watch/${drama.id}/${epNum + 1}`}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-accent)] text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              Next
              <ChevronRight size={14} />
            </Link>
          )}
          <div className="flex-1" />
          <button
            onClick={() => dispatch({ type: "TOGGLE_LIKE", episodeId })}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isLiked
                ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            }`}
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
            {isLiked ? "Liked" : "Like"}
          </button>
          <button
            onClick={() => setShowEpisodeDrawer(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-bg-card)] text-xs font-medium border border-[var(--color-border)]"
          >
            <List size={14} />
            Episodes
          </button>
        </div>

        {/* Drama description */}
        <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-3">
          <h3 className="text-xs font-semibold mb-1.5">About this drama</h3>
          <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
            {drama.synopsis}
          </p>
        </div>
      </div>

      {/* Episode Drawer */}
      {showEpisodeDrawer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowEpisodeDrawer(false)}
          />
          <div
            className="relative w-full max-w-[480px] max-h-[60vh] bg-[var(--color-bg-surface)] rounded-t-2xl overflow-hidden"
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
              <h3 className="text-sm font-bold">
                Episodes ({drama.episodes})
              </h3>
              <button onClick={() => setShowEpisodeDrawer(false)}>
                <X size={20} className="text-[var(--color-text-muted)]" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(60vh-48px)] p-4">
              <div className="grid grid-cols-6 gap-2">
                {episodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/watch/${drama.id}/${ep.number}`}
                    onClick={() => setShowEpisodeDrawer(false)}
                    className={`relative h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                      ep.number === epNum
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-bg-card)] text-white border border-[var(--color-border)] hover:border-[var(--color-accent)]"
                    }`}
                  >
                    {ep.number}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
