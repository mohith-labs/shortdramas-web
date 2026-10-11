"use client";

import { Heart, Trash2 } from "lucide-react";
import { DramaCardGrid } from "@/components/DramaCard";
import { useApp } from "@/lib/context";
import { dramas } from "@/lib/data";

export default function FavoritesPage() {
  const { state, toggleFavorite } = useApp();

  const favoriteDramas = dramas.filter((d) => state.favorites.includes(d.id));

  return (
    <div className="px-4 pt-3">
      <h1 className="text-lg font-bold mb-4">My Favorites</h1>

      {favoriteDramas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center mb-4">
            <Heart size={36} className="text-[var(--color-text-muted)]" />
          </div>
          <h3 className="text-sm font-semibold mb-1.5">No favorites yet</h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-[200px]">
            Browse dramas and tap the heart icon to save them here
          </p>
        </div>
      ) : (
        <div>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">
            {favoriteDramas.length} drama{favoriteDramas.length !== 1 ? "s" : ""} saved
          </p>
          <div className="grid grid-cols-3 gap-3">
            {favoriteDramas.map((d) => (
              <div key={d.id} className="relative group">
                <DramaCardGrid drama={d} />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(d.id);
                  }}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 size={12} className="text-[var(--color-accent)]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
