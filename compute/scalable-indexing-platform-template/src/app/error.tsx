"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error("DevShelf Application Error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center p-8 rounded-2xl border border-border bg-card shadow-xs">
        <div className="size-12 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center mb-4">
          <AlertCircle className="size-6" />
        </div>

        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Index Error
        </span>

        <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
          Something went wrong
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          The requested operation failed or the full-text search index could not complete the query.
        </p>

        {error.digest && (
          <div className="mt-3 p-2 rounded-md bg-muted font-mono text-[11px] text-muted-foreground select-all">
            Digest: {error.digest}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => reset()}
            className="w-full sm:w-auto gap-1.5"
          >
            <RotateCcw className="size-3.5" />
            <span>Try again</span>
          </Button>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-full sm:w-auto gap-1.5"
            )}
          >
            <Home className="size-3.5" />
            <span>Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
