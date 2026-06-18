import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { CookiePreferencesLink } from "@/components/layout/cookie-preferences-link";

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
  legalItems: FooterNavItem[];
  legalProfile: LegalProfile;
  navItems: FooterNavItem[];
  socialLinks: SocialLink[];
  whatsappTargets: WhatsAppTarget[];
};

export function SiteFooter({
  labels,
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
          <p className="font-display text-2xl text-foreground">{siteConfig.name}</p>
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
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <li>
              <a
                className="hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                href={`mailto:${legalProfile.email}`}
              >
                {legalProfile.email}
              </a>
            </li>
            {whatsappTargets.map((target) => (
              <li key={target.id}>
                <a
                  className="hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={`https://wa.me/${target.phoneE164}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {target.label}: +{target.phoneE164}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-bold text-foreground">{labels.social}</h2>
          <ul className="mt-4 grid gap-2">
            {socialLinks.map((item) => (
              <li key={item.id}>
                <a
                  className="text-sm text-muted-foreground hover:text-primary-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={item.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              </li>
            ))}
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
