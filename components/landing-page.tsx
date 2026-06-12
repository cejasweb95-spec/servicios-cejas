"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FadeInView } from "./fade-in-view";
import { InstagramInvite } from "./instagram-invite";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";
import { MotionButton } from "./motion-button";
import { SocialLinks } from "./social-links";
import { Link } from "@/i18n/navigation";
import { getWhatsAppUrl, INSTAGRAM_URL } from "@/lib/config";

const richTags = {
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
};

export function LandingPage() {
  const t = useTranslations();
  const whatsappUrl = getWhatsAppUrl(t("whatsapp.prefill"));

  const eyebrowServices = t.raw("services.eyebrows.items") as string[];
  const lipServices = t.raw("services.lips.items") as string[];
  const eyeServices = t.raw("services.eyes.items") as string[];

  return (
    <>
      <div className="bg-shapes" aria-hidden="true">
        <div className="bg-shapes__orb bg-shapes__orb--1" />
        <div className="bg-shapes__orb bg-shapes__orb--2" />
        <div className="bg-shapes__orb bg-shapes__orb--3" />
      </div>

      <header className="header">
        <div className="container header__inner">
          <Link href="/" className="logo" aria-label={t("common.logoAria")}>
            Cejas <span>Internacionales</span>
          </Link>
          <div className="header__actions">
            <LanguageSwitcher />
            <nav aria-label={t("common.navSocial")}>
              <SocialLinks whatsappUrl={whatsappUrl} />
            </nav>
          </div>
        </div>
      </header>

      <main id="contenido-principal">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <div className="hero__content">
              <p className="hero__tag">{t("hero.tag")}</p>
              <h1 id="hero-title" className="hero__title">
                {t.rich("hero.title", richTags)}
              </h1>
              <p className="hero__subtitle">
                {t.rich("hero.subtitle", richTags)}
              </p>
              <div className="hero__actions btn-group">
                <MotionButton
                  href={whatsappUrl}
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  {t("whatsapp.reserve")}
                </MotionButton>
                <MotionButton href="#servicios" className="btn btn--secondary">
                  {t("hero.viewServices")}
                </MotionButton>
              </div>
              <p className="hero__urgency">{t("hero.urgency")}</p>
              <div className="hero__social">
                <InstagramInvite compact />
              </div>
            </div>
            <div className="hero__accent" aria-hidden="true" />
          </div>
        </section>

        <section className="section" aria-labelledby="coming-title">
          <div className="container">
            <FadeInView className="coming-soon motion-reveal">
              <p className="section__label">{t("coming.label")}</p>
              <h2 id="coming-title" className="section__title">
                {t("coming.title")}
              </h2>
              <p className="section__text">
                {t.rich("coming.text", richTags)}
              </p>
              <div
                className="coming-soon__badge"
                role="status"
                aria-label={t("coming.badgeAria")}
              >
                <span>{t("coming.badge")}</span>
                <span className="coming-soon__dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <InstagramInvite />
            </FadeInView>
          </div>
        </section>

        <section
          id="servicios"
          className="section section--alt"
          aria-labelledby="services-title"
        >
          <div className="container">
            <FadeInView as="header" className="section__header motion-reveal">
              <p className="section__label">{t("services.label")}</p>
              <h2 id="services-title" className="section__title">
                {t("services.title")}
              </h2>
              <p className="section__text">{t("services.text")}</p>
            </FadeInView>

            <div className="services-grid">
              <ServiceGroup
                letter="A"
                title={t("services.eyebrows.title")}
                services={eyebrowServices}
                delay={0.1}
              />
              <ServiceGroup
                letter="B"
                title={t("services.lips.title")}
                services={lipServices}
                delay={0.2}
              />
              <ServiceGroup
                letter="C"
                title={t("services.eyes.title")}
                services={eyeServices}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="trust-title">
          <div className="container">
            <FadeInView as="header" className="section__header motion-reveal">
              <p className="section__label">{t("trust.label")}</p>
              <h2 id="trust-title" className="section__title">
                {t("trust.title")}
              </h2>
            </FadeInView>

            <div className="trust-grid">
              {(["01", "02", "03", "04"] as const).map((id, index) => (
                <TrustCard
                  key={id}
                  number={id}
                  title={t(`trust.cards.${id}.title`)}
                  text={t(`trust.cards.${id}.text`)}
                  delay={0.1 * (index + 1)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="cta-title">
          <div className="container">
            <FadeInView className="cta motion-reveal">
              <h2 id="cta-title" className="cta__title">
                {t("cta.title")}
              </h2>
              <p className="cta__text">{t("cta.text")}</p>
              <div className="cta__actions btn-group">
                <MotionButton
                  href={whatsappUrl}
                  className="btn btn--gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("whatsapp.write")}
                </MotionButton>
                <MotionButton
                  href={INSTAGRAM_URL}
                  className="btn btn--instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  {t("instagram.view")}
                </MotionButton>
              </div>
            </FadeInView>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer__brand">{t("common.brandName")}</p>
          <p className="footer__tagline">{t("footer.tagline")}</p>
          <p className="footer__regions">{t("common.regions")}</p>
          <p className="footer__phone">
            <a href="tel:+34603804837">{t("common.phone")}</a>
          </p>
          <SocialLinks whatsappUrl={whatsappUrl} variant="footer" />
          <p className="footer__note">{t("footer.note")}</p>
        </div>
      </footer>

      <motion.a
        href={whatsappUrl}
        className="whatsapp-float motion-reveal"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsapp.floatAria")}
        initial={{ opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <WhatsAppIcon size={28} />
        <span className="whatsapp-float__label">{t("whatsapp.floatLabel")}</span>
      </motion.a>
    </>
  );
}

function ServiceGroup({
  letter,
  title,
  services,
  delay = 0,
}: {
  letter: string;
  title: string;
  services: string[];
  delay?: number;
}) {
  return (
    <FadeInView as="article" className="service-group motion-reveal" delay={delay}>
      <h3 className="service-group__title">
        <span className="service-group__icon" aria-hidden="true">
          {letter}
        </span>
        {title}
      </h3>
      <div className="service-chips">
        {services.map((service) => (
          <span key={service} className="chip">
            {service}
          </span>
        ))}
      </div>
    </FadeInView>
  );
}

function TrustCard({
  number,
  title,
  text,
  delay = 0,
}: {
  number: string;
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <FadeInView as="article" className="trust-card motion-reveal" delay={delay}>
      <p className="trust-card__number" aria-hidden="true">
        {number}
      </p>
      <h3 className="trust-card__title">{title}</h3>
      <p className="trust-card__text">{text}</p>
    </FadeInView>
  );
}
