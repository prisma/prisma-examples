import { isPlacementAllowed } from "resource-scheduler/headless";
import type { Resource, SchedulerEvent } from "resource-scheduler/headless";

import { formatOfficeTime } from "../lib/office.ts";
import { bookingRules, checkBookingRules, describeViolation } from "../lib/rules.ts";
import type { CreateBookingInput, MoveBookingInput } from "../lib/validation.ts";
import type { Db, Tx } from "../prisma/db.ts";

// The server decides. The browser already refused overlaps before the drop,
// but two people can pick the same free slot at the same moment, and anyone
// can call the API without the UI. So every write:
//
// 1. opens a transaction,
// 2. locks the room row(s) it touches (`FOR NO KEY UPDATE`, in id order so two
//    moves between the same rooms cannot deadlock), which makes every other
//    write to those rooms wait until this one commits or rolls back,
// 3. reads the room's bookings that overlap the new time,
// 4. asks `isPlacementAllowed` from resource-scheduler/headless, with the same
//    rules the browser used, and
// 5. writes, or throws a BookingError that the route turns into a 409 or 422.
//
// Prisma ORM 8 has no isolation-level option yet, so instead of the
// Serializable transaction of the original tutorial the lock in step 2 is
// what makes check-then-write safe under the default READ COMMITTED. The
// exclusion constraint in the init migration is a second line of defence in
// Postgres itself; with the lock it should never fire.

export type BookingErrorCode = "rule" | "conflict" | "not_found";

export class BookingError extends Error {
  constructor(
    readonly code: BookingErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "BookingError";
  }
}

type Slot = { roomId: string; startsAt: Date; endsAt: Date };
type BookingRow = { id: string; title: string; roomId: string; startsAt: Date; endsAt: Date };

const toEvent = (b: BookingRow): SchedulerEvent => ({
  id: b.id,
  title: b.title,
  resourceId: b.roomId,
  startDate: b.startsAt,
  endDate: b.endsAt,
});

/** Locks the rooms (in id order) for the rest of the transaction. Throws `not_found` for a missing one. */
async function lockRooms(tx: Tx, ids: string[]) {
  const rooms = new Map<string, { id: string; name: string }>();
  for (const id of [...new Set(ids)].sort()) {
    const room = await tx.orm.public.Room.where({ id }).forNoKeyUpdate().first();
    if (!room) throw new BookingError("not_found", "That room does not exist.");
    rooms.set(room.id, room);
  }
  return rooms;
}

/** Throws unless `moving` may take `slot` in `room`. Call it with the room locked. */
async function assertPlacementAllowed(tx: Tx, room: { id: string; name: string }, moving: SchedulerEvent, slot: Slot, now: Date) {
  const placement = { resourceId: room.id, start: slot.startsAt, end: slot.endsAt };

  // Explain a rule break in words; isPlacementAllowed below only says yes or no.
  const violation = checkBookingRules(placement, now);
  if (violation) throw new BookingError("rule", describeViolation(violation));

  const overlapping = await tx.orm.public.Booking.where({ roomId: room.id })
    .where((b) => b.startsAt.lt(slot.endsAt))
    .where((b) => b.endsAt.gt(slot.startsAt))
    .orderBy((b) => b.startsAt.asc())
    .all();
  const resource: Resource = { id: room.id, name: room.name, events: overlapping.map(toEvent) };

  if (!isPlacementAllowed(moving, placement, [resource], bookingRules(() => now))) {
    // The moving booking's own old time is not a conflict: isPlacementAllowed skips its id.
    const other = overlapping.find((b) => b.id !== moving.id);
    throw new BookingError(
      "conflict",
      other
        ? `${room.name} is already booked from ${formatOfficeTime(other.startsAt)} to ${formatOfficeTime(other.endsAt)} ("${other.title}").`
        : `${room.name} is not free at that time.`,
    );
  }
}

const sqlStateOf = (error: unknown): string | undefined => {
  for (let e = error; e && typeof e === "object"; e = (e as { cause?: unknown }).cause) {
    if ("sqlState" in e && typeof e.sqlState === "string") return e.sqlState;
  }
  return undefined;
};

/** Turns the database's own refusals into BookingErrors; rethrows anything else. */
function fromDatabaseError(error: unknown): never {
  if (error instanceof BookingError) throw error;
  switch (sqlStateOf(error)) {
    case "23P01": // exclusion_violation: booking_no_overlap
    case "40001": // serialization_failure
    case "40P01": // deadlock_detected
      throw new BookingError("conflict", "Someone else just booked that time. Pick another slot.");
    case "23503": // foreign_key_violation: the room was deleted meanwhile
      throw new BookingError("not_found", "That room does not exist.");
    case "23514": // check_violation: booking_ends_after_start
      throw new BookingError("rule", "The booking must end after it starts.");
  }
  throw error;
}

export async function listBookings(db: Db, from: Date, to: Date) {
  return db.orm.public.Booking.where((b) => b.startsAt.lt(to))
    .where((b) => b.endsAt.gt(from))
    .orderBy((b) => b.startsAt.asc())
    .all();
}

export async function createBooking(db: Db, input: CreateBookingInput, now = new Date()) {
  try {
    return await db.transaction(async (tx) => {
      const rooms = await lockRooms(tx, [input.roomId]);
      const draft = { id: "new", title: input.title, startDate: input.startsAt, endDate: input.endsAt };
      await assertPlacementAllowed(tx, rooms.get(input.roomId)!, draft, input, now);
      return tx.orm.public.Booking.create({
        roomId: input.roomId,
        title: input.title,
        booker: input.booker,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
      });
    });
  } catch (error) {
    fromDatabaseError(error);
  }
}

/** Moves a booking to another time and/or room; resizing is a move that keeps the room. */
export async function moveBooking(db: Db, id: string, input: MoveBookingInput, now = new Date()) {
  try {
    return await db.transaction(async (tx) => {
      // Lock the booking first, then the rooms: every writer takes its locks in
      // that order, so they queue instead of deadlocking.
      const booking = await tx.orm.public.Booking.where({ id }).forNoKeyUpdate().first();
      if (!booking) throw new BookingError("not_found", "That booking no longer exists.");
      const rooms = await lockRooms(tx, [booking.roomId, input.roomId]);
      await assertPlacementAllowed(tx, rooms.get(input.roomId)!, toEvent(booking), input, now);
      const moved = await tx.orm.public.Booking.where({ id }).update({
        roomId: input.roomId,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
      });
      return moved!;
    });
  } catch (error) {
    fromDatabaseError(error);
  }
}

export async function deleteBooking(db: Db, id: string) {
  const deleted = await db.orm.public.Booking.where({ id }).delete();
  if (!deleted) throw new BookingError("not_found", "That booking no longer exists.");
  return deleted;
}
