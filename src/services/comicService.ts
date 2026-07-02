import { supabase } from "@/lib/supabase";

export async function getComics() {

  const { data, error } = await supabase
      .from("comics")
      .select("*")
      .order("title");

  console.log("data: ", data);
  // console.log("error: ", error);
  
  if (error) throw error;

  return (data ?? []).map((comic) => ({
    ...comic,
    genres: comic.genres
      ? comic.genres.split(",").map((g) => g.trim())
      : [],
    tags: comic.tags
      ? comic.tags.split(",").map((t) => t.trim())
      : [],
  }));
}