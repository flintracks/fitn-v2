import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getPublishedPosts } from "@/lib/blogData";
import BlogCard from "@/components/blog/BlogCard";
import heroImg from "@/assets/header-blog.webp";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarqueeBanner from "@/components/layout/MarqueeBanner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Blog() {
  const { t } = useTranslation();
  const posts = getPublishedPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Blog Flint Racks"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-iron/70" />

        {/* Background Decorative Text */}
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
            {t('blog_page.hero.bg_text')}
          </span>
        </motion.div>

        <div className="relative container-brand section-padding pb-16 lg:pb-20 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 text-center md:text-left">
            <div className="max-w-3xl mx-auto md:mx-0">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:hidden font-heading text-sm tracking-[0.3em] text-primary uppercase mb-4 block"
              >
                {t('blog_page.hero.mobile_subtitle')}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-iron-foreground leading-[0.95] uppercase"
              >
                {t('blog_page.hero.title_p1')}
                <br />
                <span className="text-primary">{t('blog_page.hero.title_p2')}</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center md:items-start gap-5 lg:max-w-sm lg:pb-1"
            >
              <p className="font-body text-iron-foreground/70 text-sm leading-relaxed">
                {t('blog_page.hero.description')}
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

      {/* Posts Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-brand section-padding">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground text-lg">
                {t('blog_page.no_posts')}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-20">
              {/* Latest Article */}
              {posts.length > 0 && (
                <div>
                  <span className="font-body text-sm text-primary font-semibold uppercase tracking-wider mb-8 block">
                    {t("blog_page.latest_article")}
                  </span>
                  <div className="border-b border-border pb-16">
                    <BlogCard post={posts[0]} />
                  </div>
                </div>
              )}

              {/* All Articles Grid */}
              {posts.length > 1 && (
                <div>
                  <span className="font-body text-sm text-primary font-semibold uppercase tracking-wider mb-8 block">
                    {t("blog_page.all_articles")}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.slice(1).map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <MarqueeBanner />
    </>
  );
}
