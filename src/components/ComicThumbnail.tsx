"use client";

import { useState} from "react";

export function ComicThumbnail({ src, title }: { src: string; title: string }) {
  const [error, setError] = useState(false);
  return error ? (
    <div className="w-full h-full bg-[#5a6070] flex items-center justify-center rounded-t-xl">
      <span className="text-white/70 text-sm font-medium">Thumbnail</span>
    </div>
  ) : (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover rounded-t-xl"
      onError={() => setError(true)}
    />
  );
}