import { neon } from "@neondatabase/serverless";

export type BookingInput = {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  location?: string;
  djOption?: string;
  notes?: string;
  language?: string;
};

export type BookingStatus = "Pending" | "Confirmed" | "Completed";

export type BookingRecord = BookingInput & {
  id: number;
  createdAt: string;
  status: BookingStatus;
};

function getDatabaseUrl(): string {
  const envDbUrl = process.env["DATABASE_URL"];
  const metaEnv = typeof import.meta !== "undefined" && (import.meta as any).env ? (import.meta as any).env["DATABASE_URL"] : undefined;
  const url = envDbUrl || metaEnv || "";
  let cleanUrl = (url as string).trim().replace(/^[\"']|[\"']$/g, "");
  if (cleanUrl.startsWith("postgresql://postgresql://")) {
    cleanUrl = cleanUrl.replace("postgresql://postgresql://", "postgresql://");
  } else if (cleanUrl.startsWith("postgres://postgres://")) {
    cleanUrl = cleanUrl.replace("postgres://postgres://", "postgres://");
  }
  return cleanUrl;
}

let tableInitialized = false;

export async function ensureBookingTableExists() {
  if (tableInitialized) return;
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not configured in environment.");
  }

  const sql = neon(dbUrl);
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

  // Add status column if it doesn't exist yet (idempotent migration)
  await sql`
    ALTER TABLE bookings
      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending';
  `;

  tableInitialized = true;
}

export async function saveBooking(input: BookingInput) {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) {
    throw new Error("DATABASE_URL is missing. Please set DATABASE_URL in .env.local");
  }

  await ensureBookingTableExists();
  const sql = neon(dbUrl);

  const rows = await sql`
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
  `;

  return {
    success: true,
    booking: rows[0],
  };
}

export async function getBookings(): Promise<BookingRecord[]> {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) {
    throw new Error("DATABASE_URL is missing.");
  }

  await ensureBookingTableExists();
  const sql = neon(dbUrl);

  const rows = await sql`
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

  return rows as BookingRecord[];
}

export async function updateBookingStatus(id: number, status: BookingStatus): Promise<void> {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) {
    throw new Error("DATABASE_URL is missing.");
  }

  // Ensure the status column exists before trying to update it.
  await ensureBookingTableExists();

  const sql = neon(dbUrl);
  try {
    const result = await sql`
      UPDATE bookings
      SET status = ${status}
      WHERE id = ${id}
      RETURNING id;
    `;
    if (!result || result.length === 0) {
      throw new Error(`No booking found with id=${id}`);
    }
    console.info(`[DB] Updated booking id=${id} status → ${status}`);
  } catch (err: any) {
    console.error(`[DB] updateBookingStatus failed for id=${id}:`, err);
    throw new Error(err?.message ?? "Database error while updating booking status.");
  }
}
