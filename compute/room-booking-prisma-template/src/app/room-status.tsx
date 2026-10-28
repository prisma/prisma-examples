import type { CSSProperties } from "react";

import type { RoomDTO } from "@/lib/api-types";
import { CLOSE_HOUR, OFFICE_TIME_ZONE, OPEN_HOUR, SLOT_MINUTES, formatOfficeDay, formatOfficeTime, officeTime } from "@/lib/office";
import { checkBookingRules, startOfCurrentSlot } from "@/lib/rules";

type Span = { roomId: string; title: string; startsAt: Date; endsAt: Date };
type Slot = { start: Date; end: Date };

type Status =
  | { state: "closed"; text: string }
  | { state: "busy"; text: string; title: string }
  | { state: "free"; text: string; slot: Slot | null };

/** What a sign on the room's door would say at `now`, on the office clock. */
function statusOf(roomId: string, bookings: Span[], now: Date): Status {
  const open = officeTime(0, OPEN_HOUR, 0, now);
  const close = officeTime(0, CLOSE_HOUR, 0, now);
  if (now < open) return { state: "closed", text: `Opens at ${formatOfficeTime(open)}` };
  if (now >= close) return { state: "closed", text: "Closed until tomorrow" };

  const room = bookings.filter((b) => b.roomId === roomId);
  const current = room.find((b) => b.startsAt <= now && b.endsAt > now);
  if (current) return { state: "busy", text: `In use until ${formatOfficeTime(current.endsAt)}`, title: current.title };

  const next = room.filter((b) => b.startsAt > now && b.startsAt < close).sort((a, b) => +a.startsAt - +b.startsAt)[0];
  // "Book now" offers the current slot, which the rules still accept.
  const start = startOfCurrentSlot(now);
  const end = new Date(start.getTime() + SLOT_MINUTES * 60_000);
  const free =
    !room.some((b) => b.startsAt < end && b.endsAt > start) && checkBookingRules({ start, end }, now) === null;
  return { state: "free", text: `Free until ${formatOfficeTime(next?.startsAt ?? close)}`, slot: free ? { start, end } : null };
}

const city = OFFICE_TIME_ZONE.split("/").pop()!.replaceAll("_", " ");

/** One plate per room, like the signs next to meeting room doors. */
export function RoomStatus({
  rooms,
  bookings,
  now,
  floorColor,
  onBook,
}: {
  rooms: RoomDTO[];
  bookings: Span[];
  now: Date;
  floorColor: (floor: string) => string;
  onBook: (room: RoomDTO, slot: Slot) => void;
}) {
  return (
    <section className="now" aria-labelledby="now-heading">
      <div className="now-head">
        <h2 id="now-heading">Right now</h2>
        {/* Intl output can differ by a space between the server's runtime and the browser. */}
        <p className="clock" suppressHydrationWarning>
          {formatOfficeTime(now)} in {city}, {formatOfficeDay(now)}
        </p>
      </div>

      <ul className="plates">
        {rooms.map((room) => {
          const status = statusOf(room.id, bookings, now);
          return (
            <li
              key={room.id}
              className="plate"
              data-state={status.state}
              style={{ "--floor": floorColor(room.floor) } as CSSProperties}
            >
              <div className="plate-head">
                <span className="plate-name">{room.name}</span>
                <span className="plate-seats">{room.seats} seats</span>
              </div>
              <span className="plate-floor">{room.floor}</span>
              <p className="plate-status" suppressHydrationWarning>
                {status.text}
              </p>
              {status.state === "busy" && <p className="plate-title">{status.title}</p>}
              {status.state === "free" && status.slot && (
                <button type="button" className="button small plate-book" onClick={() => onBook(room, status.slot!)}>
                  Book now<span className="sr-only"> {room.name}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
