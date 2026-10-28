import { utcToZoned, zonedToUtc } from "resource-scheduler/headless";

// The office the rooms are in. Booking times are shown, and the opening hours
// are checked, on this clock, in the browser and on the server alike, so a
// visitor in another zone and a server running in UTC agree on what "9:00" is.
// Change it to your office's IANA zone.
export const OFFICE_TIME_ZONE = "Europe/Berlin";

// Opening hours on the office clock: the first bookable hour, and the hour
// bookings must end by (exclusive, like every end in this app).
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 18;

// The grid's slot length. Bookings may start at the current slot, not earlier.
export const SLOT_MINUTES = 30;

/** The instant it is `hour:minute` on the office clock, `dayOffset` days from today there. */
export function officeTime(dayOffset: number, hour: number, minute = 0, now = new Date()): Date {
  const today = utcToZoned(now, OFFICE_TIME_ZONE);
  const wallClock = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset, hour, minute);
  return zonedToUtc(wallClock, OFFICE_TIME_ZONE);
}

/** Formats an instant as a time on the office clock, for messages: "9:30 AM". */
export function formatOfficeTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: OFFICE_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/** Formats an instant as a day on the office clock: "Tue, Oct 27". */
export function formatOfficeDay(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: OFFICE_TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}
