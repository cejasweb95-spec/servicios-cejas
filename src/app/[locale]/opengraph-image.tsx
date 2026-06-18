import { ImageResponse } from "next/og";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { isLocale, type Locale } from "@/i18n/routing";

export const alt =
  "Cejas Internacionales - micropigmentation, beauty services and training";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const copy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    markets: string;
  }
> = {
  es: {
    eyebrow: "Sede en Cali - jornadas internacionales",
    title: siteConfig.name,
    description:
      "Micropigmentacion, belleza especializada y formaciones profesionales.",
    markets: "Colombia - Espana - Suiza",
  },
  en: {
    eyebrow: "Cali studio - international appointments",
    title: siteConfig.name,
    description:
      "Micropigmentation, specialized beauty services and professional training.",
    markets: "Colombia - Spain - Switzerland",
  },
};

type OpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : siteConfig.defaultLocale;
  const localized = copy[locale];

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
          padding: 56,
          width: "100%",
        }}
      >
        <div
          style={{
            background: brandColors.background,
            border: `2px solid ${brandColors.primarySoft}`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: 56,
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 18 }}>
            <div
              style={{
                background: brandColors.primary,
                height: 14,
                width: 88,
              }}
            />
            <span
              style={{
                color: brandColors.primaryHover,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 0,
              }}
            >
              {localized.eyebrow}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <h1
              style={{
                color: brandColors.foreground,
                fontSize: 96,
                fontWeight: 400,
                letterSpacing: 0,
                lineHeight: 0.95,
                margin: 0,
                maxWidth: 860,
              }}
            >
              {localized.title}
            </h1>
            <p
              style={{
                color: brandColors.primaryHover,
                fontSize: 36,
                fontWeight: 500,
                lineHeight: 1.2,
                margin: 0,
                maxWidth: 900,
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
              fontSize: 30,
              justifyContent: "space-between",
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
