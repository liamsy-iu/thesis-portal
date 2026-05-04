"use client";
import { useState, useEffect } from "react";
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

const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD || "thesis2025";

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem("thesis-auth");
    if (auth === "authenticated") setIsAuthenticated(true);
    const theme = localStorage.getItem("theme") || "light";
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem("thesis-auth", "authenticated");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("thesis-auth");
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
  };

  if (!isAuthenticated) {
    return (
      <html lang="en" className={`${crimsonPro.variable} ${inter.variable}`}>
        <body>
          <div className="min-h-screen flex items-center justify-center bg-primary">
            <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
              <h1 className="text-2xl font-bold text-primary mb-6 text-center font-crimson">
                Thesis Research Portal
              </h1>
              <p className="text-secondary text-sm mb-6 text-center">
                Enter password to access the portal
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-secondary border border-theme text-primary"
                    placeholder="Enter password"
                    autoFocus
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded font-medium"
                >
                  Access Portal
                </button>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <nav className="bg-card border-b-2 border-theme px-4 md:px-6 py-5 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8 flex-1">
              <h1 className="text-lg md:text-xl font-semibold text-primary font-crimson">
                Thesis Research Portal
              </h1>
              <div className="hidden md:flex gap-6">
                <Link href="/" className="text-sm text-secondary hover:text-accent transition font-medium">Dashboard</Link>
                <Link href="/data" className="text-sm text-secondary hover:text-accent transition font-medium">Data Analysis</Link>
                <Link href="/chapters" className="text-sm text-secondary hover:text-accent transition font-medium">Chapters</Link>
                <Link href="/literature" className="text-sm text-secondary hover:text-accent transition font-medium">Literature</Link>
                <Link href="/shariah" className="text-sm text-secondary hover:text-accent transition font-medium">Shariah Analysis</Link>
                <Link href="/export" className="text-sm text-secondary hover:text-accent transition font-medium">Export PDF</Link>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-secondary hover:bg-accent hover:text-white transition mr-4"
              aria-label="Toggle theme"
            >
              {mounted ? (currentTheme === "light" ? "🌙" : "☀️") : "🌙"}
            </button>

            <button onClick={handleLogout} className="hidden md:block text-sm text-secondary hover:text-accent mr-4">
              Logout
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-secondary hover:text-accent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <p className="hidden md:block text-xs text-muted font-medium tracking-wider">
              M-PESA · 2007-2025
            </p>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-theme space-y-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-secondary hover:text-accent transition py-2 font-medium">Dashboard</Link>
              <Link href="/data" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-secondary hover:text-accent transition py-2 font-medium">Data Analysis</Link>
              <Link href="/chapters" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-secondary hover:text-accent transition py-2 font-medium">Chapters</Link>
              <Link href="/literature" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-secondary hover:text-accent transition py-2 font-medium">Literature</Link>
              <Link href="/shariah" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-secondary hover:text-accent transition py-2 font-medium">Shariah Analysis</Link>
              <Link href="/export" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-secondary hover:text-accent transition py-2 font-medium">Export PDF</Link>
              <button onClick={toggleTheme} className="w-full text-left text-sm text-secondary hover:text-accent transition py-2 font-medium">
                {mounted ? (currentTheme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode") : "🌙 Dark Mode"}
              </button>
              <button onClick={handleLogout} className="w-full text-left text-sm text-secondary hover:text-accent transition py-2 font-medium">
                Logout
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
