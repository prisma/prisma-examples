import { toBookingDTO } from "@/lib/api-types";
import { createBookingSchema, rangeSchema } from "@/lib/validation";
import { db } from "@/prisma/db";
import { createBooking, listBookings } from "@/server/bookings";
import { errorResponse, fail, invalid, readJson } from "@/server/http";

// No sign-in in v1: anyone who can reach these routes can book, move and
// cancel anything. Before real use, check the user here (and in [id]/route.ts),
// store who booked, and let people change only their own bookings.

export const dynamic = "force-dynamic";

/** GET /api/bookings?from=<ISO>&to=<ISO>: bookings that overlap the range (`to` exclusive). */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const range = rangeSchema.safeParse({ from: params.get("from") ?? undefined, to: params.get("to") ?? undefined });
  if (!range.success) return invalid(range.error);

  try {
    const bookings = await listBookings(db, range.data.from, range.data.to);
    return Response.json(bookings.map(toBookingDTO));
  } catch (error) {
    return fail(error);
  }
}

/** POST /api/bookings { roomId, title, booker, startsAt, endsAt } */
export async function POST(request: Request) {
  const body = await readJson(request);
  if (body === undefined) return errorResponse("invalid", "Send the booking as a JSON body.");
  const input = createBookingSchema.safeParse(body);
  if (!input.success) return invalid(input.error);

  try {
    const booking = await createBooking(db, input.data);
    return Response.json(toBookingDTO(booking), { status: 201 });
  } catch (error) {
    return fail(error);
  }
}
