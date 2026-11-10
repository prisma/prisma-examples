import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

import "temporal-polyfill/global";

import service from "../../service.ts";
import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };
import { officeTime } from "../lib/office.ts";
import { seedDayIfEmpty, seedIfEmpty } from "./seed.ts";

export const contract = contractFromJson<Contract>(contractJson);

// On Prisma Compute, and under `prisma dev`, Composer hands the
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
    ? postgres({ contract, url: process.env.DATABASE_URL })
    : postgres({ contract }));

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

let toppedUp: { day: string; done: Promise<boolean> } | undefined;

/**
 * Gives office day `day` (0 = today) the demo bookings if it has none, so a
 * demo board never opens on an empty day. Checks once per day in this process.
 */
export function ensureDemoDay(day: number, now = new Date()): Promise<boolean> {
  const key = officeTime(day, 0, 0, now).toISOString();
  if (toppedUp?.day !== key) {
    const done = seedDayIfEmpty(db, day, now).catch((error: unknown) => {
      toppedUp = undefined; // try again on the next request
      throw error;
    });
    toppedUp = { day: key, done };
  }
  return toppedUp.done;
}
