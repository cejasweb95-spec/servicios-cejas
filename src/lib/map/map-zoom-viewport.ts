import {
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
  type MapPoint,
} from "@/lib/map/world-map-projection";

export type MapViewBox = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export function getBaseMeetScale(containerWidth: number, containerHeight: number) {
  if (containerWidth <= 0 || containerHeight <= 0) {
    return 1;
  }

  return Math.min(
    containerWidth / WORLD_MAP_WIDTH,
    containerHeight / WORLD_MAP_HEIGHT,
  );
}

/**
 * Transform SVG nativo (vectorial) equivalente al antiguo CSS scale+pan.
 * Evita rasterización: el navegador re-dibuja paths, no escala un bitmap.
 */
export function getSvgViewportTransform(
  scale: number,
  translateX: number,
  translateY: number,
  containerWidth: number,
  containerHeight: number,
): string {
  if (scale <= 1.01) {
    return "";
  }

  const meet = getBaseMeetScale(containerWidth, containerHeight);
  const centerX = WORLD_MAP_WIDTH / 2;
  const centerY = WORLD_MAP_HEIGHT / 2;
  const panX = translateX / meet;
  const panY = translateY / meet;

  return `translate(${centerX + panX} ${centerY + panY}) scale(${scale}) translate(${-centerX} ${-centerY})`;
}

function transformViewBoxPoint(
  point: MapPoint,
  scale: number,
  translateX: number,
  translateY: number,
  containerWidth: number,
  containerHeight: number,
): MapPoint {
  if (scale <= 1.01) {
    return point;
  }

  const meet = getBaseMeetScale(containerWidth, containerHeight);
  const centerX = WORLD_MAP_WIDTH / 2;
  const centerY = WORLD_MAP_HEIGHT / 2;
  const panX = translateX / meet;
  const panY = translateY / meet;

  const x = centerX + panX + scale * (point.x - centerX);
  const y = centerY + panY + scale * (point.y - centerY);

  return { x, y };
}

export function viewBoxPointToContainer(
  point: MapPoint,
  containerWidth: number,
  containerHeight: number,
  scale = 1,
  translateX = 0,
  translateY = 0,
): MapPoint {
  const meet = getBaseMeetScale(containerWidth, containerHeight);
  const offsetX = (containerWidth - WORLD_MAP_WIDTH * meet) / 2;
  const offsetY = (containerHeight - WORLD_MAP_HEIGHT * meet) / 2;
  const transformed = transformViewBoxPoint(
    point,
    scale,
    translateX,
    translateY,
    containerWidth,
    containerHeight,
  );

  return {
    x: offsetX + transformed.x * meet,
    y: offsetY + transformed.y * meet,
  };
}

/** @deprecated Use getSvgViewportTransform — kept for viewport bounds checks */
export function getZoomedViewBox(
  scale: number,
  translateX: number,
  translateY: number,
  containerWidth: number,
  containerHeight: number,
): MapViewBox {
  if (scale <= 1.01 || containerWidth <= 0 || containerHeight <= 0) {
    return { x: 0, y: 0, width: WORLD_MAP_WIDTH, height: WORLD_MAP_HEIGHT };
  }

  const corners = [
    { x: 0, y: 0 },
    { x: WORLD_MAP_WIDTH, y: 0 },
    { x: 0, y: WORLD_MAP_HEIGHT },
    { x: WORLD_MAP_WIDTH, y: WORLD_MAP_HEIGHT },
  ].map((point) =>
    transformViewBoxPoint(
      point,
      scale,
      translateX,
      translateY,
      containerWidth,
      containerHeight,
    ),
  );

  const xs = corners.map((point) => point.x);
  const ys = corners.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

export function formatViewBox(viewBox: MapViewBox) {
  return `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
}

export function isPointInViewBox(
  point: MapPoint,
  viewBox: MapViewBox,
  marginRatio = 0.06,
) {
  const marginX = viewBox.width * marginRatio;
  const marginY = viewBox.height * marginRatio;

  return (
    point.x >= viewBox.x - marginX &&
    point.x <= viewBox.x + viewBox.width + marginX &&
    point.y >= viewBox.y - marginY &&
    point.y <= viewBox.y + viewBox.height + marginY
  );
}

/** Proyección equivalente al antiguo CSS transform (para tests de paridad). */
export function projectWithCssTransform(
  point: MapPoint,
  containerWidth: number,
  containerHeight: number,
  scale: number,
  translateX: number,
  translateY: number,
): MapPoint {
  const meet = getBaseMeetScale(containerWidth, containerHeight);
  const localX =
    (containerWidth - WORLD_MAP_WIDTH * meet) / 2 + point.x * meet;
  const localY =
    (containerHeight - WORLD_MAP_HEIGHT * meet) / 2 + point.y * meet;

  return {
    x:
      containerWidth / 2 +
      translateX +
      scale * (localX - containerWidth / 2),
    y:
      containerHeight / 2 +
      translateY +
      scale * (localY - containerHeight / 2),
  };
}

export function projectWithSvgViewport(
  point: MapPoint,
  containerWidth: number,
  containerHeight: number,
  scale: number,
  translateX: number,
  translateY: number,
): MapPoint {
  return viewBoxPointToContainer(
    point,
    containerWidth,
    containerHeight,
    scale,
    translateX,
    translateY,
  );
}
