---
name: user-flow-e2e-testing
description: End-user interaction testing workflow for Cejas Internacionales. Use when writing or running Playwright E2E tests for navigation, WhatsApp links, market filters, map interactions, dialogs, drawers, lightbox, PDF downloads, browser back/forward, accessibility interactions, and user journeys.
---

# User Flow E2E Testing

Use after `cejas-internacionales-guardrails`.

## Required User Journeys

1. Home loads, hero visible, CTA opens WhatsApp chooser.
2. User selects Colombia WhatsApp.
3. User selects Spain/Europe/Switzerland WhatsApp.
4. User switches market Colombia/España/Suiza.
5. User opens services by market.
6. User opens a service detail.
7. User downloads a catalog PDF.
8. User opens results lightbox and closes it.
9. User opens Jornadas map, selects each city, sees correct CTA.
10. User opens a course, downloads PDF, opens WhatsApp query.
11. User navigates back/forward without broken state.
12. Mobile menu opens/closes and focus behaves.

## Test Types

- Playwright browser tests.
- Link/download checks.
- Console error checks.
- Keyboard navigation smoke tests.
- Reduced motion smoke test.
- Visual screenshots for key breakpoints.

## Assertions

- No 404 internal links.
- No console errors.
- WhatsApp URLs use correct E.164 number.
- PDF links resolve.
- Map does not claim fake sede outside Cali.
- Mobile CTA is visible and not intrusive.
