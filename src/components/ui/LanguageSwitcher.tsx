import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isActive = (lng: string) => i18n.language.startsWith(lng);

  return (
    <div className="flex items-center bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-sm">
      <Globe className="text-white/80 w-4 h-4 mr-2" />

      <button
        onClick={() => changeLanguage("en")}
        className={`text-sm font-semibold tracking-wider transition-colors duration-200 ${
          isActive("en") ? "text-white" : "text-white/40 hover:text-white/70"
        }`}
      >
        EN
      </button>

      <span className="text-white/20 mx-2 select-none -translate-y-[1px]">|</span>

      <button
        onClick={() => changeLanguage("es")}
        className={`text-sm font-semibold tracking-wider transition-colors duration-200 ${
          isActive("es") ? "text-white" : "text-white/40 hover:text-white/70"
        }`}
      >
        ES
      </button>
    </div>
  );
}
