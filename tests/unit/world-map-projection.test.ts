import { describe, expect, it } from "vitest";

import {
  getZoomAdjustedPinLayout,
  layoutMapPins,
  PIN_LEADER_LENGTH,
  projectWorldMap,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "@/lib/map/world-map-projection";

describe("world-map-projection", () => {
  it("projects Cali near the Colombia anchor on the classic map", () => {
    const cali = projectWorldMap(-76.532, 3.4516);

    expect(cali.x).toBeGreaterThan(300);
    expect(cali.x).toBeLessThan(340);
    expect(cali.y).toBeGreaterThan(255);
    expect(cali.y).toBeLessThan(290);
  });

  it("keeps geographic dots inside the map viewBox", () => {
    const layout = layoutMapPins([
      { id: "cali", lng: -76.532, lat: 3.4516 },
      { id: "madrid", lng: -3.7038, lat: 40.4168 },
      { id: "ginebra", lng: 6.1432, lat: 46.2044 },
    ]);

    for (const entry of layout.values()) {
      expect(entry.geo.x).toBeGreaterThan(0);
      expect(entry.geo.x).toBeLessThan(WORLD_MAP_WIDTH);
      expect(entry.geo.y).toBeGreaterThan(0);
      expect(entry.geo.y).toBeLessThan(WORLD_MAP_HEIGHT);
    }
  });

  it("places pins outside the city with a visible leader length", () => {
    const layout = layoutMapPins([
      { id: "cali", lng: -76.532, lat: 3.4516 },
      { id: "restrepo-valle", lng: -76.522, lat: 3.822 },
      { id: "madrid", lng: -3.7038, lat: 40.4168 },
    ]);

    for (const entry of layout.values()) {
      expect(entry.leaderLength).toBeGreaterThanOrEqual(PIN_LEADER_LENGTH - 12);
      expect(entry.leaderLength).toBeLessThanOrEqual(PIN_LEADER_LENGTH + 30);
    }

    const cali = layout.get("cali");
    const restrepo = layout.get("restrepo-valle");
    const pinDistance = Math.hypot(
      cali!.pin.x - restrepo!.pin.x,
      cali!.pin.y - restrepo!.pin.y,
    );

    expect(pinDistance).toBeGreaterThanOrEqual(50);
  });

  it("keeps a visible on-screen leader length at any zoom level", () => {
    const layout = layoutMapPins([
      { id: "madrid", lng: -3.7038, lat: 40.4168 },
    ]).get("madrid")!;

    for (const scale of [1, 2.5, 6, 8]) {
      const adjusted = getZoomAdjustedPinLayout(layout, scale);
      expect(adjusted.screenLeaderLength).toBeGreaterThanOrEqual(PIN_LEADER_LENGTH - 15);
      expect(adjusted.screenLeaderLength).toBeLessThanOrEqual(PIN_LEADER_LENGTH + 30);
      expect(adjusted.leaderLength).toBeGreaterThan(0);
    }
  });

  it("places all journey locations on land with outward-facing pins", () => {
    const items = [
      { id: "cali", lng: -76.532, lat: 3.4516 },
      { id: "restrepo-valle", lng: -76.522, lat: 3.822 },
      { id: "madrid", lng: -3.7038, lat: 40.4168 },
      { id: "palma-mallorca", lng: 2.6502, lat: 39.5696 },
      { id: "puerto-sagunto", lng: -0.2202, lat: 39.659 },
      { id: "ginebra", lng: 6.1432, lat: 46.2044 },
    ];
    const layout = layoutMapPins(items);

    for (const item of items) {
      const entry = layout.get(item.id)!;
      expect(entry.leaderLength).toBeGreaterThanOrEqual(PIN_LEADER_LENGTH - 15);
      expect(entry.geo.x).toBeGreaterThan(0);
      expect(entry.geo.y).toBeGreaterThan(0);
      expect(entry.geo.x).toBeLessThan(WORLD_MAP_WIDTH);
      expect(entry.geo.y).toBeLessThan(WORLD_MAP_HEIGHT);
    }
  });
});
