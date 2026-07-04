import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ollama } from "@/lib/ollama";
import { generateEmbedding } from "@/lib/embedding";
import { Comic } from "@/types/Comic";
import { buildContext } from "@/utils/buildContext";
import type { MatchComic } from "@/utils/buildContext";
import { buildPrompt } from "@/utils/buildPrompt";

interface AskQuestionResult {
  answer: string;
  sources: Comic[];
  similarity: number[];
}

export async function askQuestion(
  sessionId: string,
  question: string
): Promise<AskQuestionResult> {

  // 1. Generate embedding pertanyaan
  const queryEmbedding = await generateEmbedding(question);

  // 2. Cari comic paling relevan
  const { data, error } = await supabaseAdmin.rpc("match_comics", {
    query_embedding: queryEmbedding,
    match_threshold: 0.6,
    match_count: 5,
    filter_genres: null,
  });

  if (error) {
    throw error;
  }

  const matches = data ?? [];
  console.log("matches: ", matches);
  console.log(matches[0]);
  console.log(matches[0]?.genres);
  console.log(typeof matches[0]?.genres);
  console.log(Array.isArray(matches[0]?.genres));

  console.log(matches[0]?.tags);
  console.log(typeof matches[0]?.tags);
  console.log(Array.isArray(matches[0]?.tags));

  // 3. Susun context dan prompt
  const context = buildContext(matches);
  console.log("context: ", context);

  const prompt = buildPrompt({
    question,
    context,
  });

  // 5. Kirim ke GPT
  const response = await ollama.chat({
    model: "llama3",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  
  const sources = matches.map((comic: MatchComic) => ({
      id: comic.id,
      title: comic.title,
      author: comic.author,
      artist: comic.artist,
      genres: comic.genres
        ? comic.genres.split(",").map(g => g.trim())
        : [],
      type: comic.type,
      chapters: comic.chapters,
      release: comic.release,
      status: comic.status,
      summary: comic.summary,
      tags: comic.tags
        ? comic.tags.split(",").map(t => t.trim())
        : [],
      image: comic.image,
    }));
  const similarity = matches.map((comic: MatchComic) => comic.similarity);
  console.log("sources: ", sources);
  console.log("similarity: ", similarity);

  return {
    answer: response.message.content,

    sources: matches.map((comic: MatchComic) => ({
      id: comic.id,
      title: comic.title,
      author: comic.author,
      artist: comic.artist,
      genres: comic.genres
        ? comic.genres.split(",").map(g => g.trim())
        : [],
      type: comic.type,
      chapters: comic.chapters,
      release: comic.release,
      status: comic.status,
      summary: comic.summary,
      tags: comic.tags
        ? comic.tags.split(",").map(t => t.trim())
        : [],
      image: comic.image,
    })),

    similarity: matches.map((comic: MatchComic) => comic.similarity),
  };
}