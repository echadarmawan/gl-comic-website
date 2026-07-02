import { Comic } from "@/types/Comic";

export function buildCombinedText(comic: Comic): string {
  return `
Title: ${comic.title}

Author: ${comic.author}

Artist: ${comic.artist}

Genres: ${comic.genres}

Type: ${Array.isArray(comic.genres) ? comic.genres.join(", ") : comic.genres}

Chapters: ${comic.chapters}

Release: ${comic.release}

Status: ${comic.status}

Summary: ${comic.summary}

Tags: ${Array.isArray(comic.tags) ? comic.tags.join(", ") : comic.tags}

Read on: ${comic.read}

Image: ${comic.image}
`.trim();
}