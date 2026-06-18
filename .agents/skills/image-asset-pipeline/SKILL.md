---
name: image-asset-pipeline
description: Image selection and optimization workflow for Cejas Internacionales. Use when choosing, cropping, naming, converting, resizing, generating alt text, preparing WebP/AVIF, social images, favicons, Open Graph images, gallery assets, or map visual assets.
---

# Image Asset Pipeline

Use after `cejas-internacionales-guardrails`.

## Source Rules

- Prefer real client images from `docs/cliente/assets-extraidos`.
- Do not invent generic stock imagery unless explicitly needed.
- The client lost original high-res photos; optimize what exists.
- Do not over-enlarge compressed images.

## Outputs

- Hero crops desktop/mobile.
- Gallery thumbnails.
- Lightbox images.
- Course PDF preview images.
- Open Graph image.
- `favicon.ico`, `icon.png`, `apple-icon.png`.
- Android/PWA icons 192 and 512 if needed.

## Naming

Use descriptive lowercase filenames:

- `xiomara-hero-cali.webp`
- `resultado-cejas-cicatrizado-01.webp`
- `curso-micropigmentacion-cejas-preview.webp`

## Requirements

- Stable dimensions/aspect ratios.
- Meaningful alt text.
- `next/image` compatible assets.
- Preserve logo variants already created.
- Do not use the catalog screenshots as primary hero unless no better photo exists.

