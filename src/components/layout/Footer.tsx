import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoRed from "@/assets/logo-red.svg";

export default function Footer() {
  const { t } = useTranslation();
  const footerLinks = [
    {
      title: t("footer.informative_title"),
      links: [
        { label: t("footer.link_home"), path: "/" },
        { label: t("footer.link_about"), path: "/about" },
        { label: t("footer.link_services"), path: "/services" },
        { label: t("footer.link_coverage"), path: "/cobertura" },
        { label: t("footer.link_blog"), path: "/blog" },
        { label: t("footer.link_faq"), path: "/faqs" },
        { label: t("footer.link_contact"), path: "/contact" },
      ],
    },
    {
      title: t("footer.services_links_title"),
      links: [
        { label: t("footer.link_predesigned_racks"), path: "/services#racks-predisenados" },
        { label: t("footer.link_custom_racks"), path: "/services#racks-personalizados" },
        { label: t("footer.link_world_class_materials"), path: "/services#materiales-clase-mundial" },
      ],
    },
    {
      title: t("footer.legal_title"),
      links: [
        { label: t("footer.link_privacy_policy"), path: "/privacy" },
        { label: t("footer.link_terms_service"), path: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-iron text-iron-foreground">
      {/* Main Footer */}
      <div className="container-brand section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logoRed} alt="Flint Racks" className="h-8 w-auto" />
            </Link>
            <p className="font-body text-iron-foreground/60 text-sm leading-relaxed max-w-sm mb-8">
              {t('footer.brand_text')}
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:contacto@flintracks.com" className="flex items-center gap-3 text-sm text-iron-foreground/60 hover:text-primary transition-colors">
                <Mail size={16} />
                contacto@flintracks.com
              </a>
              <a href="tel:+525563193469" className="flex items-center gap-3 text-sm text-iron-foreground/60 hover:text-primary transition-colors">
                <Phone size={16} />
                +52 55 6319 3469
              </a>
              <span className="flex items-center gap-3 text-sm text-iron-foreground/60">
                <MapPin size={16} />
                Ejército nacional No. 700 Piso 2 Interior 201, CDMX, México
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-xl tracking-wider text-iron-foreground mb-6">
                {col.title.toUpperCase()}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="font-body text-sm text-iron-foreground/60 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-iron-foreground/10">
        <div className="container-brand section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-iron-foreground/40">
            © {new Date().getFullYear()} {t('footer.rights_reserved')}
          </p>
          <a
            href="https://www.tbestudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-iron-foreground/40 hover:text-primary transition-colors"
          >
            {t("footer.studio_credit")}
          </a>
        </div>
      </div>
    </footer>
  );
}
