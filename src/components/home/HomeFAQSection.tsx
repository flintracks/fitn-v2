import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const faqs = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
  { qKey: "q5", aKey: "a5" },
  { qKey: "q6", aKey: "a6" },
  { qKey: "q7", aKey: "a7" },
];

export default function HomeFAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-brand section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-wide text-foreground text-center mb-6 leading-[0.95]"
        >
          {t('home.faq.title_p1')}
          <br />
          {t('home.faq.title_p2')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-center mb-16"
        >
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-8 py-4 text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors duration-200"
          >
            {t('home.faq.cta')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
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
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-heading text-xl md:text-2xl lg:text-3xl tracking-wide uppercase flex-1 transition-colors duration-300 ${
                      isOpen ? "text-foreground" : "text-muted-foreground/50"
                    }`}
                  >
                    {t(`home.faq.${faq.qKey}`)}
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
                        {t(`home.faq.${faq.aKey}`)}
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
    </section>
  );
}
