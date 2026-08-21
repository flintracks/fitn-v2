import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import coverageHero from "@/assets/cobertura-header-v2.webp";
import MexicoMapSection from "@/components/coverage/MexicoMapSection";

const coverageFaqsKeys = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
];

const regions = [
  { nameKey: "north", cities: ["Monterrey", "Chihuahua", "Tijuana", "Saltillo", "Hermosillo"] },
  { nameKey: "center", cities: ["CDMX", "Querétaro", "Puebla", "Toluca", "Aguascalientes"] },
  { nameKey: "bajio", cities: ["León", "Guadalajara", "San Luis Potosí", "Irapuato", "Celaya"] },
  { nameKey: "south", cities: ["Mérida", "Villahermosa", "Oaxaca", "Veracruz", "Cancún"] },
];

export default function Coverage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        <motion.img
          src={coverageHero}
          alt="Cobertura Flint Racks"
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
            {t('coverage.hero.bg_text')}
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
              {t('coverage.hero.mobile_subtitle')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-iron-foreground leading-[0.95] max-w-3xl"
            >
              {t('coverage.hero.title_p1')} <span className="text-primary">{t('coverage.hero.title_p2')}</span>{t('coverage.hero.title_p3')}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-5 lg:max-w-sm lg:pb-1"
            >
              <p className="font-body text-iron-foreground/70 text-sm leading-relaxed">
                {t('coverage.hero.description')}
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

      {/* Cubrimos gran parte del país */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-brand section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text + Stats */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase text-foreground leading-tight"
              >
                {t('coverage.stats.title')}
              </motion.h2>
              <div className="w-20 h-1 bg-primary mt-6 mb-8" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-body text-muted-foreground text-lg leading-relaxed mb-10"
              >
                {t('coverage.stats.desc')}
              </motion.p>

              {/* Stats */}
              <div className="flex gap-12">
                <div>
                  <span className="font-heading text-5xl text-primary">25+</span>
                  <p className="font-body text-muted-foreground mt-1">{t('coverage.stats.states')}</p>
                </div>
                <div>
                  <span className="font-heading text-5xl text-primary">50+</span>
                  <p className="font-body text-muted-foreground mt-1">{t('coverage.stats.cities')}</p>
                </div>
              </div>
            </div>

            {/* Right: Regions grid */}
            <div className="grid grid-cols-2 gap-6">
              {regions.map((region, i) => (
                <motion.div
                  key={region.nameKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-heading text-xl uppercase text-foreground">{t(`coverage.regions.${region.nameKey}`)}</h3>
                  </div>
                  <ul className="space-y-2">
                    {region.cities.map((city) => (
                      <li key={city} className="font-body text-muted-foreground text-sm">
                        {city}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map - hidden for now */}
      {/* <MexicoMapSection /> */}

      {/* FAQs + CTA */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-brand section-padding">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl uppercase text-foreground text-center mb-16"
          >
            {t('coverage.faqs.title')}
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {coverageFaqsKeys.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center gap-6 py-6 text-left group"
                  >
                    <span
                      className={`font-heading text-xl transition-colors duration-300 ${
                        isOpen ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-heading text-lg md:text-xl uppercase flex-1 transition-colors duration-300 ${
                        isOpen ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {t(`coverage.faqs.${faq.qKey}`)}
                    </span>
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className="w-4 h-[2px] bg-foreground" />
                      <div
                        className={`absolute w-4 h-[2px] bg-foreground transition-transform duration-300 ${
                          isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-body text-muted-foreground pb-6 pl-12">
                          {t(`coverage.faqs.${faq.aKey}`)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress line */}
                  <div className="h-[1px] bg-border">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: isOpen ? "100%" : "0%" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA FAQs */}
          <div className="text-center mt-12">
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-8 py-4 hover:bg-red-deep transition-colors duration-200 uppercase tracking-wide"
            >
              {t('coverage.faqs.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
