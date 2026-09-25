import { Resend } from "resend";
import type { BookingInput } from "./db";

export const NOTIFICATION_RECIPIENT = "percussionshow9@gmail.com";
export const SENDER = "rythmoShow Bookings <onboarding@resend.dev>";

function getResendApiKey(): string {
  const fromProcess = process.env["RESEND_API_KEY"];
  const fromMeta =
    typeof import.meta !== "undefined" && (import.meta as any).env
      ? (import.meta as any).env["RESEND_API_KEY"]
      : undefined;
  return (fromProcess || fromMeta || "").trim();
}

function buildBookingEmailHtml(data: BookingInput): string {
  const eventDate = data.eventDate || "—";
  const location = data.location || "Κύπρος";
  const notes = data.notes || "—";

  return `<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Νέα Κράτηση rythmoShow</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #333;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#b8860b 0%,#ffd700 50%,#b8860b 100%);
                        padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#0d0d0d;letter-spacing:1px;">
                🥁 rythmoShow
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:#0d0d0d;opacity:0.8;font-weight:600;">
                Νέα Κράτηση / New Booking Request
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:16px;color:#cccccc;line-height:1.6;">
                Λήφθηκε νέο αίτημα κράτησης. Παρακαλώ επικοινωνήστε με τον πελάτη το συντομότερο δυνατό.
              </p>

              <!-- Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row("👤 Όνομα / Full Name", data.fullName)}
                ${row("📞 Τηλέφωνο / Phone", data.phone)}
                ${row("✉️ Email Πελάτη / Customer Email", data.email)}
                ${row("📅 Ημερομηνία / Event Date", eventDate)}
                ${row("📍 Πόλη / Location", location)}
                ${row("🎉 Τύπος Εκδήλωσης / Event Type", data.eventType)}
                ${data.djOption ? row("🎧 Επιλογή DJ / DJ Option", data.djOption) : ""}
                ${row("💬 Μήνυμα / Message", notes, true)}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid #333;text-align:center;">
              <p style="margin:0;font-size:12px;color:#666666;">
                Αυτό το email στάλθηκε αυτόματα από το σύστημα κρατήσεων του rythmoShow.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string, isMultiline = false): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #2a2a2a;vertical-align:top;width:45%;">
        <span style="font-size:13px;color:#999999;font-weight:600;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #2a2a2a;vertical-align:top;">
        <span style="font-size:14px;color:#f0f0f0;${isMultiline ? "white-space:pre-wrap;" : ""}">${value}</span>
      </td>
    </tr>`;
}

export type EmailResult =
  | { success: true; messageId: string }
  | { success: false; error: string };

export async function sendBookingNotification(
  data: BookingInput,
): Promise<EmailResult> {
  const apiKey = getResendApiKey();
  if (!apiKey || apiKey === "re_your_api_key_here") {
    const msg =
      "RESEND_API_KEY is not configured — skipping email notification.";
    console.warn(`[Email] ${msg}`);
    return { success: false, error: msg };
  }

  const resend = new Resend(apiKey);

  const subject = `🥁 Νέα Κράτηση rythmoShow - ${data.fullName} - ${data.eventDate}`;

  try {
    const response = await resend.emails.send({
      from: SENDER,
      to: [NOTIFICATION_RECIPIENT],
      subject,
      html: buildBookingEmailHtml(data),
    });

    if (response.error) {
      const errMsg = response.error.message || JSON.stringify(response.error);
      console.error("[Email] Resend API error:", errMsg);
      return { success: false, error: errMsg };
    }

    const messageId = response.data?.id ?? "unknown";
    console.info(
      `[Email] Booking notification sent successfully. Message ID: ${messageId}`,
    );
    return { success: true, messageId };
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    console.error("[Email] Failed to send booking notification:", errMsg);
    return { success: false, error: errMsg };
  }
}
