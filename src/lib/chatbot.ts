const BOT_RESPONSES = [
  "Halo! Saya ComBot, asisten komik kamu! Tanyakan apa saja tentang koleksi komik kami — sinopsis, rekomendasi genre, atau info author. Kami punya {total} komik di perpustakaan!",
  "Hai! ComBot siap membantu kamu menemukan komik yang sempurna. Coba tanya: 'Rekomendasikan komik romance', atau 'Apa sinopsis dari [judul komik]?'",
  "Selamat datang di ComBot! Saya bisa membantu kamu menemukan komik berdasarkan genre, author, atau judul. Mau cari apa hari ini?",
];

export function generateBotResponse(message: string, comics: Comic[]): string {
  const lower = message.toLowerCase();

  const found = comics.find((c) =>
    lower.includes(c.title.toLowerCase()) ||
    lower.includes(c.author.toLowerCase().split("/")[0].trim())
  );

  if (found) {
    return `**${found.title}**\n\nOleh: ${found.author} | Type: ${found.type} | Status: ${found.status}\nChapters: ${found.chapters} | Tahun: ${found.release}\nGenre: ${found.genres.join(", ")}\n\n**Sinopsis:**\n${found.summary}`;
  }

  const genreKeywords: Record<string, string> = {
    romance: "Romance", drama: "Drama", fantasy: "Fantasy", comedy: "Comedy",
    action: "Action", historical: "Historical", mystery: "Mystery",
    yuri: "Yuri", slice: "Slice of Life", school: "School Life",
  };

  for (const [kw, genre] of Object.entries(genreKeywords)) {
    if (lower.includes(kw)) {
      const matches = comics.filter((c) => c.genres.includes(genre)).slice(0, 3);
      if (matches.length > 0) {
        return `Berikut rekomendasi komik ber-genre **${genre}** untukmu:\n\n${matches
          .map((c, i) => `**${i + 1}. ${c.title}** — oleh ${c.author}\n${c.summary.substring(0, 120)}...`)
          .join("\n\n")}`;
      }
    }
  }

  if (lower.includes("rekomend") || lower.includes("recommend") || lower.includes("bagus") || lower.includes("best")) {
    const picks = comics.filter((c) => c.status === "Completed").slice(0, 3);
    return `Ini beberapa komik **Completed** yang populer di ComicLib:\n\n${picks
      .map((c, i) => `**${i + 1}. ${c.title}** (${c.type})\nGenre: ${c.genres.slice(0, 2).join(", ")}\n${c.summary.substring(0, 100)}...`)
      .join("\n\n")}`;
  }

  if (lower.includes("berapa") || lower.includes("total") || lower.includes("jumlah") || lower.includes("how many")) {
    return `ComicLib saat ini memiliki **${comics.length} komik** dalam koleksinya! Tersedia dalam berbagai format: Manga, Manhua, Manhwa, Web Comic, dan lainnya.`;
  }

  const random = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
  return random.replace("{total}", String(comics.length));
}