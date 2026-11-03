import { findAvailableSlots } from "resource-scheduler/headless";

import { CLOSE_HOUR, OPEN_HOUR, SLOT_MINUTES, officeTime } from "./office.ts";
import { startOfCurrentSlot } from "./rules.ts";

type Room = { id: string; seats: number };
type Span = { roomId: string; startsAt: Date; endsAt: Date };
export type FreeSlot = { roomId: string; start: Date; end: Date };

/**
 * The first free `minutes` of each room with at least `seats` seats between
 * `from` and `to`, one per room: earliest first, and the smallest room first at
 * the same time. The search window of a day is its opening hours from the
 * current slot on, so every slot passes the booking rules.
 */
export function findFreeSlots(
  rooms: Room[],
  bookings: Span[],
  { from, to, minutes, seats, now, limit = 6 }: { from: Date; to: Date; minutes: number; seats: number; now: Date; limit?: number },
): FreeSlot[] {
  const fits = rooms.filter((r) => r.seats >= seats);
  const found: (FreeSlot & { seats: number })[] = [];
  const earliest = startOfCurrentSlot(now);

  // Day 0 is today on the office clock: earlier days cannot be booked. Days that
  // end before `from` are skipped below, so the loop starts a day early, and it
  // goes on to `to` until every room has its slot.
  const firstDay = Math.max(0, Math.floor((+from - +now) / 86_400_000) - 1);
  for (let day = firstDay; found.length < fits.length && officeTime(day, OPEN_HOUR, 0, now) < to; day++) {
    const open = officeTime(day, OPEN_HOUR, 0, now);
    const start = new Date(Math.max(+open, +from, +earliest));
    const end = new Date(Math.min(+officeTime(day, CLOSE_HOUR, 0, now), +to));
    if (start >= end) continue;

    for (const room of fits) {
      if (found.some((f) => f.roomId === room.id)) continue;
      const events = bookings
        .filter((b) => b.roomId === room.id)
        .map((b, i) => ({ id: String(i), title: "", startDate: b.startsAt, endDate: b.endsAt }));
      const [slot] = findAvailableSlots(
        { id: room.id, name: "", events },
        { from: start, to: end, duration: minutes, step: SLOT_MINUTES, limit: 1 },
      );
      if (slot) found.push({ roomId: room.id, seats: room.seats, ...slot });
    }
  }

  return found
    .sort((a, b) => +a.start - +b.start || a.seats - b.seats)
    .slice(0, limit)
    .map(({ roomId, start, end }) => ({ roomId, start, end }));
}
