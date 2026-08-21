import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Coverage from "./pages/Coverage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdminBlogs from "./pages/AdminBlogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type RouteMeta = {
  title: string;
  description: string;
};

const defaultMeta: RouteMeta = {
  title: "Flint Racks | Racks Industriales en México | Diseño e Instalación",
  description:
    "Diseñamos y fabricamos racks industriales en México. Optimiza tu almacén con soluciones seguras, personalizadas y de alta eficiencia. Cotiza hoy.",
};

const routeMetaMap: Record<string, RouteMeta> = {
  "/": defaultMeta,
  "/about": {
    title: "Nosotros | Expertos en Racks Industriales | Flint Racks",
    description:
      "Conoce a Flint Racks: especialistas en diseño e instalación de sistemas de almacenamiento industrial. Ingeniería, seguridad y eficiencia para tu operación.",
  },
  "/nosotros": {
    title: "Nosotros | Expertos en Racks Industriales | Flint Racks",
    description:
      "Conoce a Flint Racks: especialistas en diseño e instalación de sistemas de almacenamiento industrial. Ingeniería, seguridad y eficiencia para tu operación.",
  },
  "/services": {
    title: "Servicios de Racks Industriales | Diseño e Instalación",
    description:
      "Soluciones de racks industriales a la medida: selectivo, drive-in, push-back y más. Ingeniería especializada y ejecución completa para tu almacén.",
  },
  "/servicios": {
    title: "Servicios de Racks Industriales | Diseño e Instalación",
    description:
      "Soluciones de racks industriales a la medida: selectivo, drive-in, push-back y más. Ingeniería especializada y ejecución completa para tu almacén.",
  },
  "/cobertura": {
    title: "Cobertura Nacional | Instalación de Racks en México",
    description:
      "Instalamos racks industriales en todo México. Cobertura nacional con equipos especializados y soporte técnico en cada región. Solicita tu proyecto.",
  },
  "/blog": {
    title: "Blog de Racks Industriales | Logística y Almacenamiento",
    description:
      "Aprende sobre racks industriales, seguridad y optimización de almacenes. Tendencias, consejos y mejores prácticas para tu operación logística.",
  },
  "/contact": {
    title: "Contacto | Cotiza Racks Industriales en México | Flint Racks",
    description:
      "Solicita una cotización para tu proyecto de racks industriales. Asesoría gratuita, diagnóstico y soluciones personalizadas para tu almacén.",
  },
  "/contacto": {
    title: "Contacto | Cotiza Racks Industriales en México | Flint Racks",
    description:
      "Solicita una cotización para tu proyecto de racks industriales. Asesoría gratuita, diagnóstico y soluciones personalizadas para tu almacén.",
  },
  "/faqs": {
    title: "Preguntas Frecuentes | Racks Industriales y Almacenamiento",
    description:
      "Resuelve tus dudas sobre racks industriales, instalación, tiempos y mantenimiento. Todo lo que necesitas saber antes de tu proyecto.",
  },
  "/faq": {
    title: "Preguntas Frecuentes | Racks Industriales y Almacenamiento",
    description:
      "Resuelve tus dudas sobre racks industriales, instalación, tiempos y mantenimiento. Todo lo que necesitas saber antes de tu proyecto.",
  },
};

function RouteMetaManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const basePath = pathname.startsWith("/blog/") ? "/blog" : pathname;
    const meta = routeMetaMap[basePath] ?? defaultMeta;

    document.title = meta.title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
  }, [location.pathname]);

  return null;
}

function RouteScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(hash);

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;

      // Offset for fixed header height
      const offset = 96;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      return true;
    };

    if (scrollToTarget()) return;

    // Retry shortly in case target renders after route transition
    const timer = window.setTimeout(scrollToTarget, 120);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteMetaManager />
        <RouteScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/faq" element={<FAQs />} />
            <Route path="/cobertura" element={<Coverage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Route>
          {/* Admin has no layout (standalone) */}
          <Route path="/admin-blogs" element={<AdminBlogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
