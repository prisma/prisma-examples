import postgres from "@prisma/orm-postgres/runtime";

import "temporal-polyfill/global";

import service from "../../service.ts";
import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };
import { seedIfEmpty } from "./seed.ts";

// On Prisma Compute, and under `prisma dev module.ts`, Composer hands the
// service a client for the database declared in module.ts. Under plain
// `next dev`, tests and scripts there is no Composer, so fall back to
// DATABASE_URL.
function loadComposerDatabase() {
  try {
    return service.load().database.client;
  } catch {
    return undefined;
  }
}

export const db =
  loadComposerDatabase() ??
  (process.env.DATABASE_URL
    ? postgres<Contract>({ contractJson, url: process.env.DATABASE_URL })
    : postgres<Contract>({ contractJson }));

export type Db = typeof db;
export type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];

let seeding: Promise<boolean> | undefined;

/** Seeds the demo data on the first call in this process if the database is empty. */
export function ensureSeeded(): Promise<boolean> {
  seeding ??= seedIfEmpty(db).catch((error: unknown) => {
    seeding = undefined; // try again on the next request
    throw error;
  });
  return seeding;
}
