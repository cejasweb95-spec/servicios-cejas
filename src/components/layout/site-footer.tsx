import Image from "next/image";
import { Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { CookiePreferencesLink } from "@/components/layout/cookie-preferences-link";
import { WhatsAppIcon, brandIcons } from "@/components/icons/brand-icons";

type FooterNavItem = {
  id: string;
  label: string;
  href: string;
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
    legal: string;
    legalData: string;
    navigation: string;
    cookiePreferences: string;
    rights: string;
    social: string;
    studioNote: string;
    tagline: string;
  };
  logo: FooterLogo | null;
  legalItems: FooterNavItem[];
  legalProfile: LegalProfile;
  navItems: FooterNavItem[];
  socialLinks: SocialLink[];
  whatsappTargets: WhatsAppTarget[];
};

export function SiteFooter({
  labels,
  logo,
  legalItems,
  legalProfile,
  navItems,
  socialLinks,
  whatsappTargets,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div className="max-w-xl">
          {logo ? (
            <Image
              alt={logo.alt}
              className="h-11 w-auto"
              height={logo.height}
              sizes="240px"
              src={logo.src}
              width={logo.width}
            />
          ) : (
            <p className="font-display text-2xl text-foreground">
              {siteConfig.name}
            </p>
          )}
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {labels.tagline}
          </p>
          <p className="mt-4 text-sm font-semibold text-primary-text">
            {labels.studioNote}
          </p>
          <div className="mt-6 text-sm leading-6 text-muted-foreground">
            <p>{legalProfile.ownerName}</p>
            <p>{legalProfile.taxId}</p>
            <p>{legalProfile.address}</p>
          </div>
        </div>
        <nav aria-label={labels.navigation}>
          <h2 className="text-sm font-bold text-foreground">{labels.navigation}</h2>
          <ul className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  className="text-sm text-muted-foreground hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold text-foreground">{labels.contact}</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <li>
              <a
                className="group/contact inline-flex items-center gap-2.5 hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                href={`mailto:${legalProfile.email}`}
              >
                <span className="grid size-9 place-items-center rounded-full border border-border bg-surface text-primary-text transition-colors group-hover/contact:border-primary group-hover/contact:bg-surface-muted">
                  <Mail aria-hidden="true" className="size-4" />
                </span>
                {legalProfile.email}
              </a>
            </li>
            {whatsappTargets.map((target) => (
              <li key={target.id}>
                <a
                  className="group/contact inline-flex items-center gap-2.5 hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={`https://wa.me/${target.phoneE164}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="grid size-9 place-items-center rounded-full border border-border bg-surface text-primary-text transition-colors group-hover/contact:border-primary group-hover/contact:bg-surface-muted">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  {target.label}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-bold text-foreground">{labels.social}</h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {socialLinks.map((item) => {
              const Icon = brandIcons[item.id as keyof typeof brandIcons];

              return (
                <li key={item.id}>
                  <a
                    aria-label={item.label}
                    className="grid size-11 place-items-center rounded-full border border-border bg-surface text-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 motion-reduce:transform-none"
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {Icon ? <Icon className="size-5" /> : item.label}
                    <span className="sr-only">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">{labels.legal}</h2>
          <ul className="mt-4 grid gap-2">
            {legalItems.map((item) => (
              <li key={item.id}>
                <Link
                  className="text-sm text-muted-foreground hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <CookiePreferencesLink label={labels.cookiePreferences} />
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 sm:px-8">
        <p className="mx-auto max-w-7xl text-xs text-muted-foreground">
          © {year} {siteConfig.name}. {labels.rights}
        </p>
      </div>
    </footer>
  );
}
