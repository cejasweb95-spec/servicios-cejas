import { describe, expect, it } from "vitest";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { mainNavigation, legalNavigation } from "@/config/navigation";
import { defaultLocale, locales } from "@/i18n/routing";
import { getCourses, getMarkets, getServicesByMarket } from "@/lib/content/queries";
import { resolveLocalizedPath } from "@/lib/i18n/alternate-path";
import { buildCoursePath } from "@/lib/routes/course-routes";
import { buildMarketPath, buildServicePath } from "@/lib/routes/service-routes";

function flattenLeaves(value: unknown, path = "", output = new Map<string, unknown>()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flattenLeaves(item, `${path}[${index}]`, output));
    return output;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      flattenLeaves(item, path ? `${path}.${key}` : key, output);
    }
    return output;
  }

  output.set(path, value);
  return output;
}

function placeholders(value: string) {
  return [...value.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]).sort();
}

describe("i18n foundation", () => {
  it("keeps Spanish as the default locale", () => {
    expect(defaultLocale).toBe("es");
    expect(locales).toEqual(["es", "en"]);
  });

  it("keeps every nested message key aligned and non-empty", () => {
    const enLeaves = flattenLeaves(en);
    const esLeaves = flattenLeaves(es);

    expect([...enLeaves.keys()].sort()).toEqual([...esLeaves.keys()].sort());
    expect(enLeaves.size).toBeGreaterThan(350);

    for (const [key, esValue] of esLeaves) {
      const enValue = enLeaves.get(key);

      expect(typeof esValue, `${key} Spanish value type`).toBe("string");
      expect(typeof enValue, `${key} English value type`).toBe("string");
      expect((esValue as string).trim(), `${key} Spanish value`).not.toBe("");
      expect((enValue as string).trim(), `${key} English value`).not.toBe("");
      expect(placeholders(enValue as string), `${key} placeholders`).toEqual(
        placeholders(esValue as string),
      );
    }
  });

  it("keeps internal implementation language out of public messages", () => {
    const publicValues = [
      ...flattenLeaves(es).values(),
      ...flattenLeaves(en).values(),
    ].join("\n");

    expect(publicValues).not.toMatch(
      /\bV1\b|primera versi[oó]n|first version|client-confirmed|mislabeled|public files section/i,
    );
  });

  it("maps every navigation route to its equivalent locale and back", () => {
    for (const item of [...mainNavigation, ...legalNavigation]) {
      const esPath = `/es${item.href.es === "/" ? "" : item.href.es}`;
      const enPath = `/en${item.href.en === "/" ? "" : item.href.en}`;

      expect(resolveLocalizedPath(esPath, "en"), item.id).toBe(enPath);
      expect(resolveLocalizedPath(enPath, "es"), item.id).toBe(esPath);
    }
  });

  it("maps every market, service and course route between ES and EN", () => {
    for (const esMarket of getMarkets("es")) {
      const enMarket = getMarkets("en").find((market) => market.id === esMarket.id);
      expect(enMarket, esMarket.id).toBeDefined();

      const esMarketPath = `/es${buildMarketPath("es", esMarket.slug)}`;
      const enMarketPath = `/en${buildMarketPath("en", enMarket?.slug ?? "")}`;
      expect(resolveLocalizedPath(esMarketPath, "en"), esMarket.id).toBe(enMarketPath);
      expect(resolveLocalizedPath(enMarketPath, "es"), esMarket.id).toBe(esMarketPath);

      for (const esService of getServicesByMarket(esMarket.id, "es")) {
        const enService = getServicesByMarket(esMarket.id, "en").find(
          (service) => service.id === esService.id,
        );
        expect(enService, `${esMarket.id}:${esService.id}`).toBeDefined();

        const esPath = `/es${buildServicePath("es", esMarket.slug, esService.slug)}`;
        const enPath = `/en${buildServicePath(
          "en",
          enMarket?.slug ?? "",
          enService?.slug ?? "",
        )}`;
        expect(resolveLocalizedPath(esPath, "en"), esService.id).toBe(enPath);
        expect(resolveLocalizedPath(enPath, "es"), esService.id).toBe(esPath);
      }
    }

    for (const esCourse of getCourses("es")) {
      const enCourse = getCourses("en").find((course) => course.id === esCourse.id);
      expect(enCourse, esCourse.id).toBeDefined();

      const esPath = `/es${buildCoursePath("es", esCourse.slug)}`;
      const enPath = `/en${buildCoursePath("en", enCourse?.slug ?? "")}`;
      expect(resolveLocalizedPath(esPath, "en"), esCourse.id).toBe(enPath);
      expect(resolveLocalizedPath(enPath, "es"), esCourse.id).toBe(esPath);
    }
  });
});
