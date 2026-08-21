import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Wrench, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import imgRacks from "@/assets/servicios-ventajas.webp";

const advantages = [
  {
    icon: ShieldCheck,
    titleKey: "adv1_title",
    descKey: "adv1_desc",
  },
  {
    icon: Wrench,
    titleKey: "adv2_title",
    descKey: "adv2_desc",
  },
  {
    icon: TrendingUp,
    titleKey: "adv3_title",
    descKey: "adv3_desc",
  },
];

function AdvantageCard({ advantage, index }: { advantage: typeof advantages[0]; index: number }) {
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
          <rect
            x="0.5" y="0.5"
            width="calc(100% - 1px)" height="calc(100% - 1px)"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray={perimeter}
            strokeDashoffset={isHovered ? 0 : perimeter}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
      )}
      <advantage.icon size={40} className="text-primary mb-6 relative z-[2]" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl tracking-wide text-foreground mb-3 relative z-[2]">
        {t(`services.mission.${advantage.titleKey}`)}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 relative z-[2]">
        {t(`services.mission.${advantage.descKey}`)}
      </p>
    </motion.div>
  );
}

export default function MissionStatsSection() {
  const { t } = useTranslation();
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-brand section-padding">
        {/* Top: heading + image */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-16 lg:mb-20">
          <div className="lg:max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-sm text-primary font-semibold uppercase tracking-wider"
            >
              {t('services.mission.subtitle')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wide text-foreground mt-6 leading-[0.95] uppercase"
            >
              {t('services.mission.title')}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:w-[400px] flex-shrink-0"
          >
            <img
              src={imgRacks}
              alt="Instalación industrial"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* Advantage cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <AdvantageCard key={adv.titleKey} advantage={adv} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
