import { officeTime } from "../lib/office.ts";
import type { Db, Tx } from "./db.ts";

const rooms = [
  { name: "Atlas", floor: "Floor 1", seats: 8 },
  { name: "Borealis", floor: "Floor 1", seats: 4 },
  { name: "Cirrus", floor: "Floor 1", seats: 12 },
  { name: "Delta", floor: "Floor 2", seats: 6 },
  { name: "Echo", floor: "Floor 2", seats: 2 },
  { name: "Fjord", floor: "Floor 2", seats: 20 },
];

// [room, day (0 = today), start "HH:MM", end "HH:MM", title, booker], on the office clock.
const bookings: [string, number, string, string, string, string][] = [
  ["Atlas", 0, "09:00", "09:30", "Daily standup", "Priya"],
  ["Atlas", 0, "10:00", "11:30", "Sprint planning", "Jonas"],
  ["Atlas", 0, "14:00", "15:00", "Customer call", "Amara"],
  ["Borealis", 0, "09:30", "10:30", "1:1 Lena and Sam", "Lena"],
  ["Borealis", 0, "13:00", "13:30", "Interview: frontend", "Sam"],
  ["Cirrus", 0, "11:00", "12:30", "Design review", "Mei"],
  ["Cirrus", 0, "15:30", "17:00", "All-hands prep", "Diego"],
  ["Delta", 0, "08:30", "09:30", "Ops sync", "Tomás"],
  ["Delta", 0, "12:00", "13:00", "Lunch and learn", "Priya"],
  ["Echo", 0, "10:00", "10:30", "Vendor call", "Jonas"],
  ["Echo", 0, "16:00", "16:30", "Recruiter screen", "Amara"],
  ["Fjord", 0, "13:30", "15:30", "Quarterly business review", "Diego"],
  ["Atlas", 1, "09:00", "09:30", "Daily standup", "Priya"],
  ["Fjord", 1, "10:00", "12:00", "Board prep", "Mei"],
  ["Cirrus", 1, "14:00", "15:00", "Retro", "Jonas"],
];

// Any constant works; it only has to be the same for every caller.
const SEED_LOCK = 72_406_001;

const at = (day: number, hhmm: string, now: Date) => {
  const [hour, minute] = hhmm.split(":").map(Number);
  return officeTime(day, hour, minute, now);
};

async function insertDemoData(tx: Tx, now: Date) {
  const created = await tx.orm.public.Room.createAll(rooms);
  const roomId = new Map(created.map((room) => [room.name, room.id]));
  await tx.orm.public.Booking.createAll(
    bookings.map(([room, day, start, end, title, booker]) => ({
      roomId: roomId.get(room)!,
      startsAt: at(day, start, now),
      endsAt: at(day, end, now),
      title,
      booker,
    })),
  );
}

/**
 * Inserts the demo rooms and bookings when the database has no rooms yet, and
 * does nothing otherwise. Safe to call from every request: an advisory lock
 * makes concurrent first calls wait for each other, so only one inserts.
 * Returns whether it inserted anything.
 */
export async function seedIfEmpty(db: Db, now = new Date()): Promise<boolean> {
  return db.transaction(async (tx) => {
    await tx.execute(db.raw.sql`SELECT pg_advisory_xact_lock(${SEED_LOCK})`.affectedCount().build());
    if (await tx.orm.public.Room.select("id").first()) return false;
    await insertDemoData(tx, now);
    return true;
  });
}

/** Deletes every booking and room, then inserts the demo data again. */
export async function reseed(db: Db, now = new Date()): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.execute(db.raw.sql`SELECT pg_advisory_xact_lock(${SEED_LOCK})`.affectedCount().build());
    await tx.orm.public.Booking.where((b) => b.id.isNotNull()).deleteAndCount();
    await tx.orm.public.Room.where((r) => r.id.isNotNull()).deleteAndCount();
    await insertDemoData(tx, now);
  });
}
