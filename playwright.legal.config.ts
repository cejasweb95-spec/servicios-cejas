import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for legal/cookies responsive QA.
 * Points to an already-running server; set MAP_E2E_PORT (default 3010).
 * Usage:
 *   $env:MAP_E2E_PORT="3010"; npx playwright test --config=playwright.legal.config.ts
 */
const port = process.env.MAP_E2E_PORT ?? "3010";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/legal-cookies.spec.ts",
  fullyParallel: false,
  retries: 1,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: undefined,
  projects: [
    {
      name: "chromium-mobile-390",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: "chromium-tablet-768",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "chromium-desktop-1440",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
