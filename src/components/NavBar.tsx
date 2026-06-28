"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState} from "react";
import { CatLogo } from "./CatLogo";
import { SparkleIcon } from "./SparkleIcon";
import { Sun, X, Moon, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl text-primary hover:opacity-80 transition-opacity cursor-pointer"
        >
          <CatLogo />
          <span className="italic">
              ComicLib
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2">
          <Link
            href="/comics"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer
            ${
            pathname === "/comics"
            ? "text-primary"
            : "text-foreground/70 hover:text-primary"
            }`}
          >
            <BookOpen size={16} />
            Comics
          </Link>
          <Link
            href="/chatbot"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer
            ${
            pathname === "/chatbot"
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
            }`}
          >
            <SparkleIcon size={16} className="text-white" />
            ComBot
          </Link>
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="ml-2 p-2 rounded-full border border-border hover:bg-muted transition-colors cursor-pointer"
            title="Toggle dark mode"
          >
            {theme === "dark"
              ? <Sun size={16} className="text-primary" />
              : <Moon size={16} className="text-primary" />
            }
          </button>
        </nav>

        {/* Mobile nav toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="sm:hidden p-2 rounded-full border border-border hover:bg-muted transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} className="text-primary" /> : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="1.5" rx="1" fill="currentColor" className="text-primary" />
              <rect x="2" y="8.25" width="14" height="1.5" rx="1" fill="currentColor" className="text-primary" />
              <rect x="2" y="12.5" width="14" height="1.5" rx="1" fill="currentColor" className="text-primary" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-card border-t border-border px-4 py-3 flex flex-col gap-2 shadow-lg">
          <Link
            href="/comics"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer w-full text-left ${
            pathname === "/comics"
            ? "bg-accent text-primary"
            : "hover:bg-muted text-foreground/70"
            }`}
          >
            <BookOpen size={16} />
            Comics
          </Link>
          <Link
            href="/chatbot"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer w-full text-left
            ${
            pathname === "/chatbot"
            ? "bg-primary text-white"
            : "bg-primary/10 text-primary"
            }`}
          >
            <SparkleIcon size={16} className="text-primary" /> ComBot
          </Link>
          <button
            onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setMobileOpen(false); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-muted text-foreground/70 transition-all cursor-pointer w-full text-left"
          >
            {theme === "dark"
              ? <Sun size={16} className="text-primary"/>
              : <Moon size={16} className="text-primary"/>
            }
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
}