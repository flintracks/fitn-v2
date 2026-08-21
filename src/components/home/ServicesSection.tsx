import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import imgPredefined from "@/assets/ns-home-racks-pre.webp";
import imgCustom from "@/assets/ns-home-racks-pers.webp";

const services = [
  {
    titleKey: "s1_title",
    subtitleKey: "s1_subtitle",
    descKey: "s1_desc",
    image: imgPredefined,
    link: "/services",
  },
  {
    titleKey: "s2_title",
    subtitleKey: "s2_subtitle",
    descKey: "s2_desc",
    image: imgCustom,
    link: "/services",
  },
];

export default function ServicesSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-brand section-padding">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="font-body text-sm text-primary font-semibold uppercase tracking-wider">
            {t('home.services.subtitle')}
          </span>
          <h2 className="font-heading text-5xl md:text-6xl tracking-wide text-foreground mt-3 uppercase">
            {t('home.services.title')}
          </h2>
        </motion.div>

        {/* Cards - Desktop */}
        <div className="hidden lg:flex gap-4 h-[550px]">
          {services.map((service, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={service.titleKey}
                className="relative overflow-hidden cursor-pointer group"
                style={{ borderRadius: 0 }}
                animate={{ flex: isActive ? 1.5 : 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <Link to={service.link} className="block w-full h-full">
                  {/* Image */}
                  <img
                    src={service.image}
                    alt={t(`home.services.${service.titleKey}`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-iron/80 via-iron/20 to-transparent" />

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                    <motion.div
                      initial={false}
                      animate={{
                        y: isActive ? 0 : 20,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider">
                        {t(`home.services.${service.subtitleKey}`)}
                      </span>
                      <h3 className="font-heading text-2xl lg:text-3xl text-iron-foreground uppercase tracking-wide mt-1">
                        {t(`home.services.${service.titleKey}`)}
                      </h3>
                      <p className="font-body text-sm text-iron-foreground/80 mt-2 leading-relaxed max-w-md line-clamp-3">
                        {t(`home.services.${service.descKey}`)}
                      </p>
                    </motion.div>

                    {/* Arrow button */}
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-white text-foreground"
                      }`}
                      animate={{
                        y: isActive ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Cards - Mobile */}
        <div className="lg:hidden flex flex-col gap-4">
          {services.map((service) => (
            <Link
              key={service.titleKey}
              to={service.link}
              className="relative h-[400px] overflow-hidden group block"
            >
              <img
                src={service.image}
                alt={t(`home.services.${service.titleKey}`)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iron/80 via-iron/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider">
                    {t(`home.services.${service.subtitleKey}`)}
                  </span>
                  <h3 className="font-heading text-2xl text-iron-foreground uppercase tracking-wide mt-1">
                    {t(`home.services.${service.titleKey}`)}
                  </h3>
                  <p className="font-body text-sm text-iron-foreground/80 mt-2 leading-relaxed line-clamp-3">
                    {t(`home.services.${service.descKey}`)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
