import { INITIAL_RESOURCES } from "../lib/data.ts";
import { db, type Db } from "./db.ts";

const SAMPLE_USERS = [
  { email: "anas@devshelf.io", username: "anas", name: "Anas" },
  { email: "alice@prisma.io", username: "alice", name: "Alice" },
  { email: "bob@prisma.io", username: "bob", name: "Bob" },
  { email: "carol@prisma.io", username: "carol", name: "Carol" },
];

// Any constant works; it only has to be the same for every caller.
const SEED_LOCK = 20_261_104;

type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];

const lock = (tx: Tx) =>
  tx.execute(db.raw.sql`SELECT pg_advisory_xact_lock(${SEED_LOCK})`.affectedCount().build());

/** Creates the sample users that are missing and returns the first one's id. */
async function upsertUsers(tx: Tx): Promise<string> {
  const ids: string[] = [];
  for (const user of SAMPLE_USERS) {
    const existing = await tx.orm.public.User.where({ email: user.email }).select("id").first();
    ids.push(existing ? existing.id : (await tx.orm.public.User.select("id").create(user)).id);
  }
  return ids[0];
}

/**
 * Writes the sample users and the 20 curated resources from `src/lib/data.ts`.
 * Safe to run again: existing rows are updated in place, by id, so nothing is
 * duplicated and resources you added yourself are left alone.
 */
export async function seedSample(target: Db = db): Promise<number> {
  return target.transaction(async (tx) => {
    await lock(tx);
    const ownerId = await upsertUsers(tx);

    for (const item of INITIAL_RESOURCES) {
      const fields = {
        title: item.title,
        description: item.description,
        url: item.url,
        category: item.category,
        difficulty: item.difficulty,
        tags: item.tags,
        stars: item.stars ?? 0,
        author: item.author ?? "DevShelf Contributor",
        createdAt: new Date(item.createdAt),
      };
      await tx.orm.public.Resource.upsert({
        create: { id: item.id, userId: ownerId, ...fields },
        update: fields,
      });
    }

    return INITIAL_RESOURCES.length;
  });
}

/**
 * Seeds the sample catalog when the database has no resources yet, and does
 * nothing otherwise. Safe to call from every request: an advisory lock makes
 * concurrent first calls wait for each other, so only one of them inserts.
 * Returns whether it inserted anything.
 */
export async function seedIfEmpty(target: Db = db): Promise<boolean> {
  if (await target.orm.public.Resource.select("id").first()) return false;
  await seedSample(target);
  return true;
}

let seeding: Promise<boolean> | undefined;

/** Seeds an empty database on the first call in this process. */
export function ensureSeeded(): Promise<boolean> {
  seeding ??= seedIfEmpty().catch((error: unknown) => {
    seeding = undefined; // try again on the next request
    throw error;
  });
  return seeding;
}
