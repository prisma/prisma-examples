import { DevShelfDashboard } from "@/components/features/resources/devshelf-dashboard";
import { NewsletterSection } from "@/components/features/resources/newsletter-section";
import { CATEGORIES, DIFFICULTIES, getCachedResources } from "@/lib/resources";
import { Category, Difficulty } from "@/lib/types";

const PAGE_SIZE = 20;

// Every request reads the URL's filters and cursor, so the page is rendered
// per request. The hot queries are cached in src/lib/resources.ts.
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    cursor?: string;
    dir?: string;
    q?: string;
    category?: string;
    difficulty?: string;
    view?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const cursor = typeof params.cursor === "string" && params.cursor.trim() ? params.cursor.trim() : null;
  const direction = params.dir === "prev" ? "prev" : "next";
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const categoryParam =
    typeof params.category === "string" && (CATEGORIES as readonly string[]).includes(params.category)
      ? (params.category as Category)
      : "All Categories";
  const difficultyParam =
    typeof params.difficulty === "string" && (DIFFICULTIES as readonly string[]).includes(params.difficulty)
      ? (params.difficulty as Difficulty)
      : "All";
  const viewParam = params.view === "list" ? "list" : "grid";

  // A failed query throws, so the visitor gets the error boundary
  // (src/app/error.tsx) with a retry button instead of placeholder data.
  const { resources, hasNextPage, hasPrevPage, nextCursor, prevCursor, totalEstimatedCount } =
    await getCachedResources(cursor, direction, query, categoryParam, difficultyParam, PAGE_SIZE);

  return (
    <>
      {/* High-Performance Cached & Revalidated Dashboard */}
      <DevShelfDashboard
        resources={resources}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        nextCursor={nextCursor}
        prevCursor={prevCursor}
        currentCursor={cursor}
        totalEstimatedCount={totalEstimatedCount}
        pageSize={PAGE_SIZE}
        initialQuery={query}
        initialCategory={categoryParam}
        initialDifficulty={difficultyParam}
        initialView={viewParam}
      />

      {/* Newsletter Subscription Callout */}
      <NewsletterSection />
    </>
  );
}
