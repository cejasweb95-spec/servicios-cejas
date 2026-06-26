import { defineConfig } from "@playwright/test";

import baseConfig from "./playwright.config";

/** Use when a production server is already running (set MAP_E2E_PORT, defaults to 3013). */
const port = process.env.MAP_E2E_PORT ?? "3013";

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: `http://127.0.0.1:${port}`,
  },
  webServer: undefined,
});
