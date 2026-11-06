"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Resource, Category, Difficulty } from "@/lib/types";
import { SearchSection } from "./search-section";
import { ResourceGrid } from "./resource-grid";

interface DevShelfDashboardProps {
  resources: Resource[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextCursor: string | null;
  prevCursor: string | null;
  currentCursor: string | null;
  totalEstimatedCount: number;
  pageSize: number;
  initialQuery?: string;
  initialCategory?: Category;
  initialDifficulty?: Difficulty | "All";
  initialView?: "grid" | "list";
}

export function DevShelfDashboard({
  resources,
  hasNextPage,
  hasPrevPage,
  nextCursor,
  prevCursor,
  currentCursor,
  totalEstimatedCount,
  pageSize,
  initialQuery = "",
  initialCategory = "All Categories",
  initialDifficulty = "All",
  initialView = "grid",
}: DevShelfDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Helper to build new query strings
  const updateQueryParams = React.useCallback(
    (updates: Record<string, string | null>, shouldScroll: boolean = false) => {
      const current = new URLSearchParams(searchParams?.toString() ?? "");

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "All Categories" || value === "All") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      const queryString = current.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

      startTransition(() => {
        router.push(targetUrl, { scroll: shouldScroll });
      });

      if (shouldScroll) {
        const catalogEl = document.getElementById("catalog");
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [router, pathname, searchParams]
  );

  const handleSearchChange = (query: string) => {
    updateQueryParams({ q: query || null, cursor: null, dir: null });
  };

  const handleCategoryChange = (cat: Category) => {
    updateQueryParams({
      category: cat === "All Categories" ? null : cat,
      cursor: null,
      dir: null,
    });
  };

  const handleDifficultyChange = (diff: Difficulty | "All") => {
    updateQueryParams({
      difficulty: diff === "All" ? null : diff,
      cursor: null,
      dir: null,
    });
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    updateQueryParams({ view: mode === "grid" ? null : mode }, false);
  };

  const handleNextPage = () => {
    if (nextCursor) {
      updateQueryParams({ cursor: nextCursor, dir: "next" }, true);
    }
  };

  const handlePrevPage = () => {
    if (prevCursor) {
      updateQueryParams({ cursor: prevCursor, dir: "prev" }, true);
    }
  };

  const handleFirstPage = () => {
    updateQueryParams({ cursor: null, dir: null }, true);
  };

  const handleResetFilters = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  const handleQuickTagSelect = (tag: string) => {
    updateQueryParams({ q: tag, cursor: null, dir: null });
  };

  return (
    <>
      <SearchSection
        searchQuery={initialQuery}
        onSearchChange={handleSearchChange}
        category={initialCategory}
        onCategoryChange={handleCategoryChange}
        onQuickTagSelect={handleQuickTagSelect}
      />
      <ResourceGrid
        resources={resources}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        currentCursor={currentCursor}
        totalEstimatedCount={totalEstimatedCount}
        pageSize={pageSize}
        searchQuery={initialQuery}
        category={initialCategory}
        difficulty={initialDifficulty}
        viewMode={initialView}
        isPending={isPending}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onFirstPage={handleFirstPage}
        onDifficultyChange={handleDifficultyChange}
        onViewModeChange={handleViewModeChange}
        onResetFilters={handleResetFilters}
      />
    </>
  );
}
