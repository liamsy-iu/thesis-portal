"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import "./globals.css";
import Link from "next/link";
import { Crimson_Pro, Inter } from "next/font/google";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-crimson",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setMounted(false);
    setTimeout(() => setMounted(true), 0);
  };

  const currentTheme =
    mounted && typeof window !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "light"
      : "light";

  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              const theme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `}
        </Script>
      </head>
      <body>
        <nav className="bg-card border-b-2 border-theme px-4 md:px-6 py-5 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8 flex-1">
              <h1 className="text-lg md:text-xl font-semibold text-primary font-crimson">
                Thesis Research Portal
              </h1>

              {/* Desktop nav */}
              <div className="hidden md:flex gap-6">
                <Link
                  href="/"
                  className="text-sm text-secondary hover:text-accent transition font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/data"
                  className="text-sm text-secondary hover:text-accent transition font-medium"
                >
                  Data Analysis
                </Link>
                <Link
                  href="/chapters"
                  className="text-sm text-secondary hover:text-accent transition font-medium"
                >
                  Chapters
                </Link>
                <Link
                  href="/literature"
                  className="text-sm text-secondary hover:text-accent transition font-medium"
                >
                  Literature
                </Link>
              </div>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-secondary hover:bg-accent hover:text-white transition mr-4"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              {mounted ? (currentTheme === "light" ? "🌙" : "☀️") : "🌙"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-secondary hover:text-accent"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <p className="hidden md:block text-xs text-muted font-medium tracking-wider">
              M-PESA · 2007-2025
            </p>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-theme space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-secondary hover:text-accent transition py-2 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/data"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-secondary hover:text-accent transition py-2 font-medium"
              >
                Data Analysis
              </Link>
              <Link
                href="/chapters"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-secondary hover:text-accent transition py-2 font-medium"
              >
                Chapters
              </Link>
              <Link
                href="/literature"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-secondary hover:text-accent transition py-2 font-medium"
              >
                Literature
              </Link>

              {/* Mobile theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-full text-left text-sm text-secondary hover:text-accent transition py-2 font-medium"
                suppressHydrationWarning
              >
                {mounted
                  ? currentTheme === "light"
                    ? "🌙 Dark Mode"
                    : "☀️ Light Mode"
                  : "🌙 Dark Mode"}
              </button>
            </div>
          )}
        </nav>
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
