import Link from "next/link";

import { toBookingDTO } from "@/lib/api-types";
import type { RoomDTO } from "@/lib/api-types";
import { CLOSE_HOUR, OPEN_HOUR, officeTime } from "@/lib/office";
import { db, ensureSeeded } from "@/prisma/db";
import { listBookings } from "@/server/bookings";

import { About, DEPLOY_URL, SOURCE_URL } from "./about";
import { Board } from "./board";

export const dynamic = "force-dynamic"; // read the database per request, not at build time

/** The rooms and one day's bookings, and how long Prisma Postgres took to answer, for the page to show. */
async function readDay(day: number, now: Date) {
  const started = performance.now();
  const [rooms, bookings] = await Promise.all([
    db.orm.public.Room.orderBy([(r) => r.floor.asc(), (r) => r.name.asc()]).all(),
    listBookings(db, officeTime(day, 0, 0, now), officeTime(day + 1, 0, 0, now)),
  ]);
  return { rooms, bookings, queryMs: Math.round(performance.now() - started) };
}

export default async function Page() {
  await ensureSeeded(); // a fresh deploy gets the demo rooms on its first visit

  // Open on today, or on tomorrow once today's opening hours are over.
  const now = new Date();
  const day = now >= officeTime(0, CLOSE_HOUR, 0, now) ? 1 : 0;
  const initialDate = day === 0 ? now : officeTime(day, OPEN_HOUR, 0, now);

  const { rooms, bookings, queryMs } = await readDay(day, now);

  return (
    <div className="shell">
      <header className="topbar">
        <Link className="brand" href="/">
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="var(--mark)" />
            <rect x="7" y="8" width="18" height="6" rx="2" fill="var(--floor-1)" />
            <rect x="7" y="18" width="18" height="6" rx="2" fill="var(--floor-2)" />
          </svg>
          Rooms
        </Link>
        <nav className="topbar-nav" aria-label="About this template">
          <a className="topbar-link" href="#how">
            How it works
          </a>
          <a className="topbar-link" href={SOURCE_URL}>
            Source
          </a>
          <a className="button primary" href={DEPLOY_URL}>
            Deploy your own
          </a>
        </nav>
      </header>

      <main>
        <div className="intro">
          <h1>Book a meeting room</h1>
          <p>Take a free room for the next half hour, or drag across the timeline to book any time.</p>
        </div>

        <Board
          rooms={rooms.map(({ id, name, floor, seats }): RoomDTO => ({ id, name, floor, seats }))}
          initialBookings={bookings.map(toBookingDTO)}
          initialDate={initialDate.toISOString()}
          serverNow={now.toISOString()}
        />

        <About rooms={rooms.length} bookings={bookings.length} queryMs={queryMs} />
      </main>

      <footer className="footer">
        <p>
          Open source under the MIT license. Made by <a href="https://github.com/mdobaid311">Mohammed Obaid</a> with
          Prisma ORM, Prisma Postgres and Prisma Compute.
        </p>
      </footer>
    </div>
  );
}
