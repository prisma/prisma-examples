import { toBookingDTO } from "@/lib/api-types";
import type { RoomDTO } from "@/lib/api-types";
import { CLOSE_HOUR, OPEN_HOUR, officeTime } from "@/lib/office";
import { db, ensureDemoDay, ensureSeeded } from "@/prisma/db";
import { listBookings } from "@/server/bookings";

import { stack } from "./about";
import { Board } from "./board";

export const dynamic = "force-dynamic"; // read the database per request, not at build time

/** The rooms and one day's bookings. */
async function readDay(day: number, now: Date) {
  const [rooms, bookings] = await Promise.all([
    db.orm.public.Room.orderBy([(r) => r.floor.asc(), (r) => r.name.asc()]).all(),
    listBookings(db, officeTime(day, 0, 0, now), officeTime(day + 1, 0, 0, now)),
  ]);
  return { rooms, bookings };
}

export default async function Page() {
  await ensureSeeded(); // a fresh deploy gets the demo rooms on its first visit

  // Open on today, or on tomorrow once today's opening hours are over.
  const now = new Date();
  const day = now >= officeTime(0, CLOSE_HOUR, 0, now) ? 1 : 0;
  const initialDate = day === 0 ? now : officeTime(day, OPEN_HOUR, 0, now);

  await ensureDemoDay(day, now); // and the day on screen gets the demo bookings if it has none

  const { rooms, bookings } = await readDay(day, now);

  return (
    <Board
      rooms={rooms.map(({ id, name, floor, seats }): RoomDTO => ({ id, name, floor, seats }))}
      initialBookings={bookings.map(toBookingDTO)}
      initialDate={initialDate.toISOString()}
      serverNow={now.toISOString()}
    >
      <footer className="stack-section" aria-labelledby="stack-heading">
        <h2 id="stack-heading">Built with</h2>
        <ul className="stack">
          {stack.map((item) => (
            <li key={item.name} className="card">
              <div className="card-top">
                <span className="stack-logo">{item.logo}</span>
                <div className="card-title">
                  <a href={item.href}>{item.name}</a>
                  <span className="tag">{item.kind}</span>
                </div>
              </div>
              <p>{item.what}</p>
            </li>
          ))}
        </ul>
      </footer>
    </Board>
  );
}
