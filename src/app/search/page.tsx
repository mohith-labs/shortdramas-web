"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon, X, Flame } from "lucide-react";
import { DramaCardGrid } from "@/components/DramaCard";
import { dramas, hotSearchTerms } from "@/lib/data";

const genres = ["All", "Romance", "Action", "Fantasy", "Comedy", "Drama", "Thriller", "Horror"];

const genreColors: Record<string, string> = {
  All: "bg-[var(--color-accent)]",
  Romance: "bg-pink-600",
  Action: "bg-orange-600",
  Fantasy: "bg-purple-600",
  Comedy: "bg-emerald-600",
  Drama: "bg-blue-600",
  Thriller: "bg-slate-600",
  Horror: "bg-red-800",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);

  const results = useMemo(() => {
    let filtered = dramas;
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.genre.some((g) => g.toLowerCase().includes(q)) ||
          d.cast.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (selectedGenre !== "All") {
      filtered = filtered.filter((d) => d.genre.includes(selectedGenre));
    }
    return filtered;
  }, [query, selectedGenre]);

  return (
    <div className="px-4 pt-4">
      {/* Search Input */}
      <div className="relative mb-5">
        <SearchIcon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />
        <input
          type="text"
          placeholder="Search dramas, actors, genres..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHasSearched(true);
          }}
          className="w-full h-12 pl-11 pr-11 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setHasSearched(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Genre Pills - scrollable row */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 -mx-4 px-4">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setSelectedGenre(g);
              setHasSearched(true);
            }}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all min-h-[36px] ${
              selectedGenre === g
                ? `${genreColors[g] || "bg-[var(--color-accent)]"} text-white shadow-lg`
                : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Trending section when no search */}
      {!hasSearched && (
        <div className="mb-7">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
            <Flame size={16} className="text-[var(--color-accent)]" />
            Trending Searches
          </h3>
          <div className="space-y-0">
            {hotSearchTerms.slice(0, 10).map((term, i) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  setHasSearched(true);
                }}
                className="w-full flex items-center gap-3 py-3 border-b border-[var(--color-border)]/50 hover:bg-white/[0.02] transition-colors"
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-md text-xs font-bold ${
                    i < 3
                      ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                      : "bg-[var(--color-bg-card)] text-[var(--color-text-muted)]"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-[var(--color-text-primary)] flex-1 text-left">
                  {term}
                </span>
                {i < 3 && <Flame size={14} className="text-[var(--color-accent)]" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {results.map((d) => (
                <DramaCardGrid key={d.id} drama={d} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center mb-4">
                <SearchIcon size={28} className="text-[var(--color-text-muted)]" />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">No dramas found</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Try different keywords or genres
              </p>
            </div>
          )}
        </div>
      )}

      {/* Default recommendations when no search */}
      {!hasSearched && (
        <div>
          <h3 className="text-sm font-bold mb-4">Recommended</h3>
          <div className="grid grid-cols-2 gap-4">
            {dramas.slice(0, 12).map((d) => (
              <DramaCardGrid key={d.id} drama={d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
