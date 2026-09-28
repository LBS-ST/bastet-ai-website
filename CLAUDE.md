# Bastet AI Website — Astro Rebuild (Lovable Exit)

> This file is the SINGLE SOURCE OF TRUTH for building the new bastet-tech.ai.
> Read it fully before writing any code. Replicate the existing production content VERBATIM — do not rewrite, embellish, or invent copy.

---

## 1. Project Goal

Rebuild **bastet-tech.ai** as a static Astro 7 site (self-hosted on Alex's Cloudflare Pages), replacing the current Lovable React SPA. Same workflow as the sibling sites (lbs-smarttech.com, iotree.hk) already completed.

**Language: English only.** Brand has NO Chinese name — always "Bastet AI".

---

## 2. Brand Identity

| Item | Value |
|---|---|
| Name | Bastet AI |
| Tagline | Make the Pest Visible |
| Language | English only |
| Email | info@bastet-tech.ai |
| Domain | bastet-tech.ai (apex + www) |
| Blog | blog.bastet-tech.ai (separate Ghost — LINK OUT, do not rebuild) |

**Color system (from logo + positioning):**
- Primary blue: `#2173D9` (vibrant) → `#1A4E9B` (deep) — gradient in logo symbol
- Dark navy (near-black): `#1A2333` — wordmark / dark sections
- Neutral: light grey `#F0F0F0` / white
- Accent for AI "reveal" glow in the fly-through: cyan-blue `#4DABF7` / `#22D3EE` (detection boxes, sensor pulses, thermal traces) — used sparingly as the "technology glow"
- Restrained palette (3–5 colors, $10K standard). No rainbow.

**Typography ($10K standard — paired display + body, NOT Inter/Roboto for display):**
- Display/headings: **Space Grotesk** (geometric, technical — consistent with sibling sites)
- Body: a clean humanist sans (e.g. **Public Sans** or **IBM Plex Sans**) — avoid defaulting to Inter

**Logo**: `reference/assets/bastet-logo.png` — shield/hexagon + eye symbol, blue gradient, lowercase "bastet" wordmark in dark navy. Do NOT redesign. White variant needed for dark footer/header-over-video.

---

## 3. Tech Stack & Constraints

- **Astro 7** (SSG, static output) + **Tailwind CSS 4** + TypeScript
- **Node >= 22** (Astro 7 requirement). Commit `.nvmrc` (content `22`) + `.node-version` (content `22`) — one number, one line each, nothing else.
- **No CMS.** Content lives in a structured content file (see §6). No Decap, no backend.
- Build output: `dist/`. Cloudflare Pages: build `npm run build`, output `dist`.
- **No database / Supabase / server functions.** This is a static site.

---

## 4. Page Structure (7 pages + 404)

| Route | Title (SEO) |
|---|---|
| `/` | Bastet AI — Smart Pest Control with Computer Vision |
| `/solution` | AI Pest Control: Computer Vision & IoT \| Bastet AI |
| `/datasheet` | Product Datasheets — Bastet AI Smart Pest Hardware |
| `/about` | About Bastet AI — Field-Tested Smart Pest Control Experts |
| `/contact` | Contact Bastet AI — Request a Smart Pest Control Demo |
| `/privacy` | Privacy Policy — Bastet AI |
| `/blog` | Blog — Smart Pest Control Insights \| Bastet AI |
| 404 | — |

Navigation (header, in order): Home `/` · Solutions `/solution` · Datasheet `/datasheet` · Blog (external → `https://blog.bastet-tech.ai`, new tab) · About Us `/about` · Contact `/contact` + CTA button **"Request Demo"** → `/contact`.

**Every page's copy, section by section, is in `reference/content.md` (verbatim).** Use it as the exact source. Do NOT paraphrase.

---

## 5. Design Direction (premium, $10K standard)

Follow the **8 principles in `The_10K_Checklist.pdf`** (already distilled): point of view, typography that does work, restrained color, breathing hierarchy, imagery with intent, motion that whispers, mobile that's designed (not shrunk), invisible expensive stuff (sub-2s load, WCAG AA, semantic HTML, real meta).

- **Dark, premium tech aesthetic.** Pest activity = night/dark; "make the pest visible" = light/AI glow revealing what's hidden. Use the dark navy `#1A2333` as the dominant dark surface, blue `#2173D9` as the primary action color, and the cyan-blue glow as the "technology reveal" accent.
- **Hero = the cinematic fly-through** (see §7). This is the centrepiece.
- Motion should be subtle outside the hero (micro-interactions), not AOS-fade-up slop.
- The existing product/UI screenshots (`reference/assets/*.png`) are real product imagery — use them with intent in the Solution page.

---

## 6. Content Source

- **All copy**: `reference/content.md` — verbatim, structured per page (hero, sections, FAQs, testimonials, datasheet entries, privacy policy, footer).
- **Assets**: `reference/assets/` — logo, product screenshots, datasheet PDFs, og-image, favicon.
- **Datasheets**: 10 PDFs in `reference/assets/datasheets/` — the Datasheet page lists them (name/category/description/file are in content.md §4) and links each to a download.

Structure the site content in a single TypeScript content module (e.g. `src/content/site.ts`) or per-page data, mirroring the sibling sites' approach. The agent chooses the cleanest structure, but every string must come from `reference/content.md`.

---

## 7. The Fly-Through Hero (Route: "Make the Pest Visible" — invisible → visible)

The homepage hero is a **scroll-scrubbed, one-continuous-camera fly-through** through a facility, telling the story of pests going from invisible → made visible by Bastet's AI. Confirmed route:

1. **Arrive** — exterior at dusk, fly into the loading-bay entrance
2. **Darkness** — through a shadowy corridor, sweeping past wall corners / behind equipment (pests hidden in shadow, invisible to the naked eye)
3. **Sensor trigger** — a PIR sensor blinks; a sweep of light passes over the floor, revealing rodent activity trails as a thermal/glow trace
4. **Camera detection** — fly up to a Sensing Camera, lens closes in, computer-vision detection boxes frame a pest, labelled "DETECTED"
5. **Data flow** — fly into the control room; dashboard sensor map lights up point by point; an alert pops
6. **Exit + 180°** — fly out the back door, yaw 180°, then fly backwards and climb
7. **Reveal** — aerial look back: the whole facility + surrounding roads, sensor-coverage grid overlay, all pests now "visible"

**Visual language**: dark interiors lit by the blue/cyan "AI glow" (detection boxes, sensor pulses, thermal traces, dashboard highlights). Never write "drone"/"quadcopter"/"UAV" in any generation prompt — describe "one single continuous first-person camera move, no cuts; the camera itself is flying; nothing flying or hovering is ever visible in frame." No text, logos, brand badges, or signage lettering in the footage.

**Full desktop build spec**: `reference/flythrough-desktop.md`
**Full mobile refinement spec**: `reference/flythrough-mobile.md`
These two files are the authoritative build instructions for the fly-through (visual story table, scroll pacing, clip chaining, frame-sequence extraction, pinned-canvas scroll-scrub, glass-to-solid header, mobile cover-fit crop, reduced-motion fallback).

**⚠️ Two-stage integration (IMPORTANT):**
- **Stage 1 (this build):** Build the full 7-page site with a **placeholder hero** — a strong static poster/start-still area with the hero copy ("Make the Pest Visible" + sub + CTAs) and a clearly-marked mount point for the fly-through. Do NOT block the site on the video. The site must be fully usable and deployable without the video.
- **Stage 2 (separate, after Stage 1 is verified):** Generate the fly-through footage (Higgsfield/Seedance), extract the frame sequence, and wire the scroll-scrub into the hero. A separate spec will be provided.

The site architecture must anticipate Stage 2: hero copy lives in an editable content file with per-beat chapter mapping, and the hero section is a self-contained component that can swap poster → frame-sequence without restructuring.

---

## 8. SEO / GEO

- **GA4**: `G-YESEEGLGZ6` (hardcode as fallback default, not env var). ⚠️ Flag to Alex: confirm this is Bastet's OWN property (sibling LBSST used the same ID).
- **GSC verification**: `<meta name="google-site-verification" content="elrk-lMsiJTc79FostpBS8dg5D3SMG3Brj20YRxY6uA" />`
- **Canonical**: self-referential per page (no `/index.html` duplicate). Client-side redirect `/index.html` → `/`.
- **robots.txt**: allow all + open `GPTBot`, `ClaudeBot`, `PerplexityBot` (like siblings); `Sitemap: https://bastet-tech.ai/sitemap.xml`.
- **sitemap.xml**: 7 URLs (/, /solution, /datasheet, /about, /blog/, /contact, /privacy).
- **llms.txt**: port the content from the source (see content.md — it's the AI-readable brand summary).
- **JSON-LD** (per page, verbatim intent from content.md SEO sections):
  - Home: `Organization` (+ sameAs LinkedIn/Facebook + contactPoint sales), `WebSite` (SearchAction), `FAQPage` (from the 6 FAQs)
  - Solution: `Product`
  - Datasheet: `CollectionPage`
  - About: `AboutPage`
  - Contact: `ContactPage`
  - Blog: `Blog`
- **Open Graph / Twitter cards** on every page (title/description/image/url). `og:image` = local `/og-image.png` (NOT the old absolute Google-storage URL — see content.md note).

---

## 9. Contact & WhatsApp

- **Contact page**: email card (`info@bastet-tech.ai`, mailto) + "What to Expect" list (4 items). NO form (source has none).
- **WhatsApp floating button** (site-wide, bottom-right, `#25D366` green): link `https://wa.me/85265645417?text=Hello%20Bastet%20AI%2C%20I%20would%20like%20to%20enquire%20about%20your%20solutions.`

---

## 10. Footer

From content.md §10: social icons (LinkedIn/Facebook), brand + tagline, Quick Links (Solutions/About Us/Contact/Privacy Policy/Blog), Contact Us (email), copyright line.

---

## 11. Build / Verify / Deploy

- `npm run build` must pass with 0 errors, then `npm run preview` and browser-check each page.
- Verify: no Unsplash URLs (all imagery is local `reference/assets/*` or generated); canonical correct per route; robots/sitemap/llms present; JSON-LD valid.
- Commit + push to `main`. Cloudflare Pages is configured separately (Alex's account) — build `npm run build`, output `dist`, Node 22.

---

## 12. Non-Negotiables

1. English only. No Chinese anywhere (including meta, alt text, comments).
2. Copy is VERBATIM from `reference/content.md`. Do not invent testimonials, stats, clients, or copy.
3. No CMS, no backend, no Supabase. Static site only.
4. Blog is a LINK OUT to `https://blog.bastet-tech.ai` — do not build blog content.
5. The fly-through is Stage 2. Stage 1 must be a complete, deployable site with a poster placeholder hero.
6. Logo, colors, tagline, social URLs, email are fixed per §2 / content.md §0.
