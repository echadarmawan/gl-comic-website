interface Comic {
  id: number;
  title: string;
  author: string;
  artist: string;
  genres: string[];
  type: string;
  chapters: string;
  release: number;
  status: string;
  summary: string;
  tags: string[];
  read: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

type Page = "home" | "comics" | "chatbot";