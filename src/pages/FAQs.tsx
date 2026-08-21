import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import heroImg from "@/assets/faq-header.webp";

interface FAQCategory {
  titleKey: string;
  faqs: { qKey: string; aKey: string }[];
}

const categories: FAQCategory[] = [
  {
    titleKey: "services.title",
    faqs: [
      { qKey: "services.q1", aKey: "services.a1" },
      { qKey: "services.q2", aKey: "services.a2" },
      { qKey: "services.q3", aKey: "services.a3" },
      { qKey: "services.q4", aKey: "services.a4" },
      { qKey: "services.q5", aKey: "services.a5" },
    ],
  },
  {
    titleKey: "coverage.title",
    faqs: [
      { qKey: "coverage.q1", aKey: "coverage.a1" },
      { qKey: "coverage.q2", aKey: "coverage.a2" },
      { qKey: "coverage.q3", aKey: "coverage.a3" },
      { qKey: "coverage.q4", aKey: "coverage.a4" },
      { qKey: "coverage.q5", aKey: "coverage.a5" },
    ],
  },
  {
    titleKey: "contact.title",
    faqs: [
      { qKey: "contact.q1", aKey: "contact.a1" },
      { qKey: "contact.q2", aKey: "contact.a2" },
      { qKey: "contact.q3", aKey: "contact.a3" },
      { qKey: "contact.q4", aKey: "contact.a4" },
      { qKey: "contact.q5", aKey: "contact.a5" },
    ],
  },
  {
    titleKey: "delivery.title",
    faqs: [
      { qKey: "delivery.q1", aKey: "delivery.a1" },
      { qKey: "delivery.q2", aKey: "delivery.a2" },
      { qKey: "delivery.q3", aKey: "delivery.a3" },
      { qKey: "delivery.q4", aKey: "delivery.a4" },
      { qKey: "delivery.q5", aKey: "delivery.a5" },
    ],
  },
];

function FAQCategoryBlock({ category, globalOffset }: { category: FAQCategory; globalOffset: number }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <div>
      {/* Category title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide text-foreground leading-[0.95]">
          {t(`faq_page.categories.${category.titleKey}`)}
        </h3>
      </motion.div>

      {/* FAQ items */}
      <div>
        {category.faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          const num = globalOffset + i + 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left py-6 flex items-center gap-6 group cursor-pointer"
              >
                <span
                  className={`font-heading text-lg tracking-wide transition-colors duration-300 ${
                    isOpen ? "text-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {String(num).padStart(2, "0")}
                </span>
                <span
                  className={`font-heading text-xl md:text-2xl lg:text-3xl tracking-wide uppercase flex-1 transition-colors duration-300 ${
                    isOpen ? "text-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {t(`faq_page.categories.${faq.qKey}`)}
                </span>
                <div className="flex-shrink-0">
                  {isOpen ? (
                    <Minus size={24} className="text-foreground" />
                  ) : (
                    <Plus size={24} className="text-muted-foreground/50" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed pb-6 pl-12 lg:pl-16 pr-8">
                      {t(`faq_page.categories.${faq.aKey}`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress line */}
              <div className="h-px bg-border relative">
                <div
                  className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
                  style={{ width: isOpen ? "100%" : "0%" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function FAQs() {
  const { t } = useTranslation();
  let globalOffset = 0;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        <motion.img
          src={heroImg}
          alt="FAQ Flint Racks"
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
            className="font-heading text-[16vw] tracking-wider leading-none max-w-full overflow-hidden"
            style={{
              background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t('faq_page.hero.bg_text')}
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
              {t('faq_page.hero.mobile_subtitle')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-iron-foreground leading-[0.95] max-w-3xl"
            >
              {t('faq_page.hero.title_p1')}
              <br />
              <span className="text-primary">{t('faq_page.hero.title_p2')}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-5 lg:max-w-sm lg:pb-1"
            >
              <p className="font-body text-iron-foreground/70 text-sm leading-relaxed">
                {t('faq_page.hero.description')}
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

      {/* FAQs by category */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-brand section-padding">
          <div className="max-w-4xl mx-auto flex flex-col gap-20 lg:gap-28">
            {categories.map((category, idx) => {
              const offset = globalOffset;
              globalOffset += category.faqs.length;
              return (
                <FAQCategoryBlock
                  key={idx}
                  category={category}
                  globalOffset={offset}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Proyecto de almacén"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-heading text-[12vw] lg:text-[10vw] text-white/[0.07] uppercase tracking-wider leading-none">
            {t('faq_page.cta.bg_text')}
          </span>
        </div>

        <div className="relative z-10 container-brand section-padding text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide max-w-4xl mx-auto leading-[0.95]"
          >
            {t('faq_page.cta.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-white/70 text-base mt-6 max-w-lg mx-auto"
          >
            {t('faq_page.cta.description')}
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
              {t('faq_page.cta.btn')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
