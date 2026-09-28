// Homepage hero: copy + the Stage 2 fly-through timeline, in one editable place.
//
// Stage 1 (now): FRAMES_ENABLED = false → <FlythroughHero /> renders the "arrive" chapter
// over a static poster. Stage 2: generate footage, extract frames to /public/flythrough/,
// fill `manifest` + each beat's `from`/`to` seconds, flip FRAMES_ENABLED, and mount the
// canvas scrubber at the TODO in src/components/FlythroughHero.astro. Nothing else moves.
//
// Chapter copy reuses strings already in reference/content.md (no new copy). The mapping of
// How It Works steps onto beats 3–5 is a proposal for sign-off, not published yet.

import { HOME } from './site';

export const FRAMES_ENABLED = false;

export interface CtaLink {
  label: string;
  href: string;
}

export interface Chapter {
  heading: string;
  /** Shown on desktop; trimmed on phones during the flight (mobile spec §3). */
  body?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
}

export interface Beat {
  id: string;
  /** Route description from CLAUDE.md §7 (production note, never rendered). */
  route: string;
  /** Active pinned scroll distance, in viewport heights. */
  vh: number;
  /** Mobile override of `vh` (mobile spec §5). */
  mobileVh?: number;
  /** Clip time range in seconds; equal values = still-frame hold. Filled in Stage 2. */
  from: number | null;
  to: number | null;
  /** Horizontal crop focus for phone cover-fit: 0 left, 0.5 centre, 1 right. */
  focusX?: number;
  /** Chapter carried by this beat; null = no copy, let the motion lead. */
  chapter: keyof typeof CHAPTERS | null;
}

export const CHAPTERS = {
  arrive: {
    heading: 'Make the Pest Visible',
    body: 'Bastet is a professional Pesttech solutions leveraging AI, computer vision, and IoT sensors to automate monitoring and detection of pest activity. Move beyond traditional manual methods to intelligent, data-driven pest management.',
    primary: { label: 'Request a Live Demo', href: '/contact' },
    secondary: { label: 'Learn How It Works', href: '/solution' },
  },
  sensor: { heading: HOME.howItWorks.steps[0].title, body: HOME.howItWorks.steps[0].body },
  detect: { heading: HOME.howItWorks.steps[1].title, body: HOME.howItWorks.steps[1].body },
  report: { heading: HOME.howItWorks.steps[2].title, body: HOME.howItWorks.steps[2].body },
  reveal: {
    heading: HOME.cta.title,
    body: HOME.cta.body,
    primary: HOME.cta.button,
  },
} satisfies Record<string, Chapter>;

/** The hero chapter shown at rest (and as the Stage 1 poster). */
export const HERO = CHAPTERS.arrive;

export const BEATS: Beat[] = [
  { id: 'arrive', route: 'Exterior at dusk, fly into the loading-bay entrance', vh: 1.0, mobileVh: 0.7, from: null, to: null, chapter: 'arrive' },
  { id: 'darkness', route: 'Shadowy corridor, sweeping past wall corners and behind equipment; pests hidden in shadow', vh: 1.4, mobileVh: 1.1, from: null, to: null, chapter: null },
  { id: 'sensor', route: 'A PIR sensor blinks; a sweep of light over the floor reveals rodent trails as a thermal glow', vh: 1.2, mobileVh: 1.0, from: null, to: null, chapter: 'sensor' },
  { id: 'detect', route: 'Fly up to a Sensing Camera; lens closes in; detection boxes frame a pest', vh: 1.2, mobileVh: 1.0, from: null, to: null, chapter: 'detect' },
  { id: 'report', route: 'Into the control room; the dashboard sensor map lights up point by point; an alert pops', vh: 1.2, mobileVh: 1.0, from: null, to: null, chapter: 'report' },
  { id: 'exit', route: 'Out the back door, yaw 180° while moving, then fly backwards and climb', vh: 0.6, mobileVh: 0.5, from: null, to: null, chapter: null },
  { id: 'reveal', route: 'Aerial look back: facility, roads, sensor-coverage grid overlay; every pest now visible', vh: 1.0, mobileVh: 0.8, from: null, to: null, chapter: 'reveal' },
];

/** Filled in Stage 2 from the extracted sequence (count, fps, size, pattern, version). */
export const manifest: null | {
  count: number;
  fps: number;
  width: number;
  height: number;
  pattern: string; // e.g. '/flythrough/frames/frame-{0000}.webp'
  portraitPattern?: string;
  poster: string;
  version: string;
} = null;
