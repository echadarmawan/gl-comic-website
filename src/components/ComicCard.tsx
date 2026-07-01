import { ComicThumbnail } from "./ComicThumbnail";

export function ComicCard({ comic, onClick }: { comic: Comic; onClick: () => void }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all group flex flex-col">
      <div className="aspect-[3/4] w-full overflow-hidden bg-[#5a6070]">
        <ComicThumbnail src={comic.image} title={comic.title} />
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <p className="font-bold text-sm text-foreground line-clamp-2 leading-tight">{comic.title}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{comic.author}</p>
        <div className="flex flex-wrap gap-1">
          {comic.genres.slice(0, 3).map((g) => (
            <span key={g} className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-medium border border-primary/15">
              {g}
            </span>
          ))}
        </div>
        <button
          onClick={onClick}
          className="mt-auto text-xs border border-border rounded-md px-3 py-1.5 font-semibold text-foreground/70 hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          View
        </button>
      </div>
    </div>
  );
}