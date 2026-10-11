"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Hls from "hls.js";
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
  VolumeX,
  SkipForward,
} from "lucide-react";
import { dramas, generateEpisodes } from "@/lib/data";
import { useApp } from "@/lib/context";
import { formatDuration } from "@/lib/utils";

const HLS_URL = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export default function WatchPage() {
  const params = useParams<{ id: string; episode: string }>();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showEpisodeDrawer, setShowEpisodeDrawer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const drama = dramas.find((d) => d.id === params.id);
  const epNum = parseInt(params.episode, 10);
  const episodes = drama ? generateEpisodes(drama) : [];
  const currentEp = episodes.find((e) => e.number === epNum);
  const episodeId = `${params.id}-ep-${epNum}`;
  const isLiked = state.likes[episodeId] || false;

  // Initialize HLS.js
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = HLS_URL;
      video.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
        hlsRef.current = null;
      }
    };
  }, [epNum]);

  // Record watch history
  useEffect(() => {
    if (drama) {
      dispatch({ type: "ADD_HISTORY", dramaId: drama.id, episode: epNum });
    }
  }, [drama, epNum, dispatch]);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    setShowControls(true);
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, []);

  if (!drama || !currentEp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-[var(--color-text-muted)]">Episode not found</p>
      </div>
    );
  }

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const p = (video.currentTime / video.duration) * 100;
    setProgress(p);
    setCurrentTime(video.currentTime);
    setDuration(video.duration);

    if (video.buffered.length > 0) {
      const buf = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
      setBuffered(buf);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    video.currentTime = pct * video.duration;
    resetControlsTimer();
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      video.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="bg-black min-h-dvh">
      {/* Video Player */}
      <div
        className="relative aspect-video bg-black"
        onClick={() => resetControlsTimer()}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          poster={`https://picsum.photos/seed/watch${drama.id}/800/450`}
        />

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Overlay controls */}
        <div
          className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

          {/* Top bar */}
          <div className="flex items-center gap-3 px-4 pt-4 relative z-10">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10 min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{drama.title}</p>
              <p className="text-[11px] text-white/50">
                Episode {epNum} of {drama.episodes}
              </p>
            </div>
          </div>

          {/* Center play/pause */}
          <div className="flex items-center justify-center gap-8 relative z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const video = videoRef.current;
                if (video) video.currentTime = Math.max(0, video.currentTime - 10);
              }}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <SkipForward size={22} className="rotate-180" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/20 hover:scale-105 transition-transform min-h-[44px]"
            >
              {isPlaying ? (
                <Pause size={30} fill="white" />
              ) : (
                <Play size={30} fill="white" className="ml-1" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const video = videoRef.current;
                if (video && video.duration) video.currentTime = Math.min(video.duration, video.currentTime + 10);
              }}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <SkipForward size={22} />
            </button>
          </div>

          {/* Bottom bar with progress */}
          <div className="px-4 pb-3 relative z-10">
            {/* Progress bar - clickable */}
            <div
              ref={progressBarRef}
              className="w-full h-6 flex items-center cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div className="w-full h-1 bg-white/15 rounded-full relative group-hover:h-1.5 transition-all">
                {/* Buffered */}
                <div
                  className="absolute inset-y-0 left-0 bg-white/20 rounded-full"
                  style={{ width: `${buffered}%` }}
                />
                {/* Progress */}
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--color-accent)] rounded-full"
                  style={{ width: `${progress}%` }}
                />
                {/* Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--color-accent)] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/60 font-mono">
                  {formatDuration(currentTime)} / {formatDuration(duration)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <Maximize size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Episode Info Card */}
      <div className="bg-[var(--color-bg-primary)] px-4 py-4">
        <h2 className="text-lg font-bold mb-1">{drama.title}</h2>
        <p className="text-xs text-[var(--color-text-secondary)] mb-4">
          Episode {epNum} of {drama.episodes}
        </p>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2.5 mb-5 flex-wrap">
          {epNum > 1 && (
            <Link
              href={`/watch/${drama.id}/${epNum - 1}`}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-xs font-medium border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors min-h-[44px]"
            >
              <ChevronLeft size={14} />
              Prev
            </Link>
          )}
          {epNum < drama.episodes && (
            <Link
              href={`/watch/${drama.id}/${epNum + 1}`}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--color-accent)] text-xs font-bold hover:bg-[var(--color-accent-hover)] transition-colors min-h-[44px] shadow-lg shadow-red-900/20"
            >
              Next
              <ChevronRight size={14} />
            </Link>
          )}
          <div className="flex-1" />
          <button
            onClick={() => dispatch({ type: "TOGGLE_LIKE", episodeId })}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium transition-all min-h-[44px] ${
              isLiked
                ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30"
                : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            }`}
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
            {isLiked ? "Liked" : "Like"}
          </button>
          <button
            onClick={() => setShowEpisodeDrawer(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-xs font-medium border border-[var(--color-border)] min-h-[44px]"
          >
            <List size={14} />
            Episodes
          </button>
        </div>

        {/* About section */}
        <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4">
          <h3 className="text-xs font-bold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">About this drama</h3>
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            {drama.synopsis}
          </p>
        </div>
      </div>

      {/* Episode Drawer */}
      {showEpisodeDrawer && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ animation: "fadeOverlayIn 0.2s ease-out" }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowEpisodeDrawer(false)}
          />
          <div
            className="relative w-full max-w-[480px] max-h-[65vh] glass rounded-t-2xl overflow-hidden border-t border-white/10"
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--color-border)]">
              <h3 className="text-sm font-bold">
                Episodes ({drama.episodes})
              </h3>
              <button
                onClick={() => setShowEpisodeDrawer(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(65vh-56px)] p-4">
              <div className="grid grid-cols-6 gap-2">
                {episodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/watch/${drama.id}/${ep.number}`}
                    onClick={() => setShowEpisodeDrawer(false)}
                    className={`h-11 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                      ep.number === epNum
                        ? "bg-[var(--color-accent)] text-white shadow-lg shadow-red-900/30"
                        : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:text-white"
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
