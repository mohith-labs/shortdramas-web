import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import { BottomTabBar } from "@/components/BottomTabBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShortDramas - Watch Short Dramas Online",
  description: "Stream thousands of short dramas. Romance, Action, Fantasy and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bg-primary)]">
        <AppProvider>
          {/* Dark side panels on desktop */}
          <div className="min-h-dvh bg-black/40">
            <div className="mobile-shell bg-[var(--color-bg-primary)] shadow-2xl shadow-black/50">
              <main className="pb-16 page-transition">{children}</main>
              <BottomTabBar />
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
