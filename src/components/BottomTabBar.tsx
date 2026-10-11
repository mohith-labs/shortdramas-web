"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User } from "lucide-react";

const tabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomTabBar() {
  const pathname = usePathname();

  // Hide on watch pages for immersive experience
  if (pathname.startsWith("/watch/")) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 glass border-t border-[var(--color-border)] pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] transition-colors ${
                isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              <tab.icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.5}
                fill={isActive ? "currentColor" : "none"}
              />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] -mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
