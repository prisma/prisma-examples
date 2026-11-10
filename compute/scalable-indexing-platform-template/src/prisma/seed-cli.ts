// bun run db:seed    write the sample users and the 20 curated resources
//
// Safe to run again: it updates the sample rows in place and leaves every
// other row alone. Reads DATABASE_URL from .env.local.
import { loadEnv } from "./env.ts";

loadEnv();
const { db } = await import("./db.ts");
const { seedSample } = await import("./seed.ts");

try {
  const count = await seedSample(db);
  console.log(`Seeded the sample catalog: ${count} curated resources.`);
} catch (error) {
  console.error("Seeding failed:", error);
  process.exitCode = 1;
} finally {
  await db.close();
}
