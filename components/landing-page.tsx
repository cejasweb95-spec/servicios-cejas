"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppUrl, INSTAGRAM_URL } from "@/lib/config";
import {
  fadeInUp,
  revealTransition,
  staggerContainer,
} from "@/lib/motion";
import { FadeInView } from "./fade-in-view";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { MotionButton } from "./motion-button";

const whatsappUrl = getWhatsAppUrl();

const eyebrowServices = [
  "Micropigmentación de cejas",
  "Cejas efecto polvo",
  "Cejas pelo a pelo",
  "Cejas efecto maquillaje",
  "Sombreado en henna",
  "Laminado de cejas",
  "Lifting de cejas",
];

const lipServices = [
  "Micropigmentación labial",
  "Neutralización labial",
  "Hidratación labial",
  "Microlips",
  "Valoración de cicatrizados",
];

const eyeServices = [
  "Lifting de pestañas",
  "Delineado de ojos",
  "Realce de línea de pestañas",
];

export function LandingPage() {
  return (
    <>
      <div className="bg-shapes" aria-hidden="true">
        <div className="bg-shapes__orb bg-shapes__orb--1" />
        <div className="bg-shapes__orb bg-shapes__orb--2" />
        <div className="bg-shapes__orb bg-shapes__orb--3" />
      </div>

      <header className="header">
        <div className="container header__inner">
          <Link href="/" className="logo" aria-label="Cejas Internacionales — Inicio">
            Cejas <span>Internacionales</span>
          </Link>
          <nav className="header__social" aria-label="Contacto">
            {INSTAGRAM_URL ? (
              <a
                href={INSTAGRAM_URL}
                className="icon-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Cejas Internacionales"
              >
                <InstagramIcon />
              </a>
            ) : null}
            <a
              href={whatsappUrl}
              className="icon-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reservar por WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </nav>
        </div>
      </header>

      <main id="contenido-principal">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <motion.div
              className="hero__content motion-reveal"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p className="hero__tag" variants={fadeInUp}>
                Micropigmentación estética · Cejas · Labios · Mirada
              </motion.p>
              <motion.h1
                id="hero-title"
                className="hero__title"
                variants={fadeInUp}
                transition={revealTransition(0.05)}
              >
                Próximamente: <em>micropigmentación</em> que realza tu belleza
                natural
              </motion.h1>
              <motion.p
                className="hero__subtitle"
                variants={fadeInUp}
                transition={revealTransition(0.1)}
              >
                <strong>Cejas Internacionales</strong> abre muy pronto su nueva
                web. Mientras tanto, reserva tu valoración o consulta próximas
                fechas por WhatsApp con una especialista internacional en cejas,
                labios y mirada en España, Europa y Colombia.
              </motion.p>
              <motion.div
                className="hero__actions btn-group"
                variants={fadeInUp}
                transition={revealTransition(0.15)}
              >
                <MotionButton
                  href={whatsappUrl}
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Reservar por WhatsApp
                </MotionButton>
                <MotionButton href="#servicios" className="btn btn--secondary">
                  Ver tratamientos
                </MotionButton>
              </motion.div>
              <motion.p
                className="hero__urgency"
                variants={fadeInUp}
                transition={revealTransition(0.2)}
              >
                Plazas limitadas en jornadas internacionales — escríbenos hoy.
              </motion.p>
            </motion.div>
            <div className="hero__accent" aria-hidden="true" />
          </div>
        </section>

        <section className="section" aria-labelledby="coming-title">
          <div className="container">
            <FadeInView className="coming-soon motion-reveal">
              <p className="section__label">Próximamente online</p>
              <h2 id="coming-title" className="section__title">
                Estamos creando una web a la altura de tu transformación
              </h2>
              <p className="section__text">
                Muy pronto podrás explorar todos nuestros tratamientos de{" "}
                <strong>micropigmentación de cejas</strong>,{" "}
                <strong>micropigmentación labial</strong> y{" "}
                <strong>diseño de mirada</strong>. Hoy ya puedes reservar o
                pedir información por WhatsApp sobre próximas citas en España y
                Europa.
              </p>
              <div
                className="coming-soon__badge"
                role="status"
                aria-label="Lanzamiento oficial próximamente"
              >
                <span>Lanzamiento oficial muy pronto</span>
                <span className="coming-soon__dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
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
              <p className="section__label">Tratamientos</p>
              <h2 id="services-title" className="section__title">
                Micropigmentación y belleza facial profesional
              </h2>
              <p className="section__text">
                Técnicas especializadas en cejas, labios y mirada con resultados
                naturales y personalizados.
              </p>
            </FadeInView>

            <div className="services-grid">
              <ServiceGroup
                letter="A"
                title="Micropigmentación de cejas"
                services={eyebrowServices}
                delay={0.1}
              />
              <ServiceGroup
                letter="B"
                title="Micropigmentación labial"
                services={lipServices}
                delay={0.2}
              />
              <ServiceGroup
                letter="C"
                title="Mirada y pestañas"
                services={eyeServices}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="trust-title">
          <div className="container">
            <FadeInView as="header" className="section__header motion-reveal">
              <p className="section__label">Por qué elegirnos</p>
              <h2 id="trust-title" className="section__title">
                Especialista internacional en belleza facial
              </h2>
            </FadeInView>

            <div className="trust-grid">
              <TrustCard
                number="01"
                title="Atención personalizada"
                text="Cada rostro es único. Diseñamos cejas, labios y mirada según tu estilo y rasgos."
                delay={0.1}
              />
              <TrustCard
                number="02"
                title="Resultados naturales"
                text="Micropigmentación estética con acabado suave, elegante y sin exagerar."
                delay={0.2}
              />
              <TrustCard
                number="03"
                title="Agenda internacional"
                text="Jornadas en España, Europa y Colombia. Consulta disponibilidad por WhatsApp."
                delay={0.3}
              />
              <TrustCard
                number="04"
                title="Técnica y experiencia"
                text="Formación continua en las últimas técnicas de micropigmentación y diseño facial."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="cta-title">
          <div className="container">
            <FadeInView className="cta motion-reveal">
              <h2 id="cta-title" className="cta__title">
                Reserva ahora por WhatsApp
              </h2>
              <p className="cta__text">
                ¿Quieres micropigmentación de cejas, labios o mirada? Escríbenos
                y te informamos sobre próximas fechas, ciudades y disponibilidad
                de agenda.
              </p>
              <MotionButton
                href={whatsappUrl}
                className="btn btn--gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp
              </MotionButton>
            </FadeInView>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer__brand">Cejas Internacionales</p>
          <p className="footer__tagline">Micropigmentación estética internacional</p>
          <p className="footer__regions">España · Europa · Colombia</p>
          <p className="footer__phone">
            <a href="tel:+34603804837">+34 603 80 48 37</a>
          </p>
          <div className="footer__links">
            {INSTAGRAM_URL ? (
              <a
                href={INSTAGRAM_URL}
                className="icon-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            ) : null}
            <a
              href={whatsappUrl}
              className="icon-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>
          <p className="footer__note">
            Web en construcción. Reservas e información disponibles por WhatsApp.
            Catálogo completo de servicios y cuidados post-tratamiento
            próximamente.
          </p>
        </div>
      </footer>

      <motion.a
        href={whatsappUrl}
        className="whatsapp-float motion-reveal"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reservar micropigmentación por WhatsApp"
        initial={{ opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <WhatsAppIcon size={28} />
        <span className="whatsapp-float__label">Reservar</span>
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
