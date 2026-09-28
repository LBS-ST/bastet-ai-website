---
id: BAI-1
title: 'Stage 1: build 7-page static Astro site with poster hero'
status: Done
assignee: []
created_date: '2026-09-28 10:27'
updated_date: '2026-09-28 10:45'
labels: []
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Rebuild bastet-tech.ai as static Astro 7 + Tailwind 4 site per CLAUDE.md, with a poster placeholder hero (FlythroughHero) ready for the Stage 2 frame-sequence fly-through. Copy verbatim from reference/content.md.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 All 7 pages + 404 render with verbatim copy from reference/content.md
- [x] #2 npm run build passes with 0 errors
- [x] #3 Per-page canonical, OG/Twitter, JSON-LD; robots.txt, sitemap.xml (7 URLs), llms.txt present
- [x] #4 Datasheet page links all 10 PDFs from public/datasheets
- [x] #5 Site-wide WhatsApp button; contact page email card with no form
- [x] #6 No horizontal overflow on mobile; no Chinese, no Unsplash, no placeholder text
- [x] #7 Hero copy + chapter mapping live in a content file with a marked canvas mount point
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Astro 7 SSG (format:file) + Tailwind 4; all copy in src/content/site.ts, hero + beat map in src/content/flythrough.ts; FlythroughHero poster with Stage 2 canvas TODO; per-page JSON-LD via src/lib/schema.ts; sitemap endpoint; scripts/verify.mjs post-build checks.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Validation: npm run build:all -> astro check 0 errors/0 warnings, 8 pages built, verify.mjs all checks passed. Browser (npm run preview): 7 pages + 404 render, no broken images, JSON-LD parses, all internal links/PDFs 200, /index.html -> /, no horizontal overflow at 360px, mobile menu focus/Escape/scroll-lock verified.
Decisions: supplied AI-box, sticky-trap and smart-trap screenshots contained Chinese UI text; web copies crop/blur it (scripts/prepare-assets.mjs). Sitemap uses /blog (no slash) to match canonical. og-image is near-square so twitter:card=summary. 404 copy ('Page not found', 'Home') and a11y strings live in UI block of site.ts for sign-off.
Open for Alex: confirm GA4 G-YESEEGLGZ6 is Bastet's own property; approve screenshot redactions; approve proposed beat->chapter mapping in flythrough.ts.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Built the Stage 1 7-page static site + 404 with a poster FlythroughHero ready for Stage 2. Verified with astro check (0 errors), build, scripts/verify.mjs, and browser checks on the preview build.
<!-- SECTION:FINAL_SUMMARY:END -->
