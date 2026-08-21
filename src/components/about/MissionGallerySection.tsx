import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import statementBullet1 from "@/assets/statement-bullet-1.webp";
import statementBullet2 from "@/assets/statement-bullet-2.webp";

export default function MissionGallerySection() {
  const { t } = useTranslation();
  return (
    <>
      {/* Mission Statement */}
      <section className="py-24 lg:py-36 bg-background relative overflow-hidden">
        {/* Floating decorative circles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-16 lg:top-24 right-[5%] w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden hidden md:block"
        >
          <img src={statementBullet1} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-20 lg:bottom-28 left-[8%] w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden hidden md:block"
        >
          <img src={statementBullet2} alt="" className="w-full h-full object-cover" />
        </motion.div>

        <div className="container-brand section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-body text-sm text-primary font-semibold uppercase tracking-wider"
            >
              {t('about.mission.subtitle')}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wide text-foreground mt-4 leading-[0.95] uppercase"
            >
              {t('about.mission.title')}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 space-y-4 max-w-3xl mx-auto"
            >
              <p className="font-body text-muted-foreground text-base leading-relaxed">
                {t('about.mission.p1')}
              </p>
              <p className="font-body text-muted-foreground text-base leading-relaxed">
                {t('about.mission.p2')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border-2 border-foreground text-foreground font-body font-semibold px-10 py-4 text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                {t('about.mission.cta')}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
