import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, Lightbulb, Handshake, Gauge, ShieldCheck } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import MissionGallerySection from "@/components/about/MissionGallerySection";
import GalleryScrollAlign from "@/components/about/GalleryScrollAlign";
import heroImg from "@/assets/header-nosotros-v2.webp";
import ctaBgImg from "@/assets/inicia-proyecto.webp";

const values = [
  { icon: ShieldCheck, titleKey: "v1_title", descKey: "v1_desc" },
  { icon: Lightbulb, titleKey: "v2_title", descKey: "v2_desc" },
  { icon: Handshake, titleKey: "v3_title", descKey: "v3_desc" },
  { icon: Gauge, titleKey: "v4_title", descKey: "v4_desc" },
  { icon: Target, titleKey: "v5_title", descKey: "v5_desc" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ── Value Card (replicates ServicesSection card style) ── */
function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [perimeter, setPerimeter] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;
    const update = () => {
      const { width, height } = cardRef.current!.getBoundingClientRect();
      setPerimeter(2 * (width + height));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-card p-8 lg:p-10 flex flex-col h-full border border-border"
      style={{
        boxShadow: isHovered ? "0px 5px 10px rgba(0,0,0,0.1)" : "0px 0px 0px rgba(0,0,0,0)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {perimeter > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
          <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" fill="none"
            stroke="hsl(var(--primary))" strokeWidth="2"
            strokeDasharray={perimeter} strokeDashoffset={isHovered ? 0 : perimeter}
            style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
      )}
      <value.icon size={40} className="text-primary mb-6 relative z-[2]" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl tracking-wide text-foreground mb-3 relative z-[2]">
        {t(`about.values.${value.titleKey}`)}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 relative z-[2]">
        {t(`about.values.${value.descKey}`)}
      </p>
    </motion.div>
  );
}

/* ── Values Section (desktop grid + mobile carousel) ── */
function ValuesSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const allItems = values.length + 1; // +1 for CTA card

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[index] as HTMLElement;
    if (child) {
      scrollRef.current.scrollTo({
        left: child.offsetLeft - (scrollRef.current.offsetWidth - child.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % allItems;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, scrollToIndex, allItems]);

  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    const container = scrollRef.current;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const childWidth = (container.children[0] as HTMLElement)?.offsetWidth || 1;
      const gap = 16;
      const index = Math.round(scrollLeft / (childWidth + gap));
      setActiveIndex(Math.min(index, allItems - 1));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile, allItems]);

  const ctaCard = (mobile?: boolean) => (
    <div
      className={`${mobile ? "flex-shrink-0 w-[80vw] snap-center" : ""} p-8 flex flex-col justify-between border border-primary bg-primary`}
      style={{ minHeight: mobile ? "320px" : undefined }}
    >
      <div>
        <h3 className="font-heading text-2xl tracking-wide text-primary-foreground mb-3">
          {t('about.values.cta_title')}
        </h3>
        <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
          {t('about.values.cta_desc')}
        </p>
      </div>
      <Link
        to="/services"
        className="inline-flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground bg-transparent font-body font-semibold px-6 py-3 text-sm uppercase tracking-wider hover:bg-primary-foreground hover:text-primary transition-colors duration-200 self-start mt-6"
      >
        {t('about.values.cta_btn')}
        <ArrowRight size={14} />
      </Link>
    </div>
  );

  if (isMobile) {
    return (
      <section className="py-16 overflow-hidden" style={{ backgroundColor: '#f7f7f7' }}>
        <div className="px-6 mb-8 text-center">
          <span className="font-body text-sm text-primary font-semibold uppercase tracking-wider">{t('about.values.subtitle')}</span>
          <h2 className="font-heading text-3xl tracking-wide text-foreground mt-3">{t('about.values.title')}</h2>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
          {values.map((value) => (
            <div key={value.titleKey} className="flex-shrink-0 w-[80vw] snap-center bg-card border border-border p-6 flex flex-col" style={{ minHeight: "320px" }}>
              <value.icon size={36} className="text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-xl tracking-wide text-foreground mb-2">{t(`about.values.${value.titleKey}`)}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">{t(`about.values.${value.descKey}`)}</p>
            </div>
          ))}
          {ctaCard(true)}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: allItems }).map((_, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); scrollToIndex(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
              aria-label={`Ir al valor ${i + 1}`} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="container-brand section-padding">
        <div className="text-center mb-16">
          <span className="font-body text-sm text-primary font-semibold uppercase tracking-wider">{t('about.values.subtitle')}</span>
          <h2 className="font-heading text-5xl md:text-6xl tracking-wide text-foreground mt-3">{t('about.values.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <ValueCard key={value.titleKey} value={value} index={i} />
          ))}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: values.length * 0.1 }}>
            {ctaCard()}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background image */}
        <motion.img
          src={heroImg}
          alt="Almacén industrial"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-iron/70" />

        {/* Large watermark text — desktop only, aligned to top with 10% margin */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 hidden md:flex items-start justify-center pointer-events-none select-none"
          style={{ paddingTop: '10%' }}
        >
          <span
            className="font-heading text-[14vw] tracking-wider leading-none max-w-full overflow-hidden"
            style={{
              background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t('about.hero.bg_text')}
          </span>
        </motion.div>

        {/* Content */}
        <div className="relative container-brand section-padding pb-16 lg:pb-20 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            {/* Mobile subtitle */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:hidden font-heading text-sm tracking-[0.3em] text-primary uppercase"
            >
              {t('about.hero.mobile_subtitle')}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-iron-foreground leading-[0.95] max-w-3xl"
            >
              {t('about.hero.title_p1')}
              <br />
              <span className="text-primary">{t('about.hero.title_p2')}</span> {t('about.hero.title_p3')}
            </motion.h1>

            {/* Right column: description + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-5 lg:max-w-sm lg:pb-1"
            >
              <p className="font-body text-iron-foreground/70 text-sm leading-relaxed">
                {t('about.hero.description')}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-8 py-4 text-sm uppercase tracking-wider hover:bg-red-deep transition-colors duration-200 w-fit"
              >
                {t("about.cta.btn")}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <MissionGallerySection />
      <GalleryScrollAlign />

      <ValuesSection />

      {/* CTA Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={ctaBgImg}
          alt="Proyecto de almacén"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-heading text-[12vw] lg:text-[10vw] text-white/[0.07] uppercase tracking-wider leading-none">
            {t('about.cta.bg_text')}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 container-brand section-padding text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide max-w-4xl mx-auto leading-[0.95]"
          >
            {t('about.cta.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-white/70 text-base mt-6 max-w-lg mx-auto"
          >
            {t('about.cta.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-10 py-4 text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors duration-200"
            >
              {t('about.cta.btn')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
