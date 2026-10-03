import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getBookings, updateBookingStatus } from "@/lib/db";
import type { BookingStatus } from "@/lib/db";

// ── helpers ──────────────────────────────────────────────────────────────────
function getAdminPassword(): string {
  const pw = process.env["ADMIN_PASSWORD"];
  if (pw) return pw.trim();
  // fallback – never exposes to client
  return "rythmo2026";
}

// ── verify password ──────────────────────────────────────────────────────────
export const verifyAdminPasswordFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return z.object({ password: z.string() }).parse(data);
  })
  .handler(async ({ data }) => {
    const correct = getAdminPassword();
    if (data.password === correct) {
      return { success: true };
    }
    return { success: false, error: "Incorrect passcode." };
  });

// ── fetch all bookings ───────────────────────────────────────────────────────
export const getBookingsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const bookings = await getBookings();
    return { bookings };
  });

// ── update a booking status ──────────────────────────────────────────────────
export const updateBookingStatusFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return z.object({
      id: z.number(),
      status: z.enum(["Pending", "Confirmed", "Completed"]),
    }).parse(data);
  })
  .handler(async ({ data }) => {
    await updateBookingStatus(data.id, data.status as BookingStatus);
    return { success: true };
  });
