import { describe, expect, it } from "vitest";

import {
  getSvgViewportTransform,
  projectWithCssTransform,
  projectWithSvgViewport,
} from "@/lib/map/map-zoom-viewport";
import { projectWorldMap } from "@/lib/map/world-map-projection";

describe("map-zoom-viewport", () => {
  const container = { width: 900, height: 420 };

  it("matches CSS transform projection at multiple zoom levels", () => {
    const madrid = projectWorldMap(-3.7038, 40.4168);
    const cali = projectWorldMap(-76.532, 3.4516);

    for (const scale of [1, 2.5, 5, 8]) {
      const translates =
        scale <= 1.01
          ? [{ x: 0, y: 0 }]
          : [
              { x: 0, y: 0 },
              { x: 40, y: -25 },
              { x: -80, y: 60 },
            ];

      for (const translate of translates) {
        for (const point of [madrid, cali]) {
          const css = projectWithCssTransform(
            point,
            container.width,
            container.height,
            scale,
            translate.x,
            translate.y,
          );
          const svg = projectWithSvgViewport(
            point,
            container.width,
            container.height,
            scale,
            translate.x,
            translate.y,
          );

          expect(svg.x).toBeCloseTo(css.x, 5);
          expect(svg.y).toBeCloseTo(css.y, 5);
        }
      }
    }
  });

  it("emits an SVG group transform instead of CSS scale", () => {
    const transform = getSvgViewportTransform(4, 12, -8, container.width, container.height);
    expect(transform).toContain("scale(4)");
    expect(transform).toContain("translate(");
  });
});
