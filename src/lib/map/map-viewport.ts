import {
  getSvgViewportTransform,
  getZoomedViewBox,
  projectWithSvgViewport,
} from "@/lib/map/map-zoom-viewport";

type ViewportCheck = {
  containerHeight: number;
  containerWidth: number;
  marginRatio?: number;
  scale: number;
  translateX: number;
  translateY: number;
};

function isScreenPointVisible(
  point: { x: number; y: number },
  viewport: ViewportCheck,
) {
  const margin =
    (viewport.marginRatio ?? 0.06) *
    Math.min(viewport.containerWidth, viewport.containerHeight);

  return (
    point.x >= -margin &&
    point.x <= viewport.containerWidth + margin &&
    point.y >= -margin &&
    point.y <= viewport.containerHeight + margin
  );
}

/** True when a map point (percent of world map) lies inside the zoomed/panned viewport. */
export function isMapPointInViewport({
  containerHeight,
  containerWidth,
  marginRatio = 0.06,
  percentX,
  percentY,
  scale,
  translateX,
  translateY,
}: ViewportCheck & { percentX: number; percentY: number }) {
  if (scale <= 1.01 || containerWidth <= 0 || containerHeight <= 0) {
    return true;
  }

  const viewport = {
    containerHeight,
    containerWidth,
    marginRatio,
    scale,
    translateX,
    translateY,
  };
  const worldPoint = {
    x: (percentX / 100) * 1100,
    y: (percentY / 100) * 480,
  };
  const screen = projectWithSvgViewport(
    worldPoint,
    containerWidth,
    containerHeight,
    scale,
    translateX,
    translateY,
  );

  return isScreenPointVisible(screen, viewport);
}

export function isGeoPointInViewport(
  geo: { x: number; y: number },
  viewport: ViewportCheck,
) {
  if (viewport.scale <= 1.01 || viewport.containerWidth <= 0 || viewport.containerHeight <= 0) {
    return true;
  }

  const screen = projectWithSvgViewport(
    geo,
    viewport.containerWidth,
    viewport.containerHeight,
    viewport.scale,
    viewport.translateX,
    viewport.translateY,
  );

  return isScreenPointVisible(screen, viewport);
}

/** Visible si el punto geo o el pin ajustado están en pantalla. */
export function isMapLocationInViewport(
  layout: { geo: { x: number; y: number }; pin: { x: number; y: number } },
  scale: number,
  viewport: ViewportCheck,
) {
  if (scale <= 1.01 || viewport.containerWidth <= 0 || viewport.containerHeight <= 0) {
    return true;
  }

  const safeScale = Math.max(scale, 1);
  const adjustedPin = {
    x: layout.geo.x + (layout.pin.x - layout.geo.x) / safeScale,
    y: layout.geo.y + (layout.pin.y - layout.geo.y) / safeScale,
  };

  return (
    isGeoPointInViewport(layout.geo, viewport) ||
    isGeoPointInViewport(adjustedPin, viewport)
  );
}

export { getZoomedViewBox, getSvgViewportTransform };
