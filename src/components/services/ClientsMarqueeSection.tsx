import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logoSimjis from "@/assets/cliente-grupo-simjis.png";
import logoIgoto from "@/assets/cliente-igoto.png";
import logoImperioTextil from "@/assets/cliente-imperio-textil.png";
import logoRojoTex from "@/assets/cliente-rojo-tex.png";
import logoTooGood from "@/assets/cliente-too-good.png";

const logos = [
  { src: logoSimjis, alt: "Grupo Simjis" },
  { src: logoIgoto, alt: "IGoto" },
  { src: logoImperioTextil, alt: "Imperio Textil" },
  { src: logoRojoTex, alt: "Rojo Tex" },
  { src: logoTooGood, alt: "Too Good" },
];

export default function ClientsMarqueeSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container-brand section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wide text-foreground leading-[0.95] uppercase text-center"
        >
          {t('services.clients.title')}
        </motion.h2>
      </div>

      <div className="relative mt-12 lg:mt-16">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex w-max animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center px-8 sm:px-12 lg:px-16"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
