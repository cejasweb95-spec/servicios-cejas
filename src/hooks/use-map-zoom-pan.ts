"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const ZOOM_BUTTON_STEP = 0.65;
const WHEEL_ZOOM_INTENSITY = 0.0014;
const DOUBLE_TAP_MS = 320;

type Point = { x: number; y: number };

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

/** Counter-scale for HTML markers so they shrink as the map zooms in. */
export function getMapMarkerCounterScale(scale: number) {
  return 1 / clampScale(scale);
}

function clampTranslate(scale: number, tx: number, ty: number, width: number, height: number) {
  if (scale <= 1) {
    return { x: 0, y: 0 };
  }

  const maxX = (width * (scale - 1)) / 2;
  const maxY = (height * (scale - 1)) / 2;

  return {
    x: Math.min(maxX, Math.max(-maxX, tx)),
    y: Math.min(maxY, Math.max(-maxY, ty)),
  };
}

function getPointerDistance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function isInteractiveTarget(target: EventTarget | null) {
  return Boolean(
    target instanceof Element &&
      target.closest("button, a, input, textarea, select, [data-map-pin]"),
  );
}

export function useMapZoomPan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState<Point>({ x: 0, y: 0 });

  const stateRef = useRef({ scale: 1, translate: { x: 0, y: 0 } });

  useEffect(() => {
    stateRef.current = { scale, translate };
  }, [scale, translate]);

  const pointersRef = useRef<Map<number, Point>>(new Map());
  const panRef = useRef<{ pointerId: number; start: Point; origin: Point } | null>(null);
  const pinchRef = useRef<{
    distance: number;
    midpoint: Point;
    scale: number;
    translate: Point;
  } | null>(null);
  const lastTapRef = useRef(0);

  const setZoomAt = useCallback(
    (getNextScale: (current: number) => number, clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const focalLocalX = clientX - rect.left - rect.width / 2;
      const focalLocalY = clientY - rect.top - rect.height / 2;

      setScale((prevScale) => {
        const nextScale = clampScale(getNextScale(prevScale));

        if (nextScale <= 1) {
          setTranslate({ x: 0, y: 0 });
          return 1;
        }

        setTranslate((prevTranslate) => {
          const ratio = nextScale / prevScale;
          const nextX = focalLocalX - (focalLocalX - prevTranslate.x) * ratio;
          const nextY = focalLocalY - (focalLocalY - prevTranslate.y) * ratio;
          return clampTranslate(nextScale, nextX, nextY, rect.width, rect.height);
        });

        return nextScale;
      });
    },
    [],
  );

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    panRef.current = null;
    pinchRef.current = null;
    pointersRef.current.clear();
  }, []);

  const zoomIn = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    setZoomAt(
      (current) => current + ZOOM_BUTTON_STEP,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );
  }, [setZoomAt]);

  const zoomOut = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    setZoomAt(
      (current) => current - ZOOM_BUTTON_STEP,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
    );
  }, [setZoomAt]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (!container.contains(event.target as Node)) {
        return;
      }

      event.preventDefault();
      setZoomAt(
        (current) => current - event.deltaY * WHEEL_ZOOM_INTENSITY,
        event.clientX,
        event.clientY,
      );
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [setZoomAt]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (isInteractiveTarget(event.target)) {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      try {
        container.setPointerCapture(event.pointerId);
      } catch {
        // setPointerCapture puede fallar si el puntero ya no está activo; no es crítico.
      }

      const point = { x: event.clientX, y: event.clientY };
      pointersRef.current.set(event.pointerId, point);

      if (event.pointerType === "touch") {
        const now = Date.now();
        if (now - lastTapRef.current < DOUBLE_TAP_MS && pointersRef.current.size === 1) {
          if (stateRef.current.scale > 1.05) {
            resetZoom();
          } else {
            setZoomAt((current) => current + 0.85, event.clientX, event.clientY);
          }
          lastTapRef.current = 0;
          return;
        }
        lastTapRef.current = now;
      }

      if (pointersRef.current.size === 2) {
        const [first, second] = [...pointersRef.current.values()];
        panRef.current = null;
        pinchRef.current = {
          distance: getPointerDistance(first, second),
          midpoint: {
            x: (first.x + second.x) / 2,
            y: (first.y + second.y) / 2,
          },
          scale: stateRef.current.scale,
          translate: { ...stateRef.current.translate },
        };
        return;
      }

      if (stateRef.current.scale > 1) {
        panRef.current = {
          pointerId: event.pointerId,
          start: point,
          origin: { ...stateRef.current.translate },
        };
      }
    },
    [resetZoom, setZoomAt],
  );

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [first, second] = [...pointersRef.current.values()];
      const distance = getPointerDistance(first, second);
      const midpoint = {
        x: (first.x + second.x) / 2,
        y: (first.y + second.y) / 2,
      };

      const nextScale = clampScale(
        pinchRef.current.scale * (distance / pinchRef.current.distance),
      );
      const focalLocalX = midpoint.x - rect.left - rect.width / 2;
      const focalLocalY = midpoint.y - rect.top - rect.height / 2;
      const ratio = nextScale / pinchRef.current.scale;
      const base = pinchRef.current.translate;
      const origin = pinchRef.current.midpoint;
      const originLocalX = origin.x - rect.left - rect.width / 2;
      const originLocalY = origin.y - rect.top - rect.height / 2;
      const anchoredX = originLocalX - (originLocalX - base.x) * ratio;
      const anchoredY = originLocalY - (originLocalY - base.y) * ratio;
      const nextX = focalLocalX - (focalLocalX - anchoredX) * (nextScale / pinchRef.current.scale);
      const nextY = focalLocalY - (focalLocalY - anchoredY) * (nextScale / pinchRef.current.scale);

      if (nextScale <= 1) {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
        return;
      }

      setScale(nextScale);
      setTranslate(clampTranslate(nextScale, nextX, nextY, rect.width, rect.height));
      return;
    }

    if (panRef.current && panRef.current.pointerId === event.pointerId) {
      const deltaX = point.x - panRef.current.start.x;
      const deltaY = point.y - panRef.current.start.y;
      const next = clampTranslate(
        stateRef.current.scale,
        panRef.current.origin.x + deltaX,
        panRef.current.origin.y + deltaY,
        rect.width,
        rect.height,
      );
      setTranslate(next);
    }
  }, []);

  const endPointer = useCallback((pointerId: number) => {
    pointersRef.current.delete(pointerId);

    if (pointersRef.current.size < 2) {
      pinchRef.current = null;
    }

    if (panRef.current?.pointerId === pointerId) {
      panRef.current = null;
    }

    if (pointersRef.current.size === 0) {
      return;
    }
  }, []);

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      endPointer(event.pointerId);
    },
    [endPointer],
  );

  const handlePointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      endPointer(event.pointerId);
    },
    [endPointer],
  );

  const canZoomOut = scale > MIN_SCALE + 0.01;
  const canZoomIn = scale < MAX_SCALE - 0.01;
  const isZoomed = scale > MIN_SCALE + 0.01;

  return {
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
  };
}
