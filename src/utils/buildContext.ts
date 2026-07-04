import { Comic } from "@/types/Comic";

// interface ComicWithCombinedText extends Comic {
//   combined_text: string;
// }

export interface MatchComic extends Omit<Comic, "genres" | "tags"> {
  genres: string;
  tags: string;
  combined_text: string;
  similarity: number;
}

export function buildContext(comics: MatchComic[]): string {
  if (comics.length === 0) {
    return "Tidak ada data yang relevan.";
  }

  return comics
    .map((comic) => comic.combined_text)
    .join("\n\n----------------------\n\n");
}