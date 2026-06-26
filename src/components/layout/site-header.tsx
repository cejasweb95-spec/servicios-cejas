import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { DesktopNav } from "@/components/layout/desktop-nav";
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

type SiteLogo = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

type SiteHeaderProps = {
  contactLabel: string;
  currentLocale: Locale;
  logo: SiteLogo | null;
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
  logo,
  labels,
  navItems,
  whatsapp,
}: SiteHeaderProps) {
  // Menú principal reducido a 5 destinos de cliente; cuidados, contacto y
  // descargas quedan en el footer y en el CTA de WhatsApp.
  const primaryNavIds = ["services", "journeys", "training", "results", "about"];
  const primaryNavItems = navItems.filter((item) =>
    primaryNavIds.includes(item.id),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/92 shadow-soft backdrop-blur-xl supports-backdrop-filter:bg-background/86">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          aria-label={logo?.alt ?? siteConfig.name}
          className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          href="/"
        >
          {logo ? (
            <Image
              alt={logo.alt}
              className="h-10 w-auto transition-transform duration-300 motion-reduce:transition-none sm:h-11"
              height={logo.height}
              priority
              sizes="220px"
              src={logo.src}
              width={logo.width}
            />
          ) : (
            <span className="font-display text-xl text-foreground">
              {siteConfig.name}
            </span>
          )}
        </Link>
        <DesktopNav
          currentLocale={currentLocale}
          items={primaryNavItems}
          label={labels.mainNavigation}
        />
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
            navItems={primaryNavItems}
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
