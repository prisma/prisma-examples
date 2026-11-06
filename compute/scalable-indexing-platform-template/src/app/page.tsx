import { INITIAL_RESOURCES } from "@/lib/data";
import { DevShelfDashboard } from "@/components/features/resources/devshelf-dashboard";
import { NewsletterSection } from "@/components/features/resources/newsletter-section";
import { getCachedResources } from "@/lib/resources";
import { Category, Difficulty } from "@/lib/types";

const PAGE_SIZE = 20;

// Enable Incremental Static Regeneration / Next.js segment revalidation Rechecked
export const dynamic = "force-dynamic";
export const revalidate = 60;

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
  const categoryParam = typeof params.category === "string" ? params.category : "All Categories";
  const difficultyParam =
    typeof params.difficulty === "string" && ["Beginner", "Intermediate", "Advanced"].includes(params.difficulty)
      ? (params.difficulty as Difficulty)
      : "All";
  const viewParam = params.view === "list" ? "list" : "grid";

  let resources = INITIAL_RESOURCES;
  let hasNextPage = false;
  let hasPrevPage = false;
  let nextCursor: string | null = null;
  let prevCursor: string | null = null;
  let totalEstimatedCount = 2000000;

  try {
    const data = await getCachedResources(
      cursor,
      direction,
      query,
      categoryParam,
      difficultyParam,
      PAGE_SIZE
    );

    resources = data.resources;
    hasNextPage = data.hasNextPage;
    hasPrevPage = data.hasPrevPage;
    nextCursor = data.nextCursor;
    prevCursor = data.prevCursor;
    totalEstimatedCount = data.totalEstimatedCount;
  } catch (error) {
    console.error("Failed to load cached resources, using fallback:", error);
  }

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
        initialCategory={categoryParam as Category}
        initialDifficulty={difficultyParam}
        initialView={viewParam}
      />

      {/* Newsletter Subscription Callout */}
      <NewsletterSection />
    </>
  );
}
