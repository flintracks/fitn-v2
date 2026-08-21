import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { toast } from "sonner";
import heroImg from "@/assets/contact-header.webp";

const contactFaqsKeys = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
];

/* ─── FAQ Accordion Item ─── */
function FAQItem({
  qKey,
  aKey,
  index,
  isOpen,
  onToggle,
}: {
  qKey: string;
  aKey: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-center gap-6 group cursor-pointer"
      >
        <span
          className={`font-heading text-lg tracking-wide transition-colors duration-300 ${
            isOpen ? "text-foreground" : "text-muted-foreground/50"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`font-heading text-xl md:text-2xl lg:text-3xl tracking-wide uppercase flex-1 transition-colors duration-300 ${
            isOpen ? "text-foreground" : "text-muted-foreground/50"
          }`}
        >
          {t(`contact.faqs.${qKey}`)}
        </span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus size={24} className="text-foreground" />
          ) : (
            <Plus size={24} className="text-muted-foreground/50" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed pb-6 pl-12 lg:pl-16 pr-8">
              {t(`contact.faqs.${aKey}`)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-px bg-border relative">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out"
          style={{ width: isOpen ? "100%" : "0%" }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Contact Page ─── */
export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error(t('contact.form.terms_error'));
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        _replyto: formData.email,
        phone: formData.phone,
        subject: formData.subject || "Nueva solicitud desde sitio web",
        message: formData.message,
        _subject: formData.subject
          ? `Flint Racks | ${formData.subject}`
          : "Flint Racks | Nueva solicitud desde formulario de contacto",
        _template: "table",
        _captcha: "false",
      };

      const response = await fetch("https://formsubmit.co/ajax/contacto@flintracks.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact form request failed");
      }

      const result = await response.json().catch(() => null);
      const sentOk =
        result?.success === true ||
        result?.success === "true" ||
        result?.status === "success";

      if (!sentOk) {
        const providerMessage = typeof result?.message === "string" ? result.message : "";
        if (providerMessage.toLowerCase().includes("activate")) {
          throw new Error(t("contact.form.activation_required"));
        }
        throw new Error(providerMessage || t("contact.form.error"));
      }

      toast.success(t('contact.form.success'));
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setAgreed(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : t("contact.form.error");
      toast.error(message || t("contact.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-iron-foreground/30 px-0 py-3 font-body text-sm text-iron-foreground placeholder:text-iron-foreground/50 focus:border-primary focus:outline-none transition-colors";

  return (
    <>
      {/* ── Hero + Form ── */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Contacto Flint Racks"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-iron/80" />

        {/* Large watermark — desktop only */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 hidden md:flex items-start justify-center pointer-events-none select-none"
          style={{ paddingTop: '10%' }}
        >
          <span
            className="font-heading text-[10vw] tracking-wider leading-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t('contact.hero.bg_text')}
          </span>
        </motion.div>

        {/* Mobile subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden absolute top-28 left-6 font-heading text-sm tracking-[0.3em] text-primary uppercase z-10"
        >
          {t('contact.hero.mobile_subtitle')}
        </motion.span>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10 w-full max-w-3xl mx-auto px-6 mt-32 lg:mt-40"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <input
                type="text"
                placeholder={t('contact.form.name')}
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputClass}
              />
              <input
                type="email"
                placeholder={t('contact.form.email')}
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={inputClass}
              />
              <input
                type="tel"
                placeholder={t('contact.form.phone')}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={inputClass}
              />
              <input
                type="text"
                placeholder={t('contact.form.subject')}
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <textarea
              placeholder={t('contact.form.message')}
              required
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className={`${inputClass} resize-none`}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-8 py-3 text-sm uppercase tracking-wider hover:bg-red-deep transition-colors"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="w-4 h-4 border border-iron-foreground/40 bg-transparent accent-primary"
                />
                <span className="font-body text-xs text-iron-foreground/60">
                  {t('contact.form.terms')}
                </span>
              </label>
            </div>
          </form>
        </motion.div>
      </section>

      {/* ── Info Cards ── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-brand section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-border p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-heading text-sm tracking-wider text-foreground uppercase">
                  {t('contact.info.address_title')}
                </h4>
                <MapPin size={18} className="text-muted-foreground" />
              </div>
              <p className="font-body text-sm text-muted-foreground uppercase leading-relaxed">
                {t('contact.info.address_value')}
              </p>
            </motion.div>

            {/* Reach Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-border p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-heading text-sm tracking-wider text-foreground uppercase">
                  {t('contact.info.contact_title')}
                </h4>
                <Send size={18} className="text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                <a
                  href="mailto:contacto@flintracks.com"
                  className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  contacto@flintracks.com
                </a>
                <a
                  href="tel:+525563193469"
                  className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +52 55 6319 3469
                </a>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border border-border p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-heading text-sm tracking-wider text-foreground uppercase">
                  {t('contact.info.hours_title')}
                </h4>
                <Clock size={18} className="text-muted-foreground" />
              </div>
              <div className="font-body text-sm text-muted-foreground uppercase leading-relaxed flex flex-col gap-0.5">
                <span>{t('contact.info.hours_mon_fri')}</span>
                <span>{t('contact.info.hours_sat')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4090446137598!2d-99.20021672314279!3d19.43792324050779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d202045b79a3ad%3A0x1a2872df113bf061!2sAv.%20Ej%C3%A9rcito%20Nacional%20Mexicano%20700-Piso%202%20Interior%20201%2C%20Polanco%2C%20Polanco%20III%20Secc%2C%20Miguel%20Hidalgo%2C%2011540%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1774558557694!5m2!1ses!2smx"
          width="100%"
          height="550"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Flint Racks"
          className="w-full"
        />
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="container-brand section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wide text-foreground leading-[0.95]">
              {t('contact.faqs.title_p1')}
              <br />
              {t('contact.faqs.title_p2')}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {contactFaqsKeys.map((faq, i) => (
              <FAQItem
                key={i}
                qKey={faq.qKey}
                aKey={faq.aKey}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
