"use client";

import { Coins, Zap, Crown, Gift } from "lucide-react";
import { useApp } from "@/lib/context";
import { coinPackages } from "@/lib/data";

export default function StorePage() {
  const { state, dispatch } = useApp();

  const handlePurchase = (coins: number, bonus: number) => {
    dispatch({ type: "ADD_COINS", amount: coins + bonus });
  };

  return (
    <div className="px-4 pt-3">
      <h1 className="text-lg font-bold mb-4">Coin Store</h1>

      {/* Current Balance */}
      <div className="rounded-xl bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-coin)]/10 border border-[var(--color-accent)]/30 p-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[var(--color-coin)]/20 flex items-center justify-center">
            <Coins size={24} className="text-[var(--color-coin)]" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)]">Current Balance</p>
            <p className="text-2xl font-bold text-[var(--color-coin)]">{state.coins}</p>
          </div>
        </div>
      </div>

      {/* How coins work */}
      <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-3 mb-5">
        <h3 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
          <Zap size={14} className="text-[var(--color-coin)]" />
          How Coins Work
        </h3>
        <ul className="space-y-1.5 text-[11px] text-[var(--color-text-secondary)]">
          <li>• All episodes unlocked — Premium active</li>
          <li>• Unlimited access to every drama</li>
          <li>• No ads, no interruptions</li>
          <li>• Invite friends to share premium</li>
        </ul>
      </div>

      {/* Coin Packages */}
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
        <Crown size={14} className="text-[var(--color-coin)]" />
        Coin Packages
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {coinPackages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => handlePurchase(pkg.coins, pkg.bonus)}
            className={`relative rounded-xl p-3 border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
              pkg.popular
                ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20"
                : "bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-accent)]/50"
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[var(--color-accent)] text-[9px] font-bold">
                POPULAR
              </span>
            )}
            <div className="flex items-center gap-1.5 mb-2">
              <Coins size={16} className="text-[var(--color-coin)]" />
              <span className="text-base font-bold">{pkg.coins}</span>
            </div>
            {pkg.bonus > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <Gift size={10} className="text-green-400" />
                <span className="text-[10px] text-green-400 font-medium">
                  +{pkg.bonus} bonus
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--color-accent)]">
                {pkg.price}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Free coins section */}
      <div className="rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 mb-4">
        <h3 className="text-sm font-semibold mb-3">🎁 Free Coins</h3>
        <div className="space-y-3">
          <button
            onClick={() => handlePurchase(5, 0)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
              <span className="text-sm">📅</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-medium">Daily Check-in</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">
                Log in daily to earn coins
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--color-coin)]">+5</span>
          </button>
        </div>
      </div>
    </div>
  );
}
