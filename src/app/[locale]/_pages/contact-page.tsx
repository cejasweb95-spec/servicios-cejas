import { ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react";

import { MapEmbed } from "@/components/domain/map-embed";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { EditorialImagePair } from "@/components/primitives/editorial-image-pair";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import {
  getLegalProfile,
  getMediaAssetById,
  getSocialLinks,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";
import { formatPhoneNumber } from "@/lib/format/phone";

type ContactPageCopy = {
  addressLabel: string;
  breadcrumbsLabel: string;
  description: string;
  emailLabel: string;
  eyebrow: string;
  homeLabel: string;
  mapDirectionsLabel: string;
  mapHint: string;
  mapLoadLabel: string;
  mapTitle: string;
  noFormNote: string;
  socialLabel: string;
  title: string;
  whatsappLabel: string;
};

// URL base del iframe de Google Maps del estudio físico en Cali (dato
// confirmado por el negocio). El parámetro hl/gl se parametriza con el locale
// del usuario para que la UI de Maps se muestre en su idioma.
const GOOGLE_MAPS_EMBED_BASE =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.6705292416235!2d-76.537424!3d3.4273577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a7737d12df83%3A0xd8e8aad2dad12003!2scejas%20internacionales!5e0";

function buildMapsEmbedSrc(locale: Locale): string {
  const hl = locale === "en" ? "en" : "es";
  const gl = locale === "en" ? "us" : "es";
  return `${GOOGLE_MAPS_EMBED_BASE}!3m2!1i${hl}!2i${gl}!4v1781878647481!5m2!1i${hl}!2i${gl}`;
}

type ContactPageProps = {
  copy: ContactPageCopy;
  locale: Locale;
  path: string;
};

export function ContactPage({ copy, locale, path }: ContactPageProps) {
  const legalProfile = getLegalProfile(locale);
  const whatsappTargets = getWhatsAppTargets(locale);
  const socialLinks = getSocialLinks();
  const primaryImage = getMediaAssetById("xiomara-retrato-rosa", locale);
  const secondaryImage = getMediaAssetById("estudio-cabina-certificados", locale);
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
        aside={
          primaryImage?.publicPath && secondaryImage?.publicPath ? (
            <EditorialImagePair
              primary={primaryImage}
              priority
              secondary={secondaryImage}
            />
          ) : undefined
        }
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Section tone="muted">
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal direction="left">
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
                        <span className="text-sm opacity-80">
                          {formatPhoneNumber(target.phoneE164)}
                        </span>
                      </span>
                      <ExternalLink aria-hidden="true" data-icon="inline-end" />
                    </a>
                  </Button>
                ))}
              </div>
              </section>
            </Reveal>
            <Reveal delay={0.04} direction="right">
              <aside className="overflow-hidden rounded-2xl bg-surface-muted">
              <section className="border-b border-primary/15 p-6">
                <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Mail aria-hidden="true" className="size-4" />
                  {copy.emailLabel}
                </h2>
                <a
                  className="mt-2 inline-flex min-h-11 items-center break-all text-sm font-semibold text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                  href={`mailto:${legalProfile.email}`}
                >
                  {legalProfile.email}
                </a>
              </section>
              <section className="grid gap-4 border-b border-primary/15 p-6">
                <div>
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
                </div>
                <MapEmbed
                  directionsHref={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${legalProfile.brandName}, ${legalProfile.address}`,
                  )}`}
                  directionsLabel={copy.mapDirectionsLabel}
                  hint={copy.mapHint}
                  loadLabel={copy.mapLoadLabel}
                  src={buildMapsEmbedSrc(locale)}
                  title={copy.mapTitle}
                />
              </section>
              <section className="p-6">
                <h2 className="text-sm font-bold text-foreground">
                  {copy.socialLabel}
                </h2>
                <ul className="mt-3 grid gap-2 text-sm">
                  {socialLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
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
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
