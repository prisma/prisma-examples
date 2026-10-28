import { afterAll, beforeEach, describe, expect, it } from "vitest";
import postgres from "@prisma/orm-postgres/runtime";

import type { Contract } from "../src/prisma/contract.d.ts";
import contractJson from "../src/prisma/contract.json" with { type: "json" };
import type { Db } from "../src/prisma/db.ts";
import { seedIfEmpty } from "../src/prisma/seed.ts";
import { BookingError, createBooking, deleteBooking, moveBooking } from "../src/server/bookings.ts";

// These run against a real PostgreSQL (TEST_DATABASE_URL), because they are
// about what two connections do at the same time. Not the local `prisma dev`
// database: that is PGlite, one session shared by every connection.
const url = process.env.TEST_DATABASE_URL;

// Monday 26 October 2026, 07:00 in Berlin. Bookings below are on Tuesday.
const NOW = new Date("2026-10-26T06:00:00Z");
const tue = (hhmm: string) => new Date(`2026-10-27T${hhmm}:00+01:00`);

describe.skipIf(!url)("bookings against PostgreSQL", () => {
  const db = postgres<Contract>({ contractJson, url: url! }) as unknown as Db;
  let atlas: string;
  let borealis: string;

  const sql = (text: TemplateStringsArray) =>
    db.transaction(async (tx) => {
      await tx.execute(db.raw.sql(text).affectedCount().build());
    });
  const count = async () => (await db.orm.public.Booking.select("id").all()).length;
  const book = (roomId: string, start: string, end: string, title = "Meeting") =>
    createBooking(db, { roomId, title, booker: "Test", startsAt: tue(start), endsAt: tue(end) }, NOW);

  /** Settles every promise and sorts the outcomes: fulfilled, or the BookingError code. */
  const outcomes = async (work: Promise<unknown>[]) =>
    (await Promise.allSettled(work)).map((r) =>
      r.status === "fulfilled" ? "ok" : r.reason instanceof BookingError ? r.reason.code : `unexpected: ${r.reason}`,
    );

  beforeEach(async () => {
    await sql`TRUNCATE "Booking", "Room"`;
    const rooms = await db.orm.public.Room.createAll([
      { name: "Atlas", floor: "Floor 1", seats: 8 },
      { name: "Borealis", floor: "Floor 1", seats: 4 },
    ]);
    [atlas, borealis] = rooms.map((r) => r.id);
  });

  afterAll(async () => {
    await db.close();
  });

  describe("create", () => {
    it("books a free slot and refuses an overlapping one with a message", async () => {
      await book(atlas, "10:00", "11:00", "Sprint planning");
      await expect(book(atlas, "10:30", "11:30")).rejects.toThrow(
        'Atlas is already booked from 10:00 AM to 11:00 AM ("Sprint planning").',
      );
    });

    it("allows back-to-back bookings, because ends are exclusive", async () => {
      await book(atlas, "10:00", "11:00");
      await book(atlas, "11:00", "12:00");
      expect(await count()).toBe(2);
    });

    it("lets two rooms be booked at the same time", async () => {
      await book(atlas, "10:00", "11:00");
      await book(borealis, "10:00", "11:00");
      expect(await count()).toBe(2);
    });

    it("refuses times outside the opening hours and in the past", async () => {
      await expect(book(atlas, "18:00", "19:00")).rejects.toMatchObject({ code: "rule" });
      await expect(
        createBooking(db, { roomId: atlas, title: "x", booker: "y", startsAt: new Date("2026-10-26T05:00:00Z"), endsAt: new Date("2026-10-26T07:00:00Z") }, NOW),
      ).rejects.toMatchObject({ code: "rule" });
    });

    it("refuses an unknown room", async () => {
      await expect(book("no-such-room", "10:00", "11:00")).rejects.toMatchObject({ code: "not_found" });
    });
  });

  describe("move and cancel", () => {
    it("moves within the room even where the booking's own old time is", async () => {
      const b = await book(atlas, "10:00", "11:00");
      const moved = await moveBooking(db, b.id, { roomId: atlas, startsAt: tue("10:30"), endsAt: tue("11:30") }, NOW);
      expect(moved.startsAt).toEqual(tue("10:30"));
    });

    it("moves to another room, and refuses a move onto another booking", async () => {
      const a = await book(atlas, "10:00", "11:00");
      await book(borealis, "13:00", "14:00", "Interview");
      await moveBooking(db, a.id, { roomId: borealis, startsAt: tue("10:00"), endsAt: tue("11:00") }, NOW);
      await expect(
        moveBooking(db, a.id, { roomId: borealis, startsAt: tue("12:30"), endsAt: tue("13:30") }, NOW),
      ).rejects.toMatchObject({ code: "conflict" });
    });

    it("reports a booking that no longer exists", async () => {
      const b = await book(atlas, "10:00", "11:00");
      await deleteBooking(db, b.id);
      await expect(deleteBooking(db, b.id)).rejects.toMatchObject({ code: "not_found" });
      await expect(
        moveBooking(db, b.id, { roomId: atlas, startsAt: tue("12:00"), endsAt: tue("13:00") }, NOW),
      ).rejects.toMatchObject({ code: "not_found" });
    });
  });

  describe("concurrency", () => {
    it("lets exactly one of 25 simultaneous bookings of the same slot through", async () => {
      const results = await outcomes(Array.from({ length: 25 }, (_, i) => book(atlas, "10:00", "11:00", `Race ${i}`)));
      expect(results.filter((r) => r === "ok")).toHaveLength(1);
      expect(results.filter((r) => r === "conflict")).toHaveLength(24);
      expect(await count()).toBe(1);
    });

    it("lets exactly one of a create and a move into the same slot through", async () => {
      const b = await book(borealis, "09:00", "10:00");
      const results = await outcomes([
        book(atlas, "15:00", "16:00"),
        moveBooking(db, b.id, { roomId: atlas, startsAt: tue("15:30"), endsAt: tue("16:30") }, NOW),
      ]);
      expect(results.sort()).toEqual(["conflict", "ok"]);
    });

    it("does not deadlock when bookings move between two rooms in opposite directions", async () => {
      const a = await book(atlas, "09:00", "10:00");
      const b = await book(borealis, "09:00", "10:00");
      for (let round = 0; round < 10; round++) {
        const [roomA, roomB] = round % 2 === 0 ? [borealis, atlas] : [atlas, borealis];
        const hour = String(10 + round % 7).padStart(2, "0");
        const results = await outcomes([
          moveBooking(db, a.id, { roomId: roomA, startsAt: tue(`${hour}:00`), endsAt: tue(`${hour}:30`) }, NOW),
          moveBooking(db, b.id, { roomId: roomB, startsAt: tue(`${hour}:30`), endsAt: tue(`${String(Number(hour) + 1).padStart(2, "0")}:00`) }, NOW),
        ]);
        expect(results).toEqual(["ok", "ok"]);
      }
    });

    describe("without the exclusion constraint", () => {
      const dropConstraint = () => sql`ALTER TABLE "Booking" DROP CONSTRAINT IF EXISTS "booking_no_overlap"`;
      const restoreConstraint = () =>
        sql`ALTER TABLE "Booking" ADD CONSTRAINT "booking_no_overlap" EXCLUDE USING gist ("roomId" WITH =, tstzrange("startsAt", "endsAt", '[)') WITH &&)`;

      it("still lets exactly one of 25 through: the room lock alone is enough", async () => {
        await dropConstraint();
        try {
          const results = await outcomes(Array.from({ length: 25 }, () => book(atlas, "10:00", "11:00")));
          expect(results.filter((r) => r === "ok")).toHaveLength(1);
          expect(await count()).toBe(1);
        } finally {
          await restoreConstraint();
        }
      });

      it("shows why the lock exists: a plain check-then-insert double-books", async () => {
        // Two transactions both read "free", then both insert. This is the
        // interleaving the lock in createBooking makes impossible.
        let arrived = 0;
        let release!: () => void;
        const bothHaveRead = new Promise<void>((resolve) => (release = resolve));
        const naive = (title: string) =>
          db.transaction(async (tx) => {
            const clash = await tx.orm.public.Booking.where({ roomId: atlas })
              .where((b) => b.startsAt.lt(tue("11:00")))
              .where((b) => b.endsAt.gt(tue("10:00")))
              .first();
            if (++arrived === 2) release();
            await bothHaveRead;
            if (clash) throw new Error("taken");
            await tx.orm.public.Booking.create({ roomId: atlas, title, booker: "Naive", startsAt: tue("10:00"), endsAt: tue("11:00") });
          });

        await dropConstraint();
        try {
          await Promise.all([naive("First"), naive("Second")]);
          expect(await count()).toBe(2); // double booked
        } finally {
          await sql`TRUNCATE "Booking"`;
          await restoreConstraint();
        }
      });
    });

    it("has Postgres refuse an overlap that skips the app's check (the exclusion constraint)", async () => {
      await book(atlas, "10:00", "11:00");
      const error = await db.orm.public.Booking.create({ roomId: atlas, title: "Sneaky", booker: "SQL", startsAt: tue("10:30"), endsAt: tue("11:30") }).catch((e: unknown) => e);
      const sqlState = (e: unknown): unknown => (e && typeof e === "object" ? ("sqlState" in e ? e.sqlState : sqlState((e as { cause?: unknown }).cause)) : undefined);
      expect(sqlState(error)).toBe("23P01"); // exclusion_violation
      expect(await count()).toBe(1);
    });
  });

  describe("seed", () => {
    it("inserts the demo data once, even when called five times at once", async () => {
      await sql`TRUNCATE "Booking", "Room"`;
      const inserted = await Promise.all(Array.from({ length: 5 }, () => seedIfEmpty(db, NOW)));
      expect(inserted.filter(Boolean)).toHaveLength(1);
      expect(await db.orm.public.Room.select("id").all()).toHaveLength(6);
      expect(await count()).toBe(15);
    });
  });
});
