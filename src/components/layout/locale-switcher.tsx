"use client";

import { usePathname } from "next/navigation";

import { localeLabels } from "@/config/site";
import { locales, type Locale } from "@/i18n/routing";
import { resolveLocalizedPath } from "@/lib/i18n/alternate-path";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  label: string;
  onNavigate?: () => void;
};

export function LocaleSwitcher({
  currentLocale,
  label,
  onNavigate,
}: LocaleSwitcherProps) {
  const pathname = usePathname() || `/${currentLocale}`;

  return (
    <nav
      aria-label={label}
      className="flex items-center gap-1 rounded-full border border-border bg-surface p-1"
    >
      {locales.map((locale) => {
        const href = resolveLocalizedPath(pathname, locale);

        return (
          <a
            aria-current={locale === currentLocale ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
              locale === currentLocale
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            href={href}
            hrefLang={locale}
            key={locale}
            onClick={onNavigate}
          >
            {localeLabels[locale]}
          </a>
        );
      })}
    </nav>
  );
}
