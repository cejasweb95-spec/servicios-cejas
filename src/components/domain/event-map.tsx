"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Minus, Plus, RotateCcw } from "lucide-react";

import { useMapZoomPan } from "@/hooks/use-map-zoom-pan";
import { isMapLocationInViewport } from "@/lib/map/map-viewport";
import {
  getSvgViewportTransform,
  viewBoxPointToContainer,
} from "@/lib/map/map-zoom-viewport";

import { CountryFlag } from "@/components/primitives/country-flag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getZoomAdjustedPinLayout,
  layoutMapPins,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "@/lib/map/world-map-projection";
import type { MarketId } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

type EventMapLocationType = "physical_studio" | "journey_availability";

export type EventMapLocation = {
  id: string;
  address?: string;
  city: string;
  coordinates: { lat: number; lng: number };
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
  mapInteractionHint: string;
  mapLegendHint: string;
  mapTitle: string;
  mapZoomControlsLabel: string;
  physicalStudioLabel: string;
  resetZoomLabel: string;
  selectLocationLabel: string;
  selectedLocationLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
};

type EventMapProps = {
  copy: EventMapCopy;
  locations: EventMapLocation[];
  showHeading?: boolean;
};

const WORLD_MAP_SRC = "/images/mapa/mapa-mundial-clasico.svg";
const MAP_ASPECT = `${WORLD_MAP_WIDTH}/${WORLD_MAP_HEIGHT}`;

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

export function EventMap({
  copy,
  locations,
  showHeading = true,
}: EventMapProps) {
  const [selectedId, setSelectedId] = useState(locations[0]?.id);

  const {
    canZoomIn,
    canZoomOut,
    containerRef,
    contentRef,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isZoomed,
    resetZoom,
    scale,
    translate,
    zoomIn,
    zoomOut,
  } = useMapZoomPan();

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [mapSvgInner, setMapSvgInner] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef]);

  // Inline el SVG del mapa para que el zoom sea vectorial (sin pixelado del raster).
  useEffect(() => {
    let active = true;

    fetch(WORLD_MAP_SRC)
      .then((response) => response.text())
      .then((text) => {
        if (!active) {
          return;
        }

        const inner = text
          .replace(/^[\s\S]*?<svg[^>]*>/, "")
          .replace(/<\/svg>\s*$/, "");
        setMapSvgInner(inner);
      })
      .catch(() => {
        if (active) {
          setMapSvgInner(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const pinLayout = useMemo(
    () =>
      layoutMapPins(
        locations.map((location) => ({
          id: location.id,
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        })),
      ),
    [locations],
  );

  const selectedLocation =
    locations.find((location) => location.id === selectedId) ?? locations[0];

  const orderedLocations = useMemo(() => {
    if (!selectedId) {
      return locations;
    }

    const others = locations.filter((location) => location.id !== selectedId);
    const selected = locations.find((location) => location.id === selectedId);
    return selected ? [...others, selected] : locations;
  }, [locations, selectedId]);

  const viewportContext = useMemo(
    () => ({
      containerHeight: containerSize.height,
      containerWidth: containerSize.width,
      scale,
      translateX: translate.x,
      translateY: translate.y,
    }),
    [containerSize.height, containerSize.width, scale, translate.x, translate.y],
  );

  const visibleLocationIds = useMemo(() => {
    const ids = new Set<string>();

    for (const location of locations) {
      const layout = pinLayout.get(location.id);
      if (!layout) {
        continue;
      }

      if (
        location.id === selectedId ||
        isMapLocationInViewport(layout, scale, viewportContext)
      ) {
        ids.add(location.id);
      }
    }

    return ids;
  }, [locations, pinLayout, selectedId, scale, viewportContext]);

  const mapLocations = useMemo(
    () => orderedLocations.filter((location) => visibleLocationIds.has(location.id)),
    [orderedLocations, visibleLocationIds],
  );

  const svgViewportTransform = useMemo(
    () =>
      getSvgViewportTransform(
        scale,
        translate.x,
        translate.y,
        containerSize.width,
        containerSize.height,
      ),
    [containerSize.height, containerSize.width, scale, translate.x, translate.y],
  );

  // Offset pin → ciudad en px de pantalla constante (conector siempre visible y clicable).
  const markerLayouts = useMemo(() => {
    const result = new Map<
      string,
      ReturnType<typeof getZoomAdjustedPinLayout>
    >();

    for (const [id, layout] of pinLayout) {
      result.set(id, getZoomAdjustedPinLayout(layout, scale));
    }

    return result;
  }, [pinLayout, scale]);

  if (!selectedLocation) {
    return null;
  }

  return (
    <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1.28fr)_minmax(19rem,0.72fr)] lg:items-start xl:grid-cols-[minmax(0,1.38fr)_minmax(22rem,0.62fr)]">
      <div className="order-1 grid gap-4 lg:order-1">
        {showHeading ? (
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                {copy.mapTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
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
            className={cn(
              "relative w-full max-w-full overflow-hidden rounded-xl border border-primary/25",
              "bg-gradient-to-b from-surface-strong to-muted shadow-soft ring-1 ring-primary/10",
              "md:max-h-[min(52vh,26rem)] lg:max-h-none",
              isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-default",
            )}
            onPointerCancel={handlePointerCancel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            ref={containerRef}
            role="group"
            style={{ aspectRatio: MAP_ASPECT, touchAction: "none" }}
          >
            <div
              aria-label={copy.mapZoomControlsLabel}
              className="absolute right-2 top-2 z-20 flex flex-col gap-1.5"
              role="toolbar"
            >
              <button
                aria-label={copy.zoomInLabel}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-primary/25",
                  "bg-background/95 text-primary shadow-soft backdrop-blur-sm outline-none",
                  "transition-colors hover:border-primary hover:bg-surface-muted",
                  "focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-45",
                )}
                disabled={!canZoomIn}
                onClick={zoomIn}
                type="button"
              >
                <Plus aria-hidden="true" className="size-4" />
              </button>
              <button
                aria-label={copy.zoomOutLabel}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-primary/25",
                  "bg-background/95 text-primary shadow-soft backdrop-blur-sm outline-none",
                  "transition-colors hover:border-primary hover:bg-surface-muted",
                  "focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-45",
                )}
                disabled={!canZoomOut}
                onClick={zoomOut}
                type="button"
              >
                <Minus aria-hidden="true" className="size-4" />
              </button>
              {isZoomed ? (
                <button
                  aria-label={copy.resetZoomLabel}
                  className={cn(
                    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-primary/25",
                    "bg-background/95 text-primary shadow-soft backdrop-blur-sm outline-none",
                    "transition-colors hover:border-primary hover:bg-surface-muted",
                    "focus-visible:ring-3 focus-visible:ring-ring/40",
                  )}
                  onClick={resetZoom}
                  type="button"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                </button>
              ) : null}
            </div>

            <div
              className="absolute inset-0"
              data-map-zoom-content=""
              ref={contentRef}
            >
            {/* Zoom vectorial: transform SVG nativo (sin CSS scale → sin pixelado). */}
            {mapSvgInner ? (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full"
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                shapeRendering="geometricPrecision"
                viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
              >
                <g
                  dangerouslySetInnerHTML={{ __html: mapSvgInner }}
                  transform={svgViewportTransform || undefined}
                />
              </svg>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-center"
                decoding="sync"
                draggable={false}
                src={WORLD_MAP_SRC}
              />
            )}

            {/* Conectores pin → ciudad + marcadores geo */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full"
              data-map-overlay=""
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              shapeRendering="geometricPrecision"
              viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
            >
              <defs>
                <marker
                  id="event-map-leader-arrow"
                  markerHeight="7"
                  markerUnits="strokeWidth"
                  markerWidth="7"
                  orient="auto"
                  refX="5.5"
                  refY="3.5"
                >
                  <path
                    className="fill-primary"
                    d="M0,0 L7,3.5 L0,7 Z"
                  />
                </marker>
                <marker
                  id="event-map-leader-arrow-muted"
                  markerHeight="6"
                  markerUnits="strokeWidth"
                  markerWidth="6"
                  orient="auto"
                  refX="5"
                  refY="3"
                >
                  <path
                    className="fill-primary/55"
                    d="M0,0 L6,3 L0,6 Z"
                  />
                </marker>
              </defs>

              <g transform={svgViewportTransform || undefined}>
              {locations.map((location) => {
                if (!visibleLocationIds.has(location.id)) {
                  return null;
                }

                const layout = markerLayouts.get(location.id);
                if (!layout) {
                  return null;
                }

                const { geo, pin } = layout;
                const isSelected = selectedLocation.id === location.id;

                return (
                  <g key={`leader-${location.id}`}>
                    <line
                      className="stroke-background"
                      strokeLinecap="round"
                      strokeWidth={(isSelected ? 5.5 : 4) / scale}
                      x1={pin.x}
                      x2={geo.x}
                      y1={pin.y}
                      y2={geo.y}
                    />
                    <line
                      className={cn(
                        "stroke-current transition-[stroke-width,opacity] duration-300",
                        isSelected ? "text-primary opacity-100" : "text-primary/70 opacity-90",
                      )}
                      markerEnd={
                        isSelected
                          ? "url(#event-map-leader-arrow)"
                          : "url(#event-map-leader-arrow-muted)"
                      }
                      strokeLinecap="round"
                      strokeWidth={(isSelected ? 3 : 2.2) / scale}
                      x1={pin.x}
                      x2={geo.x}
                      y1={pin.y}
                      y2={geo.y}
                    />
                  </g>
                );
              })}

              {locations.map((location) => {
                if (!visibleLocationIds.has(location.id)) {
                  return null;
                }

                const layout = markerLayouts.get(location.id);
                if (!layout) {
                  return null;
                }

                const { geo } = layout;
                const isSelected = selectedLocation.id === location.id;

                return (
                  <g className="text-primary" key={`geo-${location.id}`}>
                    <circle
                      className="fill-background stroke-background"
                      cx={geo.x}
                      cy={geo.y}
                      r={(isSelected ? 8.5 : 7) / scale}
                    />
                    <circle
                      className={cn(
                        "fill-current stroke-current transition-[r] duration-300",
                        isSelected ? "opacity-100" : "opacity-85",
                      )}
                      cx={geo.x}
                      cy={geo.y}
                      r={(isSelected ? 5.5 : 4.2) / scale}
                      strokeWidth={(isSelected ? 1.8 : 1.2) / scale}
                    />
                  </g>
                );
              })}
              </g>
            </svg>

            {mapLocations.map((location) => {
              const layout = markerLayouts.get(location.id);
              if (!layout) {
                return null;
              }

              const isSelected = selectedLocation.id === location.id;
              const typeLabel = getLocationTypeLabel(location, copy);
              const label = getLocationLabel(location);
              const isStudio = location.type === "physical_studio";
              const shortLabel = [location.city, location.country]
                .filter(Boolean)
                .join(", ");

              const pinScreen =
                containerSize.width > 0 && containerSize.height > 0
                  ? viewBoxPointToContainer(
                      layout.pin,
                      containerSize.width,
                      containerSize.height,
                      scale,
                      translate.x,
                      translate.y,
                    )
                  : null;

              if (!pinScreen) {
                return null;
              }

              return (
                <div
                  className={cn(
                    "absolute max-w-[min(40vw,10rem)] sm:max-w-[min(32vw,11rem)] md:max-w-[min(28vw,12rem)]",
                    isSelected ? "z-[80] isolate" : "z-10",
                  )}
                  key={location.id}
                  style={{
                    left: `${pinScreen.x}px`,
                    top: `${pinScreen.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    aria-describedby={`event-location-${location.id}`}
                    aria-label={`${copy.selectLocationLabel}: ${label}`}
                    aria-pressed={isSelected}
                    data-map-pin=""
                    className={cn(
                      "group/pin relative grid min-h-10 min-w-10 place-items-center rounded-full border-2 shadow-soft outline-none sm:min-h-11 sm:min-w-11",
                      "transition-[background-color,border-color,box-shadow] duration-300",
                      "focus-visible:ring-3 focus-visible:ring-ring/40",
                      "motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98]",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground ring-2 ring-primary/25"
                        : "border-primary/35 bg-background/95 text-primary-text backdrop-blur-[1px] hover:border-primary hover:bg-surface-muted",
                    )}
                    onClick={() => setSelectedId(location.id)}
                    title={label}
                    type="button"
                  >
                    <MapPin
                      aria-hidden="true"
                      className={cn(
                        "size-3.5 sm:size-4",
                        isStudio && "fill-current",
                      )}
                    />
                  </button>
                  <span
                    aria-hidden={!isSelected}
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-[calc(100%+0.35rem)] z-[90] w-max max-w-[min(40vw,10rem)] -translate-x-1/2",
                      "rounded-full border px-2.5 py-1 text-center text-[10px] font-semibold leading-tight shadow-soft sm:text-xs",
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
          <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
            {copy.mapLegendHint}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
            {copy.mapInteractionHint}
          </p>
        </div>
      </div>

      <aside
        aria-label={copy.selectedLocationLabel}
        className="order-2 grid gap-4 lg:sticky lg:top-24 lg:order-2 lg:self-start"
      >
        <div
          aria-live="polite"
          className="rounded-xl border border-primary/20 bg-background p-5 shadow-soft sm:p-6"
        >
          <Badge variant="outline">
            {getLocationTypeLabel(selectedLocation, copy)}
          </Badge>
          <h3 className="mt-4 flex items-center gap-2.5 font-display text-2xl leading-tight text-foreground sm:text-3xl">
            <CountryFlag className="h-5 w-7" market={selectedLocation.marketId} />
            {getLocationLabel(selectedLocation)}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-[0.9375rem] md:leading-7">
            {selectedLocation.notes}
          </p>
          {selectedLocation.address ? (
            <p className="mt-4 text-sm leading-6 text-foreground md:text-[0.9375rem]">
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
            className="font-display text-xl leading-tight text-foreground sm:text-2xl"
            id="event-location-list"
          >
            {copy.listTitle}
          </h2>
          <ul className="mt-3 grid gap-2 sm:mt-4 md:max-h-[min(42vh,22rem)] md:overflow-y-auto md:pr-1">
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
                        className="h-3.5 w-5 shrink-0"
                        market={location.marketId}
                      />
                      <span className="min-w-0 truncate">{getLocationLabel(location)}</span>
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
    </div>
  );
}
