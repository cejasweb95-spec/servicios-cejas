import { describe, expect, it } from "vitest";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { defaultLocale, locales } from "@/i18n/routing";

describe("i18n foundation", () => {
  it("keeps Spanish as the default locale", () => {
    expect(defaultLocale).toBe("es");
    expect(locales).toEqual(["es", "en"]);
  });

  it("keeps the initial message namespaces aligned", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
    expect(Object.keys(en.Home).sort()).toEqual(Object.keys(es.Home).sort());
  });
});
