import { LandingPage } from "@/components/landing-page";

/** Regenera la home como máximo cada hora (evita caché de 1 año en deploys). */
export const revalidate = 3600;

export default function Home() {
  return <LandingPage />;
}
