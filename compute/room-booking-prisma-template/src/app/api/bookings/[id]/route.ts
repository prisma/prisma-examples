import { toBookingDTO } from "@/lib/api-types";
import { moveBookingSchema } from "@/lib/validation";
import { db } from "@/prisma/db";
import { deleteBooking, moveBooking } from "@/server/bookings";
import { errorResponse, fail, invalid, readJson } from "@/server/http";

// No sign-in in v1; see the note in ../route.ts.

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

/** PATCH /api/bookings/:id { roomId, startsAt, endsAt }: move or resize. */
export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const body = await readJson(request);
  if (body === undefined) return errorResponse("invalid", "Send the booking as a JSON body.");
  const input = moveBookingSchema.safeParse(body);
  if (!input.success) return invalid(input.error);

  try {
    return Response.json(toBookingDTO(await moveBooking(db, id, input.data)));
  } catch (error) {
    return fail(error);
  }
}

/** DELETE /api/bookings/:id: cancel. */
export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  try {
    await deleteBooking(db, id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return fail(error);
  }
}
