import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LatestBlogs from "@/components/blog/LatestBlogs";
import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ServicesSection from "@/components/home/ServicesSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import HomeFAQSection from "@/components/home/HomeFAQSection";
import CoverageCtaSection from "@/components/home/CoverageCtaSection";
import aboutImg from "@/assets/home-nosotros-somos.webp";

const stats = [
  { value: "300+", labelKey: "projects" },
  { value: "98%", labelKey: "satisfaction" },
  { value: "50+", labelKey: "team" },
];


export default function Index() {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <HeroSection />


      {/* Brand Statement */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-brand section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-body text-sm text-primary font-semibold uppercase tracking-wider">
                {t('home.about.label')}
              </span>
              <h2 className="font-heading text-5xl md:text-6xl tracking-wide text-foreground mt-3 leading-[0.95]">
                {t('home.about.title')}
              </h2>
              <p className="font-body text-muted-foreground text-base mt-6 leading-relaxed">
                {t('home.about.description')}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-iron text-iron-foreground font-body font-semibold px-8 py-4 text-sm mt-10 hover:bg-primary transition-colors duration-200"
              >
                {t('home.about.cta')}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src={aboutImg} alt={t('home.about.label')} className="w-full aspect-[4/5] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsSection />

      {/* Stats */}
      <section className="bg-iron py-16 lg:py-20">
        <div className="container-brand section-padding">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-heading text-5xl md:text-6xl text-primary">
                  {stat.value}
                </span>
                <p className="font-body text-sm text-iron-foreground/60 mt-2 uppercase tracking-wider">
                  {t(`home.stats.${stat.labelKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesSection />

      {/* Industries */}
      <IndustriesSection />

      {/* Coverage CTA */}
      <CoverageCtaSection />

      {/* FAQs */}
      <HomeFAQSection />

      {/* Latest Blogs */}
      <LatestBlogs />
    </>
  );
}
