import { r as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DM41q_sk.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CRksSLMR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var verifyAdminPasswordFn = createServerFn({ method: "POST" }).validator((data) => {
	return objectType({ password: stringType() }).parse(data);
}).handler(createSsrRpc("284791322afb33f0507c76f01806ad0e92d8b4c1546f27882069b08e87f399d4"));
var getBookingsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("c4c18eaf6f26a8c1fc855a5be9720ee8298906fbd68fd575e10c9333dc310af6"));
var updateBookingStatusFn = createServerFn({ method: "POST" }).validator((data) => {
	return objectType({
		id: numberType(),
		status: enumType([
			"Pending",
			"Confirmed",
			"Completed"
		])
	}).parse(data);
}).handler(createSsrRpc("4f18beca459416fc6adf0bb56731edb7f4f6b814adc07be646227d539db5a2dd"));
var SESSION_KEY = "rythmo_admin_auth";
var STATUS_COLORS = {
	Pending: {
		bg: "rgba(234,179,8,0.15)",
		text: "#eab308",
		border: "rgba(234,179,8,0.4)"
	},
	Confirmed: {
		bg: "rgba(34,197,94,0.15)",
		text: "#22c55e",
		border: "rgba(34,197,94,0.4)"
	},
	Completed: {
		bg: "rgba(148,163,184,0.15)",
		text: "#94a3b8",
		border: "rgba(148,163,184,0.4)"
	}
};
var ALL_STATUSES = [
	"Pending",
	"Confirmed",
	"Completed"
];
function AdminPage() {
	const [authed, setAuthed] = (0, import_react.useState)(() => {
		if (typeof sessionStorage !== "undefined") return sessionStorage.getItem(SESSION_KEY) === "true";
		return false;
	});
	const handleAuth = (0, import_react.useCallback)(() => {
		if (typeof sessionStorage !== "undefined") sessionStorage.setItem(SESSION_KEY, "true");
		setAuthed(true);
	}, []);
	const handleLogout = (0, import_react.useCallback)(() => {
		if (typeof sessionStorage !== "undefined") sessionStorage.removeItem(SESSION_KEY);
		setAuthed(false);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: styles.pageWrapper,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.blob1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.blob2 }),
			authed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, { onLogout: handleLogout }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginScreen, { onSuccess: handleAuth })
		]
	});
}
function LoginScreen({ onSuccess }) {
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const result = await verifyAdminPasswordFn({ data: { password } });
			if (result.success) onSuccess();
			else setError(result.error ?? "Incorrect passcode.");
		} catch {
			setError("Server error. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: styles.loginCenter,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: styles.loginCard,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: styles.loginLogo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: styles.loginLogoText,
						children: "R"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: styles.loginTitle,
					children: "rythmoShow"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: styles.loginSubtitle,
					children: "Admin Access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					style: styles.loginForm,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							style: styles.label,
							htmlFor: "admin-passcode",
							children: "Admin Passcode"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "admin-passcode",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "Enter passcode…",
							style: styles.input,
							autoComplete: "current-password",
							required: true
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: styles.errorMsg,
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "admin-login-btn",
							type: "submit",
							disabled: loading,
							style: {
								...styles.goldBtn,
								opacity: loading ? .7 : 1,
								cursor: loading ? "not-allowed" : "pointer"
							},
							children: loading ? "Verifying…" : "Enter Dashboard"
						})
					]
				})
			]
		})
	});
}
function Dashboard({ onLogout }) {
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [loadingData, setLoadingData] = (0, import_react.useState)(true);
	const [fetchError, setFetchError] = (0, import_react.useState)("");
	const [updatingId, setUpdatingId] = (0, import_react.useState)(null);
	const [openDropdown, setOpenDropdown] = (0, import_react.useState)(null);
	const [toasts, setToasts] = (0, import_react.useState)([]);
	const showToast = (0, import_react.useCallback)((message, type) => {
		const id = Date.now();
		setToasts((prev) => [...prev, {
			id,
			message,
			type
		}]);
		setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
	}, []);
	const loadBookings = (0, import_react.useCallback)(async () => {
		setLoadingData(true);
		setFetchError("");
		try {
			const result = await getBookingsFn();
			setBookings(result.bookings);
		} catch {
			setFetchError("Failed to load bookings. Check your database connection.");
		} finally {
			setLoadingData(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadBookings();
	}, [loadBookings]);
	const changeStatus = async (id, status) => {
		setUpdatingId(id);
		setOpenDropdown(null);
		try {
			await updateBookingStatusFn({ data: {
				id,
				status
			} });
			setBookings((prev) => prev.map((b) => b.id === id ? {
				...b,
				status
			} : b));
			showToast(`Status updated to "${status}"`, "success");
		} catch (err) {
			const msg = err?.message ?? "Failed to update status.";
			console.error("[Admin UI] changeStatus error:", err);
			showToast(msg, "error");
		} finally {
			setUpdatingId(null);
		}
	};
	const formatDate = (raw) => {
		if (!raw) return "—";
		try {
			return new Intl.DateTimeFormat("el-GR", {
				day: "2-digit",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				timeZone: "Europe/Nicosia"
			}).format(new Date(raw));
		} catch {
			return raw;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: styles.dashWrapper,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: styles.toastContainer,
				children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						...styles.toast,
						background: t.type === "success" ? "rgba(34,197,94,0.15)" : "rgba(248,113,113,0.15)",
						borderColor: t.type === "success" ? "rgba(34,197,94,0.4)" : "rgba(248,113,113,0.4)",
						color: t.type === "success" ? "#22c55e" : "#f87171"
					},
					children: [
						t.type === "success" ? "✓" : "✕",
						" ",
						t.message
					]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				style: styles.header,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: styles.headerLeft,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: styles.headerLogo,
						children: "R"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						style: styles.headerTitle,
						children: "Admin Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: styles.headerSub,
						children: "rythmoShow Booking Submissions"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: styles.headerRight,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						id: "admin-refresh-btn",
						onClick: loadBookings,
						disabled: loadingData,
						style: styles.refreshBtn,
						title: "Refresh",
						children: [loadingData ? "⟳" : "↺", " Refresh"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "admin-logout-btn",
						onClick: onLogout,
						style: styles.logoutBtn,
						children: "Logout"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: styles.statsBar,
				children: [[
					"Pending",
					"Confirmed",
					"Completed"
				].map((s) => {
					const count = bookings.filter((b) => b.status === s).length;
					const col = STATUS_COLORS[s];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							...styles.statCard,
							borderColor: col.border,
							background: col.bg
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								...styles.statCount,
								color: col.text
							},
							children: count
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: styles.statLabel,
							children: s
						})]
					}, s);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						...styles.statCard,
						borderColor: "rgba(212,175,55,0.3)",
						background: "rgba(212,175,55,0.08)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							...styles.statCount,
							color: "#d4af37"
						},
						children: bookings.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: styles.statLabel,
						children: "Total"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: styles.tableContainer,
				children: [fetchError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: styles.errorBanner,
					children: fetchError
				}), loadingData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: styles.loadingState,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.spinner }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "#94a3b8",
							marginTop: 16
						},
						children: "Loading submissions…"
					})]
				}) : bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: styles.emptyState,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: styles.emptyIcon,
						children: "📋"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: styles.emptyText,
						children: "No submissions yet."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: styles.tableScroll,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						style: styles.table,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"Submitted",
							"Name",
							"Email",
							"Phone",
							"Event Date",
							"Type / Location",
							"Message",
							"Status"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: styles.th,
							children: h
						}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: bookings.map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							style: {
								...styles.tr,
								background: idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										...styles.td,
										whiteSpace: "nowrap",
										fontSize: 12
									},
									children: formatDate(b.createdAt)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										...styles.td,
										fontWeight: 600,
										color: "#f1f5f9"
									},
									children: b.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										...styles.td,
										fontSize: 13,
										color: "#d4af37"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${b.email}`,
										style: {
											color: "#d4af37",
											textDecoration: "none"
										},
										children: b.email
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										...styles.td,
										fontSize: 13,
										whiteSpace: "nowrap"
									},
									children: b.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										...styles.td,
										fontSize: 13,
										whiteSpace: "nowrap"
									},
									children: b.eventDate || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									style: styles.td,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 500,
											color: "#f1f5f9",
											fontSize: 13
										},
										children: b.eventType
									}), b.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: 11,
											color: "#94a3b8",
											marginTop: 2
										},
										children: ["📍 ", b.location]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										...styles.td,
										maxWidth: 200
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: styles.noteCell,
										children: b.notes || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												color: "#475569",
												fontStyle: "italic"
											},
											children: "—"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: styles.td,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { position: "relative" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											id: `status-btn-${b.id}`,
											onClick: () => setOpenDropdown(openDropdown === b.id ? null : b.id),
											disabled: updatingId === b.id,
											style: {
												...styles.statusBadge,
												background: STATUS_COLORS[b.status]?.bg ?? "rgba(148,163,184,0.15)",
												color: STATUS_COLORS[b.status]?.text ?? "#94a3b8",
												borderColor: STATUS_COLORS[b.status]?.border ?? "rgba(148,163,184,0.4)",
												cursor: updatingId === b.id ? "not-allowed" : "pointer",
												opacity: updatingId === b.id ? .6 : 1
											},
											children: [updatingId === b.id ? "…" : b.status ?? "Pending", " ▾"]
										}), openDropdown === b.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: styles.dropdown,
											children: ALL_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												id: `status-option-${b.id}-${s}`,
												onClick: () => changeStatus(b.id, s),
												style: {
													...styles.dropdownItem,
													color: STATUS_COLORS[s].text,
													fontWeight: b.status === s ? 700 : 400,
													background: b.status === s ? STATUS_COLORS[s].bg : "transparent"
												},
												children: s
											}, s))
										})]
									})
								})
							]
						}, b.id)) })]
					})
				})]
			}),
			openDropdown !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: () => setOpenDropdown(null),
				style: {
					position: "fixed",
					inset: 0,
					zIndex: 9
				}
			})
		]
	});
}
var styles = {
	pageWrapper: {
		minHeight: "100vh",
		background: "linear-gradient(135deg, #0a0a0f 0%, #0f0d1a 50%, #0a0f0a 100%)",
		fontFamily: "'Manrope', 'Inter', sans-serif",
		color: "#e2e8f0",
		position: "relative",
		overflow: "hidden"
	},
	blob1: {
		position: "fixed",
		top: "-20%",
		right: "-10%",
		width: 600,
		height: 600,
		borderRadius: "50%",
		background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
		pointerEvents: "none"
	},
	blob2: {
		position: "fixed",
		bottom: "-20%",
		left: "-10%",
		width: 500,
		height: 500,
		borderRadius: "50%",
		background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
		pointerEvents: "none"
	},
	loginCenter: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "100vh",
		padding: "24px"
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
		textAlign: "center"
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
		boxShadow: "0 0 30px rgba(212,175,55,0.4)"
	},
	loginLogoText: {
		fontSize: 32,
		fontWeight: 700,
		color: "#0a0a0f",
		fontFamily: "'Cormorant Garamond', serif"
	},
	loginTitle: {
		fontSize: 28,
		fontWeight: 700,
		color: "#f1f5f9",
		margin: 0,
		fontFamily: "'Cormorant Garamond', serif",
		letterSpacing: "0.05em"
	},
	loginSubtitle: {
		fontSize: 13,
		color: "#94a3b8",
		marginTop: 6,
		marginBottom: 32,
		letterSpacing: "0.1em",
		textTransform: "uppercase"
	},
	loginForm: {
		display: "flex",
		flexDirection: "column",
		gap: 16,
		textAlign: "left"
	},
	label: {
		fontSize: 12,
		fontWeight: 600,
		color: "#94a3b8",
		letterSpacing: "0.08em",
		textTransform: "uppercase"
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
		transition: "border-color 0.2s"
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
		marginTop: 8
	},
	errorMsg: {
		color: "#f87171",
		fontSize: 13,
		margin: 0,
		padding: "10px 12px",
		background: "rgba(248,113,113,0.1)",
		border: "1px solid rgba(248,113,113,0.2)",
		borderRadius: 8
	},
	dashWrapper: {
		maxWidth: 1400,
		margin: "0 auto",
		padding: "24px 20px 60px",
		position: "relative",
		zIndex: 1
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
		marginBottom: 24
	},
	headerLeft: {
		display: "flex",
		alignItems: "center",
		gap: 16
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
		flexShrink: 0
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: 700,
		color: "#f1f5f9",
		margin: 0,
		fontFamily: "'Cormorant Garamond', serif"
	},
	headerSub: {
		fontSize: 12,
		color: "#64748b",
		margin: 0,
		marginTop: 2,
		letterSpacing: "0.05em"
	},
	headerRight: {
		display: "flex",
		gap: 12,
		alignItems: "center"
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
		transition: "background 0.2s"
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
		transition: "background 0.2s"
	},
	statsBar: {
		display: "flex",
		gap: 16,
		flexWrap: "wrap",
		marginBottom: 24
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
		gap: 4
	},
	statCount: {
		fontSize: 32,
		fontWeight: 700,
		lineHeight: 1,
		fontFamily: "'Cormorant Garamond', serif"
	},
	statLabel: {
		fontSize: 11,
		color: "#64748b",
		letterSpacing: "0.1em",
		textTransform: "uppercase",
		fontWeight: 600
	},
	tableContainer: {
		background: "rgba(15,13,26,0.8)",
		border: "1px solid rgba(212,175,55,0.12)",
		borderRadius: 16,
		backdropFilter: "blur(20px)",
		overflow: "hidden"
	},
	tableScroll: {
		overflowX: "auto",
		width: "100%"
	},
	table: {
		width: "100%",
		borderCollapse: "collapse",
		fontSize: 13,
		minWidth: 900
	},
	th: {
		padding: "14px 16px",
		textAlign: "left",
		fontSize: 11,
		fontWeight: 700,
		color: "#64748b",
		letterSpacing: "0.08em",
		textTransform: "uppercase",
		borderBottom: "1px solid rgba(212,175,55,0.1)",
		background: "rgba(212,175,55,0.04)",
		whiteSpace: "nowrap"
	},
	tr: {
		borderBottom: "1px solid rgba(255,255,255,0.04)",
		transition: "background 0.15s"
	},
	td: {
		padding: "14px 16px",
		verticalAlign: "top",
		color: "#cbd5e1",
		lineHeight: 1.5
	},
	noteCell: {
		maxWidth: 200,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		fontSize: 12,
		color: "#94a3b8"
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
		whiteSpace: "nowrap",
		transition: "opacity 0.2s",
		zIndex: 10,
		position: "relative"
	},
	dropdown: {
		position: "absolute",
		top: "calc(100% + 6px)",
		left: 0,
		background: "#0f0d1a",
		border: "1px solid rgba(212,175,55,0.25)",
		borderRadius: 10,
		padding: "6px",
		zIndex: 20,
		minWidth: 140,
		boxShadow: "0 12px 40px rgba(0,0,0,0.6)"
	},
	dropdownItem: {
		display: "block",
		width: "100%",
		textAlign: "left",
		padding: "8px 12px",
		borderRadius: 6,
		border: "none",
		fontSize: 13,
		cursor: "pointer",
		transition: "background 0.15s",
		letterSpacing: "0.02em"
	},
	loadingState: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "80px 20px"
	},
	spinner: {
		width: 40,
		height: 40,
		border: "3px solid rgba(212,175,55,0.15)",
		borderTop: "3px solid #d4af37",
		borderRadius: "50%",
		animation: "spin 0.8s linear infinite"
	},
	emptyState: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "80px 20px",
		gap: 12
	},
	emptyIcon: {
		fontSize: 48,
		opacity: .5
	},
	emptyText: {
		color: "#475569",
		fontSize: 15
	},
	errorBanner: {
		margin: 16,
		padding: "14px 20px",
		background: "rgba(248,113,113,0.1)",
		border: "1px solid rgba(248,113,113,0.25)",
		borderRadius: 10,
		color: "#f87171",
		fontSize: 14
	},
	toastContainer: {
		position: "fixed",
		bottom: 28,
		right: 28,
		zIndex: 1e3,
		display: "flex",
		flexDirection: "column",
		gap: 10,
		pointerEvents: "none"
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
		letterSpacing: "0.02em"
	}
};
//#endregion
export { AdminPage as component };
