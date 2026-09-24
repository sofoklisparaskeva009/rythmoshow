import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Maximize2,
  Music2,
  Pause,
  Phone,
  Play,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import stageImage from "@/assets/rythmoshow-stage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitBookingServerFn, type BookingFormData } from "@/api/bookings";

type Language = "gr" | "en";

type FormErrorState = {
  fullName?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  eventType?: string;
  location?: string;
};

type Copy = {
  nav: string[];
  booking: string;
  heroKicker: string;
  heroTitle: string;
  heroText: string;
  scroll: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutText: string;
  statOne: string;
  statOneLabel: string;
  statTwo: string;
  statTwoLabel: string;
  serviceKicker: string;
  serviceTitle: string;
  serviceText: string;
  servicePoints: string[];
  experienceKicker: string;
  experienceTitle: string;
  clips: string[];
  clipLabels: string[];
  galleryKicker: string;
  galleryTitle: string;
  gallerySubtitle: string;
  galleryClose: string;
  galleryPrev: string;
  galleryNext: string;
  bookingKicker: string;
  bookingTitle: string;
  bookingText: string;
  labels: {
    fullName: string;
    email: string;
    phone: string;
    eventDate: string;
    eventType: string;
    location: string;
    djOption: string;
    notes: string;
  };
  placeholders: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    notes: string;
  };
  locations: string[];
  eventTypes: string[];
  djOptions: {
    yes: string;
    no: string;
  };
  submit: string;
  submitting: string;
  privacy: string;
  successTitle: string;
  successText: string;
  errorGeneric: string;
  errors: {
    fullName: string;
    email: string;
    phone: string;
    eventDate: string;
    eventType: string;
    location: string;
  };
  footerLine: string;
  phoneLabel: string;
  availability: string;
};

const BRAND_PHONE = "0035799903290";
const BRAND_PHONE_DISPLAY = "+357 99 903290";
const BRAND_INSTAGRAM = "https://www.instagram.com/rythmoshows?stkn=YXA3Mm8ycWV4eW8z";
const BRAND_FACEBOOK = "https://www.facebook.com/share/19nghCfM9x/";
const BRAND_EMAIL = "percussionshow9@gmail.com";

const copy: Record<Language, Copy> = {
  gr: {
    nav: ["Σχετικά", "Υπηρεσίες", "Experience", "Συλλογή", "Κράτηση"],
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
      "Προσαρμοσμένο performance set ανάλογα με τις ανάγκες σας",
    ],
    experienceKicker: "The Live Experience",
    experienceTitle: "Άκου τον παλμό. Νιώσε τη στιγμή.",
    clips: ["Wedding Pulse", "Greek Party", "After Dark"],
    clipLabels: ["Live Wedding Showcase", "Island Sunset Party", "Club / Bar Percussion Set"],
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
      notes: "Σημειώσεις / Ειδικές Απαιτήσεις",
    },
    placeholders: {
      fullName: "π.χ. Γιώργος Παπαδόπουλος",
      email: "you@email.com",
      phone: "+357 99 903290",
      location: "Επιλέξτε επαρχία στην Κύπρο...",
      notes: "Πείτε μας για το πρόγραμμα, τον χώρο ή άλλες λεπτομέρειες...",
    },
    locations: [
      "Επιλέξτε επαρχία στην Κύπρο...",
      "Λευκωσία (Nicosia)",
      "Λεμεσός (Limassol)",
      "Λάρνακα (Larnaca)",
      "Πάφος (Paphos)",
      "Αμμόχωστος / Αγία Νάπα / Πρωταράς (Famagusta)",
      "Άλλη Περιοχή στην Κύπρο",
    ],
    eventTypes: [
      "Επιλέξτε είδος εκδήλωσης...",
      "Γάμος",
      "Βάπτιση",
      "Private Party / Γενέθλια",
      "Εταιρικό Event",
      "Club / Bar Set",
    ],
    djOptions: {
      no: "Όχι (Έχουμε ήδη DJ)",
      yes: "Ναι (Θέλουμε συνεργάτη DJ από το rythmoShow)",
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
      location: "Παρακαλούμε επιλέξτε επαρχία / περιοχή στην Κύπρο.",
    },
    footerLine: "Live percussion duo. High-energy party experience.",
    phoneLabel: "Τηλέφωνο",
    availability: "Διαθέσιμο αποκλειστικά στην Κύπρο",
  },
  en: {
    nav: ["About", "Services", "Experience", "Gallery", "Booking"],
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
      "Tailored performance sets adapted to your event timeline",
    ],
    experienceKicker: "The Live Experience",
    experienceTitle: "Hear the pulse. Feel the moment.",
    clips: ["Wedding Pulse", "Greek Party", "After Dark"],
    clipLabels: ["Live Wedding Showcase", "Island Sunset Party", "Club / Bar Percussion Set"],
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
      notes: "Additional Notes / Special Requests",
    },
    placeholders: {
      fullName: "e.g. Alex Smith",
      email: "you@email.com",
      phone: "+357 99 903290",
      location: "Select district in Cyprus...",
      notes: "Tell us about your event timeline, musical preferences or special requests...",
    },
    locations: [
      "Select district in Cyprus...",
      "Nicosia (Λευκωσία)",
      "Limassol (Λεμεσός)",
      "Larnaca (Λάρνακα)",
      "Paphos (Πάφος)",
      "Famagusta / Ayia Napa / Protaras (Αμμόχωστος)",
      "Other Cyprus Location",
    ],
    eventTypes: [
      "Select event type...",
      "Wedding",
      "Baptism",
      "Private Party / Birthday",
      "Corporate Event",
      "Club / Bar Set",
    ],
    djOptions: {
      no: "No (DJ already provided)",
      yes: "Yes (Include rythmoShow DJ partner)",
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
      location: "Please select a district in Cyprus.",
    },
    footerLine: "Live percussion duo. High-energy party experience.",
    phoneLabel: "Phone",
    availability: "Available exclusively in Cyprus",
  },
};

const clips = [
  { duration: 42, crop: "object-center" },
  { duration: 55, crop: "object-[62%_center]" },
  { duration: 38, crop: "object-[78%_center]" },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label="rythmoShow home">
      <span className="relative grid size-10 place-items-center rounded-full border border-primary/50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <span className="absolute inset-1 rounded-full border border-current/40" />
        <Music2 className="size-4" />
      </span>
      {!compact && (
        <span className="font-display text-xl text-foreground">
          rythmo<span className="text-primary">Show</span>
        </span>
      )}
    </a>
  );
}

function LanguageToggle({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return (
    <div className="flex h-10 items-center rounded-full border border-border bg-background/60 p-1 backdrop-blur-md" aria-label="Language selection">
      {(["gr", "en"] as const).map((value) => (
        <Button
          key={value}
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(value)}
          aria-pressed={language === value}
          className={`h-8 min-w-10 rounded-full px-3 text-[11px] tracking-[0.16em] ${language === value ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"}`}
        >
          {value.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-end gap-1" aria-hidden="true">
      {[45, 80, 55, 100, 68, 38, 86, 60, 92, 48, 72, 35, 65, 96, 52].map((height, index) => (
        <span
          key={index}
          className={`w-1 rounded-full bg-primary/70 ${active ? "equalizer-bar" : ""}`}
          style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }}
        />
      ))}
    </div>
  );
}

function ExperiencePlayer({ t }: { t: Copy }) {
  const [activeClip, setActiveClip] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(14);
  const activeMedia = clips[activeClip] ?? clips[0] ?? { duration: 42, crop: "object-center" };
  const duration = activeMedia.duration;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setProgress((current) => (current >= 100 ? 0 : current + 0.6));
    }, 300);
    return () => window.clearInterval(timer);
  }, [playing]);

  const elapsed = Math.floor((progress / 100) * duration);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(260px,.7fr)]">
      <div className="group relative aspect-video min-h-[300px] overflow-hidden rounded-lg border border-border bg-card sm:min-h-0">
        <img
          src={stageImage}
          alt="rythmoShow live percussion duo on stage"
          width={1920}
          height={1280}
          loading="lazy"
          className={`size-full ${activeMedia.crop} object-cover transition-transform duration-700 group-hover:scale-[1.02]`}
        />
        <div className="absolute inset-0 bg-media-overlay" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <div className="mb-6 flex items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">Now playing</p>
              <h3 className="font-display text-2xl text-foreground sm:text-3xl">{t.clips[activeClip]}</h3>
              <p className="mt-1 text-sm text-foreground/65">{t.clipLabels[activeClip]}</p>
            </div>
            <Equalizer active={playing} />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
            className="media-range mb-4 w-full"
            aria-label="Clip progress"
          />
          <div className="flex items-center gap-4">
            <Button
              type="button"
              size="icon"
              className="size-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause clip" : "Play clip"}
            >
              {playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
            </Button>
            <Volume2 className="size-4 text-foreground/75" />
            <span className="font-mono text-xs text-foreground/70">0:{elapsed.toString().padStart(2, "0")} / 0:{duration}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-y border-border">
        {t.clips.map((clip, index) => (
          <button
            key={clip}
            type="button"
            onClick={() => {
              setActiveClip(index);
              setProgress(8);
              setPlaying(true);
            }}
            className={`grid min-h-28 flex-1 cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border px-2 text-left transition-colors last:border-b-0 sm:px-5 ${activeClip === index ? "bg-card" : "hover:bg-card/60"}`}
          >
            <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
            <span className="min-w-0">
              <span className={`block truncate font-display text-xl ${activeClip === index ? "text-primary" : "text-foreground"}`}>{clip}</span>
              <span className="mt-1 block truncate text-xs text-muted-foreground">{t.clipLabels[index]}</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

function BookingForm({ t, language }: { t: Copy; language: Language }) {
  const [djOption, setDjOption] = useState<string>("no");
  const [errors, setErrors] = useState<FormErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const nextErrors: FormErrorState = {};

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

    const payload: BookingFormData = {
      fullName,
      email,
      phone,
      eventDate,
      eventType,
      location,
      djOption: djOption === "yes" ? t.djOptions.yes : t.djOptions.no,
      notes,
      language,
    };

    try {
      const res = await submitBookingServerFn({ data: payload });
      if (res?.success) {
        toast.success(t.successTitle, {
          description: t.successText,
          icon: <Sparkles className="size-4 text-primary" />,
          duration: 6000,
        });
        formElement.reset();
        setDjOption("no");
        setErrors({});
      } else {
        throw new Error(t.errorGeneric);
      }
    } catch (err: any) {
      console.error("Booking submission error:", err);
      toast.error(t.errorGeneric, {
        description: err?.message || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "h-12 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0";
  const labelClass = "mb-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground";

  return (
    <form onSubmit={submit} noValidate className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {/* 1. full_name */}
      <label>
        <span className={labelClass}>{t.labels.fullName} *</span>
        <Input
          name="fullName"
          placeholder={t.placeholders.fullName}
          required
          className={`${fieldClass} ${errors.fullName ? "border-destructive" : ""}`}
        />
        {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
      </label>

      {/* 2. email */}
      <label>
        <span className={labelClass}>{t.labels.email} *</span>
        <Input
          name="email"
          type="email"
          placeholder={t.placeholders.email}
          required
          className={`${fieldClass} ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </label>

      {/* 3. phone */}
      <label>
        <span className={labelClass}>{t.labels.phone} *</span>
        <Input
          name="phone"
          type="tel"
          placeholder={t.placeholders.phone}
          required
          className={`${fieldClass} ${errors.phone ? "border-destructive" : ""}`}
        />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </label>

      {/* 4. event_date */}
      <label>
        <span className={labelClass}>{t.labels.eventDate} *</span>
        <Input
          name="eventDate"
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          required
          className={`${fieldClass} scheme-dark ${errors.eventDate ? "border-destructive" : ""}`}
        />
        {errors.eventDate && <p className="mt-1 text-xs text-destructive">{errors.eventDate}</p>}
      </label>

      {/* 5. event_type */}
      <label>
        <span className={labelClass}>{t.labels.eventType} *</span>
        <select
          name="eventType"
          defaultValue=""
          required
          className={`${fieldClass} w-full border-b text-sm text-foreground outline-none ${errors.eventType ? "border-destructive" : ""}`}
        >
          {t.eventTypes.map((type, index) => (
            <option key={type} value={index === 0 ? "" : type} className="bg-card" disabled={index === 0}>
              {type}
            </option>
          ))}
        </select>
        {errors.eventType && <p className="mt-1 text-xs text-destructive">{errors.eventType}</p>}
      </label>

      {/* 6. location */}
      <label>
        <span className={labelClass}>{t.labels.location} *</span>
        <select
          name="location"
          defaultValue=""
          required
          className={`${fieldClass} w-full border-b text-sm text-foreground outline-none ${errors.location ? "border-destructive" : ""}`}
        >
          {t.locations.map((loc, index) => (
            <option key={loc} value={index === 0 ? "" : loc} className="bg-card" disabled={index === 0}>
              {loc}
            </option>
          ))}
        </select>
        {errors.location && <p className="mt-1 text-xs text-destructive">{errors.location}</p>}
      </label>

      {/* 7. dj_option */}
      <fieldset className="sm:col-span-2">
        <legend className={labelClass}>{t.labels.djOption}</legend>
        <div className="flex flex-wrap gap-3">
          {(
            [
              ["no", t.djOptions.no],
              ["yes", t.djOptions.yes],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              onClick={() => setDjOption(value)}
              aria-pressed={djOption === value}
              className={`h-11 rounded-full border-border bg-transparent px-5 text-xs transition-all ${
                djOption === value
                  ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {djOption === value && <Check className="mr-1.5 size-4" />}
              {label}
            </Button>
          ))}
        </div>
      </fieldset>

      {/* 8. notes */}
      <label className="sm:col-span-2">
        <span className={labelClass}>{t.labels.notes}</span>
        <Textarea
          name="notes"
          placeholder={t.placeholders.notes}
          className="min-h-28 rounded-none border-x-0 border-t-0 border-border bg-transparent px-0 shadow-none focus-visible:border-primary focus-visible:ring-0"
        />
      </label>

      <div className="flex flex-col items-start justify-between gap-5 sm:col-span-2 sm:flex-row sm:items-center">
        <p className="max-w-sm text-xs leading-5 text-muted-foreground">{t.privacy}</p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-14 w-full rounded-full bg-primary px-8 text-xs uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary/90 disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {t.submitting}
            </>
          ) : (
            <>
              {t.submit}
              <ArrowUpRight className="ml-1 size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

const galleryImages = [
  {
    src: "/image/459508960_519771857452919_2743058968944676107_n.jpg",
    alt: "rythmoShow live performance στα κρούστα",
    tag: { gr: "Live Duo", en: "Live Duo" },
  },
  {
    src: "/image/716150755_122279139266019703_1209557680902171065_n.jpg",
    alt: "rythmoShow wedding party energy",
    tag: { gr: "Wedding Energy", en: "Wedding Energy" },
  },
  {
    src: "/image/726575363_18101262337902485_7557604638499687660_n.jpg",
    alt: "rythmoShow live percussion show",
    tag: { gr: "Drum Pulse", en: "Drum Pulse" },
  },
  {
    src: "/image/22227050-11ef-44f2-bd00-5dea7822df18.jpg",
    alt: "rythmoShow golden stage show",
    tag: { gr: "Golden Stage", en: "Golden Stage" },
  },
  {
    src: "/image/467398702_122197814198019703_7634919703419273548_n.jpg",
    alt: "rythmoShow live percussion set",
    tag: { gr: "Live Performance", en: "Live Performance" },
  },
  {
    src: "/image/475180154_122206914326019703_2221525614762974362_n.jpg",
    alt: "rythmoShow celebration vibe",
    tag: { gr: "Celebration", en: "Celebration" },
  },
  {
    src: "/image/5a35259b-6f94-4369-bbec-b76b82e0d0f2.jpg",
    alt: "rythmoShow percussion moments",
    tag: { gr: "Club & Party", en: "Club & Party" },
  },
  {
    src: "/image/890f3313-c9ac-4420-a0aa-d6eab8b541b9.jpg",
    alt: "rythmoShow dynamic beat",
    tag: { gr: "High Octane", en: "High Octane" },
  },
  {
    src: "/image/9381c09f-463a-474d-8e73-da01f6cd2379.jpg",
    alt: "rythmoShow live groove",
    tag: { gr: "Stage Groove", en: "Stage Groove" },
  },
  {
    src: "/image/b07faa96-9afa-426f-b819-1e5c559a2e54.jpg",
    alt: "rythmoShow wedding percussion",
    tag: { gr: "Party Anthem", en: "Party Anthem" },
  },
  {
    src: "/image/469465613_122199910358019703_980334791964389230_n.jpg",
    alt: "rythmoShow evening atmosphere",
    tag: { gr: "Atmosphere", en: "Atmosphere" },
  },
];

function GallerySection({ t, language }: { t: Copy; language: Language }) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const openLightbox = (index: number) => setActivePhoto(index);
  const closeLightbox = () => setActivePhoto(null);

  const prevPhoto = () => {
    setActivePhoto((current) => (current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length));
  };

  const nextPhoto = () => {
    setActivePhoto((current) => (current === null ? null : (current + 1) % galleryImages.length));
  };

  useEffect(() => {
    if (activePhoto === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto]);

  useEffect(() => {
    if (activePhoto !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePhoto]);

  return (
    <section id="gallery" className="border-t border-border bg-card/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              <Camera className="size-3.5" />
              {t.galleryKicker}
            </span>
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">{t.galleryTitle}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Gallery Responsive Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-border/70 bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_35px_rgba(234,179,8,0.18)]"
              onClick={() => openLightbox(idx)}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-square">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
                      0{idx + 1}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-primary/40 bg-primary/20 text-primary opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Maximize2 className="size-4" />
                    </span>
                  </div>
                  <div>
                    <span className="inline-block rounded border border-primary/40 bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-wider text-primary backdrop-blur-md">
                      {image.tag[language]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto !== null && galleryImages[activePhoto] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div
              className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {String(activePhoto + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                </span>
                <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] text-primary sm:inline-block">
                  {galleryImages[activePhoto]?.tag[language]}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="size-11 rounded-full border border-white/20 bg-background/50 text-foreground hover:bg-primary hover:text-primary-foreground"
                aria-label={t.galleryClose}
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Previous Photo Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full border border-white/20 bg-background/60 text-foreground backdrop-blur-md hover:border-primary hover:bg-primary hover:text-primary-foreground sm:left-8"
              aria-label={t.galleryPrev}
            >
              <ChevronLeft className="size-6" />
            </Button>

            {/* Next Photo Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full border border-white/20 bg-background/60 text-foreground backdrop-blur-md hover:border-primary hover:bg-primary hover:text-primary-foreground sm:right-8"
              aria-label={t.galleryNext}
            >
              <ChevronRight className="size-6" />
            </Button>

            {/* Main Lightbox Image */}
            <motion.div
              key={activePhoto}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[82vh] max-w-[92vw] overflow-hidden rounded-2xl border border-primary/30 shadow-[0_0_60px_rgba(234,179,8,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[activePhoto]?.src}
                alt={galleryImages[activePhoto]?.alt}
                className="max-h-[82vh] w-auto max-w-[92vw] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function RythmoShowApp() {
  const [language, setLanguage] = useState<Language>("gr");
  const t = useMemo(() => copy[language], [language]);
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65 },
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <BrandMark />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={["#about", "#services", "#experience", "#gallery", "#booking"][index]}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex justify-end">
            <LanguageToggle language={language} onChange={setLanguage} />
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative flex min-h-[92svh] items-end overflow-hidden pt-20">
          <img
            src={stageImage}
            alt="rythmoShow live percussion duo performing under golden stage lights"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="hero-glow absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="particle"
                style={{
                  left: `${5 + ((i * 19) % 92)}%`,
                  top: `${12 + ((i * 31) % 70)}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
          <motion.div {...reveal} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 lg:px-8 lg:pb-20">
            <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-primary sm:text-xs">
              <span className="h-px w-10 bg-primary" />
              {t.heroKicker}
            </p>
            <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] text-foreground">
              Live Percussion
              <br />
              <span className="italic text-primary">&amp; Party</span>
              <br />
              Experience
            </h1>
            <div className="mt-8 flex max-w-3xl flex-col gap-7 border-l border-primary/50 pl-5 sm:flex-row sm:items-center sm:justify-between sm:pl-7">
              <p className="max-w-xl text-base leading-7 text-foreground/75 sm:text-lg">{t.heroText}</p>
              <Button asChild size="lg" className="h-14 w-fit shrink-0 rounded-full bg-primary px-7 text-xs uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/90">
                <a href="#booking">
                  {t.booking}
                  <ArrowUpRight className="ml-1 size-4" />
                </a>
              </Button>
            </div>
            <a
              href="#about"
              className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-primary"
            >
              <ArrowDown className="size-4" />
              {t.scroll}
            </a>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="border-t border-border py-24 sm:py-32">
          <motion.div {...reveal} className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <p className="section-kicker">{t.aboutKicker}</p>
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div>
                  <strong className="font-display text-5xl text-primary">{t.statOne}</strong>
                  <p className="mt-2 text-xs text-muted-foreground">{t.statOneLabel}</p>
                </div>
                <div>
                  <strong className="font-display text-5xl text-primary">{t.statTwo}</strong>
                  <p className="mt-2 text-xs text-muted-foreground">{t.statTwoLabel}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl leading-tight sm:text-6xl">{t.aboutTitle}</h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{t.aboutText}</p>
            </div>
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="border-y border-border bg-card/50 py-24 sm:py-32">
          <motion.div {...reveal} className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:px-8">
            <div>
              <span className="mb-8 grid size-14 place-items-center rounded-full border border-primary/40 text-primary">
                <Sparkles className="size-5" />
              </span>
              <p className="section-kicker">{t.serviceKicker}</p>
              <h2 className="mt-5 font-display text-5xl sm:text-7xl">{t.serviceTitle}</h2>
            </div>
            <div className="lg:border-l lg:border-border lg:pl-14">
              <p className="text-lg leading-8 text-muted-foreground">{t.serviceText}</p>
              <ul className="mt-9 space-y-4">
                {t.servicePoints.map((point) => (
                  <li key={point} className="flex items-center gap-4 border-b border-border pb-4 text-sm">
                    <Check className="size-4 text-primary shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-24 sm:py-32">
          <motion.div {...reveal} className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="section-kicker">{t.experienceKicker}</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">{t.experienceTitle}</h2>
            <div className="mt-12">
              <ExperiencePlayer t={t} />
            </div>
          </motion.div>
        </section>

        {/* GALLERY SECTION */}
        <GallerySection t={t} language={language} />

        {/* BOOKING SECTION */}
        <section id="booking" className="relative border-t border-border bg-card/50 py-24 sm:py-32">
          <div className="booking-glow absolute inset-0" aria-hidden="true" />
          <motion.div {...reveal} className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
            <div>
              <p className="section-kicker">{t.bookingKicker}</p>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">{t.bookingTitle}</h2>
              <p className="mt-7 max-w-md leading-7 text-muted-foreground">{t.bookingText}</p>
            </div>
            <BookingForm t={t} language={language} />
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center lg:px-8">
          <div>
            <BrandMark />
            <p className="mt-4 text-xs text-muted-foreground">{t.footerLine}</p>
          </div>
          <div className="flex justify-start gap-3 sm:justify-center">
            <Button asChild variant="outline" size="icon" className="size-11 rounded-full border-border bg-transparent hover:border-primary hover:text-primary">
              <a href={BRAND_INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="size-11 rounded-full border-border bg-transparent hover:border-primary hover:text-primary">
              <a href={BRAND_FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="size-11 rounded-full border-border bg-transparent hover:border-primary hover:text-primary">
              <a href={`tel:${BRAND_PHONE}`} aria-label="Call rythmoShow">
                <Phone className="size-4" />
              </a>
            </Button>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground sm:text-right">
            <div>
              <a href={`tel:${BRAND_PHONE}`} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Phone className="size-4" />
                {BRAND_PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <a href={`mailto:${BRAND_EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="size-4" />
                {BRAND_EMAIL}
              </a>
            </div>
            <p className="flex items-center gap-2 sm:justify-end">
              <MapPin className="size-4" />
              {t.availability}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
