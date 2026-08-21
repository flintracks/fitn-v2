import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import logoDesktop from "@/assets/flint-logo-escritorio.png";
import logoMobile from "@/assets/flint-logo-movil.png";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const WHATSAPP_URL =
  "https://wa.me/525539073713?text=Estaba%20navegando%20la%20pagina%20web%20de%20Flint%20Racks%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n";

const navItems = [
  { labelKey: "home", path: "/" },
  { labelKey: "about", path: "/about" },
  { labelKey: "services", path: "/services" },
  { labelKey: "coverage", path: "/cobertura" },
  { labelKey: "blog", path: "/blog" },
  { labelKey: "faq", path: "/faqs" },
  { labelKey: "contact", path: "/contact" },
];

export default function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-iron/95 backdrop-blur-sm">
      <div className="container-brand section-padding flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logoDesktop}
            alt="Flint Racks"
            width={300}
            height={32}
            className="hidden lg:block h-7 w-auto object-contain"
          />
          <img
            src={logoMobile}
            alt="Flint Racks"
            width={214}
            height={150}
            className="block lg:hidden h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm tracking-wide uppercase transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-iron-foreground/80 hover:text-primary"
              }`}
            >
              {t(`navbar.${item.labelKey}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          {/* CTA Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-3 hover:bg-red-deep transition-colors duration-200"
          >
            {t('navbar.cta')}
          </a>

          <LanguageSwitcher />

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-iron-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("navbar.open_menu")}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-iron border-t border-iron-foreground/10 overflow-hidden"
          >
            <nav className="section-padding py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-body text-base uppercase tracking-wide ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-iron-foreground/80 hover:text-primary"
                  }`}
                >
                  {t(`navbar.${item.labelKey}`)}
                </Link>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-3"
              >
                {t('navbar.cta')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
