import { LandingPage } from "@/components/landing-page";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Regenera la home como máximo cada hora (evita caché de 1 año en deploys). */
export const revalidate = 3600;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LandingPage />;
}
