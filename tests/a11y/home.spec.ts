import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

const routes = [
  { label: "Spanish home", path: "/es" },
  { label: "English home", path: "/en" },
  { label: "Spanish Colombia services", path: "/es/servicios/colombia" },
  { label: "English Colombia services", path: "/en/services/colombia" },
  { label: "Spanish service detail", path: "/es/servicios/colombia/efecto-polvo" },
  { label: "Spanish training", path: "/es/formaciones" },
  {
    label: "English training",
    path: "/en/professional-training",
  },
  {
    label: "Spanish course detail",
    path: "/es/formaciones/curso-micropigmentacion-cejas",
  },
  { label: "Spanish journeys", path: "/es/jornadas" },
  { label: "English journeys", path: "/en/appointments-by-city" },
  { label: "Spanish results", path: "/es/resultados" },
  { label: "English results", path: "/en/results" },
  { label: "Spanish about", path: "/es/sobre-xiomara" },
  { label: "English about", path: "/en/about-xiomara" },
  { label: "Spanish aftercare", path: "/es/cuidados" },
  { label: "English aftercare", path: "/en/aftercare" },
  { label: "Spanish contact", path: "/es/contacto" },
  { label: "English contact", path: "/en/contact" },
  { label: "Spanish downloads", path: "/es/descargas" },
  { label: "English downloads", path: "/en/downloads" },
  { label: "Spanish legal notice", path: "/es/aviso-legal" },
  { label: "English legal notice", path: "/en/legal-notice" },
  { label: "Spanish privacy", path: "/es/privacidad" },
  { label: "English privacy", path: "/en/privacy" },
  { label: "Spanish cookies", path: "/es/cookies" },
  { label: "English cookies", path: "/en/cookies" },
];

test.describe("accessibility smoke", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  for (const route of routes) {
    test(`${route.label} has no serious axe violations`, async ({ page }) => {
      await page.goto(route.path);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const seriousViolations = results.violations.filter((violation) =>
        violation.impact === "critical" || violation.impact === "serious"
      );

      expect(seriousViolations).toEqual([]);
    });
  }
});
