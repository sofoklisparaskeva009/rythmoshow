import { i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as Xs } from "../_libs/neondatabase__serverless.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-bArIZMgd.js
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
//#endregion
export { updateBookingStatus as i, getBookings as n, saveBooking as r, createServerRpc as t };
