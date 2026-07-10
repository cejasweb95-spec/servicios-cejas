import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/routing";

export const alt =
  "Cejas Internacionales — micropigmentation & brow design / micropigmentación y diseño de cejas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const copy: Record<
  Locale,
  {
    eyebrow: string;
    description: string;
    markets: string;
  }
> = {
  es: {
    eyebrow: "Micropigmentación y diseño de cejas",
    description:
      "Belleza especializada y formación profesional. Cali y Puerto de Sagunto.",
    markets: "Colombia · España · Suiza",
  },
  en: {
    eyebrow: "Micropigmentation and brow design",
    description:
      "Specialized beauty and professional training. Cali and Puerto de Sagunto.",
    markets: "Colombia · Spain · Switzerland",
  },
};

type OpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

async function loadLogoDataUrl() {
  const logoPath = join(
    process.cwd(),
    "public/images/brand/logo-oficial-sin-fondo.png",
  );
  const buffer = await readFile(logoPath);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : siteConfig.defaultLocale;
  const localized = copy[locale];
  const logoSrc = await loadLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: brandColors.surfaceMuted,
          color: brandColors.foreground,
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 48,
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: brandColors.background,
            border: `2px solid ${brandColors.primarySoft}`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "40px 56px 48px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              alt=""
              src={logoSrc}
              style={{
                height: 220,
                objectFit: "contain",
                width: 920,
              }}
            />
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              textAlign: "center",
              width: "100%",
            }}
          >
            <span
              style={{
                color: brandColors.primaryHover,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 0.4,
              }}
            >
              {localized.eyebrow}
            </span>
            <p
              style={{
                color: brandColors.foreground,
                fontSize: 34,
                fontWeight: 500,
                lineHeight: 1.25,
                margin: 0,
                maxWidth: 980,
              }}
            >
              {localized.description}
            </p>
          </div>

          <div
            style={{
              alignItems: "center",
              color: brandColors.foreground,
              display: "flex",
              fontSize: 28,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>{localized.markets}</span>
            <span style={{ color: brandColors.primaryHover }}>
              {siteConfig.email}
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
