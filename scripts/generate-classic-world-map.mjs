import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ANTARCTICA_ID = "010";

const land = feature(
  JSON.parse(
    readFileSync(
      join(__dirname, "../node_modules/world-atlas/countries-110m.json"),
      "utf8",
    ),
  ),
  "countries",
);

const filteredFeatures = land.features.filter(
  (f) => String(f.id) !== ANTARCTICA_ID,
);

const landFiltered = {
  type: "FeatureCollection",
  features: filteredFeatures,
};

const width = 1100;
const height = 480;

const projection = geoEquirectangular().fitExtent(
  [
    [8, 8],
    [width - 8, height - 8],
  ],
  landFiltered,
);

const path = geoPath(projection);
const landPaths = filteredFeatures
  .map((f) => {
    const d = path(f);
    return d ? `<path d="${d}"/>` : "";
  })
  .filter(Boolean)
  .join("\n    ");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8f9"/>
      <stop offset="100%" stop-color="#f8f2f3"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#ocean)"/>
  <g fill="#ddb8be" stroke="#b76e79" stroke-opacity="0.55" stroke-width="0.75" fill-opacity="0.98">
    ${landPaths}
  </g>
</svg>
`;

writeFileSync(
  join(__dirname, "../public/images/mapa/mapa-mundial-clasico.svg"),
  svg,
  "utf8",
);

const cities = {
  cali: [-76.532, 3.4516],
  "restrepo-valle": [-76.522, 3.822],
  madrid: [-3.7038, 40.4168],
  "puerto-sagunto": [-0.2202, 39.659],
  "palma-mallorca": [2.6502, 39.5696],
  ginebra: [6.1432, 46.2044],
};

console.log("Wrote mapa-mundial-clasico.svg", filteredFeatures.length, "countries");
console.log("Projection constants (copy to world-map-projection.ts if changed):");
console.log("SCALE", projection.scale());
console.log("TRANSLATE_X", projection.translate()[0]);
console.log("TRANSLATE_Y", projection.translate()[1]);
console.log("Sample % positions from locations.ts:");
for (const [id, coords] of Object.entries(cities)) {
  const projected = projection(coords);
  if (!projected) continue;
  const [x, y] = projected;
  console.log(
    `  ${id}: { x: ${((x / width) * 100).toFixed(1)}, y: ${((y / height) * 100).toFixed(1)} },`,
  );
}
