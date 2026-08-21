import { motion } from "framer-motion";
import { Warehouse, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import imgMain from "@/assets/servicios-materiales-01.webp";
import imgDetail from "@/assets/servicios-materiales-02.webp";

const points = [
  {
    icon: Warehouse,
    titleKey: "pt1_title",
    descKey: "pt1_desc",
  },
  {
    icon: Wrench,
    titleKey: "pt2_title",
    descKey: "pt2_desc",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function ExpertiseSection() {
  const { t } = useTranslation();
  return (
    <section id="materiales-clase-mundial" className="py-20 lg:py-28 bg-background scroll-mt-24">
      <div className="container-brand section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Text */}
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="font-body text-sm text-primary font-semibold uppercase tracking-wider"
            >
              {t('services.expertise.subtitle')}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wide text-foreground leading-[0.95] uppercase mt-3"
            >
              {t('services.expertise.title')}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="font-body text-muted-foreground text-base leading-relaxed mt-6 max-w-lg"
            >
              {t('services.expertise.desc')}
            </motion.p>

            <div className="flex flex-col gap-8 mt-10">
              {points.map((pt, i) => (
                <motion.div
                  key={pt.titleKey}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 2}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border flex items-center justify-center bg-sand/40">
                    <pt.icon size={22} className="text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg tracking-wide text-foreground uppercase">
                      {t(`services.expertise.${pt.titleKey}`)}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mt-1">
                      {t(`services.expertise.${pt.descKey}`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right – Overlapping images */}
          <div className="relative flex justify-end">
            {/* Big image – top right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-[65%] aspect-[3/4] overflow-hidden relative z-[1]"
            >
              <img
                src={imgMain}
                alt="Especialista en racks industriales"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Small image – overlapping bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-[55%] aspect-[4/5] overflow-hidden z-[2] border-8 border-background"
            >
              <img
                src={imgDetail}
                alt="Detalle de estructura de racks"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
