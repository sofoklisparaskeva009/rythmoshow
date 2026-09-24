import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { saveBooking } from "@/lib/db";

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
    try {
      const result = await saveBooking(data);
      console.info(`[Booking Notification] New booking request saved for ${data.fullName} (${data.eventType}, ${data.location || "Cyprus"}). Notification recipient: ${NOTIFICATION_RECIPIENT_EMAIL}`);
      return result;
    } catch (err: any) {
      console.error("Failed to save booking:", err);
      throw new Error(err?.message || "Failed to save booking to database.");
    }
  });
