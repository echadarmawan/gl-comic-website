"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function ComicModal({ comic, onClose }: { comic: Comic; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl border border-border w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-xl font-extrabold text-primary pr-8 leading-tight">{comic.title}</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 cursor-pointer">
              <X size={22} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-40 flex-shrink-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#5a6070]">
                {imgError ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/70 text-sm">Thumbnail</span>
                  </div>
                ) : (
                  <img src={comic.image} alt={comic.title} className="w-full h-full object-cover" onError={() => setImgError(true)} />
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-5">
                {[
                  { label: "Author", value: comic.author },
                  { label: "Chapters", value: comic.chapters },
                  { label: "Artist", value: comic.artist },
                  { label: "Release", value: String(comic.release) },
                  { label: "Type", value: comic.type },
                  { label: "Status", value: comic.status },
                  { label: "Genre", value: comic.genres.join(", ") },
                  { label: "Tags", value: comic.tags.slice(0, 4).join(", ") },
                  { label: "Where to Read", value: comic.read },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="font-bold text-foreground">{label}</span>
                    <span className="text-muted-foreground ml-2">{value}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-foreground mb-2">Summary</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{comic.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}