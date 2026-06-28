"use client";

import { CatLogo } from "./CatLogo";
import { SparkleIcon } from "./SparkleIcon";
import { BookOpen } from "lucide-react";

export function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center mx-auto">
          <CatLogo />
        </div>
        <SparkleIcon size={20} className="text-primary absolute -top-1 -right-1" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 leading-tight">
        Selamat Datang di{" "}
        <span className="text-primary italic">ComicLib</span>
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
        Temukan ribuan komik Girls Love — manga, manhwa, manhua — dalam satu perpustakaan yang cantik dan mudah ditelusuri.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setPage("comics")}
          className="px-8 py-3 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <BookOpen size={18} />
          Jelajahi Komik
        </button>
        <button
          onClick={() => setPage("chatbot")}
          className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold text-base hover:bg-primary/10 transition-all flex items-center gap-2 cursor-pointer"
        >
          <SparkleIcon size={18} className="text-primary" />
          Tanya ComBot
        </button>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg w-full">
        {[
          { num: "55+", label: "Koleksi Komik" },
          { num: "10+", label: "Genre Tersedia" },
          { num: "100%", label: "Gratis Akses" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-extrabold text-primary">{stat.num}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 mb-4 max-w-2xl w-full">
        <p className="text-xs text-muted-foreground mb-4 font-semibold uppercase tracking-wider">Genre Populer</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Romance", "Drama", "Fantasy", "Comedy", "School Life", "Historical", "Slice of Life", "Mystery", "Yuri", "Action"].map((g) => (
            <span key={g} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium border border-primary/20">
              {g}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}