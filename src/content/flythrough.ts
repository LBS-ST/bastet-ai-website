// Homepage hero: copy + the fly-through timeline, in one editable place.
//
// Footage: production/flythrough/ (see PRODUCTION.md; *.mp4 are git-ignored). Frames are
// exported from the stitched master with:
//   ffmpeg -i flythrough-master.mp4 -an -vf "fps=20,scale=1440:-2:flags=lanczos" \
//     -c:v libwebp -quality 78 -start_number 0 public/flythrough/frames/frame-%04d.webp
// then update `manifest.count`, bump `manifest.version`, and re-time BEATS if the cut changed.
// Frame index = clip seconds × fps (e.g. 18 s → frame 360).
//
// Scroll distance is independent of clip length: a beat maps `vh` viewport heights of
// scrolling onto clip seconds from→to (`mobileVh` overrides on phones < 48rem). `hold`
// adds still-frame scroll before/after the motion. `focusX` shifts the phone crop when the
// landscape sequence is drawn on a phone (the portrait sequence is pre-cropped).
//
// Chapter copy reuses strings already in reference/content.md (no new copy). The mapping of
// How It Works steps onto the sensor/detect/report beats is a proposal for sign-off.

import { HOME } from './site';

export const FRAMES_ENABLED = true;

export interface CtaLink {
  label: string;
  href: string;
}

export interface Chapter {
  heading: string;
  body?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
  /** Copy column side on desktop; kept clear of the path the camera is flying towards. */
  align: 'left' | 'right';
  /** false = body copy hidden on phones during the flight (mobile spec §3). */
  mobileBody: boolean;
  /** Frame index shown behind this chapter in the static / reduced-motion view. */
  still: number;
}

export interface Beat {
  id: string;
  /** Route description from CLAUDE.md §7 (production note, never rendered). */
  route: string;
  /** Active pinned scroll distance, in viewport heights. */
  vh: number;
  /** Mobile override of `vh` (mobile spec §5). */
  mobileVh?: number;
  /** Extra still-frame scroll (viewport heights) before / after the motion. */
  hold?: { start?: number; end?: number };
  /** Master clip time range in seconds. */
  from: number;
  to: number;
  /** Horizontal crop focus for phone cover-fit: 0 left, 0.5 centre, 1 right. */
  focusX?: number;
  /** Chapter carried by this beat; null = no copy, let the motion lead. */
  chapter: ChapterId | null;
}

export const CHAPTERS = {
  arrive: {
    heading: 'Make the Pest Visible',
    body: 'Bastet is a professional Pesttech solutions leveraging AI, computer vision, and IoT sensors to automate monitoring and detection of pest activity. Move beyond traditional manual methods to intelligent, data-driven pest management.',
    primary: { label: 'Request a Live Demo', href: '/contact' },
    secondary: { label: 'Learn How It Works', href: '/solution' },
    align: 'left',
    mobileBody: false,
    still: 0,
  },
  sensor: { heading: HOME.howItWorks.steps[0].title, body: HOME.howItWorks.steps[0].body, align: 'left', mobileBody: false, still: 330 },
  detect: { heading: HOME.howItWorks.steps[1].title, body: HOME.howItWorks.steps[1].body, align: 'left', mobileBody: false, still: 490 },
  report: { heading: HOME.howItWorks.steps[2].title, body: HOME.howItWorks.steps[2].body, align: 'right', mobileBody: false, still: 560 },
  reveal: {
    heading: HOME.cta.title,
    body: HOME.cta.body,
    primary: HOME.cta.button,
    align: 'left',
    mobileBody: true,
    still: 896,
  },
} satisfies Record<string, Chapter>;

export type ChapterId = keyof typeof CHAPTERS;

/** The hero chapter shown at rest (and as the Stage 1 poster). */
export const HERO = CHAPTERS.arrive;

// Master = clip A 0–14.9 s · clip B 14.9–29.8 s · clip C 29.8–44.83 s (0.125 s crossfades).
export const BEATS: Beat[] = [
  // Hold the opening frame so the hero can be read, then glide across the yard and through the door.
  { id: 'arrive', route: 'Exterior at dusk, fly into the loading-bay entrance', hold: { start: 0.45 }, vh: 1.0, mobileVh: 0.75, from: 0, to: 5, chapter: 'arrive' },
  // Dark aisle, banking past racking and a wall corner: dense motion, no copy.
  { id: 'darkness', route: 'Shadowy corridor, sweeping past wall corners and behind equipment; pests hidden in shadow', vh: 1.5, mobileVh: 1.1, from: 5, to: 14.9, chapter: null },
  // Rack sensor pulses; the cyan sweep lights up glowing rodent trails.
  { id: 'sensor', route: 'A PIR sensor blinks; a sweep of light over the floor reveals rodent trails as a thermal glow', vh: 1.2, mobileVh: 0.95, from: 14.9, to: 19, chapter: 'sensor' },
  // Rise past the dome camera; the detection box snaps round the rat (≈ 23–26 s).
  { id: 'detect', route: 'Fly up to a Sensing Camera; lens closes in; detection boxes frame a pest', vh: 1.4, mobileVh: 1.05, from: 19, to: 26.5, chapter: 'detect' },
  // Control room: map dots light up, amber alert, then turn towards the rear door.
  { id: 'report', route: 'Into the control room; the dashboard sensor map lights up point by point; an alert pops', vh: 1.3, mobileVh: 1.0, from: 26.5, to: 33, chapter: 'report' },
  // Out of the rear door, 180° yaw: its own short beat so the spin doesn't feel like a jump.
  { id: 'exit', route: 'Out the back door, yaw 180° while moving, then fly backwards and climb', vh: 0.9, mobileVh: 0.7, from: 33, to: 38.5, chapter: null },
  // Fly backwards and climb to the aerial with the coverage grid; hold the final frame.
  { id: 'reveal', route: 'Aerial look back: facility, roads, sensor-coverage grid overlay; every pest now visible', hold: { end: 0.6 }, vh: 1.1, mobileVh: 0.8, from: 38.5, to: 44.8, chapter: 'reveal' },
];

export interface FrameSequence {
  /** `{i}` → zero-padded 4-digit frame index. */
  pattern: string;
  width: number;
  height: number;
  poster: string;
}

export interface FrameManifest extends FrameSequence {
  count: number;
  fps: number;
  /** Cache-buster appended to frame URLs; bump on every re-export. */
  version: string;
  /** Optional phone sequence: same frames, centre-cropped to 9:16 (mobile spec §4). */
  portraitPattern?: string;
  portraitWidth?: number;
  portraitHeight?: number;
  portraitPoster?: string;
}

export const manifest: FrameManifest | null = {
  count: 897,
  fps: 20,
  width: 1440,
  height: 810,
  pattern: '/flythrough/frames/frame-{i}.webp',
  poster: '/flythrough/poster.webp',
  version: '2026-09-29a',
  portraitPattern: '/flythrough/portrait/frame-{i}.webp',
  portraitWidth: 406,
  portraitHeight: 720,
  portraitPoster: '/flythrough/poster-portrait.webp',
};
