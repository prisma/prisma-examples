"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { ResourceScheduler, ViewType } from "resource-scheduler";
import type {
  Placement,
  ResourceInput,
  ResourceSchedulerHandle,
  SchedulerEvent,
  VisibleRange,
} from "resource-scheduler";
import { eventsToICS } from "resource-scheduler/exchange";
import "resource-scheduler/style.css";

import { ApiRequestError, api } from "@/lib/api-client";
import type { BookingDTO, RoomDTO } from "@/lib/api-types";
import {
  CLOSE_HOUR,
  OFFICE_TIME_ZONE,
  OPEN_HOUR,
  SLOT_MINUTES,
  formatOfficeDay,
  formatOfficeTime,
  officeTime,
} from "@/lib/office";
import { bookingRules } from "@/lib/rules";

import { SOURCE_URL } from "./about";
import { BookingDialog, rememberBooker, rememberedBooker } from "./booking-dialog";
import type { BookingDetails, BookingDraft } from "./booking-dialog";
import { FindTime } from "./find-time";
import { RoomLabel } from "./room-status";
import { ThemeToggle } from "./theme-toggle";

type Booking = {
  id: string;
  title: string;
  booker: string;
  roomId: string;
  startsAt: Date;
  endsAt: Date;
  /** Shown but not saved yet: drawn dashed, and cannot be moved until the server answers. */
  pending: boolean;
};

type Notice = { kind: "success" | "error"; text: string };

const rules = bookingRules();
const city = OFFICE_TIME_ZONE.split("/").pop()!.replaceAll("_", " ");
/** Tells React when another tab saves a booker name. */
const subscribeToBooker = (notify: () => void) => {
  window.addEventListener("storage", notify);
  return () => window.removeEventListener("storage", notify);
};

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

/** Line icons on a 24-pixel grid, drawn in the text color. */
const icon = (paths: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);
const clockIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
const downloadIcon = icon(<path d="M12 4v11m-4-4 4 4 4-4M5 20h14" />);
const printIcon = icon(<path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z" />);
const codeIcon = icon(<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />);

/** Saves an iCalendar file, which Google Calendar, Outlook and Apple Calendar open. */
function saveCalendar(fileName: string, ics: string) {
  const link = document.createElement("a");
  link.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  link.download = fileName;
  link.click();
}

/**
 * The app's window: the calendar, with "Find a time" beside it. Every change
 * is optimistic: it shows at once, is sent to the API, and is rolled back with
 * the server's message if the server refuses.
 */
export function Board({
  rooms,
  initialBookings,
  initialDate,
  serverNow,
  children,
}: {
  rooms: RoomDTO[];
  initialBookings: BookingDTO[];
  initialDate: string;
  /** The server's clock at render, so the first paint of the room statuses matches on both sides. */
  serverNow: string;
  /** Shown below the timeline. */
  children?: ReactNode;
}) {
  const [bookings, setBookings] = useState(() => initialBookings.map(fromDTO));
  const [start] = useState(() => new Date(initialDate));
  const [now, setNow] = useState(() => new Date(serverNow));
  const [view, setView] = useState<ViewType>(ViewType.Day);
  // What the grid shows: the day the page opened on, until the scheduler reports its range.
  const [range, setRange] = useState<VisibleRange>(() => ({
    start: officeTime(0, 0, 0, start),
    end: officeTime(1, 0, 0, start),
  }));
  // The range now, for a write that fails after the grid has moved on.
  const rangeRef = useRef(range);
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(false);
  const scheduler = useRef<ResourceSchedulerHandle>(null);
  const reported = useRef(false);
  const loadController = useRef<AbortController | null>(null);
  // Bookings under the name this browser booked with last are drawn as yours.
  // The server has no localStorage, so it renders none as yours.
  const me = useSyncExternalStore(subscribeToBooker, rememberedBooker, () => "");

  // The room statuses say "free" or "in use" on the minute.
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

  // Open the day at the current time, or at opening time when the page opened on tomorrow.
  useEffect(() => {
    scheduler.current?.scrollToTime(start);
  }, [start]);

  const roomById = useMemo(() => new Map(rooms.map((r) => [r.id, r])), [rooms]);
  const roomName = (id: string) => roomById.get(id)?.name ?? "the room";

  const resources = useMemo<ResourceInput[]>(
    () => rooms.map((r) => ({ id: r.id, name: r.name, role: `${r.seats} seats`, group: r.floor })),
    [rooms],
  );

  const events = useMemo<SchedulerEvent[]>(
    () =>
      bookings.map((b) => ({
        id: b.id,
        title: b.title,
        description: `Booked by ${b.booker}`,
        resourceId: b.roomId,
        startDate: b.startsAt,
        endDate: b.endsAt,
      })),
    [bookings],
  );

  // A room's status is about now, so it shows only while today is on screen.
  const todayOnScreen = range.start < officeTime(1, 0, 0, now) && range.end > officeTime(0, 0, 0, now);

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

  /** The grid moved to another day or week: load it. The first day came with the page. */
  function onRangeChange(next: VisibleRange) {
    rangeRef.current = next;
    setRange(next);
    if (reported.current) void fetchRange(next);
    reported.current = true;
  }

  /** Reloads the days on screen, after a failed write may have left them out of date. */
  async function refresh() {
    await fetchRange(rangeRef.current);
  }

  /** Every saved booking on screen, as one calendar file: one still saving may yet be refused. */
  function exportShown() {
    const shown = events.filter(
      (e) =>
        !bookings.some((b) => b.id === e.id && b.pending) && e.startDate < range.end && e.endDate > range.start,
    );
    saveCalendar("room-bookings.ics", eventsToICS(shown, { resources, name: "Meeting rooms" }));
  }

  return (
    <div className="app">
      <Link className="brand" href="/">
        <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
          <defs>
            <linearGradient id="brand-fill" x2="1" y2="1">
              <stop offset="0" stopColor="#7c3aed" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="9" fill="url(#brand-fill)" />
          <rect x="7" y="9" width="12" height="5" rx="1.5" fill="#fff" />
          <rect x="13" y="18" width="12" height="5" rx="1.5" fill="#fff" />
        </svg>
        Rooms
      </Link>

      <header className="head">
        <div>
          <h1>Book a meeting room</h1>
          <p>
            {view === ViewType.Week
              ? "Drag a booking to another day to move it. Switch to Day to book a new time."
              : "Drag across free time to book. Drag a booking to move it, or an edge to change its time."}
          </p>
        </div>
        <div className="head-tools">
          {/* Intl output can differ by a space between the server's runtime and the browser. */}
          <span className="clock" suppressHydrationWarning>
            {clockIcon}
            {formatOfficeDay(now)}, {formatOfficeTime(now)} in {city}
          </span>
          <button type="button" className="button" onClick={exportShown}>
            {downloadIcon}
            Export .ics
          </button>
          <button type="button" className="button" onClick={() => window.print()}>
            {printIcon}
            Print
          </button>
          <ThemeToggle />
        </div>
      </header>

      <aside className="sidebar" aria-label="Find a time">
        <FindTime
          rooms={rooms}
          bookings={bookings}
          range={range}
          now={now}
          loading={loading}
          onPick={(room, slot) => setDraft({ resourceId: room.id, start: slot.start, end: slot.end, roomName: room.name })}
        />
        <a className="side-link" href={SOURCE_URL}>
          {codeIcon}
          Source code
        </a>
      </aside>

      <main className="main">
        <div className="board-frame">
          <ResourceScheduler
            ref={scheduler}
            resources={resources}
            events={events}
            timeZone={OFFICE_TIME_ZONE}
            initialDate={start}
            initialView={ViewType.Day}
            availableViews={[ViewType.Day, ViewType.Week]}
            onViewChange={setView}
            weekStartsOn={1}
            slotDuration={SLOT_MINUTES}
            dayStartHour={OPEN_HOUR}
            dayEndHour={CLOSE_HOUR}
            // A week has a lane for every booking of a day: compact lanes keep the rows short.
            density={view === ViewType.Week ? "compact" : "comfortable"}
            resourceColumnWidth="220px"
            timeColumnWidth="64px"
            dateColumnWidth="120px"
            classNames={{ slot: "slot" }}
            nowIndicator
            businessHours={{ daysOfWeek: [0, 1, 2, 3, 4, 5, 6], startHour: OPEN_HOUR, endHour: CLOSE_HOUR }}
            showUtilization
            showColumnUtilization
            ariaLabel="Meeting room bookings"
            labels={{ resources: "Rooms" }}
            eventOverlap={rules.eventOverlap}
            isValidDrop={isValidDrop}
            onSlotSelect={(slot) => setDraft({ ...slot, roomName: roomName(slot.resourceId) })}
            onEventDrop={(event, _fromRoom, toRoom, startsAt, endsAt) => reschedule(event.id, toRoom, startsAt, endsAt)}
            onEventResize={(event, roomId, startsAt, endsAt) => reschedule(event.id, roomId, startsAt, endsAt)}
            onRangeChange={onRangeChange}
            renderResourceHeader={(resource) => (
              <RoomLabel room={roomById.get(resource.id)!} bookings={bookings} now={todayOnScreen ? now : null} />
            )}
            // The scheduler's wrapper around this keeps the keyboard, focus ring, popover and resize handles.
            // Times come from the booking: the event's dates are shifted into the scheduler's time zone.
            renderTimeSlot={(event) => {
              const booking = bookings.find((b) => b.id === event.id);
              return (
                <div
                  className="booking"
                  data-mine={booking?.booker === me || undefined}
                  data-pending={booking?.pending || undefined}
                  title={event.title}
                >
                  <span className="booking-title">{event.title}</span>
                  {booking && (
                    <span className="booking-time">
                      {formatOfficeTime(booking.startsAt)} – {formatOfficeTime(booking.endsAt)}
                    </span>
                  )}
                </div>
              );
            }}
            renderEventPopover={(event, resource, close) => {
              const booking = bookings.find((b) => b.id === event.id);
              return (
                <div className="details">
                  <div>
                    <p className="details-title">{event.title}</p>
                    {booking && (
                      <p className="muted">
                        {resource.name}, {formatOfficeDay(booking.startsAt)}, {formatOfficeTime(booking.startsAt)} to{" "}
                        {formatOfficeTime(booking.endsAt)}
                        <br />
                        Booked by {booking.booker}
                      </p>
                    )}
                  </div>
                  {booking?.pending ? (
                    <p className="muted">Saving…</p>
                  ) : (
                    <div className="details-actions">
                      <button
                        type="button"
                        className="button small"
                        onClick={() =>
                          saveCalendar("booking.ics", eventsToICS(events.filter((e) => e.id === event.id), { resources }))
                        }
                      >
                        Add to calendar
                      </button>
                      <button
                        type="button"
                        className="button small danger"
                        onClick={() => {
                          close();
                          cancel(event.id);
                        }}
                      >
                        Cancel booking
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div className="board-foot">
          <ul className="legend" aria-label="Key">
            <li className="mine">Yours</li>
            <li>Booked</li>
            <li className="pending">Saving</li>
          </ul>
          {loading ? <span role="status">Loading…</span> : <span>Times are {OFFICE_TIME_ZONE} time.</span>}
        </div>

        {children}
      </main>

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

      {draft && (
        <BookingDialog
          key={`${draft.resourceId}:${draft.start.getTime()}:${draft.errors ? "retry" : "new"}`}
          draft={draft}
          onBook={(details) => book(draft, details)}
          onCancel={() => setDraft(null)}
        />
      )}
    </div>
  );
}
