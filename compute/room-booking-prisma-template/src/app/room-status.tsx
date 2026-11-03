import type { RoomDTO } from "@/lib/api-types";
import { CLOSE_HOUR, OPEN_HOUR, formatOfficeTime, officeTime } from "@/lib/office";

type Span = { roomId: string; startsAt: Date; endsAt: Date };
type Status = { state: "free" | "busy" | "closed"; text: string };

/** What a sign on the room's door would say at `now`, on the office clock. */
function statusOf(roomId: string, bookings: Span[], now: Date): Status {
  const open = officeTime(0, OPEN_HOUR, 0, now);
  const close = officeTime(0, CLOSE_HOUR, 0, now);
  if (now < open) return { state: "closed", text: `Opens at ${formatOfficeTime(open)}` };
  if (now >= close) return { state: "closed", text: "Closed until tomorrow" };

  const room = bookings.filter((b) => b.roomId === roomId);
  const current = room.find((b) => b.startsAt <= now && b.endsAt > now);
  if (current) return { state: "busy", text: `In use until ${formatOfficeTime(current.endsAt)}` };

  const next = room.filter((b) => b.startsAt > now && b.startsAt < close).sort((a, b) => +a.startsAt - +b.startsAt)[0];
  return { state: "free", text: `Free until ${formatOfficeTime(next?.startsAt ?? close)}` };
}

/**
 * A room in the scheduler's resource column (`renderResourceHeader`): its name
 * and seats, and while today is on screen (`now` is set), what the sign on its
 * door would say. The scheduler draws the room's utilization bar below it.
 */
export function RoomLabel({ room, bookings, now }: { room: RoomDTO; bookings: Span[]; now: Date | null }) {
  const status = now && statusOf(room.id, bookings, now);
  return (
    <span className="room">
      <span className="room-head">
        <span className="room-name">{room.name}</span>
        <span className="room-seats">{room.seats} seats</span>
      </span>
      {status && (
        // Intl output can differ by a space between the server's runtime and the browser.
        <span className="room-status" data-state={status.state} suppressHydrationWarning>
          {status.text}
        </span>
      )}
    </span>
  );
}
