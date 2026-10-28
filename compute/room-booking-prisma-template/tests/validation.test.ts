import { describe, expect, it } from "vitest";

import { createBookingSchema, fieldErrors, moveBookingSchema, rangeSchema } from "../src/lib/validation.ts";

const valid = {
  roomId: "room_1",
  title: "  Sprint planning  ",
  booker: "Priya",
  startsAt: "2026-10-27T09:00:00.000Z",
  endsAt: "2026-10-27T11:00:00+01:00",
};

describe("createBookingSchema", () => {
  it("parses dates with any offset into instants, and trims text", () => {
    const parsed = createBookingSchema.parse(valid);
    expect(parsed.title).toBe("Sprint planning");
    expect(parsed.startsAt).toEqual(new Date("2026-10-27T09:00:00Z"));
    expect(parsed.endsAt).toEqual(new Date("2026-10-27T10:00:00Z"));
  });

  it("explains every bad field", () => {
    const result = createBookingSchema.safeParse({ roomId: "", title: "   ", startsAt: "tomorrow", endsAt: valid.endsAt });
    expect(result.success).toBe(false);
    expect(fieldErrors(result.error!)).toEqual({
      roomId: ["Pick a room."],
      title: ["Give the booking a title."],
      booker: ["Say who the booking is for."],
      startsAt: ["Use an ISO 8601 date and time with a time zone."],
    });
  });

  it("needs a time zone on every date, so the server never guesses", () => {
    expect(createBookingSchema.safeParse({ ...valid, startsAt: "2026-10-27T09:00:00" }).success).toBe(false);
  });

  it("reports one bad date as a field error instead of throwing (regression: was a 500)", () => {
    const result = createBookingSchema.safeParse({ ...valid, startsAt: "tomorrow" });
    expect(fieldErrors(result.error!)).toEqual({ startsAt: ["Use an ISO 8601 date and time with a time zone."] });
  });

  it("refuses an end that is not after the start", () => {
    const result = createBookingSchema.safeParse({ ...valid, endsAt: valid.startsAt });
    expect(fieldErrors(result.error!).endsAt).toEqual(["The booking must end after it starts."]);
  });

  it("refuses a booking longer than 12 hours", () => {
    const result = createBookingSchema.safeParse({ ...valid, endsAt: "2026-10-27T21:30:00Z" });
    expect(fieldErrors(result.error!).endsAt).toEqual(["A booking can last at most 12 hours."]);
  });

  it("caps the length of text", () => {
    const result = createBookingSchema.safeParse({ ...valid, title: "x".repeat(81) });
    expect(fieldErrors(result.error!).title).toEqual(["Keep the title under 80 characters."]);
  });
});

describe("moveBookingSchema", () => {
  it("needs only the room and the times", () => {
    expect(moveBookingSchema.safeParse({ roomId: "room_1", startsAt: valid.startsAt, endsAt: "2026-10-27T09:30:00Z" }).success).toBe(true);
  });
});

describe("rangeSchema", () => {
  it("reports one bad date as a field error instead of throwing", () => {
    const result = rangeSchema.safeParse({ from: "bad", to: "2026-10-27T00:00:00Z" });
    expect(Object.keys(fieldErrors(result.error!))).toEqual(["from"]);
  });

  it("refuses a backwards or very long range", () => {
    expect(rangeSchema.safeParse({ from: "2026-10-28T00:00:00Z", to: "2026-10-27T00:00:00Z" }).success).toBe(false);
    expect(rangeSchema.safeParse({ from: "2026-01-01T00:00:00Z", to: "2026-06-01T00:00:00Z" }).success).toBe(false);
  });
});
