import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { getStructuredData, META_DESCRIPTION } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f4",
};

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display-next",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body-next",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cejas Internacionales | Micropigmentación Cejas, Labios y Mirada",
  description: META_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    title: "Cejas Internacionales | Micropigmentación Cejas, Labios y Mirada",
    description:
      "Próximamente: micropigmentación profesional de cejas, labios y mirada. Reserva tu cita por WhatsApp. España · Europa · Colombia.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cejas Internacionales | Micropigmentación estética",
    description:
      "Próximamente: cejas, labios y mirada con técnica internacional. Reserva por WhatsApp.",
  },
  alternates: {
    canonical: "/",
  },
  applicationName: SITE_NAME,
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getStructuredData();

  return (
    <html
      lang="es"
      className={`no-js ${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
