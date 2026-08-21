import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import heroImg from "@/assets/header-home-img.webp";
import heroVideo from "@/assets/header-home-video.mp4";
import heroVideoMobile from "@/assets/hero-video.mp4";

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Curtain opens between 0% and 40% of scroll
  const leftCurtain = useTransform(scrollYProgress, [0, 0.35], ["0%", "-100%"]);
  const rightCurtain = useTransform(scrollYProgress, [0, 0.35], ["0%", "100%"]);

  // Overlay on curtain image: visible initially, fades out as curtains open
  const curtainOverlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0]);

  // Lines fade in then out
  const linesOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.85], [0, 0.08, 0.08, 0]);

  // Parallax: video moves up slowly as you scroll past
  const videoY = useTransform(scrollYProgress, [0.4, 1], ["0%", "-20%"]);

  // Content on curtain: visible initially, fades out as curtains open
  const curtainContentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const curtainContentY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }} // Extra height for scroll-driven animation
    >
      <div className="sticky top-0 h-screen max-h-[100vh] overflow-hidden bg-iron">
        {/* Background video with parallax */}
        <motion.div className="absolute inset-0" style={{ y: videoY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[120%] object-cover"
            poster={heroImg}
          >
            <source media="(max-width: 767px)" src={heroVideoMobile} type="video/mp4" />
            <source src={heroVideo} type="video/mp4" />
          </video>
        </motion.div>

        {/* Curtain overlay — two image halves that open on scroll */}
        <div className="absolute inset-0 flex pointer-events-none z-[1]">
          {/* Left curtain */}
          <motion.div
            style={{ x: leftCurtain }}
            className="w-1/2 h-full overflow-hidden flex-shrink-0"
          >
            <img
              src={heroImg}
              alt=""
              className="h-full object-cover"
              style={{ width: '200%', maxWidth: 'none' }}
            />
          </motion.div>
          {/* Right curtain */}
          <motion.div
            style={{ x: rightCurtain }}
            className="w-1/2 h-full overflow-hidden flex-shrink-0"
          >
            <img
              src={heroImg}
              alt=""
              className="h-full object-cover"
              style={{ width: '200%', maxWidth: 'none', marginLeft: '-100%' }}
            />
          </motion.div>
        </div>

        {/* Dark overlay on curtain — fades out as curtains open */}
        <motion.div
          style={{ opacity: curtainOverlayOpacity }}
          className="absolute inset-0 bg-iron z-[1]"
        />

        {/* Content ON the curtain — fades out on scroll */}
        <motion.div
          style={{ opacity: curtainContentOpacity, y: curtainContentY }}
          className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"
        >
          <div className="w-[90%] lg:w-full container-brand section-padding mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-16 w-full mx-auto">
              <div className="flex-1 flex flex-col gap-8">
                <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] tracking-wider text-iron-foreground leading-[0.9]">
                  {t('home.hero.title_p1')}
                  <br />
                  {t('home.hero.title_p2')}
                  <br />
                  <span className="text-primary">{t('home.hero.title_p3')}</span>
                  <br />
                  {t('home.hero.title_p4')}
                  <br />
                  {t('home.hero.title_p5')}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="font-body text-xs text-iron-foreground/60 uppercase tracking-wider">
                      {t('home.hero.trust_badge')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:max-w-sm flex flex-col gap-6">
                <p className="font-body text-iron-foreground/70 text-base leading-relaxed">
                  {t('home.hero.description')}
                </p>
                <Link
                  to="/contact"
                  className="pointer-events-auto group inline-flex items-center gap-3 bg-primary text-primary-foreground font-body font-semibold px-8 py-4 text-sm hover:bg-red-deep transition-colors duration-300 w-fit"
                >
                  {t('home.hero.cta')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Decorative lines */}
        <motion.div
          style={{ opacity: linesOpacity }}
          className="absolute inset-0 pointer-events-none z-[3]"
        >
          <div className="h-full w-full flex justify-between px-[20%]">
            <div className="w-px h-full bg-iron-foreground" />
            <div className="w-px h-full bg-iron-foreground" />
            <div className="w-px h-full bg-iron-foreground" />
            <div className="w-px h-full bg-iron-foreground" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
