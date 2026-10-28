"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ResourceScheduler, ViewType } from "resource-scheduler";
import type { Placement, ResourceInput, SchedulerEvent, VisibleRange } from "resource-scheduler";
import "resource-scheduler/style.css";

import { ApiRequestError, api } from "@/lib/api-client";
import type { BookingDTO, RoomDTO } from "@/lib/api-types";
import { CLOSE_HOUR, OFFICE_TIME_ZONE, OPEN_HOUR, SLOT_MINUTES, formatOfficeTime } from "@/lib/office";
import { bookingRules } from "@/lib/rules";

import { BookingDialog, rememberBooker } from "./booking-dialog";
import type { BookingDetails, BookingDraft } from "./booking-dialog";
import { RoomStatus } from "./room-status";

type Booking = {
  id: string;
  title: string;
  booker: string;
  roomId: string;
  startsAt: Date;
  endsAt: Date;
  /** Shown but not saved yet: drawn grey, and cannot be moved until the server answers. */
  pending: boolean;
};

type Notice = { kind: "success" | "error"; text: string };

const PENDING_COLOR = "var(--pending)";
const FLOOR_COLORS = 4; // --floor-1 to --floor-4 in globals.css, reused when there are more floors
const rules = bookingRules();

const fromDTO = (b: BookingDTO): Booking => ({
  ...b,
  startsAt: new Date(b.startsAt),
  endsAt: new Date(b.endsAt),
  pending: false,
});

const messageOf = (error: unknown) =>
  error instanceof ApiRequestError ? error.message : "Something went wrong. Try again.";

const isGone = (error: unknown) => error instanceof ApiRequestError && error.code === "not_found";
const isConflict = (error: unknown) => error instanceof ApiRequestError && error.code === "conflict";
/** A conflict, or a failure that may have reached the server: show what is saved now. */
const shouldRefresh = (error: unknown) => isConflict(error) || !(error instanceof ApiRequestError);

/**
 * The calendar. Every change is optimistic: it shows at once, is sent to the
 * API, and is rolled back with the server's message if the server refuses.
 */
export function Board({
  rooms,
  initialBookings,
  initialDate,
  serverNow,
}: {
  rooms: RoomDTO[];
  initialBookings: BookingDTO[];
  initialDate: string;
  /** The server's clock at render, so the first paint of the room plates matches on both sides. */
  serverNow: string;
}) {
  const [bookings, setBookings] = useState(() => initialBookings.map(fromDTO));
  const [start] = useState(() => new Date(initialDate));
  const [now, setNow] = useState(() => new Date(serverNow));
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(false);
  const visibleRange = useRef<VisibleRange | null>(null);
  const loadController = useRef<AbortController | null>(null);

  // The room plates say "free" or "in use" on the minute.
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(timer);
  }, []);

  // Success messages fade on their own; errors stay until dismissed.
  useEffect(() => {
    if (notice?.kind !== "success") return;
    const timer = setTimeout(() => setNotice(null), 5_000);
    return () => clearTimeout(timer);
  }, [notice]);

  const roomName = (id: string) => rooms.find((r) => r.id === id)?.name ?? "the room";

  // Every floor gets a color, like the signs in an office building, on its plates and its bookings.
  const floorColor = useMemo(() => {
    const floors = [...new Set(rooms.map((r) => r.floor))];
    return (floor: string) => `var(--floor-${(floors.indexOf(floor) % FLOOR_COLORS) + 1})`;
  }, [rooms]);

  const resources = useMemo<ResourceInput[]>(
    () => rooms.map((r) => ({ id: r.id, name: r.name, role: `${r.seats} seats`, group: r.floor })),
    [rooms],
  );

  const events = useMemo<SchedulerEvent[]>(() => {
    const floorOf = new Map(rooms.map((r) => [r.id, r.floor]));
    return bookings.map((b) => ({
      id: b.id,
      title: b.title,
      description: `Booked by ${b.booker}`,
      resourceId: b.roomId,
      startDate: b.startsAt,
      endDate: b.endsAt,
      color: b.pending ? PENDING_COLOR : floorColor(floorOf.get(b.roomId) ?? ""),
    }));
  }, [bookings, rooms, floorColor]);

  // The shared rules, plus one that only matters in the browser: a booking
  // that is still being saved cannot be moved yet.
  const isValidDrop = (event: SchedulerEvent, placement: Placement) =>
    !bookings.some((b) => b.id === event.id && b.pending) && rules.isValidDrop(event, placement);

  async function book(slot: BookingDraft, details: BookingDetails) {
    const tempId = `pending-${crypto.randomUUID()}`;
    setDraft(null);
    setNotice(null);
    rememberBooker(details.booker);
    setBookings((all) => [
      ...all,
      { id: tempId, ...details, roomId: slot.resourceId, startsAt: slot.start, endsAt: slot.end, pending: true },
    ]);

    try {
      const saved = await api.create({ roomId: slot.resourceId, startsAt: slot.start, endsAt: slot.end, ...details });
      setBookings((all) => all.map((b) => (b.id === tempId ? fromDTO(saved) : b)));
      setNotice({
        kind: "success",
        text: `Booked ${slot.roomName}, ${formatOfficeTime(slot.start)} to ${formatOfficeTime(slot.end)}.`,
      });
    } catch (error) {
      setBookings((all) => all.filter((b) => b.id !== tempId)); // roll back
      setNotice({ kind: "error", text: messageOf(error) });
      if (shouldRefresh(error)) void refresh(); // show what is in the way, or what was saved
      if (error instanceof ApiRequestError && error.code === "invalid") {
        setDraft({ ...slot, values: details, errors: error.fields }); // reopen the form with the server's messages
      }
    }
  }

  /** Moving and resizing both end with a room and a new start and end. */
  async function reschedule(id: string, roomId: string, startsAt: Date, endsAt: Date) {
    const before = bookings.find((b) => b.id === id);
    if (!before || before.pending) return;
    setNotice(null);
    setBookings((all) => all.map((b) => (b.id === id ? { ...b, roomId, startsAt, endsAt, pending: true } : b)));

    try {
      const saved = await api.move(id, { roomId, startsAt, endsAt });
      setBookings((all) => all.map((b) => (b.id === id ? fromDTO(saved) : b)));
    } catch (error) {
      setBookings((all) =>
        isGone(error) ? all.filter((b) => b.id !== id) : all.map((b) => (b.id === id ? before : b)), // roll back
      );
      setNotice({ kind: "error", text: messageOf(error) });
      if (shouldRefresh(error)) void refresh(); // show what is in the way, or what was saved
    }
  }

  async function cancel(id: string) {
    const before = bookings.find((b) => b.id === id);
    if (!before || before.pending) return;
    setNotice(null);
    setBookings((all) => all.filter((b) => b.id !== id));

    try {
      await api.cancel(id);
      setNotice({ kind: "success", text: `Cancelled "${before.title}".` });
    } catch (error) {
      if (isGone(error)) {
        setNotice({ kind: "success", text: `"${before.title}" was already cancelled.` });
        return;
      }
      setBookings((all) => [...all, before]); // roll back
      setNotice({ kind: "error", text: messageOf(error) });
      if (shouldRefresh(error)) void refresh();
    }
  }

  /** Replaces the saved bookings of `range` with the server's, keeping unsaved ones. */
  async function fetchRange({ start: from, end: to }: VisibleRange) {
    loadController.current?.abort();
    const controller = new AbortController();
    loadController.current = controller;
    setLoading(true);

    try {
      const fetched = (await api.list(from, to, controller.signal)).map(fromDTO);
      setBookings((all) => {
        const pending = all.filter((b) => b.pending);
        const outside = all.filter((b) => !b.pending && (b.endsAt <= from || b.startsAt >= to));
        return [...outside, ...pending, ...fetched.filter((f) => !pending.some((p) => p.id === f.id))];
      });
    } catch (error) {
      if (controller.signal.aborted) return;
      setNotice({ kind: "error", text: messageOf(error) });
    } finally {
      if (loadController.current === controller) setLoading(false);
    }
  }

  /** The grid moved to another day: load it. The first day came with the page. */
  function onRangeChange(range: VisibleRange) {
    const first = visibleRange.current === null;
    visibleRange.current = range;
    if (!first) void fetchRange(range);
  }

  /** Reloads the day on screen, after a conflict showed it is out of date. */
  async function refresh() {
    if (visibleRange.current) await fetchRange(visibleRange.current);
  }

  return (
    <>
      <RoomStatus
        rooms={rooms}
        bookings={bookings}
        now={now}
        floorColor={floorColor}
        onBook={(room, slot) => setDraft({ resourceId: room.id, ...slot, roomName: room.name })}
      />

      <div className="board-head">
        <h2>Timeline</h2>
        <p className="muted">
          Drag across free time to book. Drag a booking to move it, drag its edge to resize it, click it to cancel.
          Times are {OFFICE_TIME_ZONE} time.
        </p>
        {loading && (
          <span className="loading" role="status">
            Loading…
          </span>
        )}
      </div>

      <div className="toast-region" aria-live="polite">
        {notice && (
          <div className={`toast ${notice.kind}`} role={notice.kind === "error" ? "alert" : "status"}>
            <span>{notice.text}</span>
            <button type="button" className="toast-close" aria-label="Dismiss" onClick={() => setNotice(null)}>
              ×
            </button>
          </div>
        )}
      </div>

      <div className="board-frame">
        <ResourceScheduler
          resources={resources}
          events={events}
          timeZone={OFFICE_TIME_ZONE}
          initialDate={start}
          initialView={ViewType.Day}
          allowViewChange={false}
          slotDuration={SLOT_MINUTES}
          dayStartHour={OPEN_HOUR}
          dayEndHour={CLOSE_HOUR}
          nowIndicator
          showUtilization
          businessHours={{ daysOfWeek: [0, 1, 2, 3, 4, 5, 6], startHour: OPEN_HOUR, endHour: CLOSE_HOUR }}
          ariaLabel="Meeting room bookings"
          labels={{ resources: "Rooms" }}
          eventOverlap={rules.eventOverlap}
          isValidDrop={isValidDrop}
          onSlotSelect={(slot) => setDraft({ ...slot, roomName: roomName(slot.resourceId) })}
          onEventDrop={(event, _fromRoom, toRoom, startsAt, endsAt) => reschedule(event.id, toRoom, startsAt, endsAt)}
          onEventResize={(event, roomId, startsAt, endsAt) => reschedule(event.id, roomId, startsAt, endsAt)}
          onRangeChange={onRangeChange}
          renderEventPopover={(event, resource, close) => {
            const booking = bookings.find((b) => b.id === event.id);
            return (
              <div className="details">
                <p className="details-title">{event.title}</p>
                {booking && (
                  <p className="muted">
                    {resource.name}, {formatOfficeTime(booking.startsAt)} to {formatOfficeTime(booking.endsAt)}
                    <br />
                    Booked by {booking.booker}
                  </p>
                )}
                {booking?.pending ? (
                  <p className="muted">Saving…</p>
                ) : (
                  <button
                    type="button"
                    className="button danger"
                    onClick={() => {
                      close();
                      cancel(event.id);
                    }}
                  >
                    Cancel booking
                  </button>
                )}
              </div>
            );
          }}
        />
      </div>

      {draft && (
        <BookingDialog
          key={`${draft.resourceId}:${draft.start.getTime()}:${draft.errors ? "retry" : "new"}`}
          draft={draft}
          onBook={(details) => book(draft, details)}
          onCancel={() => setDraft(null)}
        />
      )}
    </>
  );
}
