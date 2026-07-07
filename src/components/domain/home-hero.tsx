import Image from "next/image";

import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import {
  HeroItem,
  HeroMedia,
  HeroParallax,
  HeroStage,
} from "@/components/motion/hero-reveal";
import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { RoseWash } from "@/components/primitives/rose-wash";
import { Section } from "@/components/primitives/section";

type HeroImage = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

type HomeHeroCopy = {
  aboutCta: string;
  bioParagraphs: string[];
  eyebrow: string;
  lead: string;
  marketsLine: string;
  primaryCta: string;
  servicesCta: string;
  title: string;
};

type WhatsAppChooserProps = {
  closeLabel: string;
  description: string;
  targets: {
    id: string;
    label: string;
    phoneE164: string;
    defaultMessage: string;
  }[];
  title: string;
  triggerLabel: string;
};

type HomeHeroProps = {
  aboutHref: string;
  copy: HomeHeroCopy;
  heroImage: HeroImage;
  servicesHref: string;
  whatsapp: Omit<WhatsAppChooserProps, "triggerLabel">;
};

export function HomeHero({
  aboutHref,
  copy,
  heroImage,
  servicesHref,
  whatsapp,
}: HomeHeroProps) {
  return (
    <Section
      className="border-b border-primary/20"
      id="apertura"
      spacing="loose"
      tone="strong"
    >
      <RoseWash accent="corner">
        <HeroStage>
          <Container className="grid min-h-0 items-center gap-10 py-10 sm:gap-12 sm:py-16 lg:min-h-[calc(88dvh-5rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.88fr)] lg:gap-14 lg:py-20">
            <HeroMedia className="relative order-first mx-auto w-full max-w-[18.5rem] sm:max-w-[22rem] lg:order-none lg:justify-self-end lg:max-w-[26rem] xl:max-w-[28rem]">
              <HeroParallax className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-[1.35rem] bg-linear-to-br from-primary/12 via-transparent to-primary/6 sm:-inset-4"
                />
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] ring-1 ring-primary/10">
                  <Image
                    alt={heroImage.alt}
                    className="h-full w-full object-cover object-[center_28%]"
                    height={heroImage.height}
                    priority
                    sizes="(min-width: 1280px) 28vw, (min-width: 640px) 42vw, 88vw"
                    src={heroImage.src}
                    width={heroImage.width}
                  />
                </div>
              </HeroParallax>
            </HeroMedia>

            <HeroItem className="order-last max-w-2xl lg:order-none lg:max-w-none lg:py-2">
              <div className="border-l-2 border-primary/70 pl-4 sm:pl-5">
                <Eyebrow className="mb-3 tracking-[0.16em]">{copy.eyebrow}</Eyebrow>
                <h1 className="text-balance font-display text-[1.85rem] leading-[1.08] text-foreground sm:text-5xl lg:text-[3.35rem]">
                  {copy.title}
                </h1>
              </div>

              <p className="mt-5 max-w-xl text-pretty font-display text-xl leading-snug text-primary-text sm:text-2xl">
                {copy.lead}
              </p>

              <div className="mt-6 grid max-w-2xl gap-4 border-y border-primary/15 py-6">
                {copy.bioParagraphs.map((paragraph) => (
                  <p
                    className="text-pretty text-base leading-8 text-muted-foreground sm:text-[1.05rem]"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/75">
                {copy.marketsLine}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <WhatsAppChooser {...whatsapp} triggerLabel={copy.primaryCta} />
                <ButtonLink href={aboutHref} variant="outline">
                  {copy.aboutCta}
                </ButtonLink>
                <ButtonLink
                  className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-primary-text hover:underline"
                  href={servicesHref}
                  variant="ghost"
                >
                  {copy.servicesCta}
                </ButtonLink>
              </div>
            </HeroItem>
          </Container>
        </HeroStage>
      </RoseWash>
    </Section>
  );
}
