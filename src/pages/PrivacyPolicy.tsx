const sections = [
  {
    title: "1. Información que recopilamos",
    body: "Podemos recopilar datos de identificación y contacto (nombre, correo electrónico, teléfono y empresa), así como información técnica de navegación (IP, navegador, dispositivo, páginas visitadas y tiempos de sesión)."
  },
  {
    title: "2. Finalidad del tratamiento",
    body: "Utilizamos la información para atender solicitudes de contacto y cotización, brindar soporte comercial y técnico, mejorar la experiencia del sitio, dar seguimiento a proyectos y cumplir obligaciones legales aplicables."
  },
  {
    title: "3. Base legal",
    body: "Tratamos datos personales con base en el consentimiento del titular, la ejecución de una relación precontractual o contractual y/o el cumplimiento de obligaciones legales, según corresponda en cada caso."
  },
  {
    title: "4. Conservación de datos",
    body: "Los datos se conservan durante el tiempo necesario para cumplir las finalidades señaladas y los plazos legales aplicables. Una vez concluido dicho periodo, se eliminarán o anonimizarán de forma segura."
  },
  {
    title: "5. Transferencias y encargados",
    body: "Podemos apoyarnos en proveedores tecnológicos para alojamiento web, analítica, correo y formularios. Dichos terceros operan bajo obligaciones de confidencialidad y medidas de seguridad adecuadas."
  },
  {
    title: "6. Derechos del titular",
    body: "Puedes solicitar acceso, rectificación, cancelación u oposición de tus datos, así como limitar su uso o revocar consentimiento, escribiendo a contacto@flintracks.com."
  },
  {
    title: "7. Cookies y tecnologías similares",
    body: "Este sitio puede utilizar cookies para funciones de navegación, análisis y mejora de rendimiento. Puedes administrar su uso desde la configuración de tu navegador."
  },
  {
    title: "8. Seguridad",
    body: "Implementamos medidas técnicas, administrativas y organizativas razonables para proteger la información contra acceso no autorizado, pérdida, alteración o uso indebido."
  },
  {
    title: "9. Cambios a esta política",
    body: "Nos reservamos el derecho de actualizar este aviso en cualquier momento. La versión vigente será publicada en esta misma página con su fecha de actualización."
  },
  {
    title: "10. Contacto",
    body: "Si tienes dudas sobre esta Política de Privacidad, puedes escribirnos a contacto@flintracks.com."
  }
];

export default function PrivacyPolicy() {
  return (
    <>
      <section className="bg-iron text-iron-foreground pt-36 pb-20 lg:pt-44 lg:pb-24 border-b border-iron-foreground/10">
        <div className="container-brand section-padding">
          <p className="font-body text-sm text-primary font-semibold uppercase tracking-wider">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-[0.95] mt-4">
            Política de Privacidad
          </h1>
          <p className="font-body text-iron-foreground/70 text-sm md:text-base leading-relaxed mt-6 max-w-3xl">
            Documento base de referencia para el uso y protección de datos personales en el sitio web de Flint Racks.
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
                Esta política aplica al tratamiento de datos personales recabados a través de formularios, correo electrónico,
                canales digitales y demás interacciones relacionadas con Flint Racks.
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
                Nota: Este contenido es una plantilla informativa base y puede requerir ajuste legal específico según la operación,
                jurisdicción y flujos reales de tratamiento de datos de la empresa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
