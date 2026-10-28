"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { SlotSelection } from "resource-scheduler";

import { OFFICE_TIME_ZONE, formatOfficeDay, formatOfficeTime } from "@/lib/office";
import { bookingDetailsSchema, fieldErrors } from "@/lib/validation";

export type BookingDetails = { title: string; booker: string };

/** The free range the user selected, plus what to show in the form. */
export type BookingDraft = SlotSelection & {
  roomName: string;
  values?: Partial<BookingDetails>;
  /** Field errors from the server, when a save was refused and the form reopens. */
  errors?: Record<string, string[]>;
};

const BOOKER_KEY = "room-booking:booker";

function rememberedBooker(): string {
  try {
    return localStorage.getItem(BOOKER_KEY) ?? "";
  } catch {
    return "";
  }
}

export function rememberBooker(name: string) {
  try {
    localStorage.setItem(BOOKER_KEY, name);
  } catch {
    // private mode or storage disabled: nothing to remember
  }
}

/**
 * The app's own booking form, opened by `onSlotSelect`. It validates with the
 * same zod schema as the server, so most mistakes never leave the browser.
 */
export function BookingDialog({
  draft,
  onBook,
  onCancel,
}: {
  draft: BookingDraft;
  onBook: (details: BookingDetails) => void;
  onCancel: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const [errors, setErrors] = useState<Record<string, string[]>>(draft.errors ?? {});
  const [booker] = useState(() => draft.values?.booker ?? rememberedBooker());

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const details = bookingDetailsSchema.safeParse({ title: form.get("title"), booker: form.get("booker") });
    if (!details.success) {
      setErrors(fieldErrors(details.error));
      return;
    }
    onBook(details.data);
  }

  // Server errors about the slot itself (room, times) have no field in this form.
  const otherErrors = Object.entries(errors)
    .filter(([field]) => field !== "title" && field !== "booker")
    .flatMap(([, messages]) => messages);

  return (
    <dialog ref={dialog} className="dialog" aria-labelledby={headingId} onClose={onCancel}>
      <form onSubmit={submit} noValidate>
        <h2 id={headingId}>Book {draft.roomName}</h2>
        <p className="dialog-when">
          {formatOfficeDay(draft.start)}, {formatOfficeTime(draft.start)} to {formatOfficeTime(draft.end)}
          <span className="muted"> ({OFFICE_TIME_ZONE})</span>
        </p>

        {otherErrors.length > 0 && (
          <p className="field-error" role="alert">
            {otherErrors.join(" ")}
          </p>
        )}

        <Field name="title" label="Title" defaultValue={draft.values?.title} errors={errors.title} autoFocus />
        <Field name="booker" label="Booked by" defaultValue={booker} errors={errors.booker} autoComplete="name" />

        <div className="dialog-actions">
          <button type="button" className="button" onClick={() => dialog.current?.close()}>
            Cancel
          </button>
          <button type="submit" className="button primary">
            Book
          </button>
        </div>
      </form>
    </dialog>
  );
}

function Field({
  name,
  label,
  errors,
  ...input
}: {
  name: string;
  label: string;
  errors?: string[];
  defaultValue?: string;
  autoFocus?: boolean;
  autoComplete?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="text"
        required
        maxLength={name === "title" ? 80 : 60}
        aria-invalid={errors ? true : undefined}
        aria-describedby={errors ? errorId : undefined}
        {...input}
      />
      {errors && (
        <p id={errorId} className="field-error">
          {errors.join(" ")}
        </p>
      )}
    </div>
  );
}
