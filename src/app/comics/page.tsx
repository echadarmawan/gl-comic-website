import { ComicsPage } from "@/components/ComicsPage";
import { getComics } from "@/services/comicService";

export default async function Page() {
  const comics = await getComics();

  return <ComicsPage comics={comics} />;
}