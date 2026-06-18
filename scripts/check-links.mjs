const routes = [
  "/es",
  "/en",
  "/es/servicios",
  "/en/services",
  "/es/servicios/colombia",
  "/en/services/colombia",
  "/es/servicios/espana-europa",
  "/en/services/spain-europe",
  "/es/servicios/suiza",
  "/en/services/switzerland",
  "/es/servicios/colombia/efecto-polvo",
  "/en/services/colombia/powder-brows",
  "/es/servicios/suiza/cejas-hibridas",
  "/en/services/switzerland/hybrid-brows",
  "/es/descargas",
  "/en/downloads",
  "/es/formaciones",
  "/en/professional-training",
  "/es/formaciones/curso-micropigmentacion-cejas",
  "/en/professional-training/brow-micropigmentation-course",
  "/es/jornadas",
  "/en/appointments-by-city",
  "/es/resultados",
  "/en/results",
  "/es/sobre-xiomara",
  "/en/about-xiomara",
  "/es/cuidados",
  "/en/aftercare",
  "/es/contacto",
  "/en/contact",
  "/es/aviso-legal",
  "/en/legal-notice",
  "/es/privacidad",
  "/en/privacy",
  "/es/cookies",
  "/en/cookies",
];

for (const route of routes) {
  if (!route.startsWith("/")) {
    throw new Error(`Invalid route: ${route}`);
  }
}

console.log(`Checked ${routes.length} local route definitions.`);
