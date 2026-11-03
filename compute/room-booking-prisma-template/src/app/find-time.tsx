"use client";

import { useId, useState } from "react";

import type { RoomDTO } from "@/lib/api-types";
import { findFreeSlots } from "@/lib/free-slots";
import type { FreeSlot } from "@/lib/free-slots";
import { formatOfficeDay, formatOfficeTime } from "@/lib/office";

type Span = { roomId: string; startsAt: Date; endsAt: Date };

const LENGTHS = [30, 60, 90, 120]; // minutes
const PEOPLE = [1, 4, 8, 12];

/**
 * Suggests the first free time of each room that fits, on the days on screen,
 * found with the scheduler's `findAvailableSlots`. Picking one opens the
 * booking form, like selecting the same time on the timeline.
 */
export function FindTime({
  rooms,
  bookings,
  range,
  now,
  loading,
  onPick,
}: {
  rooms: RoomDTO[];
  bookings: Span[];
  range: { start: Date; end: Date };
  now: Date;
  /** The days on screen are still loading: their bookings are not in `bookings` yet. */
  loading: boolean;
  onPick: (room: RoomDTO, slot: FreeSlot) => void;
}) {
  const [minutes, setMinutes] = useState(60);
  const [people, setPeople] = useState(1);
  const today = formatOfficeDay(now);

  // The suggestions that share a time, under that time.
  const groups: { time: string; slots: FreeSlot[] }[] = [];
  const slots = loading ? [] : findFreeSlots(rooms, bookings, { from: range.start, to: range.end, minutes, seats: people, now });
  for (const slot of slots) {
    const day = formatOfficeDay(slot.start);
    const time = `${day === today ? "" : `${day}, `}${slot.start <= now ? "Now" : formatOfficeTime(slot.start)} – ${formatOfficeTime(slot.end)}`;
    const last = groups.at(-1);
    if (last?.time === time) last.slots.push(slot);
    else groups.push({ time, slots: [slot] });
  }

  return (
    <section className="panel" aria-labelledby="find-heading">
      <h2 id="find-heading">Find a time</h2>
      <Choice
        legend="How long"
        options={LENGTHS}
        value={minutes}
        onChange={setMinutes}
        label={(m) => (m < 60 ? `${m} min` : `${m / 60} h`)}
      />
      <Choice legend="People" options={PEOPLE} value={people} onChange={setPeople} label={(n) => (n === 1 ? "Any" : `${n}+`)} />

      {groups.length > 0 ? (
        <div className="picks">
          {groups.map(({ time, slots }) => (
            <div key={time}>
              {/* Intl output can differ by a space between the server's runtime and the browser. */}
              <p className="pick-time" suppressHydrationWarning>
                {time}
              </p>
              <ul className="pick-rooms">
                {slots.map((slot) => {
                  const room = rooms.find((r) => r.id === slot.roomId)!;
                  return (
                    <li key={room.id}>
                      <button
                        type="button"
                        className="pick"
                        aria-label={`Book ${room.name}, ${time}`}
                        onClick={() => onPick(room, slot)}
                      >
                        <span className="pick-name">{room.name}</span>
                        <span className="pick-seats">{room.seats} seats</span>
                        <span className="pick-go">Book</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : loading ? (
        <p className="picks-empty">Loading the days on screen…</p>
      ) : (
        <p className="picks-empty">No room is free for that long on the days on screen.</p>
      )}
    </section>
  );
}

/** A row of radio buttons drawn as a segmented control. */
function Choice({
  legend,
  options,
  value,
  onChange,
  label,
}: {
  legend: string;
  options: number[];
  value: number;
  onChange: (value: number) => void;
  label: (value: number) => string;
}) {
  const name = useId();
  return (
    <fieldset className="choice">
      <legend>{legend}</legend>
      <div className="choice-options">
        {options.map((option) => (
          <label key={option}>
            <input type="radio" name={name} checked={option === value} onChange={() => onChange(option)} />
            {label(option)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
