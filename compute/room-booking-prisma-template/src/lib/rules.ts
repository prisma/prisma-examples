import { utcToZoned } from "resource-scheduler/headless";
import type { Placement, PlacementRules } from "resource-scheduler/headless";

import { CLOSE_HOUR, OFFICE_TIME_ZONE, OPEN_HOUR, SLOT_MINUTES } from "./office.ts";

// The booking rules, in one place. The browser spreads `bookingRules()` onto
// <ResourceScheduler>, so a refused place turns red before the drop. The
// server hands the same object to `isPlacementAllowed` inside its
// transaction, so the two cannot disagree about what is allowed.
//
// Every rule here must give the same answer in the browser and on the server.
// That is why the opening hours are read on the office clock with
// `utcToZoned`, never with a bare `getHours()`, which would use whatever zone
// the machine running it is in.

export type RuleViolation = "outside-opening-hours" | "in-the-past";

const minutesIntoDay = (d: Date) => d.getHours() * 60 + d.getMinutes();
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Whether `start` to `end` (exclusive) is inside the opening hours of one office day. */
export function isWithinOpeningHours(start: Date, end: Date): boolean {
  const s = utcToZoned(start, OFFICE_TIME_ZONE);
  const e = utcToZoned(end, OFFICE_TIME_ZONE);
  return sameDay(s, e) && minutesIntoDay(s) >= OPEN_HOUR * 60 && minutesIntoDay(e) <= CLOSE_HOUR * 60;
}

/** The start of the slot `now` is in: bookings may start there, not earlier. */
export function startOfCurrentSlot(now: Date): Date {
  const slot = SLOT_MINUTES * 60_000;
  return new Date(Math.floor(now.getTime() / slot) * slot);
}

/** The first rule a placement breaks, or `null`. Overlap is checked separately. */
export function checkBookingRules({ start, end }: Pick<Placement, "start" | "end">, now: Date): RuleViolation | null {
  if (!isWithinOpeningHours(start, end)) return "outside-opening-hours";
  if (start < startOfCurrentSlot(now)) return "in-the-past";
  return null;
}

const pad = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

export function describeViolation(violation: RuleViolation): string {
  switch (violation) {
    case "outside-opening-hours":
      return `Rooms can be booked from ${pad(OPEN_HOUR)} to ${pad(CLOSE_HOUR)} office time (${OFFICE_TIME_ZONE}), within one day.`;
    case "in-the-past":
      return "That time has already started. Pick a time from the current half hour on.";
  }
}

/**
 * The rules as `PlacementRules`: no two bookings of a room may overlap, and
 * every booking must pass `checkBookingRules`. `now` is a function so the
 * browser always uses the current time and tests can fix it.
 */
export function bookingRules(now: () => Date = () => new Date()) {
  return {
    eventOverlap: false,
    isValidDrop: (_event, placement) => checkBookingRules(placement, now()) === null,
  } satisfies PlacementRules;
}
