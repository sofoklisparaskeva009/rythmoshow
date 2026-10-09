import { r as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Rt-G13Kd.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as stringType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as motion, r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { _ as ArrowUpRight, a as Phone, c as MapPin, d as Instagram, f as Facebook, g as Camera, h as Check, i as Play, l as Mail, m as ChevronLeft, n as Volume2, o as Pause, p as ChevronRight, r as Sparkles, s as Maximize2, t as X, u as LoaderCircle, v as ArrowDown } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BrCmRrOO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var rythmoshow_stage_default = "/assets/rythmoshow-stage-CVwzhMYS.jpg";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var bookingInputSchema = objectType({
	fullName: stringType().trim().min(1, "Name is required"),
	email: stringType().trim().email("Invalid email address"),
	phone: stringType().trim().min(1, "Phone number is required"),
	eventDate: stringType().trim().min(1, "Event date is required"),
	eventType: stringType().trim().min(1, "Event type is required"),
	location: stringType().optional().default(""),
	djOption: stringType().optional().default(""),
	notes: stringType().optional().default(""),
	language: enumType(["gr", "en"]).optional().default("gr")
});
var submitBookingServerFn = createServerFn({ method: "POST" }).validator((data) => {
	return bookingInputSchema.parse(data);
}).handler(createSsrRpc("ae7a266c0de07e640edd35815432216b8f76b4502540d9e2f29bb46bd962814c"));
var galleryImages = [
	{
		src: "/image/459508960_519771857452919_2743058968944676107_n.jpg",
		alt: "rythmoShow live performance στα κρούστα",
		tag: {
			gr: "Live Duo",
			en: "Live Duo"
		}
	},
	{
		src: "/image/716150755_122279139266019703_1209557680902171065_n.jpg",
		alt: "rythmoShow wedding party energy",
		tag: {
			gr: "Wedding Energy",
			en: "Wedding Energy"
		}
	},
	{
		src: "/image/726575363_18101262337902485_7557604638499687660_n.jpg",
		alt: "rythmoShow live percussion show",
		tag: {
			gr: "Drum Pulse",
			en: "Drum Pulse"
		}
	},
	{
		src: "/image/22227050-11ef-44f2-bd00-5dea7822df18.jpg",
		alt: "rythmoShow golden stage show",
		tag: {
			gr: "Golden Stage",
			en: "Golden Stage"
		}
	},
	{
		src: "/image/467398702_122197814198019703_7634919703419273548_n.jpg",
		alt: "rythmoShow live percussion set",
		tag: {
			gr: "Live Performance",
			en: "Live Performance"
		}
	},
	{
		src: "/image/475180154_122206914326019703_2221525614762974362_n.jpg",
		alt: "rythmoShow celebration vibe",
		tag: {
			gr: "Celebration",
			en: "Celebration"
		}
	},
	{
		src: "/image/5a35259b-6f94-4369-bbec-b76b82e0d0f2.jpg",
		alt: "rythmoShow percussion moments",
		tag: {
			gr: "Club & Party",
			en: "Club & Party"
		}
	},
	{
		src: "/image/890f3313-c9ac-4420-a0aa-d6eab8b541b9.jpg",
		alt: "rythmoShow dynamic beat",
		tag: {
			gr: "High Octane",
			en: "High Octane"
		}
	},
	{
		src: "/image/9381c09f-463a-474d-8e73-da01f6cd2379.jpg",
		alt: "rythmoShow live groove",
		tag: {
			gr: "Stage Groove",
			en: "Stage Groove"
		}
	},
	{
		src: "/image/b07faa96-9afa-426f-b819-1e5c559a2e54.jpg",
		alt: "rythmoShow wedding percussion",
		tag: {
			gr: "Party Anthem",
			en: "Party Anthem"
		}
	},
	{
		src: "/image/469465613_122199910358019703_980334791964389230_n.jpg",
		alt: "rythmoShow evening atmosphere",
		tag: {
			gr: "Atmosphere",
			en: "Atmosphere"
		}
	}
];
function Gallery({ language = "gr", kicker, title, subtitle, closeLabel, prevLabel, nextLabel }) {
	const [activePhoto, setActivePhoto] = (0, import_react.useState)(null);
	const defaultKicker = "Visual Showcase · Luxury Moments";
	const defaultTitle = language === "gr" ? "Φωτογραφικό Υλικό & Στιγμιότυπα" : "Photo Gallery & Live Moments";
	const defaultSubtitle = language === "gr" ? "Απολαύστε στιγμές γεμάτες ενέργεια, ρυθμό και πάθος από live εμφανίσεις του rythmoShow σε γάμους, premium parties και exclusive events στην Κύπρο." : "Explore electrifying moments, vibrant pulse, and luxury performances by rythmoShow across weddings, premium parties, and exclusive events in Cyprus.";
	const openLightbox = (index) => setActivePhoto(index);
	const closeLightbox = () => setActivePhoto(null);
	const prevPhoto = () => {
		setActivePhoto((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
	};
	const nextPhoto = () => {
		setActivePhoto((current) => current === null ? null : (current + 1) % galleryImages.length);
	};
	(0, import_react.useEffect)(() => {
		if (activePhoto === null) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowLeft") prevPhoto();
			if (e.key === "ArrowRight") nextPhoto();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [activePhoto]);
	(0, import_react.useEffect)(() => {
		if (activePhoto !== null) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [activePhoto]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "gallery",
		className: "border-t border-border bg-card/40 py-24 sm:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-3.5" }), kicker ?? defaultKicker]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl leading-tight sm:text-6xl",
					children: title ?? defaultTitle
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base",
					children: subtitle ?? defaultSubtitle
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6",
				children: galleryImages.map((image, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						amount: .1
					},
					transition: {
						duration: .5,
						delay: idx % 4 * .08
					},
					className: "group relative cursor-pointer overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_35px_rgba(234,179,8,0.18)]",
					onClick: () => openLightbox(idx),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[4/3] w-full overflow-hidden sm:aspect-square",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: image.src,
								alt: image.alt,
								loading: "lazy",
								className: "size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col justify-between p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md",
										children: ["0", idx + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-9 place-items-center rounded-full border border-primary/40 bg-primary/20 text-primary opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rounded border border-primary/40 bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-primary backdrop-blur-md",
									children: image.tag[language]
								}) })]
							})
						]
					})
				}, image.src))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activePhoto !== null && galleryImages[activePhoto] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: .22 },
			className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8",
			onClick: closeLightbox,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 sm:px-8",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs uppercase tracking-[0.2em] text-primary",
							children: [
								String(activePhoto + 1).padStart(2, "0"),
								" / ",
								String(galleryImages.length).padStart(2, "0")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] text-primary sm:inline-block",
							children: galleryImages[activePhoto]?.tag[language]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: closeLightbox,
						className: "size-11 rounded-full border border-white/20 bg-background/50 text-foreground hover:bg-primary hover:text-primary-foreground",
						"aria-label": closeLabel ?? "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					onClick: (e) => {
						e.stopPropagation();
						prevPhoto();
					},
					className: "absolute left-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full border border-white/20 bg-background/60 text-foreground backdrop-blur-md hover:border-primary hover:bg-primary hover:text-primary-foreground sm:left-8",
					"aria-label": prevLabel ?? "Previous",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					onClick: (e) => {
						e.stopPropagation();
						nextPhoto();
					},
					className: "absolute right-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full border border-white/20 bg-background/60 text-foreground backdrop-blur-md hover:border-primary hover:bg-primary hover:text-primary-foreground sm:right-8",
					"aria-label": nextLabel ?? "Next",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						scale: .95,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .95,
						opacity: 0
					},
					transition: { duration: .22 },
					className: "relative max-h-[82vh] max-w-[92vw] overflow-hidden rounded-2xl border border-primary/30 shadow-[0_0_60px_rgba(234,179,8,0.25)]",
					onClick: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: galleryImages[activePhoto]?.src,
						alt: galleryImages[activePhoto]?.alt,
						className: "max-h-[82vh] w-auto max-w-[92vw] object-contain"
					})
				}, activePhoto)
			]
		}) })]
	});
}
var BRAND_PHONE = "0035799903290";
var BRAND_PHONE_DISPLAY = "+357 99 903290";
var BRAND_INSTAGRAM = "https://www.instagram.com/rythmoshows?stkn=YXA3Mm8ycWV4eW8z";
var BRAND_FACEBOOK = "https://www.facebook.com/share/19nghCfM9x/";
var BRAND_EMAIL = "percussionshow9@gmail.com";
var copy = {
	gr: {
		nav: [
			"Σχετικά",
			"Υπηρεσίες",
			"Experience",
			"Συλλογή",
			"Κράτηση"
		],
		booking: "Αίτημα Κράτησης",
		heroKicker: "Live Percussion Duo · Διαθέσιμο αποκλειστικά στην Κύπρο",
		heroTitle: "Live Percussion & Party Experience",
		heroText: "Το rythmoShow είναι ένα εκρηκτικό live music project από 2 μουσικούς στα κρούστα. Δημιουργούμε την απόλυτη party ατμόσφαιρα με ρυθμό, ένταση και ενέργεια σε κάθε εκδήλωση στην Κύπρο.",
		scroll: "Ανακάλυψε το show",
		aboutKicker: "Δύο μουσικοί. Ένας εκρηκτικός παλμός.",
		aboutTitle: "Η στιγμή που το event γίνεται αξέχαστη εμπειρία.",
		aboutText: "Το rythmoShow είναι ένα εκρηκτικό live music project που αποτελείται από 2 μουσικούς στα κρούστα (Live Percussion Duo). Δημιουργούμε την απόλυτη ατμόσφαιρα party παίζοντας live μουσική, δίνοντας ρυθμό, ένταση και ενέργεια σε κάθε εκδήλωση στην Κύπρο (γάμοι, βαπτίσεις, private parties, εταιρικά events).",
		statOne: "02",
		statOneLabel: "Μουσικοί στα Κρούστα (Percussion Duo)",
		statTwo: "100%",
		statTwoLabel: "Live Party Ενέργεια",
		serviceKicker: "Ολοκληρωμένη Μουσική Εμπειρία",
		serviceTitle: "Live Percussion Duo & DJ Service",
		serviceText: "Προσφέρουμε δυναμικό Live Percussion Duo και δυνατότητα συνεργασίας με συνεργάτη DJ ή τον DJ του event σας κατόπιν αιτήματος, εξασφαλίζοντας αρμονική ροή και ασταμάτητο χορό.",
		servicePoints: [
			"Live Percussion Duo (2 Μουσικοί στα Κρούστα)",
			"Συνεργασία με τον DJ του event ή συνεργάτη DJ του rythmoShow",
			"Ελληνικά, ethnic, arabic & global party rhythms",
			"Προσαρμοσμένο performance set ανάλογα με τις ανάγκες σας"
		],
		experienceKicker: "The Live Experience",
		experienceTitle: "Άκου τον παλμό. Νιώσε τη στιγμή.",
		clips: [
			"Wedding Pulse",
			"Greek Party",
			"After Dark"
		],
		clipLabels: [
			"Live Wedding Showcase",
			"Island Sunset Party",
			"Club / Bar Percussion Set"
		],
		galleryKicker: "Visual Showcase · Luxury Moments",
		galleryTitle: "Φωτογραφικό Υλικό & Στιγμιότυπα",
		gallerySubtitle: "Απολαύστε στιγμές γεμάτες ενέργεια, ρυθμό και πάθος από live εμφανίσεις του rythmoShow σε γάμους, premium parties και exclusive events στην Κύπρο.",
		galleryClose: "Κλείσιμο προβολής",
		galleryPrev: "Προηγούμενη φωτογραφία",
		galleryNext: "Επόμενη φωτογραφία",
		bookingKicker: "Bring The Rhythm To Your Event",
		bookingTitle: "Αίτημα Κράτησης Event",
		bookingText: "Συμπληρώστε τη φόρμα ενδιαφέροντος για να ελέγξουμε τη διαθεσιμότητα για την εκδήλωσή σας στην Κύπρο και να σας στείλουμε προσαρμοσμένη πρόταση.",
		labels: {
			fullName: "Ονοματεπώνυμο",
			email: "Email",
			phone: "Τηλέφωνο Επικοινωνίας",
			eventDate: "Ημερομηνία Εκδήλωσης",
			eventType: "Είδος Εκδήλωσης",
			location: "Τοποθεσία / Επαρχία (Κύπρος)",
			djOption: "Χρειάζεστε και DJ;",
			notes: "Σημειώσεις / Ειδικές Απαιτήσεις"
		},
		placeholders: {
			fullName: "π.χ. Γιώργος Παπαδόπουλος",
			email: "you@email.com",
			phone: "+357 99 903290",
			location: "Επιλέξτε επαρχία στην Κύπρο...",
			notes: "Πείτε μας για το πρόγραμμα, τον χώρο ή άλλες λεπτομέρειες..."
		},
		locations: [
			"Επιλέξτε επαρχία στην Κύπρο...",
			"Λευκωσία (Nicosia)",
			"Λεμεσός (Limassol)",
			"Λάρνακα (Larnaca)",
			"Πάφος (Paphos)",
			"Αμμόχωστος / Αγία Νάπα / Πρωταράς (Famagusta)",
			"Άλλη Περιοχή στην Κύπρο"
		],
		eventTypes: [
			"Επιλέξτε είδος εκδήλωσης...",
			"Γάμος",
			"Βάπτιση",
			"Private Party / Γενέθλια",
			"Εταιρικό Event",
			"Club / Bar Set"
		],
		djOptions: {
			no: "Όχι (Έχουμε ήδη DJ)",
			yes: "Ναι (Θέλουμε συνεργάτη DJ από το rythmoShow)"
		},
		submit: "Αποστολή Αιτήματος",
		submitting: "Αποστολή...",
		privacy: "Τα στοιχεία σας χρησιμοποιούνται αποκλειστικά για την επικοινωνία σχετικά με το αίτημά σας. Υπηρεσίες διαθέσιμες αποκλειστικά στην Κύπρο.",
		successTitle: "Το αίτημά σας καταχωρήθηκε επιτυχώς!",
		successText: "Ευχαριστούμε! Θα επικοινωνήσουμε άμεσα μαζί σας για τη διαθεσιμότητα και τις λεπτομέρειες.",
		errorGeneric: "Παρουσιάστηκε σφάλμα κατά την αποστολή. Παρακαλούμε δοκιμάστε ξανά ή καλέστε μας.",
		errors: {
			fullName: "Συμπληρώστε το ονοματεπώνυμό σας.",
			email: "Εισάγετε μια έγκυρη διεύθυνση email.",
			phone: "Συμπληρώστε το τηλέφωνο επικοινωνίας.",
			eventDate: "Επιλέξτε ημερομηνία εκδήλωσης.",
			eventType: "Επιλέξτε είδος εκδήλωσης.",
			location: "Παρακαλούμε επιλέξτε επαρχία / περιοχή στην Κύπρο."
		},
		footerLine: "Live percussion duo. High-energy party experience.",
		phoneLabel: "Τηλέφωνο",
		availability: "Διαθέσιμο αποκλειστικά στην Κύπρο"
	},
	en: {
		nav: [
			"About",
			"Services",
			"Experience",
			"Gallery",
			"Booking"
		],
		booking: "Request Booking",
		heroKicker: "Live Percussion Duo · Available exclusively in Cyprus",
		heroTitle: "Live Percussion & Party Experience",
		heroText: "rythmoShow is an explosive live music project featuring a 2-piece Live Percussion Duo. We create the ultimate party atmosphere, adding rhythm, energy, and excitement to every event in Cyprus.",
		scroll: "Discover the show",
		aboutKicker: "Two musicians. One explosive pulse.",
		aboutTitle: "The moment your event becomes an unforgettable experience.",
		aboutText: "rythmoShow is an explosive live music project featuring a 2-piece Live Percussion Duo. We create the ultimate party atmosphere performing live music, adding rhythm, energy, and excitement to every event in Cyprus (weddings, baptisms, private parties, corporate events).",
		statOne: "02",
		statOneLabel: "Live Percussionists (Duo)",
		statTwo: "100%",
		statTwoLabel: "Pure Live Party Energy",
		serviceKicker: "Complete Music Experience",
		serviceTitle: "Live Percussion Duo & DJ Service",
		serviceText: "We offer a high-octane Live Percussion Duo with the option to collaborate seamlessly with your event DJ or provide our partner DJ upon request for a nonstop dancefloor journey.",
		servicePoints: [
			"Live Percussion Duo (2 Musicians on Drums & Percussion)",
			"Synergy with your event DJ or rythmoShow partner DJ",
			"Greek, ethnic, arabic & global party anthems",
			"Tailored performance sets adapted to your event timeline"
		],
		experienceKicker: "The Live Experience",
		experienceTitle: "Hear the pulse. Feel the moment.",
		clips: [
			"Wedding Pulse",
			"Greek Party",
			"After Dark"
		],
		clipLabels: [
			"Live Wedding Showcase",
			"Island Sunset Party",
			"Club / Bar Percussion Set"
		],
		galleryKicker: "Visual Showcase · Luxury Moments",
		galleryTitle: "Photo Gallery & Live Moments",
		gallerySubtitle: "Explore electrifying moments, vibrant pulse, and luxury performances by rythmoShow across weddings, premium parties, and exclusive events in Cyprus.",
		galleryClose: "Close preview",
		galleryPrev: "Previous photo",
		galleryNext: "Next photo",
		bookingKicker: "Bring The Rhythm To Your Event",
		bookingTitle: "Request Event Booking",
		bookingText: "Fill out the booking form below to check our availability for your event in Cyprus and receive a tailored proposal.",
		labels: {
			fullName: "Full Name",
			email: "Email Address",
			phone: "Phone Number",
			eventDate: "Event Date",
			eventType: "Event Type",
			location: "Location / District (Cyprus)",
			djOption: "Do you need a DJ service as well?",
			notes: "Additional Notes / Special Requests"
		},
		placeholders: {
			fullName: "e.g. Alex Smith",
			email: "you@email.com",
			phone: "+357 99 903290",
			location: "Select district in Cyprus...",
			notes: "Tell us about your event timeline, musical preferences or special requests..."
		},
		locations: [
			"Select district in Cyprus...",
			"Nicosia (Λευκωσία)",
			"Limassol (Λεμεσός)",
			"Larnaca (Λάρνακα)",
			"Paphos (Πάφος)",
			"Famagusta / Ayia Napa / Protaras (Αμμόχωστος)",
			"Other Cyprus Location"
		],
		eventTypes: [
			"Select event type...",
			"Wedding",
			"Baptism",
			"Private Party / Birthday",
			"Corporate Event",
			"Club / Bar Set"
		],
		djOptions: {
			no: "No (DJ already provided)",
			yes: "Yes (Include rythmoShow DJ partner)"
		},
		submit: "Send Booking Request",
		submitting: "Sending...",
		privacy: "Your details are strictly used to respond to your booking inquiry. Services are available exclusively in Cyprus.",
		successTitle: "Booking request received!",
		successText: "Thank you! We will get in touch shortly with availability and details.",
		errorGeneric: "An error occurred while submitting. Please try again or call us directly.",
		errors: {
			fullName: "Please enter your full name.",
			email: "Please enter a valid email address.",
			phone: "Please enter your phone number.",
			eventDate: "Please choose an event date.",
			eventType: "Please select an event type.",
			location: "Please select a district in Cyprus."
		},
		footerLine: "Live percussion duo. High-energy party experience.",
		phoneLabel: "Phone",
		availability: "Available exclusively in Cyprus"
	}
};
var clips = [
	{
		duration: 42,
		crop: "object-center"
	},
	{
		duration: 55,
		crop: "object-[62%_center]"
	},
	{
		duration: 38,
		crop: "object-[78%_center]"
	}
];
function BrandMark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "#top",
		className: "group inline-flex items-center gap-2",
		"aria-label": "rythmoShow home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/image/Logo1.png",
			alt: "rythmoShow logo",
			className: "h-10 w-auto object-contain"
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-xl text-foreground",
			children: ["rythmo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: "Show"
			})]
		})]
	});
}
function LanguageToggle({ language, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-10 items-center rounded-full border border-border bg-background/60 p-1 backdrop-blur-md",
		"aria-label": "Language selection",
		children: ["gr", "en"].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "sm",
			onClick: () => onChange(value),
			"aria-pressed": language === value,
			className: `h-8 min-w-10 rounded-full px-3 text-[11px] tracking-[0.16em] ${language === value ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"}`,
			children: value.toUpperCase()
		}, value))
	});
}
function Equalizer({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-8 items-end gap-1",
		"aria-hidden": "true",
		children: [
			45,
			80,
			55,
			100,
			68,
			38,
			86,
			60,
			92,
			48,
			72,
			35,
			65,
			96,
			52
		].map((height, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `w-1 rounded-full bg-primary/70 ${active ? "equalizer-bar" : ""}`,
			style: {
				height: `${height}%`,
				animationDelay: `${index * 70}ms`
			}
		}, index))
	});
}
function ExperiencePlayer({ t }) {
	const [activeClip, setActiveClip] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(14);
	const activeMedia = clips[activeClip] ?? clips[0] ?? {
		duration: 42,
		crop: "object-center"
	};
	const duration = activeMedia.duration;
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const timer = window.setInterval(() => {
			setProgress((current) => current >= 100 ? 0 : current + .6);
		}, 300);
		return () => window.clearInterval(timer);
	}, [playing]);
	const elapsed = Math.floor(progress / 100 * duration);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(260px,.7fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group relative aspect-video min-h-[300px] overflow-hidden rounded-lg border border-border bg-card sm:min-h-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: rythmoshow_stage_default,
					alt: "rythmoShow live percussion duo on stage",
					width: 1920,
					height: 1280,
					loading: "lazy",
					className: `size-full ${activeMedia.crop} object-cover transition-transform duration-700 group-hover:scale-[1.02]`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-media-overlay" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 p-5 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-end justify-between gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-xs uppercase tracking-[0.2em] text-primary",
									children: "Now playing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl text-foreground sm:text-3xl",
									children: t.clips[activeClip]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-foreground/65",
									children: t.clipLabels[activeClip]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Equalizer, { active: playing })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: "0",
							max: "100",
							value: progress,
							onChange: (event) => setProgress(Number(event.target.value)),
							className: "media-range mb-4 w-full",
							"aria-label": "Clip progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "icon",
									className: "size-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90",
									onClick: () => setPlaying((value) => !value),
									"aria-label": playing ? "Pause clip" : "Play clip",
									children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-5 fill-current" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4 text-foreground/75" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-foreground/70",
									children: [
										"0:",
										elapsed.toString().padStart(2, "0"),
										" / 0:",
										duration
									]
								})
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col border-y border-border",
			children: t.clips.map((clip, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setActiveClip(index);
					setProgress(8);
					setPlaying(true);
				},
				className: `grid min-h-28 flex-1 cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border px-2 text-left transition-colors last:border-b-0 sm:px-5 ${activeClip === index ? "bg-card" : "hover:bg-card/60"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: ["0", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `block truncate font-display text-xl ${activeClip === index ? "text-primary" : "text-foreground"}`,
							children: clip
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block truncate text-xs text-muted-foreground",
							children: t.clipLabels[index]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-muted-foreground" })
				]
			}, clip))
		})]
	});
}
function BookingForm({ t, language }) {
	const [djOption, setDjOption] = (0, import_react.useState)("no");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		const formElement = event.currentTarget;
		const form = new FormData(formElement);
		const nextErrors = {};
		const fullName = String(form.get("fullName") ?? "").trim();
		const email = String(form.get("email") ?? "").trim();
		const phone = String(form.get("phone") ?? "").trim();
		const eventDate = String(form.get("eventDate") ?? "").trim();
		const eventType = String(form.get("eventType") ?? "").trim();
		const location = String(form.get("location") ?? "").trim();
		const notes = String(form.get("notes") ?? "").trim();
		if (!fullName) nextErrors.fullName = t.errors.fullName;
		if (!email || !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = t.errors.email;
		if (!phone) nextErrors.phone = t.errors.phone;
		if (!eventDate) nextErrors.eventDate = t.errors.eventDate;
		if (!eventType) nextErrors.eventType = t.errors.eventType;
		if (!location) nextErrors.location = t.errors.location;
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		setIsSubmitting(true);
		const payload = {
			fullName,
			email,
			phone,
			eventDate,
			eventType,
			location,
			djOption: djOption === "yes" ? t.djOptions.yes : t.djOptions.no,
			notes,
			language
		};
		try {
			if ((await submitBookingServerFn({ data: payload }))?.success) {
				toast.success(t.successTitle, {
					description: t.successText,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }),
					duration: 6e3
				});
				formElement.reset();
				setDjOption("no");
				setErrors({});
			} else throw new Error(t.errorGeneric);
		} catch (err) {
			console.error("Booking submission error:", err);
			toast.error(t.errorGeneric, { description: err?.message || void 0 });
		} finally {
			setIsSubmitting(false);
		}
	}
	const fieldClass = "h-12 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0";
	const labelClass = "mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		noValidate: true,
		className: "mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: labelClass,
					children: [t.labels.fullName, " *"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "fullName",
					placeholder: t.placeholders.fullName,
					required: true,
					className: `${fieldClass} ${errors.fullName ? "border-destructive" : ""}`
				}),
				errors.fullName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-destructive",
					children: errors.fullName
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: labelClass,
					children: [t.labels.email, " *"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "email",
					type: "email",
					placeholder: t.placeholders.email,
					required: true,
					className: `${fieldClass} ${errors.email ? "border-destructive" : ""}`
				}),
				errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-destructive",
					children: errors.email
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: labelClass,
					children: [t.labels.phone, " *"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "phone",
					type: "tel",
					placeholder: t.placeholders.phone,
					required: true,
					className: `${fieldClass} ${errors.phone ? "border-destructive" : ""}`
				}),
				errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-destructive",
					children: errors.phone
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: labelClass,
					children: [t.labels.eventDate, " *"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "eventDate",
					type: "date",
					min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					required: true,
					className: `${fieldClass} scheme-dark ${errors.eventDate ? "border-destructive" : ""}`
				}),
				errors.eventDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-destructive",
					children: errors.eventDate
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: labelClass,
					children: [t.labels.eventType, " *"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					name: "eventType",
					defaultValue: "",
					required: true,
					className: `${fieldClass} w-full border-b text-sm text-foreground outline-none ${errors.eventType ? "border-destructive" : ""}`,
					children: t.eventTypes.map((type, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: index === 0 ? "" : type,
						className: "bg-card",
						disabled: index === 0,
						children: type
					}, type))
				}),
				errors.eventType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-destructive",
					children: errors.eventType
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: labelClass,
					children: [t.labels.location, " *"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					name: "location",
					defaultValue: "",
					required: true,
					className: `${fieldClass} w-full border-b text-sm text-foreground outline-none ${errors.location ? "border-destructive" : ""}`,
					children: t.locations.map((loc, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: index === 0 ? "" : loc,
						className: "bg-card",
						disabled: index === 0,
						children: loc
					}, loc))
				}),
				errors.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-destructive",
					children: errors.location
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: labelClass,
					children: t.labels.djOption
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-3",
					children: [["no", t.djOptions.no], ["yes", t.djOptions.yes]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setDjOption(value),
						"aria-pressed": djOption === value,
						className: `h-11 rounded-full border-border bg-transparent px-5 text-xs transition-all ${djOption === value ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"}`,
						children: [djOption === value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1.5 size-4" }), label]
					}, value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: labelClass,
					children: t.labels.notes
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					name: "notes",
					placeholder: t.placeholders.notes,
					className: "min-h-28 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start justify-between gap-5 sm:col-span-2 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-xs leading-5 text-muted-foreground",
					children: t.privacy
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					disabled: isSubmitting,
					className: "h-14 w-full rounded-full bg-primary px-8 text-xs uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary/90 disabled:opacity-70 sm:w-auto",
					children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), t.submitting] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t.submit, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-1 size-4" })] })
				})]
			})
		]
	});
}
function RythmoShowApp() {
	const [language, setLanguage] = (0, import_react.useState)("gr");
	const t = (0, import_react.useMemo)(() => copy[language], [language]);
	const reveal = {
		initial: {
			opacity: 0,
			y: useReducedMotion() ? 0 : 28
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			amount: .2
		},
		transition: { duration: .65 }
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-8 lg:flex",
							"aria-label": "Primary navigation",
							children: t.nav.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: [
									"#about",
									"#services",
									"#experience",
									"#gallery",
									"#booking"
								][index],
								className: "text-xs text-muted-foreground transition-colors hover:text-primary",
								children: item
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {
								language,
								onChange: setLanguage
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative flex min-h-[92svh] items-end overflow-hidden pt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: rythmoshow_stage_default,
							alt: "rythmoShow live percussion duo performing under golden stage lights",
							width: 1920,
							height: 1280,
							fetchPriority: "high",
							className: "absolute inset-0 size-full object-cover object-[62%_center]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-hero-overlay" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hero-glow absolute inset-0",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 overflow-hidden",
							"aria-hidden": "true",
							children: Array.from({ length: 16 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "particle",
								style: {
									left: `${5 + i * 19 % 92}%`,
									top: `${12 + i * 31 % 70}%`,
									animationDelay: `${i * .4}s`
								}
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							...reveal,
							className: "relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 lg:px-8 lg:pb-20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary sm:text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-primary" }), t.heroKicker]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] text-foreground",
									children: [
										"Live Percussion",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic text-primary",
											children: "& Party"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Experience"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex max-w-3xl flex-col gap-7 border-l border-primary/50 pl-5 sm:flex-row sm:items-center sm:justify-between sm:pl-7",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-xl text-base leading-7 text-foreground/75 sm:text-lg",
										children: t.heroText
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "h-14 w-fit shrink-0 rounded-full bg-primary px-7 text-xs uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#booking",
											children: [t.booking, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-1 size-4" })]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#about",
									className: "mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" }), t.scroll]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "about",
					className: "border-t border-border py-24 sm:py-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						...reveal,
						className: "mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-kicker",
							children: t.aboutKicker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 grid grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-display text-5xl text-primary",
								children: t.statOne
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: t.statOneLabel
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-display text-5xl text-primary",
								children: t.statTwo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: t.statTwoLabel
							})] })]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl leading-tight sm:text-6xl",
							children: t.aboutTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg",
							children: t.aboutText
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "services",
					className: "border-y border-border bg-card/50 py-24 sm:py-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						...reveal,
						className: "mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-8 grid size-14 place-items-center rounded-full border border-primary/40 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-kicker",
								children: t.serviceKicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-5 font-display text-5xl sm:text-7xl",
								children: t.serviceTitle
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:border-l lg:border-border lg:pl-14",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg leading-8 text-muted-foreground",
								children: t.serviceText
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-9 space-y-4",
								children: t.servicePoints.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-4 border-b border-border pb-4 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary shrink-0" }), point]
								}, point))
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "experience",
					className: "py-24 sm:py-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						...reveal,
						className: "mx-auto max-w-7xl px-5 lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-kicker",
								children: t.experienceKicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-6xl",
								children: t.experienceTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperiencePlayer, { t })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {
					language,
					kicker: t.galleryKicker,
					title: t.galleryTitle,
					subtitle: t.gallerySubtitle,
					closeLabel: t.galleryClose,
					prevLabel: t.galleryPrev,
					nextLabel: t.galleryNext
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "booking",
					className: "relative border-t border-border bg-card/50 py-24 sm:py-32",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "booking-glow absolute inset-0",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						...reveal,
						className: "relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-kicker",
								children: t.bookingKicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-5 font-display text-4xl leading-tight sm:text-6xl",
								children: t.bookingTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-7 max-w-md leading-7 text-muted-foreground",
								children: t.bookingText
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingForm, {
							t,
							language
						})]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: t.footerLine
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-start gap-3 sm:justify-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "icon",
									className: "size-11 rounded-full border-border bg-transparent hover:border-primary hover:text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: BRAND_INSTAGRAM,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": "Instagram",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "icon",
									className: "size-11 rounded-full border-border bg-transparent hover:border-primary hover:text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: BRAND_FACEBOOK,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": "Facebook",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "size-4" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "icon",
									className: "size-11 rounded-full border-border bg-transparent hover:border-primary hover:text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `tel:${BRAND_PHONE}`,
										"aria-label": "Call rythmoShow",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-sm text-muted-foreground sm:text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `tel:${BRAND_PHONE}`,
									className: "inline-flex items-center gap-2 transition-colors hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), BRAND_PHONE_DISPLAY]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `mailto:${BRAND_EMAIL}`,
									className: "inline-flex items-center gap-2 transition-colors hover:text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), BRAND_EMAIL]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 sm:justify-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), t.availability]
								})
							]
						})
					]
				})
			})
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RythmoShowApp, {});
}
//#endregion
export { Index as component };
