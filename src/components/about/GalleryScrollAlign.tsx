import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./GalleryScrollAlign.css";

import aboutGallery1 from "@/assets/about-gallery-1.webp";
import aboutGallery2 from "@/assets/about-gallery-2.webp";
import aboutGallery3 from "@/assets/about-gallery-3.webp";
import aboutGallery4 from "@/assets/about-gallery-4.webp";
import aboutGallery5 from "@/assets/about-gallery-5.webp";
import aboutGallery6 from "@/assets/about-gallery-6.webp";
import aboutGallery7 from "@/assets/about-gallery-7.webp";
import aboutGallery8 from "@/assets/about-gallery-8.webp";

const galleryImages = [
  { src: aboutGallery1, altKey: "img1" },
  { src: aboutGallery2, altKey: "img2" },
  { src: aboutGallery3, altKey: "img3" },
  { src: aboutGallery4, altKey: "img4" },
  { src: aboutGallery5, altKey: "img5" },
  { src: aboutGallery6, altKey: "img6" },
  { src: aboutGallery7, altKey: "img7" },
  { src: aboutGallery8, altKey: "img8" },
];

const initialOffsets = [0, 120, 60, 160, 80, 140, 40, 100];

/* ── Desktop card with scrub ── */
function GalleryCard({
  img,
  index,
  offset,
  scrollYProgress,
  onOpen,
}: {
  img: { src: string; alt: string };
  index: number;
  offset: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  onOpen: (i: number) => void;
}) {
  const y = useTransform(scrollYProgress, [0, 0.7], [offset, 0]);

  return (
    <motion.div className="galleryCard" style={{ y }} onClick={() => onOpen(index)}>
      <img src={img.src} alt={img.alt} loading="lazy" />
    </motion.div>
  );
}

/* ── Lightbox ── */
function Lightbox({
  images,
  index,
  onClose,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="lightboxOverlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="lightboxContent" onClick={(e) => e.stopPropagation()}>
        <button className="lightboxClose" onClick={onClose} aria-label="Cerrar">✕</button>
        <button className="lightboxNav lightboxPrev" onClick={prev} aria-label="Anterior">‹</button>
        <button className="lightboxNav lightboxNext" onClick={next} aria-label="Siguiente">›</button>
        <img src={images[current].src} alt={images[current].alt} />
      </div>
    </motion.div>
  );
}

/* ── Mobile carousel ── */
function MobileCarousel({ images, onOpen }: { images: { src: string; alt: string }[]; onOpen: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i] as HTMLElement;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - 16, behavior: "smooth" });
    }
  }, []);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % images.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [images.length, scrollToIndex]);

  // Track scroll position for dots
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const scrollLeft = track.scrollLeft;
      const slideWidth = (track.children[0] as HTMLElement)?.offsetWidth || 1;
      const idx = Math.round(scrollLeft / (slideWidth + 16));
      setActiveIndex(Math.min(idx, images.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [images.length]);

  const goTo = (i: number) => {
    clearInterval(autoplayRef.current);
    setActiveIndex(i);
    scrollToIndex(i);
    // Restart autoplay
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % images.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
  };

  return (
    <div className="carouselWrapper">
      <div className="carouselTrack" ref={trackRef}>
        {images.map((img, i) => (
          <div key={i} className="carouselSlide" onClick={() => onOpen(i)}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="carouselDots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carouselDot${i === activeIndex ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function GalleryScrollAlign() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const localizedImages = galleryImages.map(img => ({
    src: img.src,
    alt: t(`about.gallery.${img.altKey}`)
  }));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  return (
    <>
      <div className="gallerySection" ref={sectionRef}>
        <div className="galleryContainer">
          {/* Desktop/Tablet grid */}
          <div className="galleryGrid">
            {localizedImages.map((img, i) => (
              <GalleryCard
                key={i}
                img={img}
                index={i}
                offset={initialOffsets[i % initialOffsets.length]}
                scrollYProgress={scrollYProgress}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>

          {/* Mobile carousel */}
          <MobileCarousel images={localizedImages} onOpen={setLightboxIndex} />
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={localizedImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
