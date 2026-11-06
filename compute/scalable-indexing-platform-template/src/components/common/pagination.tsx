"use client";

import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CursorPaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onFirstPage: () => void;
  currentCursor?: string | null;
  totalEstimatedCount?: number;
  isLoading?: boolean;
}

export function Pagination({
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  onFirstPage,
  currentCursor,
  totalEstimatedCount = 2000000,
  isLoading = false,
}: CursorPaginationProps) {
  return (
    <nav
      aria-label="Cursor-based server pagination"
      className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70 pt-6"
    >
      {/* Index and Cursor Status Info */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground order-2 sm:order-1 font-mono">
        <div>
          Index: <strong className="text-foreground">{totalEstimatedCount.toLocaleString()}</strong> records
        </div>
        {/* <span className="text-border">|</span> */}
        {/* <div className="flex items-center gap-1.5">
          <span>Cursor:</span>
          <span className="px-1.5 py-0.5 rounded bg-muted text-[11px] text-foreground font-semibold">
            {currentCursor ? `${currentCursor.slice(0, 8)}…` : "HEAD"}
          </span>
        </div> */}
      </div>

      {/* Keyset Cursor Navigation Controls */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        {/* Reset to First Page (HEAD) */}
        {currentCursor && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFirstPage}
            disabled={isLoading}
            className="text-xs gap-1 font-mono text-muted-foreground hover:text-foreground"
            title="Jump back to start"
          >
            <RotateCcw className="size-3" />
            <span className="hidden xs:inline">First</span>
          </Button>
        )}

        {/* Previous Cursor Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={!hasPrevPage || isLoading}
          aria-label="Go to previous cursor batch"
          className="gap-1 font-medium"
        >
          <ChevronLeft className="size-3.5" />
          <span>Previous</span>
        </Button>

        {/* Next Cursor Button */}
        <Button
          variant={hasNextPage ? "default" : "outline"}
          size="sm"
          onClick={onNextPage}
          disabled={!hasNextPage || isLoading}
          aria-label="Go to next cursor batch"
          className="gap-1 font-medium"
        >
          <span>Next</span>
          {isLoading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ChevronRight className="size-3.5" />
          )}
        </Button>
      </div>
    </nav>
  );
}
