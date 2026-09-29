// Piecewise scroll timeline: each beat owns its own scroll interval (viewport heights)
// and its own clip interval (seconds). from === to is a still-frame hold.
import type { Beat, ChapterId } from '../../content/flythrough';

export interface Segment {
  startPx: number;
  endPx: number;
  from: number;
  to: number;
  chapter: ChapterId | null;
  focusX: number;
}

export interface ChapterRange {
  id: ChapterId;
  startPx: number;
  endPx: number;
  first: boolean;
  last: boolean;
}

export interface Timeline {
  segments: Segment[];
  chapters: ChapterRange[];
  totalPx: number;
  vhPx: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function buildTimeline(beats: Beat[], mobile: boolean, vhPx: number): Timeline {
  let cursor = 0;
  const segments: Segment[] = [];
  const push = (vh: number, from: number, to: number, b: Beat) => {
    if (vh <= 0) return;
    const len = vh * vhPx;
    segments.push({ startPx: cursor, endPx: cursor + len, from, to, chapter: b.chapter, focusX: b.focusX ?? 0.5 });
    cursor += len;
  };
  for (const b of beats) {
    // Optional still-frame holds before/after the beat's motion (e.g. to read the hero copy).
    push(b.hold?.start ?? 0, b.from, b.from, b);
    push(mobile ? b.mobileVh ?? b.vh : b.vh, b.from, b.to, b);
    push(b.hold?.end ?? 0, b.to, b.to, b);
  }

  const chapters: ChapterRange[] = [];
  for (const s of segments) {
    if (!s.chapter) continue;
    const prev = chapters[chapters.length - 1];
    if (prev && prev.id === s.chapter && Math.abs(prev.endPx - s.startPx) < 0.5) prev.endPx = s.endPx;
    else chapters.push({ id: s.chapter, startPx: s.startPx, endPx: s.endPx, first: false, last: false });
  }
  if (chapters.length) {
    chapters[0].first = chapters[0].startPx === 0;
    chapters[chapters.length - 1].last = true;
  }
  return { segments, chapters, totalPx: cursor, vhPx };
}

/** Clip time (seconds) at a scroll offset into the pinned section. */
export function timeAt(tl: Timeline, px: number): number {
  const p = clamp(px, 0, tl.totalPx);
  const seg = tl.segments.find((s) => p < s.endPx) ?? tl.segments[tl.segments.length - 1];
  const local = seg.endPx === seg.startPx ? 1 : (p - seg.startPx) / (seg.endPx - seg.startPx);
  return seg.from + (seg.to - seg.from) * local;
}

/** Horizontal crop focus, smoothstep-eased between beat centres (never jumps). */
export function focusAt(tl: Timeline, px: number): number {
  const centres = tl.segments.map((s) => ({ at: (s.startPx + s.endPx) / 2, f: s.focusX }));
  if (px <= centres[0].at) return centres[0].f;
  for (let i = 1; i < centres.length; i++) {
    if (px <= centres[i].at) {
      const a = centres[i - 1], b = centres[i];
      const k = (px - a.at) / (b.at - a.at);
      return a.f + (b.f - a.f) * (k * k * (3 - 2 * k));
    }
  }
  return centres[centres.length - 1].f;
}

/** Fades in, holds, fades out within its beats; the first is visible at rest, the last holds to the end. */
export function chapterOpacity(tl: Timeline, ch: ChapterRange, px: number): number {
  const range = ch.endPx - ch.startPx;
  const fade = Math.min(tl.vhPx * 0.3, range * 0.22);
  if (px < ch.startPx || px > ch.endPx) {
    if (ch.last && px > ch.endPx) return 1;
    if (ch.first && px < ch.startPx) return 1;
    return 0;
  }
  const fadeIn = ch.first ? 1 : clamp((px - ch.startPx) / fade, 0, 1);
  const fadeOut = ch.last ? 1 : clamp((ch.endPx - px) / fade, 0, 1);
  return Math.min(fadeIn, fadeOut);
}
