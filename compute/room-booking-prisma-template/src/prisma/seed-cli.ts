// npm run db:seed            insert the demo rooms and bookings if there are no rooms
// npm run db:seed -- --reset delete every room and booking, then insert the demo data
import { db } from "./db.ts";
import { reseed, seedIfEmpty } from "./seed.ts";

try {
  if (process.argv.includes("--reset")) {
    await reseed(db);
    console.log("Deleted all rooms and bookings and inserted the demo data.");
  } else if (await seedIfEmpty(db)) {
    console.log("Inserted the demo rooms and bookings.");
  } else {
    console.log("The database already has rooms; nothing to do. Pass --reset to start over.");
  }
} finally {
  await db.close();
}
