import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import industryLogistics from "@/assets/home-industry-logistica-distribucion.png";
import industryManufacturing from "@/assets/home-industry-manufactura.png";
import industryRetail from "@/assets/home-industry-retail-comercio.png";
import industryPharma from "@/assets/home-industry-farmaceutica.png";
import industryFood from "@/assets/home-industry-alimentos-bebidas.png";
import industryAutomotive from "@/assets/home-industry-automotriz.png";

const industries = [
  { nameKey: "ind1", image: industryLogistics },
  { nameKey: "ind2", image: industryManufacturing },
  { nameKey: "ind3", image: industryRetail },
  { nameKey: "ind4", image: industryPharma },
  { nameKey: "ind5", image: industryFood },
  { nameKey: "ind6", image: industryAutomotive },
];

export default function IndustriesSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container-brand section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-wide text-foreground text-center mb-16 leading-[0.95]"
        >
          {t('home.industries.title_p1')}
          <br />
          <span className="text-primary">{t('home.industries.title_p2')}</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Industries list */}
          <div ref={listRef} className="w-full lg:w-1/2">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.nameKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onMouseEnter={() => setActiveIndex(i)}
                className="group cursor-pointer"
              >
                <div
                  className={`flex items-center gap-4 py-5 lg:py-6 transition-colors duration-300 ${
                    activeIndex === i ? "bg-primary" : "bg-transparent"
                  }`}
                  style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                >
                  {/* Arrow icon */}
                  <div className="w-7 overflow-hidden hidden lg:block">
                    <ArrowUpRight
                      size={24}
                      className={`transition-all duration-300 ${
                        activeIndex === i
                          ? "translate-x-0 opacity-100 text-primary-foreground"
                          : "-translate-x-full opacity-0 text-muted-foreground"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-heading text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase transition-colors duration-300 ${
                      activeIndex === i ? "text-primary-foreground" : "text-muted-foreground/50"
                    }`}
                  >
                    {t(`home.industries.${industry.nameKey}`)}
                  </span>
                </div>
                {/* Progress line */}
                <div className="h-px bg-border relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
                    style={{ width: activeIndex === i ? "100%" : "0%" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image area — height matches the list */}
          <div className="w-full lg:w-1/2 relative overflow-hidden lg:self-stretch">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={industries[activeIndex].image}
                alt={t(`home.industries.${industries[activeIndex].nameKey}`)}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
