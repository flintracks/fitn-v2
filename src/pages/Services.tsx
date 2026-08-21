import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Warehouse, Layers, Truck, Wrench, BarChart3, Ruler } from "lucide-react";
import { useTranslation } from "react-i18next";

import MissionStatsSection from "@/components/services/MissionStatsSection";
import ServiceShowcaseSection from "@/components/services/ServiceShowcaseSection";
import ExpertiseSection from "@/components/services/ExpertiseSection";
import ProductShowcaseSection from "@/components/services/ProductShowcaseSection";
import ClientsMarqueeSection from "@/components/services/ClientsMarqueeSection";
import servicesImg from "@/assets/servicios-hero.webp";
import heroImg from "@/assets/hero-warehouse.jpg";
import processImg from "@/assets/servicios-nuestro-proceso.webp";
import ctaBgImg from "@/assets/inicia-proyecto.webp";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  const { t } = useTranslation();
  
  const processSteps = [
    { step: "01", key: "step1" },
    { step: "02", key: "step2" },
    { step: "03", key: "step3" },
    { step: "04", key: "step4" },
    { step: "05", key: "step5" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        <motion.img
          src={servicesImg}
          alt="Racks industriales"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-iron/70" />

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
            {t('services.hero.bg_text')}
          </span>
        </motion.div>

        <div className="relative container-brand section-padding pb-16 lg:pb-20 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:hidden font-heading text-sm tracking-[0.3em] text-primary uppercase"
            >
              {t('services.hero.mobile_subtitle')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-iron-foreground leading-[0.95] max-w-3xl"
            >
              {t('services.hero.title_p1')}
              <br />
              <span className="text-primary">{t('services.hero.title_p2')}</span> {t('services.hero.title_p3')}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-5 lg:max-w-sm lg:pb-1"
            >
              <p className="font-body text-iron-foreground/70 text-sm leading-relaxed">
                {t('services.hero.description')}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-8 py-4 text-sm uppercase tracking-wider hover:bg-red-deep transition-colors duration-200 w-fit"
              >
                {t("services.cta.btn")}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <MissionStatsSection />

      <ServiceShowcaseSection />

      <ExpertiseSection />

      <ProductShowcaseSection />

      <ClientsMarqueeSection />

      {/* Process */}
      <section className="py-20 lg:py-28 bg-iron">
        <div className="container-brand section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-sm text-primary font-semibold uppercase tracking-wider">
                {t('services.process.subtitle')}
              </span>
              <h2 className="font-heading text-5xl tracking-wide text-iron-foreground mt-3 leading-[0.95]">
                {t('services.process.title')}
              </h2>
              <div className="flex flex-col gap-8 mt-10">
                {processSteps.map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span className="font-heading text-4xl text-primary">{item.step}</span>
                    <div>
                      <h3 className="font-heading text-xl tracking-wide text-iron-foreground">
                        {t(`services.process.steps.${item.key}.title`).toUpperCase()}
                      </h3>
                      <p className="font-body text-sm text-iron-foreground/60 mt-1">{t(`services.process.steps.${item.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden">
              <motion.img
                src={processImg}
                alt="Proyecto de almacén"
                className="w-full aspect-[3/4] object-cover"
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.2 }}
                viewport={{ once: true }}
                transition={{ duration: 20, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Reference style */}
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
            {t('services.cta.bg_text')}
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
            {t('services.cta.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-white/70 text-base mt-6 max-w-lg mx-auto"
          >
            {t('services.cta.description')}
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
              {t('services.cta.btn')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
