"use client";

import { Coins, Crown, Gift, Sparkles, Zap } from "lucide-react";
import { useApp } from "@/lib/context";
import { coinPackages } from "@/lib/data";

export default function StorePage() {
  const { state, dispatch } = useApp();

  const handlePurchase = (coins: number, bonus: number) => {
    dispatch({ type: "ADD_COINS", amount: coins + bonus });
  };

  return (
    <div className="px-4 pt-4 pb-8">
      <h1 className="text-xl font-bold mb-5">Coin Store</h1>

      {/* VIP Status Hero Card */}
      <div className="rounded-2xl overflow-hidden mb-6 relative">
        <div className="bg-gradient-to-br from-amber-600/40 via-amber-900/30 to-red-900/30 p-5 border border-amber-500/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-bl-full" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Crown size={28} className="text-black" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-black text-amber-400 tracking-wide">VIP PREMIUM</span>
                <Sparkles size={14} className="text-amber-400" />
              </div>
              <p className="text-xs text-white/60">All episodes unlocked</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 bg-black/20 rounded-xl p-3 relative z-10">
            <Coins size={22} className="text-[var(--color-coin)]" />
            <div className="flex-1">
              <p className="text-[10px] text-white/50">Balance</p>
              <p className="text-xl font-bold text-[var(--color-coin)]">
                {state.coins.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How coins work */}
      <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 mb-6">
        <h3 className="text-xs font-bold mb-3 flex items-center gap-2 text-[var(--color-text-secondary)] uppercase tracking-wider">
          <Zap size={14} className="text-[var(--color-coin)]" />
          Premium Benefits
        </h3>
        <ul className="space-y-2 text-[12px] text-[var(--color-text-secondary)]">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All episodes unlocked — Premium active
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Unlimited access to every drama
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            No ads, no interruptions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Invite friends to share premium
          </li>
        </ul>
      </div>

      {/* Coin Packages */}
      <h3 className="text-sm font-bold mb-4">Coin Packages</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {coinPackages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => handlePurchase(pkg.coins, pkg.bonus)}
            className={`relative rounded-xl p-4 border text-left transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] ${
              pkg.popular
                ? "bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-accent)]/5 border-[var(--color-accent)]/50 shadow-lg shadow-red-900/10"
                : "bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            }`}
            style={pkg.popular ? { animation: "pulseGlow 3s ease-in-out infinite" } : undefined}
          >
            {pkg.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--color-accent)] text-[9px] font-black tracking-wider shadow-lg">
                BEST VALUE
              </span>
            )}
            <div className="flex items-center gap-2 mb-2.5">
              <Coins size={18} className="text-[var(--color-coin)]" />
              <span className="text-lg font-bold">{pkg.coins.toLocaleString()}</span>
            </div>
            {pkg.bonus > 0 && (
              <div className="flex items-center gap-1 mb-2.5">
                <Gift size={11} className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-semibold">
                  +{pkg.bonus.toLocaleString()} bonus
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className={`text-base font-bold ${pkg.popular ? "text-[var(--color-accent)]" : "text-white"}`}>
                {pkg.price}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Daily Check-in */}
      <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4">
        <h3 className="text-sm font-bold mb-3">Free Coins</h3>
        <button
          onClick={() => handlePurchase(5, 0)}
          className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-coin)]/30 transition-colors min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
            <span className="text-lg">📅</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium">Daily Check-in</p>
            <p className="text-[11px] text-[var(--color-text-muted)]">
              Log in daily to earn coins
            </p>
          </div>
          <span className="text-sm font-bold text-[var(--color-coin)]">+5</span>
        </button>
      </div>
    </div>
  );
}
