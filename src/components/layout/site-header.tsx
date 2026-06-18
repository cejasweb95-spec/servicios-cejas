import { MessageCircle } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

type ShellNavItem = {
  id: string;
  label: string;
  href: string;
};

type WhatsAppTarget = {
  id: string;
  label: string;
  phoneE164: string;
  defaultMessage: string;
};

type SiteHeaderProps = {
  contactLabel: string;
  currentLocale: Locale;
  labels: {
    closeMenu: string;
    language: string;
    mainNavigation: string;
    mobileMenuTitle: string;
    openMenu: string;
  };
  navItems: ShellNavItem[];
  whatsapp: {
    closeLabel: string;
    description: string;
    targets: WhatsAppTarget[];
    title: string;
  };
};

export function SiteHeader({
  contactLabel,
  currentLocale,
  labels,
  navItems,
  whatsapp,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/88">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          className="font-display text-xl text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          href="/"
        >
          {siteConfig.name}
        </Link>
        <nav
          aria-label={labels.mainNavigation}
          className="hidden items-center gap-1 xl:flex"
        >
          {navItems.map((item) => (
            <Link
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              href={item.href}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <LocaleSwitcher currentLocale={currentLocale} label={labels.language} />
          <WhatsAppChooser
            closeLabel={whatsapp.closeLabel}
            description={whatsapp.description}
            targets={whatsapp.targets}
            title={whatsapp.title}
            triggerLabel={contactLabel}
          >
            <Button variant="default">
              <MessageCircle aria-hidden="true" data-icon="inline-start" />
              {contactLabel}
            </Button>
          </WhatsAppChooser>
        </div>
        <div className="xl:hidden">
          <MobileNav
            closeLabel={labels.closeMenu}
            contactLabel={contactLabel}
            currentLocale={currentLocale}
            languageLabel={labels.language}
            navItems={navItems}
            navLabel={labels.mainNavigation}
            openLabel={labels.openMenu}
            title={labels.mobileMenuTitle}
            whatsapp={whatsapp}
          />
        </div>
      </div>
    </header>
  );
}
