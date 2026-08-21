import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/blogData";
import LatestBlogs from "@/components/blog/LatestBlogs";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import MarqueeBanner from "@/components/layout/MarqueeBanner";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post || post.status !== "published") {
    return (
      <section className="py-40 bg-background">
        <div className="container-brand section-padding text-center">
          <h1 className="font-heading text-5xl text-foreground uppercase">{t('blog_page.not_found')}</h1>
          <p className="font-body text-muted-foreground mt-4">
            {isEn ? "This article does not exist or has not been published yet." : "Este artículo no existe o aún no ha sido publicado."}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-iron text-iron-foreground font-body font-semibold px-8 py-4 text-sm mt-8 hover:bg-primary transition-colors"
          >
            <ArrowLeft size={16} />
            {t('blog_page.back_to_blog')}
          </Link>
        </div>
      </section>
    );
  }

  const title = isEn ? post.titleEn : post.title;
  const content = isEn ? post.contentEn : post.content;

  const formattedDate = new Date(post.date).toLocaleDateString(isEn ? "en-US" : "es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Parse markdown-like content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listCounter = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${listCounter++}`} className="my-4 space-y-2 pl-6">
            {currentList.map((item, i) => (
              <li key={i} className="font-body text-base text-foreground/80 leading-relaxed list-disc">
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={i} className="font-heading text-3xl tracking-wide text-foreground mt-10 mb-4 uppercase">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={i} className="font-heading text-2xl tracking-wide text-foreground mt-8 mb-3 uppercase">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("- **")) {
        const match = trimmed.match(/^- \*\*(.+?)\*\*\s*[—–-]\s*(.+)$/);
        if (match) {
          currentList.push(`${match[1]}: ${match[2]}`);
        } else {
          const boldMatch = trimmed.match(/^- \*\*(.+?)\*\*(.*)$/);
          if (boldMatch) {
            currentList.push(`${boldMatch[1]}${boldMatch[2]}`);
          } else {
            currentList.push(trimmed.replace("- ", ""));
          }
        }
      } else if (trimmed.startsWith("- ")) {
        currentList.push(trimmed.replace("- ", ""));
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushList();
        currentList.push(trimmed.replace(/^\d+\.\s/, ""));
      } else if (trimmed === "") {
        flushList();
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        flushList();
        elements.push(
          <p key={i} className="font-body text-base font-semibold text-foreground my-3">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
      } else {
        flushList();
        const parts = trimmed.split(/(\*\*.+?\*\*)/g);
        elements.push(
          <p key={i} className="font-body text-base text-foreground/80 leading-relaxed my-3">
            {parts.map((part, pi) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={pi} className="font-semibold text-foreground">
                  {part.replace(/\*\*/g, "")}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <>
      {/* Article Hero */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end overflow-hidden">
        {post.coverImage ? (
          <motion.img
            src={post.coverImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
        ) : (
          <div className="absolute inset-0 bg-iron" />
        )}
        <div className="absolute inset-0 bg-foreground/70" />

        <div className="relative z-10 container-brand section-padding pb-16 lg:pb-20 w-full">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-body text-sm text-white/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            {t('blog_page.back_to_blog')}
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider text-white leading-[0.95] max-w-4xl uppercase">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              <div className="flex flex-col">
                <span className="font-body text-sm text-white/80">
                  {post.author}
                </span>
                <span className="font-body text-xs text-white/40 uppercase tracking-widest">
                  {post.authorRole || (isEn ? "Expert" : "Experto")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <span className="font-body text-sm text-white/60">
                {formattedDate}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span className="font-body text-sm text-white/60 uppercase tracking-wider">
                {isEn ? "5 MIN READ" : "5 MIN LECTURA"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-brand section-padding">
          <article className="max-w-4xl">
            {renderContent(content)}

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-border">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="font-body text-[10px] md:text-xs font-bold uppercase tracking-widest border border-border px-4 py-2 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Related Posts */}
      <LatestBlogs excludeSlug={post.slug} />

      <MarqueeBanner />
    </>
  );
}
