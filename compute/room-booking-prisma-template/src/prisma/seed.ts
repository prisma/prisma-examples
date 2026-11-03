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

// One day of demo bookings: [room, start "HH:MM", end "HH:MM", title, booker], on the office clock.
const demoDay: [string, string, string, string, string][] = [
  ["Atlas", "09:00", "09:30", "Daily standup", "Priya"],
  ["Atlas", "10:00", "11:30", "Sprint planning", "Jonas"],
  ["Atlas", "14:00", "15:00", "Customer call", "Amara"],
  ["Borealis", "09:30", "10:30", "1:1 Lena and Sam", "Lena"],
  ["Borealis", "13:00", "13:30", "Interview: frontend", "Sam"],
  ["Cirrus", "11:00", "12:30", "Design review", "Mei"],
  ["Cirrus", "15:30", "17:00", "All-hands prep", "Diego"],
  ["Delta", "08:30", "09:30", "Ops sync", "Tomás"],
  ["Delta", "12:00", "13:00", "Lunch and learn", "Priya"],
  ["Echo", "10:00", "10:30", "Vendor call", "Jonas"],
  ["Echo", "16:00", "16:30", "Recruiter screen", "Amara"],
  ["Fjord", "13:30", "15:30", "Quarterly business review", "Diego"],
];

// Any constant works; it only has to be the same for every caller.
const SEED_LOCK = 72_406_001;

const at = (day: number, hhmm: string, now: Date) => {
  const [hour, minute] = hhmm.split(":").map(Number);
  return officeTime(day, hour, minute, now);
};

const lock = (db: Db) => db.raw.sql`SELECT pg_advisory_xact_lock(${SEED_LOCK})`.affectedCount().build();

/** The demo day's bookings on office day `day` (0 = today), for the rooms of that name that exist. */
async function insertDemoDay(tx: Tx, day: number, now: Date) {
  const roomId = new Map((await tx.orm.public.Room.all()).map((room) => [room.name, room.id]));
  const rows = demoDay.filter(([room]) => roomId.has(room));
  if (rows.length === 0) return;
  await tx.orm.public.Booking.createAll(
    rows.map(([room, start, end, title, booker]) => ({
      roomId: roomId.get(room)!,
      startsAt: at(day, start, now),
      endsAt: at(day, end, now),
      title,
      booker,
    })),
  );
}

async function insertDemoData(tx: Tx, now: Date) {
  await tx.orm.public.Room.createAll(rooms);
  await insertDemoDay(tx, 0, now);
}

/**
 * Inserts the demo rooms and bookings when the database has no rooms yet, and
 * does nothing otherwise. Safe to call from every request: an advisory lock
 * makes concurrent first calls wait for each other, so only one inserts.
 * Returns whether it inserted anything.
 */
export async function seedIfEmpty(db: Db, now = new Date()): Promise<boolean> {
  return db.transaction(async (tx) => {
    await tx.execute(lock(db));
    if (await tx.orm.public.Room.select("id").first()) return false;
    await insertDemoData(tx, now);
    return true;
  });
}

/**
 * Inserts the demo day's bookings on office day `day` (0 = today) when that day
 * has no bookings at all, so the board never opens on an empty day. A day with
 * any booking is left alone, so bookings people made are never overlapped.
 * Returns whether it inserted anything.
 */
export async function seedDayIfEmpty(db: Db, day: number, now = new Date()): Promise<boolean> {
  return db.transaction(async (tx) => {
    await tx.execute(lock(db));
    const from = officeTime(day, 0, 0, now);
    const to = officeTime(day + 1, 0, 0, now);
    // Lock the rooms in id order, as a booking write does (lockRooms in
    // src/server/bookings.ts), so a booking made meanwhile either waits and then
    // sees the demo day, or is committed before the check below sees it.
    const ids = (await tx.orm.public.Room.select("id").all()).map((r) => r.id).sort();
    for (const id of ids) await tx.orm.public.Room.where({ id }).forNoKeyUpdate().first();
    const booked = await tx.orm.public.Booking.where((b) => b.startsAt.lt(to))
      .where((b) => b.endsAt.gt(from))
      .select("id")
      .first();
    if (booked) return false;
    await insertDemoDay(tx, day, now);
    return true;
  });
}

/** Deletes every booking and room, then inserts the demo data again. */
export async function reseed(db: Db, now = new Date()): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.execute(lock(db));
    await tx.orm.public.Booking.where((b) => b.id.isNotNull()).deleteAndCount();
    await tx.orm.public.Room.where((r) => r.id.isNotNull()).deleteAndCount();
    await insertDemoData(tx, now);
  });
}
