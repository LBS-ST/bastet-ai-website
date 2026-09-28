# bastet-tech.ai

Static Astro 7 + Tailwind CSS 4 site for Bastet AI. Spec: `CLAUDE.md`. Copy source: `reference/content.md`.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies (Node 22) |
| `npm run dev` | Dev server |
| `npm run build` | Build to `dist/` |
| `npm run build:all` | Type check + build + `scripts/verify.mjs` (SEO, JSON-LD, PDFs, no CJK/Unsplash) |
| `npm run preview` | Serve `dist/` locally |
| `node scripts/prepare-assets.mjs` | Re-derive images from `reference/assets/` (outputs are committed) |

Cloudflare Pages: build `npm run build`, output `dist`, Node 22.

## Where things live

- `src/content/site.ts`: every visitor-facing string, SEO titles/descriptions, routes, tracking IDs.
- `src/content/flythrough.ts`: homepage hero copy + the Stage 2 beat/chapter timeline.
- `src/components/FlythroughHero.astro`: hero. Stage 1 poster; the Stage 2 canvas mounts at the `TODO(Stage 2)` comment.
- `src/lib/schema.ts`: JSON-LD per page.
- `src/pages/sitemap.xml.ts`: the 7-URL sitemap. `public/robots.txt`, `public/llms.txt`, `public/_headers`.

## Notes

- `build.format: 'file'` on purpose: Pages serves `solution.html` at `/solution` without a slash redirect, so canonicals match served URLs.
- Several supplied product screenshots contained Chinese UI text. `scripts/prepare-assets.mjs` crops that chrome away and blurs the few glyphs inside photos; originals stay untouched in `reference/assets/`.
