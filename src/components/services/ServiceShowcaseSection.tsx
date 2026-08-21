import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import imgPredefined from "@/assets/servicios-rack-predisenado.webp";
import imgCustom from "@/assets/servicios-rack-custom.webp";

export default function ServiceShowcaseSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const leftImageY = useTransform(scrollYProgress, [0.15, 0.55], ["110%", "0%"]);
  const rightTextY = useTransform(scrollYProgress, [0.15, 0.55], ["-110%", "0%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 0.35]);

  return (
    <section id="racks-predisenados" ref={sectionRef} className="relative lg:h-[350vh] scroll-mt-24">
      <div
        id="racks-personalizados"
        className="absolute top-[52%] left-0 w-px h-px pointer-events-none scroll-mt-24"
        aria-hidden="true"
      />
      {/* ===== DESKTOP: sticky split-screen ===== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden hidden lg:block">
        <div className="grid grid-cols-2 h-full">
          {/* ===== LEFT HALF ===== */}
          <div className="relative h-full overflow-hidden">
            {/* Base layer: Prediseñados text */}
            <div className="absolute inset-0 flex flex-col justify-center bg-sand px-12 lg:px-16 z-[1]">
              <TextPanel
                subtitle={t('services.showcase.predefined_subtitle')}
                title={t('services.showcase.predefined_title')}
                paragraph={t('services.showcase.predefined_desc')}
              />
            </div>

            {/* Overlay: Personalizados image (slides in from bottom) */}
            <motion.div
              className="absolute inset-0 z-[2] overflow-hidden"
              style={{ y: leftImageY }}
            >
              <motion.img
                src={imgCustom}
                alt="Racks Personalizados"
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.2 }}
                viewport={{ once: true }}
                transition={{ duration: 20, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 bg-iron"
                style={{ opacity: overlayOpacity }}
              />
              <div className="absolute bottom-10 right-10 text-right text-iron-foreground z-[3]">
                <span className="font-heading text-8xl text-iron-foreground/25 leading-none block">
                  02
                </span>
                <div className="w-full h-px bg-white my-3" />
                <p className="font-heading text-sm tracking-wider uppercase max-w-[260px] ml-auto">
                  {t('services.showcase.custom_num_desc')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ===== RIGHT HALF ===== */}
          <div className="relative h-full overflow-hidden">
            {/* Base layer: Prediseñados image */}
            <div className="absolute inset-0 z-[1] overflow-hidden">
              <motion.img
                src={imgPredefined}
                alt="Racks Prediseñados"
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.2 }}
                viewport={{ once: true }}
                transition={{ duration: 20, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-iron/40" />
              <div className="absolute bottom-10 left-10 text-iron-foreground z-[3]">
                <span className="font-heading text-8xl text-iron-foreground/25 leading-none block">
                  01
                </span>
                <div className="w-full h-px bg-white my-3" />
                <p className="font-heading text-sm tracking-wider uppercase max-w-[260px]">
                  {t('services.showcase.predefined_num_desc')}
                </p>
              </div>
            </div>

            {/* Overlay: Personalizados text (slides in from top) */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center bg-sand px-12 lg:px-16 z-[2]"
              style={{ y: rightTextY }}
            >
              <TextPanel
                subtitle={t('services.showcase.custom_subtitle')}
                title={t('services.showcase.custom_title')}
                paragraph={t('services.showcase.custom_desc')}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE: stacked blocks ===== */}
      <div className="lg:hidden">
        {/* 1) Prediseñados text */}
        <div className="bg-sand px-6 py-16">
          <TextPanel
            subtitle={t('services.showcase.predefined_subtitle')}
            title={t('services.showcase.predefined_title')}
            paragraph={t('services.showcase.predefined_desc')}
          />
        </div>

        {/* 2) Prediseñados image */}
        <div className="relative h-[70vh] overflow-hidden">
          <motion.img
            src={imgPredefined}
            alt="Racks Prediseñados"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.2 }}
            viewport={{ once: true }}
            transition={{ duration: 20, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-iron/40" />
          <div className="absolute bottom-8 left-6 text-iron-foreground z-[3]">
            <span className="font-heading text-7xl text-iron-foreground/25 leading-none block">
              01
            </span>
            <div className="w-full h-px bg-white my-3" />
            <p className="font-heading text-sm tracking-wider uppercase max-w-[260px]">
              {t('services.showcase.predefined_num_desc')}
            </p>
          </div>
        </div>

        {/* 3) Personalizados text */}
        <div className="bg-sand px-6 py-16">
          <TextPanel
            subtitle={t('services.showcase.custom_subtitle')}
            title={t('services.showcase.custom_title')}
            paragraph={t('services.showcase.custom_desc')}
          />
        </div>

        {/* 4) Personalizados image */}
        <div className="relative h-[70vh] overflow-hidden">
          <motion.img
            src={imgCustom}
            alt="Racks Personalizados"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.2 }}
            viewport={{ once: true }}
            transition={{ duration: 20, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-iron/40" />
          <div className="absolute bottom-8 left-6 text-iron-foreground z-[3]">
            <span className="font-heading text-7xl text-iron-foreground/25 leading-none block">
              02
            </span>
            <div className="w-full h-px bg-white my-3" />
            <p className="font-heading text-sm tracking-wider uppercase max-w-[260px]">
              {t('services.showcase.custom_num_desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TextPanel({
  subtitle,
  title,
  paragraph,
}: {
  subtitle: string;
  title: string;
  paragraph: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="max-w-md flex flex-col items-start text-left">
      <span className="font-body text-sm font-semibold uppercase tracking-wider text-[#000000] mb-4">
        {subtitle}
      </span>

      <h2 className="font-heading text-4xl sm:text-5xl tracking-wide text-sand-foreground leading-[0.95] uppercase">
        {title}
      </h2>

      <p className="font-body text-sm text-sand-foreground/70 leading-relaxed mt-5 max-w-sm">
        {paragraph}
      </p>

      <div className="w-16 h-px bg-white my-8" />

      <Link
        to="/contact"
        className="inline-flex items-center gap-2 bg-sand-foreground text-sand font-body font-semibold px-8 py-4 text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
      >
        {t('services.showcase.cta')}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
