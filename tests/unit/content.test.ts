import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

import {
  getDownloads,
  getDownloadsByMarket,
  getMediaAssets,
  getServicesByMarket,
} from "@/lib/content/queries";
import { assertMarketOfferRules, validateContent } from "@/lib/content/validators";
import type { Service } from "@/lib/content/schema";
import { buildWhatsAppUrl } from "@/lib/whatsapp/build-whatsapp-url";

describe("content data layer", () => {
  it("validates the full local content dataset", () => {
    expect(validateContent()).toBe(true);
  });

  it("keeps service currencies scoped to each market", () => {
    expect(
      getServicesByMarket("colombia", "es").every((service) =>
        service.offers.every((offer) => offer.price.currency === "COP"),
      ),
    ).toBe(true);

    expect(
      getServicesByMarket("suiza", "es").every((service) =>
        service.offers.every((offer) => offer.price.currency === "CHF"),
      ),
    ).toBe(true);
  });

  it("does not expose Switzerland-forbidden services", () => {
    const swissServices = getServicesByMarket("suiza", "es");
    const swissIds = swissServices.map((service) => service.id);

    expect(swissIds).not.toContain("hidralips-tres-sesiones");
    expect(swissIds).not.toContain("hidralips-una-sesion");
    expect(swissIds).not.toContain("correccion-cejas");
    expect(swissServices.some((service) => service.categoryId === "depilacion-corporal")).toBe(
      false,
    );
  });

  it("fails validation if HidraLips is added to Switzerland", () => {
    const invalidService: Service = {
      id: "hidralips-tres-sesiones",
      slug: { es: "hidralips-tres-sesiones", en: "hidralips-three-sessions" },
      categoryId: "labios",
      name: { es: "HidraLips", en: "HidraLips" },
      shortDescription: { es: "No disponible en Suiza", en: "Not available in Switzerland" },
      featured: false,
      offers: [
        {
          marketId: "suiza",
          price: { amount: 100, currency: "CHF" },
          appointmentDuration: {
            minutes: 60,
            label: { es: "1 hora", en: "1 hour" },
          },
          addons: [],
        },
      ],
    };

    expect(() => assertMarketOfferRules({ services: [invalidService] })).toThrow(
      /must not be available in Switzerland/,
    );
  });

  it("keeps catalog downloads as one market-level asset", () => {
    const colombiaDownloads = getDownloadsByMarket("colombia", "es");

    expect(colombiaDownloads).toHaveLength(1);
    expect(colombiaDownloads[0]?.id).toBe("catalogo-colombia-cop");
  });

  it("keeps registered download files available in public", () => {
    for (const download of getDownloads("es")) {
      const filePath = path.join(process.cwd(), "public", download.publicPath);

      expect(existsSync(filePath), `${download.publicPath} should exist`).toBe(true);
      expect(statSync(filePath).size).toBe(download.fileSizeBytes);
    }
  });

  it("keeps registered public media files available", () => {
    for (const media of getMediaAssets().filter((item) => item.publicPath)) {
      const filePath = path.join(process.cwd(), "public", media.publicPath ?? "");

      expect(existsSync(filePath), `${media.publicPath} should exist`).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(0);
    }
  });

  it("builds encoded WhatsApp links", () => {
    const href = buildWhatsAppUrl({
      phoneE164: "573167742299",
      locale: "es",
      message: {
        es: "Hola, quiero información sobre cejas.",
        en: "Hello, I want information about brows.",
      },
    });

    expect(href).toBe(
      "https://wa.me/573167742299?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20cejas.",
    );
  });
});
