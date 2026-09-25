import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { saveBooking } from "@/lib/db";
import { sendBookingNotification } from "@/lib/email";

export const bookingInputSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(1, "Phone number is required"),
  eventDate: z.string().trim().min(1, "Event date is required"),
  eventType: z.string().trim().min(1, "Event type is required"),
  location: z.string().optional().default(""),
  djOption: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  language: z.enum(["gr", "en"]).optional().default("gr"),
});

export type BookingFormData = z.infer<typeof bookingInputSchema>;

export const NOTIFICATION_RECIPIENT_EMAIL = "percussionshow9@gmail.com";

export const submitBookingServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return bookingInputSchema.parse(data);
  })
  .handler(async ({ data }) => {
    // 1. Always persist to Neon DB first.
    let dbResult: Awaited<ReturnType<typeof saveBooking>>;
    try {
      dbResult = await saveBooking(data);
      console.info(
        `[Booking] Saved to DB for ${data.fullName} (ID: ${(dbResult.booking as any)?.id ?? "?"})`,
      );
    } catch (err: any) {
      console.error("[Booking] Failed to save booking:", err);
      throw new Error(err?.message || "Failed to save booking to database.");
    }

    // 2. Fire email notification — failure does NOT block the booking response.
    const emailResult = await sendBookingNotification(data);
    if (emailResult.success) {
      console.info(
        `[Booking] Email notification sent (messageId: ${emailResult.messageId})`,
      );
    } else {
      console.warn(
        `[Booking] Email notification failed: ${emailResult.error}`,
      );
    }

    return {
      ...dbResult,
      emailSent: emailResult.success,
      emailError: emailResult.success ? null : emailResult.error,
    };
  });
