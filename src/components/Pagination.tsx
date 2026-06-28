export function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const pages: (number | "...")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }

  return (
    <div className="flex items-center gap-1 justify-center flex-wrap">
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1}
        className="px-2 py-1.5 text-sm rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
        «
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dot-${i}`} className="px-2 py-1.5 text-sm text-muted-foreground">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors cursor-pointer ${current === p ? "bg-primary text-white border-primary font-bold" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
          >
            {p}
          </button>
        )
      )}
      <button onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total}
        className="px-2 py-1.5 text-sm rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
        »
      </button>
    </div>
  );
}