export default function MarqueeBanner() {
  const text = "CONSTRUYENDO CIMIENTOS \u00A0•\u00A0 FORJANDO FORTALEZA \u00A0•\u00A0 LA ESTRUCTURA ES PODER \u00A0•\u00A0 ";
  const repeated = text.repeat(8);

  return (
    <div className="bg-primary overflow-hidden py-4">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="font-heading text-2xl md:text-3xl tracking-wider text-primary-foreground">
          {repeated}
        </span>
        <span className="font-heading text-2xl md:text-3xl tracking-wider text-primary-foreground">
          {repeated}
        </span>
      </div>
    </div>
  );
}
