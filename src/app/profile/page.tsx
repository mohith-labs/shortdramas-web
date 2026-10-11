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
  Heart,
  Star,
} from "lucide-react";
import { useApp } from "@/lib/context";

const menuItems = [
  { icon: Clock, label: "Watch History", href: "#", color: "#3b82f6" },
  { icon: Download, label: "My Downloads", href: "#", color: "#8b5cf6" },
  { icon: Coins, label: "Coin Store", href: "/store", color: "#f59e0b" },
  { icon: Users, label: "Invite Friends", href: "#", color: "#22c55e" },
  { icon: Settings, label: "Settings", href: "#", color: "#6b7280" },
  { icon: MessageSquare, label: "Feedback", href: "#", color: "#ec4899" },
];

export default function ProfilePage() {
  const { state, dispatch } = useApp();

  return (
    <div className="px-4 pt-6">
      {/* Avatar & User Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-[var(--color-accent)] via-amber-500 to-[var(--color-accent)]">
            {state.isLoggedIn ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={state.avatar}
                alt="Avatar"
                className="w-full h-full rounded-full border-2 border-[var(--color-bg-primary)] object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[var(--color-bg-card)] border-2 border-[var(--color-bg-primary)] flex items-center justify-center">
                <User size={28} className="text-[var(--color-text-muted)]" />
              </div>
            )}
          </div>
          {state.isLoggedIn && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-[9px] font-black text-black shadow-lg">
              <Crown size={10} />
              VIP
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold mt-1">{state.username}</h2>
        {state.isLoggedIn ? (
          <p className="text-xs text-[var(--color-text-muted)]">
            Premium Member
          </p>
        ) : (
          <p className="text-xs text-[var(--color-text-muted)]">
            Sign in to sync your data
          </p>
        )}
      </div>

      {/* Stats Card - glass morphism */}
      <div className="rounded-2xl glass border border-white/10 p-5 mb-5 shadow-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart size={12} className="text-[var(--color-accent)]" />
            </div>
            <p className="text-xl font-bold text-[var(--color-accent)]">{state.favorites.length}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Favorites</p>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star size={12} className="text-[var(--color-text-secondary)]" />
            </div>
            <p className="text-xl font-bold">{state.watchHistory.length}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Watched</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Coins size={12} className="text-[var(--color-coin)]" />
            </div>
            <p className="text-xl font-bold text-[var(--color-coin)]">
              {state.coins >= 1000 ? `${(state.coins / 1000).toFixed(0)}K` : state.coins}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Coins</p>
          </div>
        </div>
      </div>

      {/* Coin Balance Card */}
      {state.isLoggedIn && (
        <div className="rounded-xl bg-gradient-to-r from-amber-900/30 to-amber-600/10 border border-amber-500/20 p-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-coin)]/20 flex items-center justify-center">
              <Coins size={20} className="text-[var(--color-coin)]" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-[var(--color-text-muted)]">My Coins</p>
              <p className="text-lg font-bold text-[var(--color-coin)]">{state.coins.toLocaleString()}</p>
            </div>
            <Link
              href="/store"
              className="px-4 py-2 rounded-lg bg-[var(--color-coin)]/20 text-xs font-bold text-[var(--color-coin)] hover:bg-[var(--color-coin)]/30 transition-colors min-h-[44px] flex items-center"
            >
              Get More
            </Link>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-hidden mb-5">
        {menuItems.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3.5 px-4 py-4 hover:bg-white/[0.03] transition-colors min-h-[44px] ${
              i < menuItems.length - 1 ? "border-b border-[var(--color-border)]" : ""
            }`}
          >
            <div
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <item.icon size={18} style={{ color: item.color }} />
            <span className="flex-1 text-sm font-medium">{item.label}</span>
            <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
          </Link>
        ))}
      </div>

      {/* Sign In/Out */}
      <div className="mb-6">
        {!state.isLoggedIn ? (
          <button
            onClick={() => dispatch({ type: "LOGIN" })}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--color-accent)] text-sm font-bold hover:bg-[var(--color-accent-hover)] transition-colors min-h-[44px] shadow-lg shadow-red-900/20"
          >
            <LogIn size={16} />
            Sign In
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: "LOGOUT" })}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--color-bg-card)] text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors min-h-[44px]"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        )}
      </div>

      {/* Version */}
      <p className="text-center text-[10px] text-[var(--color-text-muted)] mb-4">
        ShortDramas Web v2.0.0
      </p>
    </div>
  );
}
