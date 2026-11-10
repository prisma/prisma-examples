// bun run db:seed:bulk              add 100,000 generated resources
// bun run db:seed:bulk 1000000      add one million
// bun run db:seed:bulk --reset      delete the generated resources again
//
// Bulk ingestion with the ORM's multi-row insert: rows are generated and
// written one batch at a time, so memory stays flat however many you ask for.
// Generated rows have ids of the form bulk-000000001, so they never collide
// with the curated sample or with your own data, and a second run continues
// where the first one stopped. Reads DATABASE_URL from .env.local.
import { loadEnv } from "./env.ts";

loadEnv();
const { db } = await import("./db.ts");

const DEFAULT_COUNT = 100_000;
const MAX_COUNT = 5_000_000;
// One INSERT per batch. PostgreSQL accepts 65,535 parameters per statement and
// a row binds 12 of them, so 2,000 rows stay well inside the limit.
const BATCH_SIZE = 2_000;
const ID_PREFIX = "bulk-";

const TITLES = [
  "Build an LLM from Scratch with PyTorch & Triton",
  "Full-Stack Next.js & PostgreSQL Architecture Guide",
  "Kubernetes Zero-to-Production on Bare Metal",
  "Modern Cryptography & Web Security Handbook",
  "Distributed Systems & Raft Consensus in Go",
  "React Native & Expo: Native Audio Synthesizer",
  "TypeScript Clean Architecture & Hexagonal Domain Design",
  "Computer Vision with YOLO & OpenCV Pipelines",
  "Terraform & AWS Enterprise Multi-Region Infrastructure",
  "High-Performance Rust Microservices with Axum & Tokio",
];
const DESCRIPTIONS = [
  "End-to-end production guide with benchmarks and system architecture design.",
  "Step-by-step tutorial with a working repository and deployment notes.",
  "Reference implementation covering testing, observability and failure modes.",
  "Hands-on walkthrough from first commit to a monitored production rollout.",
];
const CATEGORIES = ["Web Dev", "Machine Learning", "DevOps", "Cybersecurity", "Cloud Computing", "Mobile Dev"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const TAGS = [
  "#TypeScript", "#PostgreSQL", "#Nextjs", "#Prisma", "#Docker", "#Rust",
  "#Kubernetes", "#PyTorch", "#Go", "#React", "#AWS", "#Security",
];
const DAY = 86_400_000;

// A small deterministic generator (mulberry32): row N gets the same star count
// on every run, so two databases seeded with the same count hold the same data.
function random(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
}

const idFor = (n: number) => `${ID_PREFIX}${String(n).padStart(9, "0")}`;

function resource(n: number, now: number) {
  return {
    id: idFor(n),
    title: `${TITLES[n % TITLES.length]} #${n}`,
    description: DESCRIPTIONS[n % DESCRIPTIONS.length],
    url: `https://example.com/resources/${n}`,
    category: CATEGORIES[n % CATEGORIES.length],
    difficulty: DIFFICULTIES[n % DIFFICULTIES.length],
    tags: [TAGS[n % TAGS.length], TAGS[(n * 7 + 3) % TAGS.length]],
    stars: Math.floor(random(n) * 45_000),
    author: `Author ${n % 250}`,
    createdAt: new Date(now - (n % 180) * DAY),
  };
}

const generated = () => db.orm.public.Resource.where((r) => r.id.like(`${ID_PREFIX}%`));

async function reset() {
  const deleted = await generated().deleteAndCount();
  console.log(`Deleted ${deleted.toLocaleString()} generated resources.`);
}

async function seed(count: number) {
  const last = await generated().orderBy((r) => r.id.desc()).select("id").first();
  const start = last ? Number(last.id.slice(ID_PREFIX.length)) + 1 : 1;
  const end = start + count;
  const startedAt = Date.now();
  console.log(`Inserting ${count.toLocaleString()} resources in batches of ${BATCH_SIZE.toLocaleString()}...`);

  let inserted = 0;
  for (let from = start; from < end; from += BATCH_SIZE) {
    const size = Math.min(BATCH_SIZE, end - from);
    const rows = Array.from({ length: size }, (_, i) => resource(from + i, startedAt));
    inserted += await db.orm.public.Resource.createAndCount(rows);
    if (inserted % 50_000 < BATCH_SIZE || inserted === count) {
      const seconds = (Date.now() - startedAt) / 1000;
      const rate = Math.round(inserted / seconds).toLocaleString();
      const memory = Math.round(process.memoryUsage().rss / 1_048_576);
      console.log(`  ${inserted.toLocaleString()} rows, ${seconds.toFixed(1)}s, ${rate} rows/s, ${memory} MB`);
    }
  }

  // Refresh the planner's statistics so searches pick the right index and the
  // record count on the page is current right away.
  await db.execute(db.raw.sql`ANALYZE "Resource"`.affectedCount().build());
  console.log(`Done: ${inserted.toLocaleString()} resources in ${((Date.now() - startedAt) / 1000).toFixed(1)}s.`);
}

try {
  const args = process.argv.slice(2);
  if (args.includes("--reset")) {
    await reset();
  } else {
    const count = args[0] === undefined ? DEFAULT_COUNT : Number(args[0]);
    if (!Number.isInteger(count) || count < 1 || count > MAX_COUNT) {
      throw new Error(`Pass a whole number of rows between 1 and ${MAX_COUNT.toLocaleString()}.`);
    }
    await seed(count);
  }
} catch (error) {
  console.error("Bulk seeding failed:", error);
  process.exitCode = 1;
} finally {
  await db.close();
}
