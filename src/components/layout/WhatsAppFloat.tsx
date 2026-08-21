import whatsappLogo from "@/assets/whatsapp-logo.webp";

const WHATSAPP_URL =
  "https://wa.me/525539073713?text=Estaba%20navegando%20la%20pagina%20web%20de%20Flint%20Racks%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp de Flint Racks"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]"
    >
      <img
        src={whatsappLogo}
        alt="WhatsApp Flint Racks"
        className="w-[50px] md:w-[55px] h-auto"
      />
    </a>
  );
}
