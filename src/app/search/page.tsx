"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon, X, TrendingUp } from "lucide-react";
import { DramaCardGrid } from "@/components/DramaCard";
import { dramas, hotSearchTerms } from "@/lib/data";

const genres = ["All", "Romance", "Action", "Fantasy", "Comedy", "Drama", "Thriller", "Horror"];

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
          d.genre.some((g) => g.toLowerCase().includes(q))
      );
    }
    if (selectedGenre !== "All") {
      filtered = filtered.filter((d) => d.genre.includes(selectedGenre));
    }
    return filtered;
  }, [query, selectedGenre]);

  return (
    <div className="px-4 pt-3">
      {/* Search Input */}
      <div className="relative mb-4">
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        />
        <input
          type="text"
          placeholder="Search dramas, actors..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHasSearched(true);
          }}
          className="w-full h-10 pl-10 pr-10 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Genre Chips */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-5">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setSelectedGenre(g);
              setHasSearched(true);
            }}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedGenre === g
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Hot Search Tags (shown when no query) */}
      {!hasSearched && (
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp size={16} className="text-[var(--color-accent)]" />
            <h3 className="text-sm font-semibold">Hot Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {hotSearchTerms.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  setHasSearched(true);
                }}
                className="px-3 py-1.5 rounded-full bg-[var(--color-bg-card)] text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-white transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Grid */}
      {hasSearched && (
        <div>
          <p className="text-xs text-[var(--color-text-muted)] mb-3">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {results.map((d) => (
                <DramaCardGrid key={d.id} drama={d} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <SearchIcon size={48} className="text-[var(--color-text-muted)] mb-3" />
              <p className="text-sm text-[var(--color-text-muted)]">No dramas found</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Try different keywords or genres
              </p>
            </div>
          )}
        </div>
      )}

      {/* Default recommendations */}
      {!hasSearched && (
        <div>
          <h3 className="text-sm font-semibold mb-3">📺 Recommended</h3>
          <div className="grid grid-cols-3 gap-3">
            {dramas.slice(0, 12).map((d) => (
              <DramaCardGrid key={d.id} drama={d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
