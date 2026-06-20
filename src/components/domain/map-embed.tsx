"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

type MapEmbedProps = {
  /** URL del iframe oficial de Google Maps (dato confirmado del negocio). */
  src: string;
  /** Título accesible del mapa (también encabeza la previsualización). */
  title: string;
  /** Texto del botón que carga el mapa real. */
  loadLabel: string;
  /** Aviso bajo el botón (p. ej. "Se cargará Google Maps"). */
  hint: string;
  /** Enlace de respaldo para abrir Google Maps en una pestaña nueva. */
  directionsHref: string;
  directionsLabel: string;
};

export function MapEmbed({
  directionsHref,
  directionsLabel,
  hint,
  loadLabel,
  src,
  title,
}: MapEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-surface-muted sm:aspect-[16/10]">
        {active ? (
          <iframe
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
            title={title}
          />
        ) : (
          <button
            aria-label={loadLabel}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-center outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
            onClick={() => setActive(true)}
            type="button"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:28px_28px]"
            />
            <span className="relative flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-1">
              <MapPin aria-hidden="true" className="size-6" />
            </span>
            <span className="relative grid gap-1">
              <span className="font-display text-xl leading-tight text-foreground">
                {loadLabel}
              </span>
              <span className="text-sm text-muted-foreground">{hint}</span>
            </span>
          </button>
        )}
      </div>
      <a
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        href={directionsHref}
        rel="noreferrer"
        target="_blank"
      >
        {directionsLabel}
        <ExternalLink aria-hidden="true" className="size-3.5" />
      </a>
    </div>
  );
}
