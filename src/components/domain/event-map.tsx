"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { motionDurations, motionEasing } from "@/components/motion/motion-tokens";
import { CountryFlag } from "@/components/primitives/country-flag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MarketId } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

type EventMapLocationType = "physical_studio" | "journey_availability";

export type EventMapLocation = {
  id: string;
  address?: string;
  city: string;
  country: string;
  href: string;
  marketId: MarketId;
  notes: string;
  region?: string;
  statusLabel: string;
  type: EventMapLocationType;
  whatsappLabel: string;
};

type EventMapCopy = {
  addressLabel: string;
  contactLabel: string;
  journeyLabel: string;
  listTitle: string;
  mapAriaLabel: string;
  mapTitle: string;
  physicalStudioLabel: string;
  selectLocationLabel: string;
  selectedLocationLabel: string;
};

type EventMapProps = {
  copy: EventMapCopy;
  locations: EventMapLocation[];
  showHeading?: boolean;
};

type Point = { x: number; y: number };

// Posición geográfica sobre mapa equirectangular (viewBox 1100×560, fitExtent 8px).
// x% = proyección(lon,lat).x / 1100 * 100 ; y% idem con 560.
const geoPositions: Record<string, Point> = {
  cali: { x: 29.1, y: 46.4 },
  "restrepo-valle": { x: 29.1, y: 46.2 },
  madrid: { x: 49.0, y: 26.6 },
  "puerto-sagunto": { x: 49.9, y: 27.0 },
  "palma-mallorca": { x: 50.7, y: 27.0 },
  ginebra: { x: 51.7, y: 23.4 },
};

// En Europa los pines quedan muy juntos: se desplazan los botones táctiles con línea guía.
const labelPositions: Record<string, Point> = {
  cali: { x: 22, y: 52 },
  "restrepo-valle": { x: 17, y: 42 },
  madrid: { x: 40, y: 32 },
  "puerto-sagunto": { x: 44, y: 40 },
  "palma-mallorca": { x: 58, y: 33 },
  ginebra: { x: 62, y: 17 },
};

const WORLD_MAP_SRC = "/images/mapa/mapa-mundial-clasico.svg";

function getGeo(id: string): Point {
  return geoPositions[id] ?? { x: 50, y: 50 };
}

function getLabelPoint(id: string): Point {
  return labelPositions[id] ?? getGeo(id);
}

function getLocationLabel(location: EventMapLocation) {
  return [location.city, location.region, location.country]
    .filter(Boolean)
    .join(", ");
}

function getLocationTypeLabel(
  location: EventMapLocation,
  copy: EventMapCopy,
) {
  return location.type === "physical_studio"
    ? copy.physicalStudioLabel
    : copy.journeyLabel;
}

function buildCurve(
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 18;

  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export function EventMap({
  copy,
  locations,
  showHeading = true,
}: EventMapProps) {
  const [selectedId, setSelectedId] = useState(locations[0]?.id);
  const shouldReduceMotion = useReducedMotion();

  const selectedLocation =
    locations.find((location) => location.id === selectedId) ?? locations[0];

  const origin = locations.find(
    (location) => location.type === "physical_studio",
  );
  const originPoint = origin ? getGeo(origin.id) : undefined;

  const routes = useMemo(() => {
    if (!origin || !originPoint) {
      return [];
    }

    return locations
      .filter((location) => location.id !== origin.id)
      .map((location) => ({
        id: location.id,
        d: buildCurve(originPoint, getGeo(location.id)),
      }));
  }, [locations, origin, originPoint]);

  if (!selectedLocation) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(22rem,0.82fr)] lg:items-start">
      <aside
        aria-label={copy.selectedLocationLabel}
        className="order-1 grid gap-4 lg:order-2"
      >
        <div
          aria-live="polite"
          className="rounded-xl border border-primary/20 bg-background p-5 shadow-soft"
        >
          <Badge variant="outline">
            {getLocationTypeLabel(selectedLocation, copy)}
          </Badge>
          <h3 className="mt-4 flex items-center gap-2.5 font-display text-2xl leading-tight text-foreground sm:text-3xl">
            <CountryFlag className="h-5 w-7" market={selectedLocation.marketId} />
            {getLocationLabel(selectedLocation)}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {selectedLocation.notes}
          </p>
          {selectedLocation.address ? (
            <p className="mt-4 text-sm leading-6 text-foreground">
              <span className="font-semibold">{copy.addressLabel}: </span>
              {selectedLocation.address}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="min-h-12" variant="whatsapp">
              <a href={selectedLocation.href} rel="noreferrer" target="_blank">
                {copy.contactLabel}
              </a>
            </Button>
          </div>
        </div>

        <section aria-labelledby="event-location-list">
          <h2
            className="font-display text-2xl leading-tight text-foreground"
            id="event-location-list"
          >
            {copy.listTitle}
          </h2>
          <ul className="mt-4 grid gap-2">
            {locations.map((location) => {
              const isSelected = selectedLocation.id === location.id;

              return (
                <li key={location.id}>
                  <button
                    aria-pressed={isSelected}
                    className={cn(
                      "grid min-h-14 w-full gap-1 rounded-lg border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40",
                      isSelected
                        ? "border-primary bg-primary-soft/45 text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary",
                    )}
                    onClick={() => setSelectedId(location.id)}
                    type="button"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <CountryFlag
                        className="h-3.5 w-5"
                        market={location.marketId}
                      />
                      {getLocationLabel(location)}
                    </span>
                    <span className="pl-7 text-xs text-muted-foreground">
                      {location.statusLabel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </aside>

      <div className="order-2 grid gap-4 lg:order-1">
        {showHeading ? (
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl leading-tight text-foreground">
                {copy.mapTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {copy.mapAriaLabel}
              </p>
            </div>
          </div>
        ) : null}

        <div
          aria-label={copy.mapAriaLabel}
          className="w-full max-w-full overflow-x-clip"
          data-slot="event-map-scroll-region"
          role="region"
        >
          <div
            className="relative aspect-[1100/560] w-full max-w-full overflow-hidden rounded-xl border border-primary/25 bg-gradient-to-b from-surface-strong to-muted shadow-soft"
            role="group"
          >
          <Image
            alt=""
            aria-hidden="true"
            className="pointer-events-none object-cover object-center"
            fill
            sizes="(min-width: 1024px) 58vw, 92vw"
            src={WORLD_MAP_SRC}
            unoptimized
          />
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full text-primary"
            focusable="false"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {routes.map((route, index) => {
              const isSelected = selectedLocation.id === route.id;

              return (
                <motion.path
                  animate={{ pathLength: 1, opacity: isSelected ? 0.9 : 0.42 }}
                  className={cn(
                    "fill-none stroke-current",
                    isSelected ? "text-primary" : "text-primary/60",
                  )}
                  d={route.d}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { pathLength: 0, opacity: 0 }
                  }
                  key={route.id}
                  strokeLinecap="round"
                  strokeWidth={isSelected ? "0.9" : "0.55"}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.08 + index * 0.05,
                    duration: motionDurations.reveal,
                    ease: motionEasing,
                  }}
                />
              );
            })}
            {locations.map((location) => {
              const geo = getGeo(location.id);
              const labelPoint = getLabelPoint(location.id);
              const isSelected = selectedLocation.id === location.id;
              const hasLeader =
                Math.abs(geo.x - labelPoint.x) > 0.5 ||
                Math.abs(geo.y - labelPoint.y) > 0.5;

              return (
                <g key={`pin-${location.id}`}>
                  {hasLeader ? (
                    <line
                      className={cn(
                        "stroke-current",
                        isSelected ? "text-primary" : "text-primary/40",
                      )}
                      strokeWidth={isSelected ? "0.45" : "0.28"}
                      x1={geo.x}
                      x2={labelPoint.x}
                      y1={geo.y}
                      y2={labelPoint.y}
                    />
                  ) : null}
                  <circle
                    className={cn(
                      "fill-current",
                      isSelected ? "text-primary" : "text-primary/70",
                    )}
                    cx={geo.x}
                    cy={geo.y}
                    r={isSelected ? "1.4" : "0.95"}
                  />
                </g>
              );
            })}
          </svg>

            {locations.map((location) => {
            const point = getLabelPoint(location.id);
            const isSelected = selectedLocation.id === location.id;
            const typeLabel = getLocationTypeLabel(location, copy);
            const label = getLocationLabel(location);
            const isStudio = location.type === "physical_studio";
            const shortLabel = [location.city, location.country].filter(Boolean).join(", ");

            return (
              <div
                className="absolute z-10 max-w-[min(44vw,11rem)] sm:max-w-[min(36vw,12rem)]"
                key={location.id}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.button
                  aria-label={`${copy.selectLocationLabel}: ${label}`}
                  aria-pressed={isSelected}
                  aria-describedby={`event-location-${location.id}`}
                  className={cn(
                    "group/pin relative grid min-h-11 min-w-11 place-items-center rounded-full border shadow-soft outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-primary-text hover:border-primary hover:bg-surface-muted",
                  )}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.94, y: 8 }
                  }
                  onClick={() => setSelectedId(location.id)}
                  title={label}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.04,
                    duration: motionDurations.panel,
                    ease: motionEasing,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  animate={{ opacity: 1, scale: isSelected ? 1.06 : 1, y: 0 }}
                  type="button"
                >
                  <MapPin
                    aria-hidden="true"
                    className={cn("size-4", isStudio && "fill-current")}
                  />
                </motion.button>
                <span
                  aria-hidden={!isSelected}
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] w-max max-w-[min(44vw,11rem)] -translate-x-1/2 rounded-full border px-2.5 py-1 text-center text-[10px] font-semibold leading-tight shadow-soft sm:text-xs",
                    isSelected
                      ? "border-primary/30 bg-background text-foreground"
                      : "sr-only",
                  )}
                >
                  {shortLabel}
                </span>
                <span className="sr-only" id={`event-location-${location.id}`}>
                  {typeLabel}
                </span>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
