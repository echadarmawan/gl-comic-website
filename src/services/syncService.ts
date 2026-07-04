import { buildCombinedText } from "@/utils/buildCombinedText";
import { generateEmbedding } from "@/lib/embedding";
import { fetchComicsFromGoogleSheet } from "@/lib/googleSheets";
import { supabase } from "@/lib/supabase";

export async function syncComics() {
  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  const startedAt = Date.now();
  const comics = await fetchComicsFromGoogleSheet();

  for (const comic of comics) {
    const combinedText = buildCombinedText(comic);

    // Cari apakah komik sudah ada
    const { data: existingComic, error } = await supabase
      .from("comics")
      .select("*")
      .eq("id", comic.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    // ===========================
    // INSERT
    // ===========================
    if (!existingComic) {
      const embedding = await generateEmbedding(combinedText);

      const { error: insertError } = await supabase
        .from("comics")
        .insert({
          ...comic,
          genres: comic.genres.join(", "),
          tags: comic.tags.join(", "),
          combined_text: combinedText,
          embedding,
        });

      if (insertError) {
        console.error(insertError);
        throw insertError;
      }

      inserted++;
      continue;
    }

    // ===========================
    // SKIP
    // ===========================
    if (existingComic.combined_text === combinedText) {
      skipped++;
      continue;
    }

    // ===========================
    // UPDATE
    // ===========================
    const embedding = await generateEmbedding(combinedText);

    const { error: updateError } = await supabase
      .from("comics")
      .update({
        ...comic,
        genres: comic.genres.join(", "),
        tags: comic.tags.join(", "),
        combined_text: combinedText,
        embedding,
        updated_at: new Date().toISOString(),
      })
      .eq("id", comic.id);

    if (updateError) {
      console.error(updateError);
      throw updateError;
    }

    updated++;
  }

  const duration = ((Date.now() - startedAt) / 1000).toFixed(1);

  return {
    success: true,
    inserted,
    updated,
    skipped,
    total: comics.length,
    duration: `${duration} s`,
  };
}