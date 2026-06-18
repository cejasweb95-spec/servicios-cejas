import { localeLabels } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageLinksProps = {
  currentLocale: Locale;
};

export function LanguageLinks({ currentLocale }: LanguageLinksProps) {
  return (
    <nav aria-label="Language" className="flex items-center gap-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href="/"
          locale={locale}
          aria-current={locale === currentLocale ? "page" : undefined}
          className={cn(
            "inline-flex min-h-10 items-center rounded-full px-3 text-sm font-semibold transition-colors",
            locale === currentLocale
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </nav>
  );
}
