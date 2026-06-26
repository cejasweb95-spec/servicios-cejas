import Image from "next/image";
import { Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { CookiePreferencesLink } from "@/components/layout/cookie-preferences-link";
import { FooterSocialLinks } from "@/components/layout/footer-social-links";
import { CountryFlag } from "@/components/primitives/country-flag";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import type { MarketId } from "@/lib/content/schema";

type FooterNavItem = {
  id: string;
  label: string;
  href: string;
};

type FooterNavGroup = {
  id: string;
  label: string;
  items: FooterNavItem[];
};

type FooterMarket = {
  id: MarketId;
  href: string;
  label: string;
};

type LegalProfile = {
  ownerName: string;
  taxId: string;
  address: string;
  email: string;
  note: string;
};

type SocialLink = {
  id: string;
  label: string;
  href: string;
};

type WhatsAppTarget = {
  id: string;
  label: string;
  phoneE164: string;
};

type FooterLogo = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

type SiteFooterProps = {
  labels: {
    contact: string;
    cookiePreferences: string;
    legal: string;
    legalData: string;
    markets: string;
    rights: string;
    social: string;
    studioNote: string;
    tagline: string;
  };
  logo: FooterLogo | null;
  legalItems: FooterNavItem[];
  legalProfile: LegalProfile;
  marketItems: FooterMarket[];
  navGroups: FooterNavGroup[];
  socialLinks: SocialLink[];
  whatsappTargets: WhatsAppTarget[];
};

export function SiteFooter({
  labels,
  logo,
  legalItems,
  legalProfile,
  marketItems,
  navGroups,
  socialLinks,
  whatsappTargets,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-primary/20 bg-linear-to-b from-primary/7 via-surface-muted to-surface-muted">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          <div className="lg:col-span-5">
            {logo ? (
              <Image
                alt={logo.alt}
                className="h-9 w-auto"
                height={logo.height}
                sizes="240px"
                src={logo.src}
                width={logo.width}
              />
            ) : (
              <p className="font-display text-xl text-foreground">
                {siteConfig.name}
              </p>
            )}
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              {labels.tagline}
            </p>

            <div className="mt-5">
              <h2 className="font-display text-[0.6875rem] uppercase tracking-[0.16em] text-foreground">
                {labels.markets}
              </h2>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {marketItems.map((market) => (
                  <li key={market.id}>
                    <Link
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground shadow-soft transition-colors hover:border-primary hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                      href={market.href}
                    >
                      <CountryFlag
                        className="h-3.5 w-5 shrink-0"
                        market={market.id}
                      />
                      {market.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="mt-5 border-l-2 border-primary pl-3.5 text-sm leading-5 text-primary-text">
              {labels.studioNote}
            </blockquote>

            <div className="mt-5 text-sm leading-5 text-muted-foreground">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                {labels.legalData}
              </p>
              <p className="mt-2">{legalProfile.ownerName}</p>
              <p>{legalProfile.taxId}</p>
              <p>{legalProfile.address}</p>
            </div>
          </div>

          {navGroups.map((group) => (
            <nav
              aria-label={group.label}
              className="lg:col-span-2"
              key={group.id}
            >
              <h2 className="font-display text-[0.6875rem] uppercase tracking-[0.16em] text-foreground">
                {group.label}
              </h2>
              <ul className="mt-3 grid gap-0.5">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="inline-flex min-h-8 items-center text-sm text-muted-foreground transition-colors hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="font-display text-[0.6875rem] uppercase tracking-[0.16em] text-foreground">
              {labels.contact}
            </h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  className="group/contact inline-flex min-h-9 min-w-0 items-center gap-2 transition-colors hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={`mailto:${legalProfile.email}`}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-surface text-primary-text transition-colors group-hover/contact:border-primary group-hover/contact:bg-primary/8">
                    <Mail aria-hidden="true" className="size-3.5" />
                  </span>
                  <span className="break-all">{legalProfile.email}</span>
                </a>
              </li>
              {whatsappTargets.map((target) => (
                <li key={target.id}>
                  <a
                    className="group/contact inline-flex min-h-9 items-center gap-2 transition-colors hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                    href={`https://wa.me/${target.phoneE164}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-surface text-primary-text transition-colors group-hover/contact:border-primary group-hover/contact:bg-primary/8">
                      <WhatsAppIcon className="size-3.5" />
                    </span>
                    {target.label}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-6 font-display text-[0.6875rem] uppercase tracking-[0.16em] text-foreground">
              {labels.social}
            </h2>
            <div className="mt-3">
              <FooterSocialLinks links={socialLinks} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/80 bg-surface/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. {labels.rights}
          </p>
          <nav aria-label={labels.legal}>
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs">
              {legalItems.map((item, index) => (
                <li className="inline-flex items-center" key={item.id}>
                  {index > 0 ? (
                    <span aria-hidden="true" className="mx-2 text-border">
                      ·
                    </span>
                  ) : null}
                  <Link
                    className="text-muted-foreground transition-colors hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="inline-flex items-center">
                <span aria-hidden="true" className="mx-2 text-border">
                  ·
                </span>
                <CookiePreferencesLink label={labels.cookiePreferences} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
