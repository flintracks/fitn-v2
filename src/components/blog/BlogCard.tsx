import { Link } from "react-router-dom";
import type { BlogPost } from "@/lib/blogData";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const title = isEn ? post.titleEn : post.title;
  const excerpt = isEn ? post.excerptEn : post.excerpt;

  const formattedDate = new Date(post.date).toLocaleDateString(isEn ? "en-US" : "es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
      {/* Image placeholder with brand pattern */}
      <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] bg-iron relative overflow-hidden">
        {post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-iron/80" />
        )}
        <div className="absolute bottom-4 left-4">
          <span className="font-body text-[10px] md:text-xs text-iron-foreground/60 bg-iron/80 px-3 py-1 uppercase tracking-widest">
            {formattedDate}
          </span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-body text-[10px] md:text-xs text-primary font-semibold uppercase tracking-wider">
            {post.author}
          </span>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="font-body text-[10px] md:text-xs text-muted-foreground uppercase opacity-70">
            {post.authorRole || (isEn ? "Expert" : "Experto")}
          </span>
        </div>

        <h3 className="font-heading text-xl md:text-2xl tracking-wide text-foreground mb-3 group-hover:text-primary transition-colors uppercase leading-tight">
          <Link to={`/blog/${post.slug}`}>
            {title}
          </Link>
        </h3>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-auto">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-foreground group-hover:text-primary transition-colors uppercase tracking-widest"
          >
            {t('blog_page.read_more')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
