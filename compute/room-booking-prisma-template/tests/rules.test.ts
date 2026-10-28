import { afterEach, describe, expect, it } from "vitest";
import { isPlacementAllowed } from "resource-scheduler/headless";
import type { Resource } from "resource-scheduler/headless";

import { bookingRules, checkBookingRules, isWithinOpeningHours, startOfCurrentSlot } from "../src/lib/rules.ts";

// The office is in Europe/Berlin: UTC+1 on 27 October 2026, UTC+2 in July.
const at = (iso: string) => new Date(iso);
const NOW = at("2026-10-27T06:00:00Z"); // 07:00 in Berlin, before opening

describe("isWithinOpeningHours (08:00 to 18:00 office time)", () => {
  it("accepts a booking from opening to closing", () => {
    expect(isWithinOpeningHours(at("2026-10-27T07:00:00Z"), at("2026-10-27T17:00:00Z"))).toBe(true);
  });

  it("refuses a start before 08:00", () => {
    expect(isWithinOpeningHours(at("2026-10-27T06:30:00Z"), at("2026-10-27T07:30:00Z"))).toBe(false);
  });

  it("refuses an end after 18:00", () => {
    expect(isWithinOpeningHours(at("2026-10-27T16:30:00Z"), at("2026-10-27T17:30:00Z"))).toBe(false);
  });

  it("refuses a booking that runs into the next day", () => {
    expect(isWithinOpeningHours(at("2026-10-27T16:00:00Z"), at("2026-10-28T08:00:00Z"))).toBe(false);
  });

  it("follows the office's summer time", () => {
    // 08:00 in Berlin is 06:00 UTC in July and 07:00 UTC in late October.
    expect(isWithinOpeningHours(at("2026-07-14T06:00:00Z"), at("2026-07-14T07:00:00Z"))).toBe(true);
    expect(isWithinOpeningHours(at("2026-10-27T06:00:00Z"), at("2026-10-27T07:00:00Z"))).toBe(false);
  });

  describe("does not depend on the machine's own time zone", () => {
    const original = process.env.TZ;
    afterEach(() => {
      process.env.TZ = original;
    });

    it.each(["UTC", "America/Los_Angeles", "Asia/Kolkata", "Pacific/Auckland"])("TZ=%s", (zone) => {
      process.env.TZ = zone;
      expect(isWithinOpeningHours(at("2026-10-27T07:00:00Z"), at("2026-10-27T08:00:00Z"))).toBe(true);
      expect(isWithinOpeningHours(at("2026-10-27T17:00:00Z"), at("2026-10-27T18:00:00Z"))).toBe(false);
    });
  });
});

describe("checkBookingRules", () => {
  it("allows the current half hour, not the one before", () => {
    const now = at("2026-10-27T09:47:00Z"); // 10:47 in Berlin
    expect(startOfCurrentSlot(now)).toEqual(at("2026-10-27T09:30:00Z"));
    expect(checkBookingRules({ start: at("2026-10-27T09:30:00Z"), end: at("2026-10-27T10:00:00Z") }, now)).toBeNull();
    expect(checkBookingRules({ start: at("2026-10-27T09:00:00Z"), end: at("2026-10-27T10:00:00Z") }, now)).toBe(
      "in-the-past",
    );
  });

  it("reports opening hours before the past", () => {
    expect(checkBookingRules({ start: at("2026-10-27T18:00:00Z"), end: at("2026-10-27T19:00:00Z") }, NOW)).toBe(
      "outside-opening-hours",
    );
  });
});

describe("bookingRules with isPlacementAllowed (what the browser and the server both run)", () => {
  const rules = bookingRules(() => NOW);
  const standup = { id: "standup", title: "Standup", startDate: at("2026-10-27T08:00:00Z"), endDate: at("2026-10-27T08:30:00Z") };
  const atlas: Resource = { id: "atlas", name: "Atlas", events: [standup] };
  const draft = (start: string, end: string) => ({ id: "new", title: "", startDate: at(start), endDate: at(end) });
  const allowed = (event: ReturnType<typeof draft>, start: string, end: string) =>
    isPlacementAllowed(event, { resourceId: "atlas", start: at(start), end: at(end) }, [atlas], rules);

  it("refuses an overlap", () => {
    expect(allowed(draft("2026-10-27T08:15:00Z", "2026-10-27T09:00:00Z"), "2026-10-27T08:15:00Z", "2026-10-27T09:00:00Z")).toBe(false);
  });

  it("allows a booking that starts when another ends (ends are exclusive)", () => {
    expect(allowed(draft("2026-10-27T08:30:00Z", "2026-10-27T09:00:00Z"), "2026-10-27T08:30:00Z", "2026-10-27T09:00:00Z")).toBe(true);
  });

  it("does not count a booking's own old time as a conflict when it moves", () => {
    expect(allowed(standup, "2026-10-27T08:15:00Z", "2026-10-27T08:45:00Z")).toBe(true);
  });

  it("applies the rules through isValidDrop", () => {
    expect(allowed(draft("2026-10-27T17:00:00Z", "2026-10-27T17:30:00Z"), "2026-10-27T17:00:00Z", "2026-10-27T17:30:00Z")).toBe(false);
  });
});
