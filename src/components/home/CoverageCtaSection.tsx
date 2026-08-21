import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import coverageHero from "@/assets/cobertura-home.webp";

export default function CoverageCtaSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={coverageHero}
        alt="Cobertura nacional"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/80" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-heading text-[12vw] lg:text-[10vw] text-white/[0.07] uppercase tracking-wider leading-none">
          {t('home.coverage.bg_text')}
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
          {t('home.coverage.title')}
        </motion.h2>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-0 mt-12"
        >
          <div className="text-center px-10 lg:px-16">
            <span className="font-heading text-4xl md:text-5xl text-white">{t('home.coverage.stat1_value')}</span>
            <p className="font-body text-sm text-white/70 mt-1">{t('home.coverage.stat1_desc')}</p>
          </div>
          <div className="w-px h-16 bg-white/30" />
          <div className="text-center px-10 lg:px-16">
            <span className="font-heading text-4xl md:text-5xl text-white">{t('home.coverage.stat2_value')}</span>
            <p className="font-body text-sm text-white/70 mt-1">{t('home.coverage.stat2_desc')}</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12"
        >
          <Link
            to="/cobertura"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-10 py-4 text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors duration-200"
          >
            {t('home.coverage.cta')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
