"use client";

import * as React from "react";
import { Search, X, CornerDownLeft } from "lucide-react";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchSectionProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  category?: Category;
  onCategoryChange?: (val: Category) => void;
  onQuickTagSelect?: (tag: string) => void;
}

const CATEGORIES: Category[] = [
  "All Categories",
  "Web Dev",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "Cloud Computing",
  "Mobile Dev",
];

const POPULAR_TAGS = [
  "PyTorch",
  "Next.js",
  "Rust",
  "Kubernetes",
  "PostgreSQL",
  "Cybersecurity",
  "SwiftUI",
  "CRDT",
];

export function SearchSection({
  searchQuery = "",
  onSearchChange,
  category = "All Categories",
  onCategoryChange,
  onQuickTagSelect,
}: SearchSectionProps) {
  const [internalQuery, setInternalQuery] = React.useState(searchQuery);
  const [prevSearchQuery, setPrevSearchQuery] = React.useState(searchQuery);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Synchronize internal state with prop without cascading render effect
  if (prevSearchQuery !== searchQuery) {
    setPrevSearchQuery(searchQuery);
    setInternalQuery(searchQuery);
  }

  // Clear debounce timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Keyboard shortcut: '/' to focus search, 'Escape' to clear
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        setInternalQuery("");
        onSearchChange?.("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalQuery(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearchChange?.(val);
    }, 400);
  };

  const handleClear = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setInternalQuery("");
    onSearchChange?.("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSearchChange?.(internalQuery);
  };

  return (
    <section className="relative pt-12 pb-14 md:pt-18 md:pb-20 border-b border-border/70 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Understated index status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background text-xs text-muted-foreground mb-5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">1,000,000+ records indexed</span>
        </div>

        {/* H1 Heading - clean, authoritative sentence-case, no split colors */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-balance">
          Index &amp; Discover 1M+ Open Source Learning Projects
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Sub-second full-text search across curated tutorials, mini-projects, and machine learning models.
        </p>

        {/* Search Control Bar */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-stretch gap-2 p-1.5 rounded-xl border border-border bg-card shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20 transition-all"
          role="search"
          aria-label="Search open-source resources"
        >
          {/* Search Input Field */}
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={internalQuery}
              onChange={handleChange}
              placeholder="Search by keyword, topic, or tech stack (e.g., PyTorch, Next.js)..."
              aria-label="Search by keyword, topic, or tech stack"
              className="w-full pl-9 pr-14 py-2 text-sm bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <div className="absolute right-2.5 flex items-center gap-1">
              {internalQuery ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search input"
                  className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-[10px] text-muted-foreground">
                  /
                </kbd>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-44">
              <select
                value={category}
                onChange={(e) => onCategoryChange?.(e.target.value as Category)}
                aria-label="Filter by category"
                className="w-full appearance-none pl-3 pr-7 py-2 rounded-lg border border-border bg-muted/40 hover:bg-muted/60 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-popover text-popover-foreground">
                    {cat}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px]">
                ▼
              </span>
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              size="default"
              className="font-medium shrink-0"
            >
              <span>Search</span>
              <CornerDownLeft className="size-3.5 opacity-70 hidden sm:inline" />
            </Button>
          </div>
        </form>

        {/* Popular Tags Row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <span className="text-muted-foreground/80 font-medium mr-1">Trending:</span>
          {POPULAR_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-muted hover:text-foreground transition-colors font-mono text-[11px] font-normal"
              onClick={() => onQuickTagSelect?.(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
