import { Comic } from "@/types/Comic";

export function buildCombinedText(comic: Comic): string {
  const genres = Array.isArray(comic.genres)
    ? comic.genres.join(", ")
    : comic.genres;

  const tags = Array.isArray(comic.tags)
    ? comic.tags.join(", ")
    : comic.tags;

  return `
"${comic.title}" is a ${comic.type} created by ${comic.author} and illustrated by ${comic.artist}.

It belongs to the genres: ${genres}.

The comic was released in ${comic.release} and is currently ${comic.status}. It has ${comic.chapters} chapters.

Synopsis:
${comic.summary}

Important themes and keywords include: ${tags}.

This comic can be read on ${comic.read}.
`.trim();
}