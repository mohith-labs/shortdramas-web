"use client";

import { Heart, X as XIcon } from "lucide-react";
import { DramaCardGrid } from "@/components/DramaCard";
import { useApp } from "@/lib/context";
import { dramas } from "@/lib/data";

export default function FavoritesPage() {
  const { state, toggleFavorite } = useApp();

  const favoriteDramas = dramas.filter((d) => state.favorites.includes(d.id));

  return (
    <div className="px-4 pt-4">
      <h1 className="text-xl font-bold mb-1">My Favorites</h1>
      <p className="text-xs text-[var(--color-text-muted)] mb-5">
        {favoriteDramas.length > 0
          ? `${favoriteDramas.length} drama${favoriteDramas.length !== 1 ? "s" : ""} saved`
          : "Your saved dramas will appear here"}
      </p>

      {favoriteDramas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center mb-5 border border-[var(--color-border)]">
            <div className="text-center">
              <span className="text-4xl block mb-0">💔</span>
            </div>
          </div>
          <h3 className="text-base font-bold mb-2">No favorites yet</h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-[220px] leading-relaxed">
            Browse dramas and tap the heart icon to save your favorites here for quick access
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favoriteDramas.map((d) => (
            <div key={d.id} className="relative group">
              <DramaCardGrid drama={d} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(d.id);
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 border border-white/10 hover:bg-[var(--color-accent)]/80 min-h-[44px] min-w-[44px]"
                style={{ opacity: 1 }} // Always show on mobile
              >
                <XIcon size={14} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
