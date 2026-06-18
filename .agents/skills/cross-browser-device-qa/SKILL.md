---
name: cross-browser-device-qa
description: Cross-browser and device QA workflow for Cejas Internacionales. Use when testing responsive UI, iOS Safari, Android Chrome, desktop browsers, Playwright Chromium/Firefox/WebKit, viewport bugs, touch targets, map behavior, dialogs, downloads, or visual regressions.
---

# Cross Browser Device QA

Use after `cejas-internacionales-guardrails`.

## Browser Matrix

- Chromium desktop.
- Firefox desktop.
- WebKit desktop/mobile emulation.
- Android Chrome real-device check when available.
- iOS Safari real-device check when available.

## Viewports

- 390px mobile.
- 430px mobile large.
- 768px tablet.
- 1024px laptop.
- 1440px desktop.
- 1920px wide.

## Must-Test Areas

- Header and mobile Sheet.
- Sticky/floating WhatsApp CTA.
- WhatsApp Dialog/Drawer.
- Market switcher.
- Services table/cards.
- Results lightbox.
- Map pins and fallback list.
- Downloads/PDF links.
- Forms are absent in V1.
- Reduced motion mode.

## Checks

- No horizontal overflow.
- Touch targets at least 44x44px.
- Text does not overflow cards/buttons.
- Images keep aspect ratio.
- Dialogs trap focus and close correctly.
- Back/forward browser navigation works.
- No console errors.

