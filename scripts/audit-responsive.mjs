import { chromium } from "@playwright/test";

const baseUrl = process.env.RESPONSIVE_BASE_URL ?? "http://localhost:3000";
const concurrency = Number(process.env.RESPONSIVE_CONCURRENCY ?? 4);
const viewports = [
  { name: "mobile-390", width: 390, height: 844, touch: true },
  { name: "mobile-430", width: 430, height: 932, touch: true },
  { name: "tablet-768", width: 768, height: 1024, touch: true },
  { name: "laptop-1024", width: 1024, height: 768, touch: false },
  { name: "desktop-1440", width: 1440, height: 1000, touch: false },
  { name: "wide-1920", width: 1920, height: 1080, touch: false },
];

const rejectedConsent = {
  analytics: false,
  marketing: false,
  preferences: false,
  updatedAt: "2026-06-19T00:00:00.000Z",
};
const transparentPixel = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

async function getPublicPaths() {
  const response = await fetch(new URL("/sitemap.xml", baseUrl));

  if (!response.ok) {
    throw new Error(`Sitemap returned HTTP ${response.status}`);
  }

  const sitemap = await response.text();
  return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
}

async function auditPage(page, path, viewport) {
  const runtimeErrors = [];
  const onConsole = (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  };
  const onPageError = (error) => runtimeErrors.push(error.message);

  page.on("console", onConsole);
  page.on("pageerror", onPageError);

  const response = await page.goto(new URL(path, baseUrl).toString(), {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(180);

  const result = await page.evaluate(({ touch }) => {
    const root = document.documentElement;
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const label = (element) =>
      (element.getAttribute("aria-label") || element.textContent || "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 100);

    const smallControls = touch
      ? [...document.querySelectorAll("button,[role='button'],input,select,textarea")]
          .filter(visible)
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              height: Math.round(rect.height),
              label: label(element),
              width: Math.round(rect.width),
            };
          })
          .filter((item) => item.width < 44 || item.height < 44)
      : [];

    const clippedControls = [
      ...document.querySelectorAll("button,a,[role='button']"),
    ]
      .filter(visible)
      .filter((element) => !element.matches("[data-slot='result-tile'],.sr-only"))
      .filter((element) => !element.querySelector(".sr-only"))
      .filter((element) => {
        const style = getComputedStyle(element);
        const clips = ["hidden", "clip"].includes(style.overflowX) ||
          ["hidden", "clip"].includes(style.overflowY);
        return clips && (
          element.scrollWidth > element.clientWidth + 2 ||
          element.scrollHeight > element.clientHeight + 2
        );
      })
      .map((element) => ({ label: label(element), tag: element.tagName }));

    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

    return {
      clientWidth: root.clientWidth,
      clippedControls,
      duplicateIds,
      h1Count: document.querySelectorAll("h1").length,
      hasMain: Boolean(document.querySelector("main")),
      lang: root.lang,
      scrollWidth: root.scrollWidth,
      smallControls,
    };
  }, { touch: viewport.touch });

  page.off("console", onConsole);
  page.off("pageerror", onPageError);

  return { response, result, runtimeErrors };
}

function reportIssues(path, viewport, audit) {
  const issues = [];
  const { response, result, runtimeErrors } = audit;
  const expectedLang = path.startsWith("/en") ? "en" : "es";
  const prefix = `${viewport.name} ${path}`;

  if (!response || response.status() >= 400) issues.push(`${prefix}: HTTP ${response?.status()}`);
  if (!result.hasMain) issues.push(`${prefix}: missing main landmark`);
  if (result.h1Count !== 1) issues.push(`${prefix}: expected one H1, got ${result.h1Count}`);
  if (result.lang !== expectedLang) issues.push(`${prefix}: expected lang=${expectedLang}, got ${result.lang}`);
  if (result.scrollWidth > result.clientWidth + 1) {
    issues.push(`${prefix}: horizontal overflow ${result.scrollWidth - result.clientWidth}px`);
  }
  if (result.smallControls.length) {
    issues.push(`${prefix}: controls below 44px ${JSON.stringify(result.smallControls.slice(0, 5))}`);
  }
  if (result.clippedControls.length) {
    issues.push(`${prefix}: clipped controls ${JSON.stringify(result.clippedControls.slice(0, 5))}`);
  }
  if (result.duplicateIds.length) {
    issues.push(`${prefix}: duplicate ids ${result.duplicateIds.join(", ")}`);
  }
  if (runtimeErrors.length) {
    issues.push(`${prefix}: runtime errors ${runtimeErrors.slice(0, 3).join(" | ")}`);
  }

  return issues;
}

const paths = await getPublicPaths();
const browser = await chromium.launch({ headless: true });
const issues = [];
let checked = 0;

for (const viewport of viewports) {
  let nextIndex = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, paths.length) }, async () => {
      const context = await browser.newContext({
        hasTouch: viewport.touch,
        viewport: { width: viewport.width, height: viewport.height },
      });
      await context.route("**/*", async (route) => {
        if (route.request().resourceType() === "image") {
          await route.fulfill({
            body: transparentPixel,
            contentType: "image/png",
            status: 200,
          });
          return;
        }
        await route.continue();
      });
      await context.addInitScript(
        ({ consent }) => {
          localStorage.setItem("cejas_cookie_consent_v1", JSON.stringify(consent));
        },
        { consent: rejectedConsent },
      );
      const page = await context.newPage();

      while (nextIndex < paths.length) {
        const path = paths[nextIndex++];
        try {
          const audit = await auditPage(page, path, viewport);
          issues.push(...reportIssues(path, viewport, audit));
          checked += 1;
        } catch (error) {
          issues.push(`${viewport.name} ${path}: ${error.message.split("\n")[0]}`);
        }
      }

      await context.close();
    }),
  );
}

await browser.close();

console.log(
  `Responsive audit: ${checked} renders (${paths.length} URLs x ${viewports.length} viewports), ${issues.length} issues.`,
);

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}
