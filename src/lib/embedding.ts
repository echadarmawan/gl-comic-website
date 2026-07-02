import { ai } from "./gemini";

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001", // Model embedding standar dari Gemini
    contents: text,
  });

  const firstEmbedding = response.embeddings?.[0];

  // Pastikan hasil embedding ada sebelum mengembalikan nilai
  if (!firstEmbedding || !firstEmbedding.values) {
    throw new Error("Gagal generate embedding");
  }

  return firstEmbedding.values;
}