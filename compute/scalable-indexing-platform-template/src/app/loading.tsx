import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      {/* Hero Skeleton */}
      <section className="pt-12 pb-14 md:pt-18 md:pb-20 border-b border-border/70 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <Skeleton className="h-6 w-44 rounded-full mb-5" />
          <Skeleton className="h-10 sm:h-12 w-3/4 max-w-xl mb-4" />
          <Skeleton className="h-5 w-2/3 max-w-md mb-8" />
          {/* Search bar skeleton */}
          <Skeleton className="h-12 w-full max-w-2xl rounded-xl" />
          {/* Tag pills skeleton */}
          <div className="mt-4 flex gap-2 justify-center">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>
      </section>

      {/* Catalog Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-border/70">
          <div className="space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-28 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>

        {/* Cards Skeleton Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-card space-y-3"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-18 rounded-md" />
                <Skeleton className="h-4 w-14 rounded-md" />
              </div>
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-10 w-full" />
              <div className="flex gap-1.5 pt-1">
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="pt-3 border-t border-border flex justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

