import { z } from "zod";

// Input schemas, shared by the booking form in the browser and the route
// handlers on the server. Everything that arrives in a request body is
// untrusted, so the server parses it with these before anything else.

const MAX_BOOKING_HOURS = 12;

const instant = z.iso
  .datetime({ offset: true, error: "Use an ISO 8601 date and time with a time zone." })
  .transform((value) => new Date(value));

export const bookingDetailsSchema = z.object({
  title: z
    .string({ error: "Give the booking a title." })
    .trim()
    .min(1, "Give the booking a title.")
    .max(80, "Keep the title under 80 characters."),
  booker: z
    .string({ error: "Say who the booking is for." })
    .trim()
    .min(1, "Say who the booking is for.")
    .max(60, "Keep the name under 60 characters."),
});

const slotFields = z.object({
  roomId: z.string({ error: "Pick a room." }).min(1, "Pick a room.").max(64),
  startsAt: instant,
  endsAt: instant,
});

const slotIsValid = (slot: { startsAt: Date; endsAt: Date }, ctx: z.RefinementCtx) => {
  // zod still runs this when a date failed to parse; that field already has its message.
  if (!(slot.startsAt instanceof Date) || !(slot.endsAt instanceof Date)) return;
  if (slot.endsAt <= slot.startsAt) {
    ctx.addIssue({ code: "custom", path: ["endsAt"], message: "The booking must end after it starts." });
  } else if (slot.endsAt.getTime() - slot.startsAt.getTime() > MAX_BOOKING_HOURS * 3_600_000) {
    ctx.addIssue({ code: "custom", path: ["endsAt"], message: `A booking can last at most ${MAX_BOOKING_HOURS} hours.` });
  }
};

/** POST /api/bookings */
export const createBookingSchema = slotFields.extend(bookingDetailsSchema.shape).superRefine(slotIsValid);

/** PATCH /api/bookings/:id (move or resize) */
export const moveBookingSchema = slotFields.superRefine(slotIsValid);

/** GET /api/bookings?from=&to= */
export const rangeSchema = z.object({ from: instant, to: instant }).superRefine((range, ctx) => {
  if (!(range.from instanceof Date) || !(range.to instanceof Date)) return; // see slotIsValid
  if (range.to <= range.from) {
    ctx.addIssue({ code: "custom", path: ["to"], message: "`to` must be after `from`." });
  } else if (range.to.getTime() - range.from.getTime() > 62 * 86_400_000) {
    ctx.addIssue({ code: "custom", path: ["to"], message: "Ask for at most 62 days at a time." });
  }
});

export type CreateBookingInput = z.output<typeof createBookingSchema>;
export type MoveBookingInput = z.output<typeof moveBookingSchema>;

/** Field errors as `{ field: ["message", ...] }`, the shape the API returns. */
export const fieldErrors = (error: z.ZodError) => z.flattenError(error).fieldErrors as Record<string, string[]>;
