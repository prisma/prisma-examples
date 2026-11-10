import { unstable_cache } from "next/cache";
import { tsquery } from "@prisma/orm-postgres/target/full-text";
import { db } from "../prisma/db";
import { ensureSeeded } from "../prisma/seed";
import { Category, Difficulty, Resource } from "./types";

export interface GetResourcesResult {
  resources: Resource[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextCursor: string | null;
  prevCursor: string | null;
  totalEstimatedCount: number;
}

export const CATEGORIES: readonly Exclude<Category, "All Categories">[] = [
  "Web Dev",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "Cloud Computing",
  "Mobile Dev",
];

export const DIFFICULTIES: readonly Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

// Request limits. Everything below comes from the URL, so it is bounded before
// it reaches the database.
const MAX_QUERY_LENGTH = 100;
const MAX_QUERY_WORDS = 6;
const MAX_CURSOR_LENGTH = 64;
const MAX_PAGE_SIZE = 50;

// How many matching ids a search reads from its index before deciding how to
// page. Fewer matches than this are sorted directly; more means the term is
// common enough to page through the table in id order.
const SEARCH_PROBE_LIMIT = 1_000;

// Below this many rows an exact COUNT(*) is cheap, and the planner's estimate
// is often missing (a table that was never analyzed reports -1).
const EXACT_COUNT_BELOW = 100_000;

type ResourceCollection = typeof db.orm.public.Resource;

/**
 * The catalog query: optional category and difficulty filters, an optional
 * search, and keyset (cursor) pagination.
 *
 * How it stays fast and correct at 1M+ rows:
 *
 * 1. One stable order for every mode: `ORDER BY id`. `id` is the primary key,
 *    so the order is total and a cursor (`id > last` or `id < first`) can
 *    neither skip nor repeat a row, with or without a search.
 * 2. Browsing with filters seeks straight to the cursor in a composite B-tree
 *    index: (category, id), (difficulty, id) or (category, difficulty, id).
 * 3. A text search uses PostgreSQL full-text search over title and
 *    description, backed by the GIN index `resource_search` that the contract
 *    declares with `@@fullTextIndex`. Each word is a prefix term, so typing
 *    "kuber" finds "Kubernetes". A query that matches nothing returns from the
 *    index without reading the table.
 * 4. A `#tag` search uses the GIN index on the `tags` array.
 * 5. Rare and missing search terms are answered from those GIN indexes alone;
 *    see the probe in `fetchResources`.
 */
function matching(query: string, category: string, difficulty: string): ResourceCollection {
  let resources = db.orm.public.Resource;

  if (category) resources = resources.where({ category }) as ResourceCollection;
  if (difficulty) resources = resources.where({ difficulty }) as ResourceCollection;

  if (query.startsWith("#")) {
    // Tag search: `tags @> ARRAY['#PyTorch']`.
    resources = resources.where((r, { fns }) =>
      fns.raw`${r.tags} @> ARRAY[${query}]::text[]`.returns("pg/bool@1"),
    ) as ResourceCollection;
  } else if (query) {
    // Every word must match title or description, as a prefix. A single word
    // also matches the tag of that name, so "PyTorch" finds rows tagged
    // #PyTorch whose text never spells it out.
    const words = query.split(/\s+/).filter(Boolean).slice(0, MAX_QUERY_WORDS);
    resources = resources.where((r, { fns, indexes }) => {
      const text = fns.and(
        ...words.map((word) => fns.fullTextMatches(indexes.resource_search, tsquery`${word}:*`)),
      );
      if (words.length !== 1) return text;
      return fns.or(text, fns.raw`${r.tags} @> ARRAY[${`#${words[0]}`}]::text[]`.returns("pg/bool@1"));
    }) as ResourceCollection;
  }

  return resources;
}

type Page = Omit<GetResourcesResult, "totalEstimatedCount">;

// No row lies beyond the cursor. The page the visitor came from still exists,
// so the button that leads back to it stays enabled.
function emptyPage(cursor: string | null, direction: "next" | "prev"): Page {
  return {
    resources: [],
    hasNextPage: direction === "prev" && Boolean(cursor),
    hasPrevPage: direction === "next" && Boolean(cursor),
    nextCursor: null,
    prevCursor: null,
  };
}

async function fetchResources(
  cursor: string | null,
  direction: "next" | "prev",
  query: string,
  category: string,
  difficulty: string,
  pageSize: number,
): Promise<Page> {
  let filtered = matching(query, category, difficulty);
  // Where the ordered read below resumes. A search that already holds every
  // remaining match clears it.
  let seekAfter = cursor;

  if (query) {
    // A search first asks the search index alone for the matches beyond the
    // cursor, in no particular order and capped at SEARCH_PROBE_LIMIT. Without
    // an ORDER BY PostgreSQL answers this from the GIN index, so a term that
    // matches nothing, or only a few rows, never walks the table in id order
    // looking for a page that is not there.
    const beyondCursor =
      cursor === null
        ? filtered
        : filtered.where((r) => (direction === "prev" ? r.id.lt(cursor) : r.id.gt(cursor)));
    const probe = await beyondCursor.select("id").limit(SEARCH_PROBE_LIMIT).all();

    if (probe.length < SEARCH_PROBE_LIMIT) {
      // Those are all the matches there are: order just these by id below.
      if (probe.length === 0) return emptyPage(cursor, direction);
      const ids = probe.map((r) => r.id);
      filtered = db.orm.public.Resource.where((r) => r.id.in(ids)) as ResourceCollection;
      seekAfter = null;
    }
    // Otherwise the term is common, and reading rows in id order below finds
    // a page of matches after a short scan.
  }

  // Read one row more than a page to learn whether another page follows.
  // Going back reads the rows before the cursor in descending order and
  // flips them, so a page always renders in ascending id order.
  const ordered =
    direction === "prev"
      ? filtered.orderBy((r) => r.id.desc())
      : filtered.orderBy((r) => r.id.asc());
  const rows = await (seekAfter ? ordered.cursor({ id: seekAfter }) : ordered)
    .limit(pageSize + 1)
    .all();

  const hasMore = rows.length > pageSize;
  const page = hasMore ? rows.slice(0, pageSize) : rows;
  if (direction === "prev") page.reverse();

  const resources: Resource[] = page.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    url: r.url,
    category: r.category as Resource["category"],
    difficulty: r.difficulty as Resource["difficulty"],
    tags: [...r.tags],
    createdAt: r.createdAt.toISOString(),
    stars: r.stars,
    author: r.author ?? undefined,
  }));

  // A cursor is the id of a row on the page the visitor came from, so that
  // page exists: forward, there is a previous page; backward, a next one.
  const hasNextPage = direction === "prev" ? Boolean(cursor) : hasMore;
  const hasPrevPage = direction === "prev" ? hasMore : Boolean(cursor);

  return {
    resources,
    hasNextPage,
    hasPrevPage,
    nextCursor: hasNextPage && resources.length > 0 ? resources[resources.length - 1].id : null,
    prevCursor: hasPrevPage && resources.length > 0 ? resources[0].id : null,
  };
}

/**
 * How many resources the table holds, for the "Index: N records" line.
 * Large tables answer from the planner's statistics (no scan); small or
 * never-analyzed tables are counted exactly.
 */
async function countResources(): Promise<number> {
  const [estimate] = await db.query(
    db.raw.sql`SELECT reltuples::float8 AS rows FROM pg_class WHERE oid = 'public."Resource"'::regclass`
      .returnsRow({ rows: "pg/float8@1" })
      .build(),
  );
  if (estimate && estimate.rows >= EXACT_COUNT_BELOW) return Math.round(estimate.rows);

  const exact = await db.orm.public.Resource.aggregate((a) => ({ rows: a.count() }));
  return exact.rows;
}

const getCachedCount = unstable_cache(countResources, ["devshelf-resource-count"], {
  revalidate: 60,
  tags: ["resources"],
});

// The first page of each category and difficulty combination is what most
// visitors load, and there are only a few dozen of them, so those are cached
// for 60 seconds. Searches and deeper pages are keyed by free text and by
// cursor: caching them would grow without bound, and the indexes above answer
// them in milliseconds anyway.
const getCachedFirstPage = unstable_cache(
  (category: string, difficulty: string, pageSize: number) =>
    fetchResources(null, "next", "", category, difficulty, pageSize),
  ["devshelf-resources-first-page"],
  { revalidate: 60, tags: ["resources"] },
);

export async function getCachedResources(
  cursor: string | null,
  direction: "next" | "prev",
  query: string,
  category: string,
  difficulty: string,
  pageSize: number = 20,
): Promise<GetResourcesResult> {
  // Normalize the request. Unknown filter values mean "no filter", and
  // oversized input is cut, so the cache key space and the queries stay small.
  const safeQuery = query.trim().slice(0, MAX_QUERY_LENGTH);
  const safeCategory = (CATEGORIES as readonly string[]).includes(category) ? category : "";
  const safeDifficulty = (DIFFICULTIES as readonly string[]).includes(difficulty) ? difficulty : "";
  const safeCursor = cursor && cursor.length <= MAX_CURSOR_LENGTH ? cursor : null;
  const safePageSize = Math.min(Math.max(1, Math.trunc(pageSize) || 20), MAX_PAGE_SIZE);

  // A fresh database gets the sample catalog on the first visit.
  await ensureSeeded();

  const [page, totalEstimatedCount] = await Promise.all([
    !safeQuery && !safeCursor
      ? getCachedFirstPage(safeCategory, safeDifficulty, safePageSize)
      : fetchResources(safeCursor, direction, safeQuery, safeCategory, safeDifficulty, safePageSize),
    getCachedCount(),
  ]);

  return { ...page, totalEstimatedCount };
}
