"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const SLIDE_MS = 320;

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [pendingLocale, setPendingLocale] = useState<AppLocale | null>(null);

  const activeLocale = pendingLocale ?? locale;
  const activeIndex = routing.locales.indexOf(activeLocale);
  const isSwitching = pendingLocale !== null;

  useEffect(() => {
    setPendingLocale(null);
  }, [locale]);

  const switchLocale = useCallback(
    (code: AppLocale) => {
      if (code === locale || isSwitching) return;

      setPendingLocale(code);

      const navigate = () => router.replace(pathname, { locale: code });

      if (prefersReducedMotion) {
        navigate();
        return;
      }

      globalThis.setTimeout(navigate, SLIDE_MS);
    },
    [isSwitching, locale, pathname, prefersReducedMotion, router],
  );

  return (
    <div className="lang-switch" role="group" aria-label={t("label")}>
      <motion.span
        className="lang-switch__indicator"
        aria-hidden="true"
        initial={false}
        animate={{ x: `${activeIndex * 100}%` }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 34, mass: 0.75 }
        }
      />
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__btn${code === activeLocale ? " lang-switch__btn--active" : ""}`}
          aria-current={code === locale ? "true" : undefined}
          aria-label={t("switchTo", { language: t(code) })}
          aria-busy={isSwitching && code === pendingLocale}
          disabled={isSwitching}
          onClick={() => switchLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
