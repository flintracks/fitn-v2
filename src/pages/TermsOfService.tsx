const sections = [
  {
    title: "1. Aceptación de los términos",
    body: "Al acceder y utilizar este sitio web, aceptas estos Términos de Servicio. Si no estás de acuerdo con ellos, deberás abstenerte de usar el sitio."
  },
  {
    title: "2. Objeto del sitio",
    body: "El sitio tiene fines informativos y comerciales respecto a soluciones de almacenamiento industrial, racks y servicios asociados ofrecidos por Flint Racks."
  },
  {
    title: "3. Uso permitido",
    body: "El usuario se compromete a utilizar el sitio de forma lícita, sin afectar su funcionamiento, seguridad, integridad ni derechos de terceros."
  },
  {
    title: "4. Propiedad intelectual",
    body: "Los contenidos del sitio (textos, marcas, imágenes, videos, diseño y código) son propiedad de Flint Racks o de sus licenciantes y están protegidos por la legislación aplicable."
  },
  {
    title: "5. Cotizaciones y propuestas",
    body: "La información publicada no constituye una oferta vinculante. Las cotizaciones, tiempos, alcances y condiciones finales se establecen por escrito en propuestas comerciales específicas."
  },
  {
    title: "6. Limitación de responsabilidad",
    body: "Flint Racks no será responsable por daños indirectos, incidentales o consecuenciales derivados del uso o imposibilidad de uso del sitio, salvo disposición legal expresa en contrario."
  },
  {
    title: "7. Enlaces a terceros",
    body: "El sitio puede incluir enlaces externos. Flint Racks no controla ni garantiza el contenido, disponibilidad o políticas de dichos sitios de terceros."
  },
  {
    title: "8. Modificaciones",
    body: "Podemos actualizar estos términos en cualquier momento. La versión vigente se publicará en esta página e indicará la fecha de última actualización."
  },
  {
    title: "9. Legislación aplicable",
    body: "Estos términos se rigen por la legislación aplicable en México. Cualquier controversia será resuelta por las autoridades competentes conforme a derecho."
  },
  {
    title: "10. Contacto",
    body: "Para dudas sobre estos Términos de Servicio, escríbenos a contacto@flintracks.com."
  }
];

export default function TermsOfService() {
  return (
    <>
      <section className="bg-iron text-iron-foreground pt-36 pb-20 lg:pt-44 lg:pb-24 border-b border-iron-foreground/10">
        <div className="container-brand section-padding">
          <p className="font-body text-sm text-primary font-semibold uppercase tracking-wider">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-[0.95] mt-4">
            Términos de Servicio
          </h1>
          <p className="font-body text-iron-foreground/70 text-sm md:text-base leading-relaxed mt-6 max-w-3xl">
            Documento base de condiciones generales para el uso del sitio web y sus contenidos.
          </p>
          <p className="font-body text-xs uppercase tracking-wider text-iron-foreground/50 mt-6">
            Última actualización: 30 de marzo de 2026
          </p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="container-brand section-padding max-w-4xl">
          <div className="space-y-10">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl tracking-wide uppercase text-foreground">Alcance</h2>
              <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-4">
                Estos términos regulan el acceso y uso del sitio de Flint Racks por parte de visitantes, prospectos,
                clientes y cualquier usuario que interactúe con el contenido digital de la marca.
              </p>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="border-t border-border pt-8">
                <h3 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-foreground">{section.title}</h3>
                <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed mt-4">{section.body}</p>
              </div>
            ))}

            <div className="border-t border-border pt-8">
              <p className="font-body text-xs md:text-sm text-muted-foreground/80 leading-relaxed">
                Nota: Este contenido es una plantilla informativa base y puede requerir validación legal antes de su publicación final
                según los servicios, contratos y políticas internas de la empresa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
