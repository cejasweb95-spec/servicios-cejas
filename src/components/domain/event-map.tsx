"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { motionDurations, motionEasing } from "@/components/motion/motion-tokens";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EventMapLocationType = "physical_studio" | "journey_availability";

export type EventMapLocation = {
  id: string;
  address?: string;
  city: string;
  country: string;
  href: string;
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
};

const mapPositions: Record<string, { x: number; y: number }> = {
  cali: { x: 17, y: 72 },
  "restrepo-valle": { x: 19, y: 62 },
  madrid: { x: 62, y: 39 },
  "palma-mallorca": { x: 83, y: 68 },
  "puerto-sagunto": { x: 70, y: 54 },
  ginebra: { x: 84, y: 27 },
};

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

export function EventMap({ copy, locations }: EventMapProps) {
  const [selectedId, setSelectedId] = useState(locations[0]?.id);
  const shouldReduceMotion = useReducedMotion();

  const selectedLocation =
    locations.find((location) => location.id === selectedId) ?? locations[0];

  const origin = locations.find(
    (location) => location.type === "physical_studio",
  );
  const originPoint = origin ? mapPositions[origin.id] : undefined;

  const routes = useMemo(() => {
    if (!origin || !originPoint) {
      return [];
    }

    return locations
      .filter((location) => location.id !== origin.id)
      .map((location) => {
        const point = mapPositions[location.id];

        return point
          ? {
              id: location.id,
              d: buildCurve(originPoint, point),
            }
          : null;
      })
      .filter(Boolean) as { id: string; d: string }[];
  }, [locations, origin, originPoint]);

  if (!selectedLocation) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(22rem,0.82fr)] lg:items-start">
      <div className="grid gap-4">
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

        <div
          aria-label={copy.mapAriaLabel}
          className="relative min-h-[23rem] overflow-hidden rounded-xl border border-border bg-surface-strong shadow-soft sm:min-h-[30rem]"
          role="group"
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full text-primary"
            focusable="false"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                height="10"
                id="event-map-grid"
                patternUnits="userSpaceOnUse"
                width="10"
              >
                <path
                  className="stroke-border/70"
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  strokeWidth="0.35"
                />
              </pattern>
            </defs>
            <rect className="fill-background" height="100" width="100" />
            <rect
              className="fill-surface-muted/70"
              height="100"
              width="100"
            />
            <rect fill="url(#event-map-grid)" height="100" width="100" />
            <path
              className="fill-none stroke-foreground/10"
              d="M12 78 C 26 58, 31 72, 39 54 S 58 46, 68 51 S 78 41, 87 26"
              strokeLinecap="round"
              strokeWidth="12"
            />
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
          </svg>

          {locations.map((location, index) => {
            const point = mapPositions[location.id] ?? { x: 50, y: 50 };
            const isSelected = selectedLocation.id === location.id;
            const typeLabel = getLocationTypeLabel(location, copy);
            const label = getLocationLabel(location);

            return (
              <div
                className="absolute z-10"
                key={location.id}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.button
                  aria-label={`${index + 1}. ${copy.selectLocationLabel}: ${label}`}
                  aria-pressed={isSelected}
                  aria-describedby={`event-location-${location.id}`}
                  className={cn(
                    "grid min-h-12 min-w-12 place-items-center rounded-full border text-sm font-semibold shadow-soft outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary hover:text-primary-text",
                  )}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.94, y: 8 }
                  }
                  onClick={() => setSelectedId(location.id)}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.04,
                    duration: motionDurations.panel,
                    ease: motionEasing,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  animate={{ opacity: 1, scale: isSelected ? 1.04 : 1, y: 0 }}
                  type="button"
                >
                  <span aria-hidden="true">{index + 1}</span>
                </motion.button>
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] hidden -translate-x-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium shadow-soft sm:block",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {location.city}
                </span>
                <span className="sr-only" id={`event-location-${location.id}`}>
                  {typeLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="grid gap-4" aria-label={copy.selectedLocationLabel}>
        <div
          aria-live="polite"
          className="rounded-xl border border-border bg-background p-5 shadow-soft"
        >
          <Badge variant="outline">
            {getLocationTypeLabel(selectedLocation, copy)}
          </Badge>
          <h3 className="mt-4 font-display text-3xl leading-tight text-foreground">
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
            <Button asChild variant="whatsapp">
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
                        ? "border-primary bg-surface-muted text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary",
                    )}
                    onClick={() => setSelectedId(location.id)}
                    type="button"
                  >
                    <span className="text-sm font-semibold">
                      {getLocationLabel(location)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {location.statusLabel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </aside>
    </div>
  );
}
