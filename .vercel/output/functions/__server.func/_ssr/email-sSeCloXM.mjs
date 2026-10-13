import { i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as Xs } from "../_libs/neondatabase__serverless.mjs";
import { t as Resend } from "../_libs/resend+standardwebhooks.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/email-sSeCloXM.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function getDatabaseUrl() {
	const envDbUrl = process.env["DATABASE_URL"];
	const metaEnv = typeof import.meta !== "undefined" && {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	} ? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["DATABASE_URL"] : void 0;
	let cleanUrl = (envDbUrl || metaEnv || "").trim().replace(/^[\"']|[\"']$/g, "");
	if (cleanUrl.startsWith("postgresql://postgresql://")) cleanUrl = cleanUrl.replace("postgresql://postgresql://", "postgresql://");
	else if (cleanUrl.startsWith("postgres://postgres://")) cleanUrl = cleanUrl.replace("postgres://postgres://", "postgres://");
	return cleanUrl;
}
var tableInitialized = false;
async function ensureBookingTableExists() {
	if (tableInitialized) return;
	const dbUrl = getDatabaseUrl();
	if (!dbUrl) throw new Error("DATABASE_URL is not configured in environment.");
	const sql = Xs(dbUrl);
	await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      event_date VARCHAR(100) NOT NULL,
      event_type VARCHAR(100) NOT NULL,
      location VARCHAR(255),
      dj_option VARCHAR(100),
      notes TEXT,
      language VARCHAR(10) DEFAULT 'gr',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
	await sql`
    ALTER TABLE bookings
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending';
  `;
	tableInitialized = true;
}
async function saveBooking(input) {
	const dbUrl = getDatabaseUrl();
	if (!dbUrl) throw new Error("DATABASE_URL is missing. Please set DATABASE_URL in .env.local");
	await ensureBookingTableExists();
	return {
		success: true,
		booking: (await Xs(dbUrl)`
    INSERT INTO bookings (
      full_name,
      email,
      phone,
      event_date,
      event_type,
      location,
      dj_option,
      notes,
      language
    ) VALUES (
      ${input.fullName},
      ${input.email},
      ${input.phone},
      ${input.eventDate},
      ${input.eventType},
      ${input.location || null},
      ${input.djOption || null},
      ${input.notes || null},
      ${input.language || "gr"}
    )
    RETURNING id, full_name, email, phone, event_date, event_type, location, dj_option, notes, language, created_at;
  `)[0]
	};
}
async function getBookings() {
	const dbUrl = getDatabaseUrl();
	if (!dbUrl) throw new Error("DATABASE_URL is missing.");
	await ensureBookingTableExists();
	return await Xs(dbUrl)`
    SELECT
      id,
      full_name   AS "fullName",
      email,
      phone,
      event_date  AS "eventDate",
      event_type  AS "eventType",
      location,
      dj_option   AS "djOption",
      notes,
      language,
      status,
      created_at  AS "createdAt"
    FROM bookings
    ORDER BY created_at DESC;
  `;
}
async function getBookingById(id) {
	const dbUrl = getDatabaseUrl();
	if (!dbUrl) throw new Error("DATABASE_URL is missing.");
	await ensureBookingTableExists();
	const rows = await Xs(dbUrl)`
    SELECT
      id,
      full_name   AS "fullName",
      email,
      phone,
      event_date  AS "eventDate",
      event_type  AS "eventType",
      location,
      dj_option   AS "djOption",
      notes,
      language,
      status,
      created_at  AS "createdAt"
    FROM bookings
    WHERE id = ${id}
    LIMIT 1;
  `;
	if (!rows || rows.length === 0) return null;
	return rows[0];
}
async function updateBookingStatus(id, status) {
	const dbUrl = getDatabaseUrl();
	if (!dbUrl) throw new Error("DATABASE_URL is missing.");
	await ensureBookingTableExists();
	const sql = Xs(dbUrl);
	try {
		const result = await sql`
      UPDATE bookings
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id;
    `;
		if (!result || result.length === 0) throw new Error(`No booking found with id=${id}`);
		console.info(`[DB] Updated booking id=${id} status → ${status}`);
	} catch (err) {
		console.error(`[DB] updateBookingStatus failed for id=${id}:`, err);
		throw new Error(err?.message ?? "Database error while updating booking status.");
	}
}
var NOTIFICATION_RECIPIENT = "percussionshow9@gmail.com";
var SENDER = "rythmoShow Bookings <onboarding@resend.dev>";
var CONFIRMATION_EMAIL_SUBJECT = "Η κράτησή σας στο rythmoShow επιβεβαιώθηκε! / Your rythmoShow booking is confirmed! 🎉";
function getResendApiKey() {
	const fromProcess = process.env["RESEND_API_KEY"];
	const fromMeta = typeof import.meta !== "undefined" && {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	} ? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["RESEND_API_KEY"] : void 0;
	return (fromProcess || fromMeta || "").trim();
}
function buildBookingEmailHtml(data) {
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
function row(label, value, isMultiline = false) {
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
async function sendBookingNotification(data) {
	const apiKey = getResendApiKey();
	if (!apiKey || apiKey === "re_your_api_key_here") {
		const msg = "RESEND_API_KEY is not configured — skipping email notification.";
		console.warn(`[Email] ${msg}`);
		return {
			success: false,
			error: msg
		};
	}
	const resend = new Resend(apiKey);
	const subject = `🥁 Νέα Κράτηση rythmoShow - ${data.fullName} - ${data.eventDate}`;
	try {
		const response = await resend.emails.send({
			from: SENDER,
			to: [NOTIFICATION_RECIPIENT],
			subject,
			html: buildBookingEmailHtml(data)
		});
		if (response.error) {
			const errMsg = response.error.message || JSON.stringify(response.error);
			console.error("[Email] Resend API error:", errMsg);
			return {
				success: false,
				error: errMsg
			};
		}
		const messageId = response.data?.id ?? "unknown";
		console.info(`[Email] Booking notification sent successfully. Message ID: ${messageId}`);
		return {
			success: true,
			messageId
		};
	} catch (err) {
		const errMsg = err?.message || String(err);
		console.error("[Email] Failed to send booking notification:", errMsg);
		return {
			success: false,
			error: errMsg
		};
	}
}
function buildConfirmationEmailHtml(data) {
	const customerName = data.fullName?.trim() || "Εκλεκτέ Πελάτη / Valued Client";
	const eventDate = data.eventDate?.trim() || "—";
	const location = data.location?.trim() || data.eventType || "Κύπρος / Cyprus";
	const eventType = data.eventType?.trim() || "—";
	return `<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Η κράτησή σας στο rythmoShow επιβεβαιώθηκε! / Your rythmoShow booking is confirmed! 🎉</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#161616;border-radius:14px;overflow:hidden;border:1px solid #2e2e2e;box-shadow:0 10px 30px rgba(0,0,0,0.5);max-width:600px;width:100%;">

          <!-- Header with Gold Gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,#b8860b 0%,#ffd700 50%,#b8860b 100%);
                        padding:34px 40px;text-align:center;">
              <h1 style="margin:0;font-size:30px;font-weight:800;color:#0d0d0d;letter-spacing:1px;line-height:1.2;">
                🥁 rythmoShow
              </h1>
              <p style="margin:10px 0 0;font-size:14px;color:#0d0d0d;opacity:0.9;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">
                Επιβεβαίωση Κράτησης / Booking Confirmation
              </p>
            </td>
          </tr>

          <!-- Confirmation Status Banner -->
          <tr>
            <td style="padding:28px 40px 0;text-align:center;">
              <div style="display:inline-block;padding:8px 20px;background:rgba(255,215,0,0.12);border:1px solid #ffd700;border-radius:30px;color:#ffd700;font-size:13px;font-weight:700;letter-spacing:0.8px;">
                ✓ ΕΠΙΒΕΒΑΙΩΘΗΚΕ / CONFIRMED
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:24px 40px 32px;">

              <!-- Greek Section -->
              <div style="background:#1f1f1f;border-left:4px solid #ffd700;border-radius:8px;padding:22px;margin-bottom:20px;">
                <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#ffd700;text-transform:uppercase;letter-spacing:0.8px;">
                  🇬🇷 Ελληνικά
                </p>
                <p style="margin:0 0 12px;font-size:16px;color:#ffffff;line-height:1.6;">
                  Γεια σας <strong style="color:#ffd700;">${customerName}</strong>,
                </p>
                <p style="margin:0 0 14px;font-size:15px;color:#e0e0e0;line-height:1.65;">
                  Σας ευχαριστούμε θερμά για την εμπιστοσύνη σας! Η κράτησή σας στις <strong style="color:#ffffff;">${eventDate}</strong> (Τοποθεσία: <strong style="color:#ffffff;">${location}</strong>) έχει επιβεβαιωθεί επίσημα.
                </p>
                <p style="margin:0;font-size:14px;color:#ffd700;font-weight:600;">
                  Η ομάδα του rythmoShow
                </p>
              </div>

              <!-- English Section -->
              <div style="background:#1f1f1f;border-left:4px solid #ffd700;border-radius:8px;padding:22px;margin-bottom:28px;">
                <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#ffd700;text-transform:uppercase;letter-spacing:0.8px;">
                  🇬🇧 English
                </p>
                <p style="margin:0 0 12px;font-size:16px;color:#ffffff;line-height:1.6;">
                  Hello <strong style="color:#ffd700;">${customerName}</strong>,
                </p>
                <p style="margin:0 0 14px;font-size:15px;color:#e0e0e0;line-height:1.65;">
                  Thank you for your trust! Your booking on <strong style="color:#ffffff;">${eventDate}</strong> (Location: <strong style="color:#ffffff;">${location}</strong>) has been officially confirmed.
                </p>
                <p style="margin:0;font-size:14px;color:#ffd700;font-weight:600;">
                  The rythmoShow Team
                </p>
              </div>

              <!-- Details Summary Table -->
              <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;padding:18px 24px;">
                <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#ffd700;text-transform:uppercase;letter-spacing:0.8px;">
                  📋 Στοιχεία Κράτησης / Booking Summary
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row("👤 Πελάτης / Customer", customerName)}
                  ${row("📅 Ημερομηνία / Date", eventDate)}
                  ${row("🎉 Τύπος / Event Type", eventType)}
                  ${row("📍 Τοποθεσία / Location", location)}
                  ${data.djOption ? row("🎧 DJ Option", data.djOption) : ""}
                  ${row("⚡ Κατάσταση / Status", "Επιβεβαιωμένη / Confirmed")}
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid #2a2a2a;text-align:center;background:#121212;">
              <p style="margin:0 0 8px;font-size:13px;color:#999999;line-height:1.5;">
                Εάν έχετε οποιαδήποτε ερώτηση, μη διστάσετε να επικοινωνήσετε μαζί μας.
                <br />
                If you have any questions, feel free to contact us.
              </p>
              <p style="margin:12px 0 0;font-size:12px;color:#666666;">
                © rythmoShow • Live Percussion & Entertainment
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
function buildConfirmationEmailText(data) {
	const customerName = data.fullName?.trim() || "Εκλεκτέ Πελάτη / Valued Client";
	const eventDate = data.eventDate?.trim() || "—";
	const location = data.location?.trim() || data.eventType || "Κύπρος / Cyprus";
	return `🥁 rythmoShow - Επιβεβαίωση Κράτησης / Booking Confirmation
============================================================

Γεια σας ${customerName},

Σας ευχαριστούμε θερμά για την εμπιστοσύνη σας! Η κράτησή σας στις ${eventDate} (Τοποθεσία: ${location}) έχει επιβεβαιωθεί επίσημα.

Η ομάδα του rythmoShow

------------------------------------------------------------

Hello ${customerName},

Thank you for your trust! Your booking on ${eventDate} (Location: ${location}) has been officially confirmed.

The rythmoShow Team

============================================================
ΣΤΟΙΧΕΙΑ ΚΡΑΤΗΣΗΣ / BOOKING DETAILS:
• Πελάτης / Customer: ${customerName}
• Ημερομηνία / Date: ${eventDate}
• Τύπος Εκδήλωσης / Event Type: ${data.eventType?.trim() || "—"}
• Τοποθεσία / Location: ${location}
${data.djOption ? `• DJ Option: ${data.djOption}\n` : ""}• Κατάσταση / Status: Επιβεβαιωμένη / Confirmed
============================================================
Εάν έχετε οποιαδήποτε ερώτηση, μη διστάσετε να επικοινωνήσετε μαζί μας.
If you have any questions, feel free to contact us.

rythmoShow • Live Percussion & Entertainment
`;
}
async function sendBookingConfirmationEmail(data) {
	const apiKey = getResendApiKey();
	if (!apiKey || apiKey === "re_your_api_key_here") {
		const msg = "RESEND_API_KEY is not configured — skipping confirmation email.";
		console.warn(`[Email] ${msg}`);
		return {
			success: false,
			error: msg
		};
	}
	const recipientEmail = data.email?.trim();
	if (!recipientEmail || !recipientEmail.includes("@")) {
		const msg = `Invalid recipient email "${data.email}" — skipping confirmation email.`;
		console.warn(`[Email] ${msg}`);
		return {
			success: false,
			error: msg
		};
	}
	const resend = new Resend(apiKey);
	try {
		const response = await resend.emails.send({
			from: SENDER,
			to: [recipientEmail],
			subject: CONFIRMATION_EMAIL_SUBJECT,
			html: buildConfirmationEmailHtml(data),
			text: buildConfirmationEmailText(data)
		});
		if (response.error) {
			const errMsg = response.error.message || JSON.stringify(response.error);
			console.error("[Email] Resend API error sending confirmation:", errMsg);
			return {
				success: false,
				error: errMsg
			};
		}
		const messageId = response.data?.id ?? "unknown";
		console.info(`[Email] Confirmation email sent successfully to ${recipientEmail}. Message ID: ${messageId}`);
		return {
			success: true,
			messageId
		};
	} catch (err) {
		const errMsg = err?.message || String(err);
		console.error("[Email] Failed to send confirmation email:", errMsg);
		return {
			success: false,
			error: errMsg
		};
	}
}
//#endregion
export { sendBookingConfirmationEmail as a, saveBooking as i, getBookingById as n, sendBookingNotification as o, getBookings as r, updateBookingStatus as s, createServerRpc as t };
