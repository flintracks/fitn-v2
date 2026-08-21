import { Shield, Cog, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import benefit1Img from "@/assets/gestion-integral-de-proyectos.webp";
import benefit2Img from "@/assets/ingenieria-estructural-certificada.webp";
import benefit3Img from "@/assets/soluciones-personalizadas.webp";

// Only text items for mobile carousel
const mobileBenefits = [
  {
    icon: Shield,
    titleKey: "b1_title_full",
    descKey: "b1_desc",
    image: benefit1Img,
  },
  {
    icon: Cog,
    titleKey: "b2_title_full",
    descKey: "b2_desc",
    image: benefit2Img,
  },
  {
    icon: TrendingUp,
    titleKey: "b3_title_full",
    descKey: "b3_desc",
    image: benefit3Img,
  },
];

export default function BenefitsSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[index] as HTMLElement;
    if (child) {
      container.scrollTo({ left: child.offsetLeft - (container.offsetWidth - child.offsetWidth) / 2, behavior: "smooth" });
    }
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % mobileBenefits.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, scrollToIndex]);

  // Track scroll position to update dots
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    const container = scrollRef.current;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const childWidth = (container.children[0] as HTMLElement)?.offsetWidth || 1;
      const gap = 16;
      const index = Math.round(scrollLeft / (childWidth + gap));
      setActiveIndex(Math.min(index, mobileBenefits.length - 1));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="py-12 bg-background overflow-hidden">
        <div className="px-6 mb-8">
          <h2 className="font-heading text-3xl tracking-wide text-foreground leading-[0.95] text-center">
            {t('home.benefits.title_p1')}
            <br />
            {t('home.benefits.title_p2')}
          </h2>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {mobileBenefits.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[80vw] snap-center flex flex-col gap-4"
            >
              <img
                src={item.image}
                alt={t(`home.benefits.${item.titleKey}`)}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="flex flex-col items-center text-center gap-2">
                <item.icon size={28} className="text-foreground" strokeWidth={1} />
                <h3 className="font-heading text-lg tracking-wide text-foreground">
                  {t(`home.benefits.${item.titleKey}`)}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {t(`home.benefits.${item.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {mobileBenefits.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); scrollToIndex(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
              }`}
              aria-label={`Ir al beneficio ${i + 1}`}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen max-h-[100vh] bg-background flex flex-col justify-center">
      <div className="container-brand section-padding flex flex-col h-full max-h-[100vh] justify-center gap-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl tracking-wide text-foreground leading-[0.95]">
            {t('home.benefits.title_p1')}
            <br />
            {t('home.benefits.title_p2')}
          </h2>
        </motion.div>

        {/* Checkerboard 3x2 grid */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6 flex-1 min-h-0">
          {/* Row 1: text - image - text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center gap-3 px-4"
          >
            <Shield size={32} className="text-foreground" strokeWidth={1} />
            <h3 className="font-heading text-base lg:text-lg xl:text-xl tracking-wide text-foreground leading-tight">
              {t('home.benefits.b1_title_p1')}
              <br />
              {t('home.benefits.b1_title_p2')}
            </h3>
            <p className="font-body text-xs lg:text-sm text-muted-foreground leading-relaxed">
              {t('home.benefits.b1_desc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden"
          >
            <img src={benefit1Img} alt="Instalación de racks industriales" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center gap-3 px-4"
          >
            <Cog size={32} className="text-foreground" strokeWidth={1} />
            <h3 className="font-heading text-base lg:text-lg xl:text-xl tracking-wide text-foreground leading-tight">
              {t('home.benefits.b2_title_p1')}
              <br />
              {t('home.benefits.b2_title_p2')}
            </h3>
            <p className="font-body text-xs lg:text-sm text-muted-foreground leading-relaxed">
              {t('home.benefits.b2_desc')}
            </p>
          </motion.div>

          {/* Row 2: image - text - image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden"
          >
            <img src={benefit3Img} alt="Detalle de estructura metálica" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center gap-3 px-4"
          >
            <TrendingUp size={32} className="text-foreground" strokeWidth={1} />
            <h3 className="font-heading text-base lg:text-lg xl:text-xl tracking-wide text-foreground leading-tight">
              {t('home.benefits.b3_title_p1')}
              <br />
              {t('home.benefits.b3_title_p2')}
            </h3>
            <p className="font-body text-xs lg:text-sm text-muted-foreground leading-relaxed">
              {t('home.benefits.b3_desc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-hidden"
          >
            <img src={benefit2Img} alt="Almacén con racks organizados" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
