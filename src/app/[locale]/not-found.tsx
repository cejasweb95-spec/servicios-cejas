import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/primitives/button-link";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="grid min-h-dvh place-items-center px-5 py-16">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-5xl text-foreground">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
        <div className="mt-8">
          <ButtonLink href="/">{t("cta")}</ButtonLink>
        </div>
      </div>
    </main>
  );
}
