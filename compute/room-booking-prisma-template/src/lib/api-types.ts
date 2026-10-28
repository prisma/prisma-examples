// What crosses the network. Dates travel as ISO strings.

export type RoomDTO = {
  id: string;
  name: string;
  floor: string;
  seats: number;
};

export type BookingDTO = {
  id: string;
  title: string;
  booker: string;
  roomId: string;
  startsAt: string;
  endsAt: string;
};

export type ApiErrorCode = "invalid" | "rule" | "conflict" | "not_found" | "internal";

/** Every error response: 400 invalid, 404 not_found, 409 conflict, 422 rule, 500 internal. */
export type ApiError = {
  error: {
    code: ApiErrorCode;
    message: string;
    /** For `invalid`: messages per field, e.g. `{ title: ["Give the booking a title."] }`. */
    fields?: Record<string, string[]>;
  };
};

export const toBookingDTO = (b: {
  id: string;
  title: string;
  booker: string;
  roomId: string;
  startsAt: Date;
  endsAt: Date;
}): BookingDTO => ({
  id: b.id,
  title: b.title,
  booker: b.booker,
  roomId: b.roomId,
  startsAt: b.startsAt.toISOString(),
  endsAt: b.endsAt.toISOString(),
});
