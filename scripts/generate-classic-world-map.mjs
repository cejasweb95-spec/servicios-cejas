import { writeFileSync } from "node:fs";
import { geoPath, geoEquirectangular } from "d3-geo";
import { feature } from "topojson-client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const land = feature(
  JSON.parse(
    readFileSync(
      join(__dirname, "../node_modules/world-atlas/countries-110m.json"),
      "utf8",
    ),
  ),
  "countries",
);

const width = 1100;
const height = 560;

const projection = geoEquirectangular()
  .fitExtent(
    [
      [8, 8],
      [width - 8, height - 8],
    ],
    land,
  );

const path = geoPath(projection);
const landPaths = land.features
  .map((f) => path(f))
  .filter(Boolean)
  .join("\n    ");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8f9"/>
      <stop offset="100%" stop-color="#f8f2f3"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#ocean)"/>
  <g fill="#e8c7cc" stroke="#b76e79" stroke-opacity="0.35" stroke-width="0.6" fill-opacity="0.92">
    ${landPaths}
  </g>
  <g fill="none" stroke="#b76e79" stroke-opacity="0.12" stroke-width="0.5">
    <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}"/>
    <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width / 2 - 12}" ry="${height / 2 - 12}"/>
  </g>
</svg>
`;

writeFileSync(
  join(__dirname, "../public/images/mapa/mapa-mundial-clasico.svg"),
  svg,
  "utf8",
);

console.log("Wrote mapa-mundial-clasico.svg", land.features.length, "countries");
