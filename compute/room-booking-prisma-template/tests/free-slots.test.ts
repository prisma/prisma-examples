import { afterEach, describe, expect, it } from "vitest";

import { findFreeSlots } from "../src/lib/free-slots.ts";
import { checkBookingRules } from "../src/lib/rules.ts";

// The office is in Europe/Berlin, UTC+1 on 30 October 2026. Opening hours are
// 08:00 to 18:00 there, 07:00 to 17:00 UTC.
const at = (iso: string) => new Date(iso);
const NOW = at("2026-10-30T10:25:00Z"); // 11:25 in Berlin, in the 11:00 slot
const TODAY = { from: at("2026-10-29T23:00:00Z"), to: at("2026-10-30T23:00:00Z") };

// Listed largest first, to show the result puts the smallest room first.
const rooms = [
  { id: "big", seats: 12 },
  { id: "mid", seats: 8 },
  { id: "small", seats: 4 },
];
const bookings = [
  { roomId: "small", startsAt: at("2026-10-30T10:00:00Z"), endsAt: at("2026-10-30T11:00:00Z") },
  { roomId: "big", startsAt: at("2026-10-30T09:00:00Z"), endsAt: at("2026-10-30T12:00:00Z") },
];

const starts = (slots: { roomId: string; start: Date }[]) => slots.map((s) => `${s.roomId} ${s.start.toISOString()}`);

describe("findFreeSlots", () => {
  it("finds each room's first free time from the current slot on, earliest first", () => {
    const slots = findFreeSlots(rooms, bookings, { ...TODAY, minutes: 60, seats: 1, now: NOW });
    expect(starts(slots)).toEqual([
      "mid 2026-10-30T10:00:00.000Z",
      "small 2026-10-30T11:00:00.000Z",
      "big 2026-10-30T12:00:00.000Z",
    ]);
    for (const slot of slots) expect(checkBookingRules(slot, NOW)).toBeNull();
  });

  it("leaves out rooms with too few seats", () => {
    const slots = findFreeSlots(rooms, bookings, { ...TODAY, minutes: 60, seats: 8, now: NOW });
    expect(slots.map((s) => s.roomId)).toEqual(["mid", "big"]);
  });

  it("offers the smallest room first when several are free at once", () => {
    const slots = findFreeSlots(rooms, [], { ...TODAY, minutes: 30, seats: 1, now: NOW });
    expect(slots.map((s) => s.roomId)).toEqual(["small", "mid", "big"]);
  });

  it("fits a slot up to closing time, and not past it", () => {
    const now = at("2026-10-30T16:10:00Z"); // 17:10 in Berlin
    expect(starts(findFreeSlots(rooms, [], { ...TODAY, minutes: 60, seats: 12, now }))).toEqual([
      "big 2026-10-30T16:00:00.000Z",
    ]);
    expect(findFreeSlots(rooms, [], { ...TODAY, minutes: 90, seats: 1, now })).toEqual([]);
  });

  it("moves on to the next day once today is over", () => {
    const now = at("2026-10-30T17:10:00Z"); // 18:10 in Berlin, closed
    const twoDays = { from: TODAY.from, to: at("2026-10-31T23:00:00Z") };
    expect(starts(findFreeSlots(rooms, [], { ...twoDays, minutes: 30, seats: 12, now }))).toEqual([
      "big 2026-10-31T07:00:00.000Z",
    ]);
  });

  it("opens at 08:00 in Berlin on both sides of a clock change", () => {
    const now = at("2026-10-24T04:00:00Z"); // 06:00 in Berlin, summer time; winter time starts on the 25th
    const weekend = { from: at("2026-10-23T22:00:00Z"), to: at("2026-10-25T23:00:00Z") };
    const saturday = [{ roomId: "big", startsAt: at("2026-10-24T06:00:00Z"), endsAt: at("2026-10-24T16:00:00Z") }];
    expect(starts(findFreeSlots(rooms, [], { ...weekend, minutes: 30, seats: 12, now }))).toEqual([
      "big 2026-10-24T06:00:00.000Z",
    ]);
    expect(starts(findFreeSlots(rooms, saturday, { ...weekend, minutes: 30, seats: 12, now }))).toEqual([
      "big 2026-10-25T07:00:00.000Z",
    ]);
  });

  it("searches a week however far ahead it is, past a day with no time free", () => {
    const week = { from: at("2027-02-01T23:00:00Z"), to: at("2027-02-08T23:00:00Z") }; // 95 days after NOW
    const tuesday = [{ roomId: "big", startsAt: at("2027-02-02T07:00:00Z"), endsAt: at("2027-02-02T17:00:00Z") }];
    expect(starts(findFreeSlots(rooms, tuesday, { ...week, minutes: 30, seats: 12, now: NOW }))).toEqual([
      "big 2027-02-03T07:00:00.000Z",
    ]);
  });

  it("offers each room once, at its first free time on the days on screen", () => {
    const twoDays = { from: TODAY.from, to: at("2026-10-31T23:00:00Z") };
    expect(starts(findFreeSlots(rooms, bookings, { ...twoDays, minutes: 60, seats: 1, now: NOW }))).toEqual([
      "mid 2026-10-30T10:00:00.000Z",
      "small 2026-10-30T11:00:00.000Z",
      "big 2026-10-30T12:00:00.000Z",
    ]);
  });

  it("keeps searching for a room whose first free time is on a later day", () => {
    const booked = [{ roomId: "mid", startsAt: at("2026-10-30T06:00:00Z"), endsAt: at("2026-10-31T06:00:00Z") }];
    const twoDays = { from: TODAY.from, to: at("2026-10-31T23:00:00Z") };
    expect(starts(findFreeSlots(rooms, booked, { ...twoDays, minutes: 60, seats: 1, now: NOW }))).toEqual([
      "small 2026-10-30T10:00:00.000Z",
      "big 2026-10-30T10:00:00.000Z",
      "mid 2026-10-31T07:00:00.000Z",
    ]);
  });

  describe("does not depend on the machine's own time zone", () => {
    const original = process.env.TZ;
    afterEach(() => {
      process.env.TZ = original;
    });

    it.each(["UTC", "America/Los_Angeles", "Asia/Kolkata", "Pacific/Auckland"])("TZ=%s", (zone) => {
      process.env.TZ = zone;
      expect(starts(findFreeSlots(rooms, bookings, { ...TODAY, minutes: 60, seats: 1, now: NOW }))).toEqual([
        "mid 2026-10-30T10:00:00.000Z",
        "small 2026-10-30T11:00:00.000Z",
        "big 2026-10-30T12:00:00.000Z",
      ]);
    });
  });
});
