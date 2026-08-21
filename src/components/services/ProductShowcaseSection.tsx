import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import img1 from "@/assets/servicios-caso-01.png";
import img2 from "@/assets/servicios-caso-02.png";
import img3 from "@/assets/servicios-caso-03.png";
import img4 from "@/assets/servicios-caso-04.png";
import img5 from "@/assets/servicios-caso-05.png";
import img6 from "@/assets/servicios-caso-06.png";
import img7 from "@/assets/servicios-caso-07.png";
import img8 from "@/assets/servicios-caso-08.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function ProductShowcaseSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-background overflow-hidden">
      {/* Big text banner */}
      <div className="py-10 lg:py-14 flex items-center justify-center">
        <span className="font-heading text-[15vw] sm:text-[12vw] lg:text-[8vw] tracking-wider leading-none text-foreground select-none whitespace-nowrap">
          {t('services.products.bg_text')}
        </span>
      </div>

      {/* Content row */}
      <div className="flex flex-col lg:flex-row">
        {/* Left – text + progress bars */}
        <div className="w-full lg:w-[40%] px-6 lg:px-16 pb-16 lg:pb-20 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl tracking-wide text-foreground leading-[0.95] uppercase"
          >
            {t('services.products.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-muted-foreground text-sm leading-relaxed mt-5 max-w-md"
          >
            {t('services.products.desc')}
          </motion.p>

        </div>

        {/* Right – horizontal scrolling images */}
        <div className="w-full lg:w-[60%] overflow-hidden pb-16 lg:pb-20">
          <motion.div
            className="flex gap-5 pl-6"
            animate={{ x: [0, -1680] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[280px] sm:w-[315px] aspect-square overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Proyecto de racks ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
