"use client";

import { ChevronRight } from "lucide-react";
import { DramaCard } from "./DramaCard";
import type { Drama } from "@/lib/data";

export function HorizontalSection({
  title,
  dramas,
  size = "normal",
}: {
  title: string;
  dramas: Drama[];
  size?: "normal" | "large";
}) {
  return (
    <section className="mb-7">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-[15px] font-bold tracking-tight">{title}</h2>
        <button className="flex items-center gap-0.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors min-h-[44px] pl-2">
          More <ChevronRight size={14} />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 hide-scrollbar">
        {dramas.map((d) => (
          <DramaCard key={d.id} drama={d} size={size} />
        ))}
      </div>
    </section>
  );
}
