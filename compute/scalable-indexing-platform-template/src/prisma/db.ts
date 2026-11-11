import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

// The ORM's `now()` generator, which fills `updatedAt`, needs a global
// Temporal. Node.js before 26.8.2 and the Bun that Prisma Compute runs do not
// have one yet.
import "temporal-polyfill/global";

import service from "../../service.ts";
import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

export const contract = contractFromJson<Contract>(contractJson);

// On Prisma Compute, and under `prisma dev module.ts`, Composer hands the
// service a client for the database declared in module.ts. Under plain
// `next dev` and in the seed scripts there is no Composer, so fall back to
// DATABASE_URL.
function loadComposerDatabase() {
  try {
    return service.load().db.client;
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
