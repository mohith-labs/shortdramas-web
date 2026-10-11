"use client";

import Link from "next/link";
import {
  User,
  Clock,
  Download,
  Coins,
  Users,
  Settings,
  MessageSquare,
  ChevronRight,
  LogIn,
  LogOut,
  Crown,
} from "lucide-react";
import { useApp } from "@/lib/context";

const menuItems = [
  { icon: Clock, label: "Watch History", href: "#" },
  { icon: Download, label: "My Downloads", href: "#" },
  { icon: Coins, label: "Coin Store", href: "/store" },
  { icon: Users, label: "Invite Friends", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: MessageSquare, label: "Feedback", href: "#" },
];

export default function ProfilePage() {
  const { state, dispatch } = useApp();

  return (
    <div className="px-4 pt-3">
      <h1 className="text-lg font-bold mb-5">Profile</h1>

      {/* Profile Card */}
      <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 mb-5">
        <div className="flex items-center gap-3 mb-3">
          {state.isLoggedIn ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={state.avatar}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-[var(--color-accent)]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center">
              <User size={24} className="text-[var(--color-text-muted)]" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold">{state.username}</h2>
              {state.isLoggedIn && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-accent)]/20 text-[9px] font-bold text-[var(--color-accent)]">
                  <Crown size={10} /> VIP
                </span>
              )}
            </div>
            {state.isLoggedIn ? (
              <p className="text-xs text-[var(--color-text-muted)]">
                ID: 1000{Math.floor(Math.random() * 9999)}
              </p>
            ) : (
              <p className="text-xs text-[var(--color-text-muted)]">
                Sign in to sync your data
              </p>
            )}
          </div>
          {!state.isLoggedIn ? (
            <button
              onClick={() => dispatch({ type: "LOGIN" })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-accent)] text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <LogIn size={14} />
              Sign In
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: "LOGOUT" })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-bg-surface)] text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          )}
        </div>

        {/* Coin Balance */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
          <Coins size={18} className="text-[var(--color-coin)]" />
          <div className="flex-1">
            <p className="text-[10px] text-[var(--color-text-muted)]">My Coins</p>
            <p className="text-sm font-bold text-[var(--color-coin)]">{state.coins}</p>
          </div>
          <Link
            href="/store"
            className="px-3 py-1.5 rounded-lg bg-[var(--color-coin)]/20 text-[10px] font-semibold text-[var(--color-coin)] hover:bg-[var(--color-coin)]/30 transition-colors"
          >
            Get More
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-3 text-center">
          <p className="text-lg font-bold text-[var(--color-accent)]">{state.favorites.length}</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">Favorites</p>
        </div>
        <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-3 text-center">
          <p className="text-lg font-bold">{state.watchHistory.length}</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">Watched</p>
        </div>
        <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-3 text-center">
          <p className="text-lg font-bold text-[var(--color-coin)]">{state.coins}</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">Coins</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-hidden">
        {menuItems.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[var(--color-bg-card-hover)] transition-colors ${
              i < menuItems.length - 1 ? "border-b border-[var(--color-border)]" : ""
            }`}
          >
            <item.icon size={18} className="text-[var(--color-text-secondary)]" />
            <span className="flex-1 text-sm">{item.label}</span>
            <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
          </Link>
        ))}
      </div>

      {/* Version */}
      <p className="text-center text-[10px] text-[var(--color-text-muted)] mt-6 mb-4">
        ShortDramas Web v1.0.0
      </p>
    </div>
  );
}
