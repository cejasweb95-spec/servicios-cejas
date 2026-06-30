import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  primaryNavigationIds,
  resolveNavItems,
  secondaryNavigationIds,
  type ResolvedNavItem,
} from "@/config/navigation";
import { type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

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
    moreNavigation: string;
    openMenu: string;
    secondaryNavigation: string;
  };
  navItems: ResolvedNavItem[];
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
  const primaryNavItems = resolveNavItems(navItems, primaryNavigationIds);
  const secondaryNavItems = resolveNavItems(navItems, secondaryNavigationIds);

  return (
    <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/92 shadow-soft backdrop-blur-xl supports-backdrop-filter:bg-background/86">
      <div className="mx-auto flex min-h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:min-h-20 sm:px-8 sm:py-4 xl:min-h-[4.75rem] xl:py-3.5">
        <Link
          aria-label={logo?.alt ?? siteConfig.name}
          className="inline-flex min-h-14 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          data-slot="site-logo-link"
          href="/"
        >
          {logo ? (
            <Image
              alt={logo.alt}
              className="h-14 w-auto max-w-[min(18rem,calc(100vw-8rem))] motion-safe:transition-[height,max-width] motion-reduce:transition-none sm:h-16 sm:max-w-[min(20rem,calc(100vw-9.5rem))] xl:h-14 xl:max-w-64"
              data-slot="site-logo"
              height={logo.height}
              priority
              sizes="(max-width: 1279px) 360px, 300px"
              src={logo.src}
              width={logo.width}
            />
          ) : (
            <span className="font-display text-lg text-foreground">
              {siteConfig.name}
            </span>
          )}
        </Link>
        <DesktopNav
          currentLocale={currentLocale}
          items={primaryNavItems}
          label={labels.mainNavigation}
          moreLabel={labels.moreNavigation}
          secondaryItems={secondaryNavItems}
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
            secondaryItems={secondaryNavItems}
            secondaryNavLabel={labels.secondaryNavigation}
            title={labels.mobileMenuTitle}
            whatsapp={whatsapp}
          />
        </div>
      </div>
    </header>
  );
}
