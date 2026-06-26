import { describe, expect, it } from "vitest";

import { isMapPointInViewport } from "@/lib/map/map-viewport";

describe("isMapPointInViewport", () => {
  it("shows all points at default zoom", () => {
    expect(
      isMapPointInViewport({
        containerWidth: 800,
        containerHeight: 400,
        percentX: 10,
        percentY: 80,
        scale: 1,
        translateX: 0,
        translateY: 0,
      }),
    ).toBe(true);
  });

  it("hides corner points when zoomed into the center", () => {
    const viewport = {
      containerWidth: 800,
      containerHeight: 400,
      scale: 5,
      translateX: 0,
      translateY: 0,
    };

    expect(
      isMapPointInViewport({
        ...viewport,
        percentX: 50,
        percentY: 50,
      }),
    ).toBe(true);

    expect(
      isMapPointInViewport({
        ...viewport,
        percentX: 8,
        percentY: 88,
      }),
    ).toBe(false);
  });
});
