import { describe, expect, it } from "vitest";

import { getMapMarkerCounterScale } from "@/hooks/use-map-zoom-pan";

describe("getMapMarkerCounterScale", () => {
  it("returns 1 at default zoom", () => {
    expect(getMapMarkerCounterScale(1)).toBe(1);
  });

  it("shrinks markers as zoom increases", () => {
    expect(getMapMarkerCounterScale(2)).toBe(0.5);
    expect(getMapMarkerCounterScale(4)).toBe(0.25);
  });

  it("clamps to max zoom", () => {
    expect(getMapMarkerCounterScale(99)).toBeCloseTo(1 / 8);
  });
});
