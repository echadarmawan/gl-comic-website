"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Home, ChevronRight, Search, X, BookOpen } from "lucide-react";
import { ComicCard } from "./ComicCard";
import { Pagination } from "./Pagination";
import { ComicModal } from "./ComicModal";
import Link from "next/link";

const ITEMS_PER_PAGE = 20;

interface ComicsPageProps {
  comics: Comic[];
}

export function ComicsPage({ comics }: ComicsPageProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "author">("title");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handler = (e: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   return () => document.removeEventListener("mousedown", handler);
  // }, []);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setCurrentPage(1);
    }, 300);
  }, []);

  const filtered = comics.filter((c) => {
    const q = debouncedSearch.toLowerCase();

    if (!q) return true;

    if (searchBy === "author")
      return c.author.toLowerCase().includes(q);

    return c.title.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const searchByLabel = searchBy === "title" ? "Title" : "Author";

  return (
    <>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 bg-card border border-border rounded-lg px-4 py-2.5">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
            <Home size={14} /> Home
          </Link>
          {/* <button onClick={() => setPage("home")} className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
            <Home size={14} /> Home
          </button> */}
          <ChevronRight size={14} />
          <span className="text-foreground font-semibold">All Comics</span>
        </nav>

        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={`Search by ${searchByLabel}...`}
              className="w-full pl-9 pr-9 py-2.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm cursor-text"
            />
            {search && (
              <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search By dropdown */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap"
            >
              Search By: {searchByLabel}
              <ChevronRight size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-90" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-20">
                {(["title", "author"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSearchBy(opt); setDropdownOpen(false); setCurrentPage(1); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${searchBy === opt ? "bg-accent text-primary" : "hover:bg-muted text-foreground"}`}
                  >
                    Search by {opt === "title" ? "Title" : "Author"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">Komik tidak ditemukan</p>
            <p className="text-sm mt-1">Coba kata kunci yang berbeda</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {paginated.map((comic) => (
                <ComicCard key={comic.id} comic={comic} onClick={() => setSelectedComic(comic)} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination current={currentPage} total={totalPages} onChange={(p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
            )}
          </>
        )}
      </main>

      {selectedComic && <ComicModal comic={selectedComic} onClose={() => setSelectedComic(null)} />}
    </>
  );
};