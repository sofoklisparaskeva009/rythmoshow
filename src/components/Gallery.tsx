import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type GalleryLanguage = "gr" | "en";

export interface GalleryProps {
  language?: GalleryLanguage;
  kicker?: string;
  title?: string;
  subtitle?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export const galleryImages = [
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

export default function Gallery({
  language = "gr",
  kicker,
  title,
  subtitle,
  closeLabel,
  prevLabel,
  nextLabel,
}: GalleryProps) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const defaultKicker = "Visual Showcase · Luxury Moments";
  const defaultTitle = language === "gr" ? "Φωτογραφικό Υλικό & Στιγμιότυπα" : "Photo Gallery & Live Moments";
  const defaultSubtitle =
    language === "gr"
      ? "Απολαύστε στιγμές γεμάτες ενέργεια, ρυθμό και πάθος από live εμφανίσεις του rythmoShow σε γάμους, premium parties και exclusive events στην Κύπρο."
      : "Explore electrifying moments, vibrant pulse, and luxury performances by rythmoShow across weddings, premium parties, and exclusive events in Cyprus.";

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
              {kicker ?? defaultKicker}
            </span>
            <h2 className="font-display text-4xl leading-tight sm:text-6xl">{title ?? defaultTitle}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle ?? defaultSubtitle}
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
                aria-label={closeLabel ?? "Close"}
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
              aria-label={prevLabel ?? "Previous"}
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
              aria-label={nextLabel ?? "Next"}
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
