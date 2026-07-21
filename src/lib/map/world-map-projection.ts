/**
 * Proyección equirectangular del asset `mapa-mundial-clasico.svg`.
 * Generada con el mismo fitExtent que `scripts/generate-classic-world-map.mjs`.
 * Si regeneras el SVG, vuelve a ejecutar ese script y copia scale/translate aquí.
 */
export const WORLD_MAP_WIDTH = 1100;
export const WORLD_MAP_HEIGHT = 480;

const SCALE = 172.52395831161456;
const TRANSLATE_X = 550;
const TRANSLATE_Y = 282.2057031303402;

/** Distancia mínima pin → ciudad en px del viewBox (evita tapar el país). */
export const PIN_LEADER_LENGTH = 88;
const MIN_PIN_DISTANCE = 120;

export type MapPoint = { x: number; y: number };

/** Proyecta lon/lat a píxeles del viewBox del mapa (origen arriba-izquierda). */
export function projectWorldMap(lng: number, lat: number): MapPoint {
  const λ = (lng * Math.PI) / 180;
  const φ = (lat * Math.PI) / 180;

  return {
    x: SCALE * λ + TRANSLATE_X,
    y: SCALE * -φ + TRANSLATE_Y,
  };
}

export function toMapPercent(point: MapPoint): MapPoint {
  return {
    x: (point.x / WORLD_MAP_WIDTH) * 100,
    y: (point.y / WORLD_MAP_HEIGHT) * 100,
  };
}

function bearingToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

/**
 * Dirección hacia mar / océano para dejar el país visible bajo el punto geo.
 * Grados: 0 = este, 90 = sur (sistema pantalla, y+ abajo).
 */
const PIN_OUTWARD_BEARING_DEG: Record<string, number> = {
  cali: 210,
  "restrepo-valle": 300,
  madrid: 305,
  "puerto-sagunto": 145,
  "palma-mallorca": 85,
  ginebra: 25,
};

function getOutwardBearing(id: string, geo: MapPoint): number {
  if (PIN_OUTWARD_BEARING_DEG[id] !== undefined) {
    return bearingToRadians(PIN_OUTWARD_BEARING_DEG[id]);
  }

  const centerX = WORLD_MAP_WIDTH / 2;
  const centerY = WORLD_MAP_HEIGHT / 2;
  return Math.atan2(geo.y - centerY, geo.x - centerX);
}

function placePinFromGeo(id: string, geo: MapPoint, length = PIN_LEADER_LENGTH): MapPoint {
  const angle = getOutwardBearing(id, geo);
  return {
    x: geo.x + Math.cos(angle) * length,
    y: geo.y + Math.sin(angle) * length,
  };
}

function clampToMap(point: MapPoint, margin = 24): MapPoint {
  return {
    x: Math.min(WORLD_MAP_WIDTH - margin, Math.max(margin, point.x)),
    y: Math.min(WORLD_MAP_HEIGHT - margin, Math.max(margin, point.y)),
  };
}

type LayoutInput = { id: string; lng: number; lat: number };

export type MapPinLayout = {
  geo: MapPoint;
  leaderLength: number;
  pin: MapPoint;
  pinPercent: MapPoint;
};

/** Coloca pines fuera del territorio y separa clusters sin mover el punto geo. */
export function layoutMapPins(items: LayoutInput[]): Map<string, MapPinLayout> {
  const states = items.map((item) => {
    const geo = projectWorldMap(item.lng, item.lat);
    return {
      geo,
      id: item.id,
      pin: placePinFromGeo(item.id, geo),
    };
  });

  for (let iter = 0; iter < 28; iter += 1) {
    for (let i = 0; i < states.length; i += 1) {
      for (let j = i + 1; j < states.length; j += 1) {
        const a = states[i];
        const b = states[j];
        let dx = b.pin.x - a.pin.x;
        let dy = b.pin.y - a.pin.y;
        let distance = Math.hypot(dx, dy);

        if (distance < MIN_PIN_DISTANCE) {
          if (distance < 0.01) {
            dx = 1;
            dy = 0;
            distance = 1;
          }

          const push = ((MIN_PIN_DISTANCE - distance) / distance) * 0.72;
          a.pin.x -= dx * push;
          a.pin.y -= dy * push;
          b.pin.x += dx * push;
          b.pin.y += dy * push;
        }
      }
    }
  }

  for (const state of states) {
    state.pin = clampToMap(state.pin);
  }

  return new Map(
    states.map((state) => [
      state.id,
      {
        geo: state.geo,
        leaderLength: Math.hypot(
          state.pin.x - state.geo.x,
          state.pin.y - state.geo.y,
        ),
        pin: state.pin,
        pinPercent: toMapPercent(state.pin),
      },
    ]),
  );
}

export function getZoomAdjustedPinLayout(
  layout: MapPinLayout,
  scale: number,
): {
  geo: MapPoint;
  leaderLength: number;
  pin: MapPoint;
  pinPercent: MapPoint;
  screenLeaderLength: number;
} {
  const safeScale = Math.max(scale, 1);
  const pin: MapPoint = {
    x: layout.geo.x + (layout.pin.x - layout.geo.x) / safeScale,
    y: layout.geo.y + (layout.pin.y - layout.geo.y) / safeScale,
  };
  const leaderLength = Math.hypot(pin.x - layout.geo.x, pin.y - layout.geo.y);

  return {
    geo: layout.geo,
    leaderLength,
    pin,
    pinPercent: toMapPercent(pin),
    screenLeaderLength: leaderLength * safeScale,
  };
}

export function buildMapCurve(start: MapPoint, end: MapPoint) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 28;

  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}
