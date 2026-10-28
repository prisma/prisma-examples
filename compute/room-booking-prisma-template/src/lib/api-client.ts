import type { ApiError, ApiErrorCode, BookingDTO } from "./api-types.ts";

// The browser's side of the API: one function per route, and one error type
// that carries the server's code, message and field errors to the UI.

export class ApiRequestError extends Error {
  constructor(
    readonly code: ApiErrorCode | "network",
    message: string,
    readonly fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init.headers } });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiRequestError("network", "Could not reach the server. Check your connection and try again.");
  }
  if (response.status === 204) return undefined as T;

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = (body as ApiError | null)?.error;
    throw new ApiRequestError(
      error?.code ?? "internal",
      error?.message ?? `The server answered ${response.status}. Try again.`,
      error?.fields,
    );
  }
  return body as T;
}

type SlotBody = { roomId: string; startsAt: Date; endsAt: Date };

export const api = {
  list: (from: Date, to: Date, signal?: AbortSignal) =>
    request<BookingDTO[]>(`/api/bookings?from=${from.toISOString()}&to=${to.toISOString()}`, { signal }),
  // JSON.stringify turns each Date into an ISO string.
  create: (body: SlotBody & { title: string; booker: string }) =>
    request<BookingDTO>("/api/bookings", { method: "POST", body: JSON.stringify(body) }),
  move: (id: string, body: SlotBody) =>
    request<BookingDTO>(`/api/bookings/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) }),
  cancel: (id: string) => request<void>(`/api/bookings/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
