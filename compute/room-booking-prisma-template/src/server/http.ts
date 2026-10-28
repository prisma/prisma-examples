import type { z } from "zod";

import type { ApiError, ApiErrorCode } from "../lib/api-types.ts";
import { fieldErrors } from "../lib/validation.ts";
import { BookingError } from "./bookings.ts";

const STATUS: Record<ApiErrorCode, number> = { invalid: 400, not_found: 404, conflict: 409, rule: 422, internal: 500 };

export function errorResponse(code: ApiErrorCode, message: string, fields?: Record<string, string[]>) {
  const body: ApiError = { error: { code, message, ...(fields && { fields }) } };
  return Response.json(body, { status: STATUS[code] });
}

export function invalid(error: z.ZodError) {
  const fields = fieldErrors(error);
  const first = Object.values(fields).flat()[0] ?? error.issues[0]?.message ?? "The request is not valid.";
  return errorResponse("invalid", first, fields);
}

/** Reads a JSON body; `undefined` when it is missing or not JSON. */
export async function readJson(request: Request): Promise<unknown> {
  return request.json().catch(() => undefined);
}

/** A BookingError becomes its status; anything else is logged and becomes a 500. */
export function fail(error: unknown) {
  if (error instanceof BookingError) return errorResponse(error.code, error.message);
  console.error(error);
  return errorResponse("internal", "Something went wrong. Try again.");
}
