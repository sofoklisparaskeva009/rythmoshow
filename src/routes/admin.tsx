import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import {
  verifyAdminPasswordFn,
  getBookingsFn,
  updateBookingStatusFn,
} from "@/api/admin";
import type { BookingRecord, BookingStatus } from "@/lib/db";

// ─────────────────────────────────────────────
//  Route definition
// ─────────────────────────────────────────────
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — rythmoShow" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

// ─────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────
const SESSION_KEY = "rythmo_admin_auth";

const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; border: string }> = {
  Pending:   { bg: "rgba(234,179,8,0.15)",   text: "#eab308", border: "rgba(234,179,8,0.4)" },
  Confirmed: { bg: "rgba(34,197,94,0.15)",   text: "#22c55e", border: "rgba(34,197,94,0.4)" },
  Completed: { bg: "rgba(148,163,184,0.15)", text: "#94a3b8", border: "rgba(148,163,184,0.4)" },
};

const ALL_STATUSES: BookingStatus[] = ["Pending", "Confirmed", "Completed"];

// ─────────────────────────────────────────────
//  Top-level page — chooses login vs dashboard
// ─────────────────────────────────────────────
function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    }
    return false;
  });

  const handleAuth = useCallback(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
    setAuthed(true);
  }, []);

  const handleLogout = useCallback(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem(SESSION_KEY);
    }
    setAuthed(false);
  }, []);

  return (
    <div style={styles.pageWrapper}>
      {/* Background glow blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {authed ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginScreen onSuccess={handleAuth} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Login screen
// ─────────────────────────────────────────────
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await verifyAdminPasswordFn({ data: { password } });
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error ?? "Incorrect passcode.");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginCenter}>
      <div style={styles.loginCard}>
        {/* Logo mark */}
        <div style={styles.loginLogo}>
          <span style={styles.loginLogoText}>R</span>
        </div>
        <h1 style={styles.loginTitle}>rythmoShow</h1>
        <p style={styles.loginSubtitle}>Admin Access</p>

        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <label style={styles.label} htmlFor="admin-passcode">
            Admin Passcode
          </label>
          <input
            id="admin-passcode"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter passcode…"
            style={styles.input}
            autoComplete="current-password"
            required
          />
          {error && <p style={styles.errorMsg}>{error}</p>}
          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            style={{
              ...styles.goldBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Verifying…" : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Dashboard
// ─────────────────────────────────────────────
type Toast = { id: number; message: string; type: "success" | "error" };

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [bookings, setBookings]             = useState<BookingRecord[]>([]);
  const [loadingData, setLoadingData]       = useState(true);
  const [fetchError, setFetchError]         = useState("");
  const [updatingId, setUpdatingId]         = useState<number | null>(null);
  const [openDropdown, setOpenDropdown]     = useState<number | null>(null);
  const [toasts, setToasts]                 = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  // Fetch on mount
  const loadBookings = useCallback(async () => {
    setLoadingData(true);
    setFetchError("");
    try {
      const result = await getBookingsFn();
      setBookings(result.bookings as BookingRecord[]);
    } catch {
      setFetchError("Failed to load bookings. Check your database connection.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  // Run once on component mount
  useEffect(() => { loadBookings(); }, [loadBookings]);

  const changeStatus = async (id: number, status: BookingStatus) => {
    setUpdatingId(id);
    setOpenDropdown(null);
    try {
      await updateBookingStatusFn({ data: { id, status } });
      // Optimistic local update so UI reflects change instantly
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      showToast(`Status updated to "${status}"`, "success");
    } catch (err: any) {
      const msg = err?.message ?? "Failed to update status.";
      console.error("[Admin UI] changeStatus error:", err);
      showToast(msg, "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (raw: string) => {
    if (!raw) return "—";
    try {
      return new Intl.DateTimeFormat("el-GR", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
        timeZone: "Europe/Nicosia",
      }).format(new Date(raw));
    } catch {
      return raw;
    }
  };

  return (
    <div style={styles.dashWrapper}>
      {/* Toast notifications */}
      <div style={styles.toastContainer}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              ...styles.toast,
              background: t.type === "success"
                ? "rgba(34,197,94,0.15)"
                : "rgba(248,113,113,0.15)",
              borderColor: t.type === "success"
                ? "rgba(34,197,94,0.4)"
                : "rgba(248,113,113,0.4)",
              color: t.type === "success" ? "#22c55e" : "#f87171",
            }}
          >
            {t.type === "success" ? "✓" : "✕"} {t.message}
          </div>
        ))}
      </div>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerLogo}>R</div>
          <div>
            <h1 style={styles.headerTitle}>Admin Dashboard</h1>
            <p style={styles.headerSub}>rythmoShow Booking Submissions</p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button
            id="admin-refresh-btn"
            onClick={loadBookings}
            disabled={loadingData}
            style={styles.refreshBtn}
            title="Refresh"
          >
            {loadingData ? "⟳" : "↺"} Refresh
          </button>
          <button
            id="admin-logout-btn"
            onClick={onLogout}
            style={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        {(["Pending", "Confirmed", "Completed"] as BookingStatus[]).map((s) => {
          const count = bookings.filter((b) => b.status === s).length;
          const col = STATUS_COLORS[s];
          return (
            <div
              key={s}
              style={{
                ...styles.statCard,
                borderColor: col.border,
                background: col.bg,
              }}
            >
              <span style={{ ...styles.statCount, color: col.text }}>{count}</span>
              <span style={styles.statLabel}>{s}</span>
            </div>
          );
        })}
        <div style={{ ...styles.statCard, borderColor: "rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.08)" }}>
          <span style={{ ...styles.statCount, color: "#d4af37" }}>{bookings.length}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
      </div>

      {/* Content */}
      <div style={styles.tableContainer}>
        {fetchError && (
          <div style={styles.errorBanner}>{fetchError}</div>
        )}

        {loadingData ? (
          <div style={styles.loadingState}>
            <div style={styles.spinner} />
            <p style={{ color: "#94a3b8", marginTop: 16 }}>Loading submissions…</p>
          </div>
        ) : bookings.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📋</div>
            <p style={styles.emptyText}>No submissions yet.</p>
          </div>
        ) : (
          <div style={styles.tableScroll}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Submitted", "Name", "Email", "Phone", "Event Date", "Type / Location", "Message", "Status"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr
                    key={b.id}
                    style={{
                      ...styles.tr,
                      background: idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    }}
                  >
                    <td style={{ ...styles.td, whiteSpace: "nowrap", fontSize: 12 }}>
                      {formatDate(b.createdAt)}
                    </td>
                    <td style={{ ...styles.td, fontWeight: 600, color: "#f1f5f9" }}>
                      {b.fullName}
                    </td>
                    <td style={{ ...styles.td, fontSize: 13, color: "#d4af37" }}>
                      <a href={`mailto:${b.email}`} style={{ color: "#d4af37", textDecoration: "none" }}>
                        {b.email}
                      </a>
                    </td>
                    <td style={{ ...styles.td, fontSize: 13, whiteSpace: "nowrap" }}>
                      {b.phone}
                    </td>
                    <td style={{ ...styles.td, fontSize: 13, whiteSpace: "nowrap" }}>
                      {b.eventDate || "—"}
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 500, color: "#f1f5f9", fontSize: 13 }}>
                        {b.eventType}
                      </div>
                      {b.location && (
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                          📍 {b.location}
                        </div>
                      )}
                    </td>
                    <td style={{ ...styles.td, maxWidth: 200 }}>
                      <div style={styles.noteCell}>
                        {b.notes || <span style={{ color: "#475569", fontStyle: "italic" }}>—</span>}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ position: "relative" }}>
                        <button
                          id={`status-btn-${b.id}`}
                          onClick={() =>
                            setOpenDropdown(openDropdown === b.id ? null : b.id)
                          }
                          disabled={updatingId === b.id}
                          style={{
                            ...styles.statusBadge,
                            background: STATUS_COLORS[b.status as BookingStatus]?.bg ?? "rgba(148,163,184,0.15)",
                            color: STATUS_COLORS[b.status as BookingStatus]?.text ?? "#94a3b8",
                            borderColor: STATUS_COLORS[b.status as BookingStatus]?.border ?? "rgba(148,163,184,0.4)",
                            cursor: updatingId === b.id ? "not-allowed" : "pointer",
                            opacity: updatingId === b.id ? 0.6 : 1,
                          }}
                        >
                          {updatingId === b.id ? "…" : (b.status ?? "Pending")} ▾
                        </button>

                        {openDropdown === b.id && (
                          <div style={styles.dropdown}>
                            {ALL_STATUSES.map((s) => (
                              <button
                                key={s}
                                id={`status-option-${b.id}-${s}`}
                                onClick={() => changeStatus(b.id, s)}
                                style={{
                                  ...styles.dropdownItem,
                                  color: STATUS_COLORS[s].text,
                                  fontWeight: b.status === s ? 700 : 400,
                                  background: b.status === s
                                    ? STATUS_COLORS[s].bg
                                    : "transparent",
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Click-away for dropdown */}
      {openDropdown !== null && (
        <div
          onClick={() => setOpenDropdown(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9,
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  Inline styles (dark/gold theme)
// ─────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0f 0%, #0f0d1a 50%, #0a0f0a 100%)",
    fontFamily: "'Manrope', 'Inter', sans-serif",
    color: "#e2e8f0",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed",
    top: "-20%",
    right: "-10%",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed",
    bottom: "-20%",
    left: "-10%",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  // Login
  loginCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "24px",
  },
  loginCard: {
    width: "100%",
    maxWidth: 400,
    background: "rgba(15,13,26,0.95)",
    border: "1px solid rgba(212,175,55,0.2)",
    borderRadius: 20,
    padding: "48px 40px",
    boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.05)",
    backdropFilter: "blur(20px)",
    textAlign: "center",
  },
  loginLogo: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37 0%, #f5d675 50%, #b8941f 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 0 30px rgba(212,175,55,0.4)",
  },
  loginLogoText: {
    fontSize: 32,
    fontWeight: 700,
    color: "#0a0a0f",
    fontFamily: "'Cormorant Garamond', serif",
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "0.05em",
  },
  loginSubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
    marginBottom: 32,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    textAlign: "left",
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: "#94a3b8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(212,175,55,0.25)",
    borderRadius: 10,
    color: "#f1f5f9",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  goldBtn: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #d4af37 0%, #f5d675 50%, #b8941f 100%)",
    border: "none",
    borderRadius: 10,
    color: "#0a0a0f",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: "0.05em",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
    marginTop: 8,
  },
  errorMsg: {
    color: "#f87171",
    fontSize: 13,
    margin: 0,
    padding: "10px 12px",
    background: "rgba(248,113,113,0.1)",
    border: "1px solid rgba(248,113,113,0.2)",
    borderRadius: 8,
  },

  // Dashboard
  dashWrapper: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "24px 20px 60px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
    padding: "20px 28px",
    background: "rgba(15,13,26,0.8)",
    border: "1px solid rgba(212,175,55,0.15)",
    borderRadius: 16,
    backdropFilter: "blur(20px)",
    marginBottom: 24,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  headerLogo: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #d4af37, #f5d675, #b8941f)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 700,
    color: "#0a0a0f",
    fontFamily: "'Cormorant Garamond', serif",
    boxShadow: "0 0 20px rgba(212,175,55,0.3)",
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
  },
  headerSub: {
    fontSize: 12,
    color: "#64748b",
    margin: 0,
    marginTop: 2,
    letterSpacing: "0.05em",
  },
  headerRight: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  refreshBtn: {
    padding: "9px 18px",
    background: "rgba(212,175,55,0.1)",
    border: "1px solid rgba(212,175,55,0.3)",
    borderRadius: 8,
    color: "#d4af37",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  logoutBtn: {
    padding: "9px 18px",
    background: "rgba(248,113,113,0.1)",
    border: "1px solid rgba(248,113,113,0.3)",
    borderRadius: 8,
    color: "#f87171",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },

  // Stats
  statsBar: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 24,
  },
  statCard: {
    flex: "1 1 120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 16px",
    borderRadius: 12,
    border: "1px solid",
    backdropFilter: "blur(10px)",
    gap: 4,
  },
  statCount: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1,
    fontFamily: "'Cormorant Garamond', serif",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748b",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 600,
  },

  // Table
  tableContainer: {
    background: "rgba(15,13,26,0.8)",
    border: "1px solid rgba(212,175,55,0.12)",
    borderRadius: 16,
    backdropFilter: "blur(20px)",
    overflow: "hidden",
  },
  tableScroll: {
    overflowX: "auto",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
    minWidth: 900,
  },
  th: {
    padding: "14px 16px",
    textAlign: "left" as const,
    fontSize: 11,
    fontWeight: 700,
    color: "#64748b",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    borderBottom: "1px solid rgba(212,175,55,0.1)",
    background: "rgba(212,175,55,0.04)",
    whiteSpace: "nowrap" as const,
  },
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    transition: "background 0.15s",
  },
  td: {
    padding: "14px 16px",
    verticalAlign: "top" as const,
    color: "#cbd5e1",
    lineHeight: 1.5,
  },
  noteCell: {
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    fontSize: 12,
    color: "#94a3b8",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.04em",
    border: "1px solid",
    background: "transparent",
    whiteSpace: "nowrap" as const,
    transition: "opacity 0.2s",
    zIndex: 10,
    position: "relative",
  },
  dropdown: {
    position: "absolute" as const,
    top: "calc(100% + 6px)",
    left: 0,
    background: "#0f0d1a",
    border: "1px solid rgba(212,175,55,0.25)",
    borderRadius: 10,
    padding: "6px",
    zIndex: 20,
    minWidth: 140,
    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    textAlign: "left" as const,
    padding: "8px 12px",
    borderRadius: 6,
    border: "none",
    fontSize: 13,
    cursor: "pointer",
    transition: "background 0.15s",
    letterSpacing: "0.02em",
  },

  // States
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid rgba(212,175,55,0.15)",
    borderTop: "3px solid #d4af37",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
    opacity: 0.5,
  },
  emptyText: {
    color: "#475569",
    fontSize: 15,
  },
  errorBanner: {
    margin: 16,
    padding: "14px 20px",
    background: "rgba(248,113,113,0.1)",
    border: "1px solid rgba(248,113,113,0.25)",
    borderRadius: 10,
    color: "#f87171",
    fontSize: 14,
  },

  // Toast notifications
  toastContainer: {
    position: "fixed" as const,
    bottom: 28,
    right: 28,
    zIndex: 1000,
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    pointerEvents: "none",
  },
  toast: {
    padding: "12px 20px",
    borderRadius: 10,
    border: "1px solid",
    fontSize: 14,
    fontWeight: 600,
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    animation: "fadeInUp 0.25s ease",
    letterSpacing: "0.02em",
  },
};
