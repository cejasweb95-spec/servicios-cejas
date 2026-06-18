---
name: schema-structured-data
description: Structured data and JSON-LD workflow for Cejas Internacionales. Use when adding or auditing Organization, LocalBusiness, BeautySalon, Service, Course, BreadcrumbList, ImageObject, FAQPage, WebSite, or WebPage schema.
---

# Schema Structured Data

Use after `cejas-internacionales-guardrails`.

## Schema Candidates

- Home: `Organization`, `WebSite`, `WebPage`.
- Cali presence: `LocalBusiness` or `BeautySalon` with Cali address only.
- Services: `Service`.
- Courses: `Course`.
- Results/gallery: `ImageObject` only for selected high-value images.
- Breadcrumbs: `BreadcrumbList` on internal pages.
- FAQ: `FAQPage` only if questions and answers are confirmed.

## Non-Negotiables

- Do not create Spain or Switzerland local business addresses.
- Legal address is only Cali, Colombia.
- Do not publish medical claims, pain/anesthesia, hygiene, pregnancy, contraindications, or payment claims unless confirmed.
- Do not add fake reviews/ratings.
- Do not mark PDFs as products for sale; no ecommerce.

## Validation

- Validate JSON-LD with Rich Results Test.
- Validate with Schema.org validator.
- Keep schema data consistent with visible page content.
- Use canonical URLs.

