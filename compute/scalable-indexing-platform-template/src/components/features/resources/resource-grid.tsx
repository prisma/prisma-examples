"use client";

import { Resource, Category, Difficulty } from "@/lib/types";
import { ResourceCard } from "./resource-card";
import { ResourceListItem } from "./resource-list-item";
import { Pagination } from "@/components/common/pagination";
import { LayoutGrid, List, RotateCcw, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceGridProps {
  resources: Resource[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentCursor?: string | null;
  totalEstimatedCount: number;
  pageSize: number;
  searchQuery?: string;
  category?: Category;
  difficulty?: Difficulty | "All";
  viewMode?: "grid" | "list";
  isPending?: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onFirstPage: () => void;
  onDifficultyChange: (diff: Difficulty | "All") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onResetFilters: () => void;
}

export function ResourceGrid({
  resources,
  hasNextPage,
  hasPrevPage,
  currentCursor,
  totalEstimatedCount,
  pageSize,
  searchQuery = "",
  category = "All Categories",
  difficulty = "All",
  viewMode = "grid",
  isPending = false,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onDifficultyChange,
  onViewModeChange,
  onResetFilters,
}: ResourceGridProps) {
  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Catalog Header & Adaptive Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Curated Repositories &amp; Architecture Blueprints
            </h2>
            {isPending && (
              <Loader2 className="size-4 text-primary animate-spin inline-block" />
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-1.5">
            <span>Displaying <strong className="text-foreground">{resources.length}</strong> items</span>
            {/* <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Zap className="size-3" />
              <span>O(1) cursor seek</span>
            </span> */}
            {category !== "All Categories" && <span> in <strong className="text-foreground">{category}</strong></span>}
            {difficulty !== "All" && <span> (<strong className="text-foreground">{difficulty}</strong> level)</span>}
            {searchQuery && <span> matching &ldquo;<strong className="text-foreground">{searchQuery}</strong>&rdquo;</span>}
          </p>
        </div>

        {/* Adaptive Controls: Difficulty pills, View Mode toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty pills */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg border border-border bg-muted/30">
            {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => onDifficultyChange(diff)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  difficulty === diff
                    ? "bg-background text-foreground font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Grid vs List */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-border bg-muted/30">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon-xs"
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid className="size-3.5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon-xs"
              onClick={() => onViewModeChange("list")}
              aria-label="List view"
              title="Compact list view"
            >
              <List className="size-3.5" />
            </Button>
          </div>

          {/* Reset Filters button if any filter is active */}
          {(searchQuery || category !== "All Categories" || difficulty !== "All" || currentCursor) && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="text-xs gap-1"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>

      {/* Grid or List Display with pending transition opacity */}
      <div className={`transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
        {resources.length > 0 ? (
          viewMode === "grid" ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-2.5">
              {resources.map((resource) => (
                <ResourceListItem key={resource.id} resource={resource} />
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="mt-10 py-16 text-center border border-dashed border-border rounded-xl bg-muted/20 p-8">
            <h3 className="font-heading text-base font-semibold text-foreground">
              No indexed entries match your filter
            </h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search query, selecting another category, or clearing the difficulty filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="mt-4 gap-1.5"
            >
              <RotateCcw className="size-3" />
              <span>Clear all filters</span>
            </Button>
          </div>
        )}
      </div>

      {/* Cursor Pagination */}
      <Pagination
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        onFirstPage={onFirstPage}
        currentCursor={currentCursor}
        totalEstimatedCount={totalEstimatedCount}
        isLoading={isPending}
      />
    </section>
  );
}
