import { ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import {
  getLegalProfile,
  getSocialLinks,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";

type ContactPageCopy = {
  addressLabel: string;
  breadcrumbsLabel: string;
  description: string;
  emailLabel: string;
  eyebrow: string;
  homeLabel: string;
  noFormNote: string;
  socialLabel: string;
  title: string;
  whatsappLabel: string;
};

type ContactPageProps = {
  copy: ContactPageCopy;
  locale: Locale;
  path: string;
};

export function ContactPage({ copy, locale, path }: ContactPageProps) {
  const legalProfile = getLegalProfile(locale);
  const whatsappTargets = getWhatsAppTargets(locale);
  const socialLinks = getSocialLinks();
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.title, path: `/${locale}${path}` },
  ]);
  const pageJsonLd = buildWebPageJsonLd({
    description: copy.description,
    locale,
    path,
    title: copy.title,
  });

  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Section>
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section aria-labelledby="contact-whatsapp" className="grid gap-4">
              <h2
                className="font-display text-4xl leading-tight text-foreground"
                id="contact-whatsapp"
              >
                {copy.whatsappLabel}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {copy.noFormNote}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {whatsappTargets.map((target) => (
                  <Button
                    asChild
                    className="min-h-14 justify-start whitespace-normal rounded-lg px-4 py-3"
                    key={target.id}
                    variant={target.id === "colombia" ? "outline" : "whatsapp"}
                  >
                    <a
                      href={buildWhatsAppHref(
                        target.phoneE164,
                        target.defaultMessage,
                      )}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <MessageCircle aria-hidden="true" data-icon="inline-start" />
                      <span className="grid gap-0.5 text-left">
                        <span>{target.label}</span>
                        <span className="text-xs opacity-80">
                          +{target.phoneE164}
                        </span>
                      </span>
                      <ExternalLink aria-hidden="true" data-icon="inline-end" />
                    </a>
                  </Button>
                ))}
              </div>
            </section>
            <aside className="grid gap-4">
              <section className="rounded-xl border border-border bg-surface p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Mail aria-hidden="true" className="size-4" />
                  {copy.emailLabel}
                </h2>
                <a
                  className="mt-3 inline-flex text-sm font-semibold text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={`mailto:${legalProfile.email}`}
                >
                  {legalProfile.email}
                </a>
              </section>
              <section className="rounded-xl border border-border bg-surface p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <MapPin aria-hidden="true" className="size-4" />
                  {copy.addressLabel}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {legalProfile.address}
                </p>
                <p className="mt-2 text-xs font-semibold text-primary-text">
                  {legalProfile.note}
                </p>
              </section>
              <section className="rounded-xl border border-border bg-surface p-5">
                <h2 className="text-sm font-bold text-foreground">
                  {copy.socialLabel}
                </h2>
                <ul className="mt-3 grid gap-2 text-sm">
                  {socialLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        className="inline-flex items-center gap-2 font-semibold text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                        <ExternalLink aria-hidden="true" className="size-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
