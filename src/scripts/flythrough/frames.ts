// Progressive, bounded frame loader for the scroll-scrubbed fly-through
// (ported from the LBSST site, where it is proven in production).
//  - requests the frame needed now first, then prefetches in the scroll direction
//  - bounded concurrency, abortable requests, bounded retries with backoff
//  - decoded-bitmap budget (bytes) with LRU eviction + ImageBitmap.close()
//  - the prefetch window is clamped to the budget, and frames inside the current window are
//    never evicted, so loading can't evict what it is about to request again (a refetch loop).
import type { FrameSequence } from '../../content/flythrough';

export function frameUrl(seq: FrameSequence, i: number, version?: string): string {
  const url = seq.pattern.replace('{i}', String(i).padStart(4, '0'));
  return version ? `${url}?v=${encodeURIComponent(version)}` : url;
}

export class FrameStore {
  private bitmaps = new Map<number, ImageBitmap>();
  private lastUsed = new Map<number, number>();
  private inflight = new Map<number, AbortController>();
  private failures = new Map<number, number>();
  private queue: number[] = [];
  private window = new Set<number>();
  private tick = 0;
  private destroyed = false;
  private readonly maxBitmaps: number;
  private readonly concurrency: number;
  private readonly ahead: number;
  private readonly behind: number;

  constructor(
    private seq: FrameSequence,
    private count: number,
    private version: string,
    private onLoad: (index: number) => void,
    opts: { concurrency?: number; budgetBytes?: number; ahead?: number; behind?: number } = {},
  ) {
    this.concurrency = opts.concurrency ?? 6;
    const perFrame = seq.width * seq.height * 4;
    this.maxBitmaps = Math.max(12, Math.floor((opts.budgetBytes ?? 160e6) / perFrame));
    // Leave headroom so the window always fits inside the budget.
    const span = Math.floor(this.maxBitmaps * 0.8);
    this.behind = Math.min(opts.behind ?? 8, Math.floor(span * 0.2));
    this.ahead = Math.min(opts.ahead ?? 30, span - this.behind - 1);
  }

  /** Call on every scroll update with the wanted frame and scroll direction (+1 / -1). */
  want(index: number, dir: 1 | -1) {
    const wanted: number[] = [index];
    for (let k = 1; k <= Math.max(this.ahead, this.behind); k++) {
      if (k <= this.ahead) wanted.push(index + dir * k);
      if (k <= this.behind) wanted.push(index - dir * k);
    }
    const valid = wanted.filter((i) => i >= 0 && i < this.count);
    const keep = new Set(valid);
    this.window = keep;
    for (const [i, ctrl] of this.inflight) {
      if (!keep.has(i)) {
        ctrl.abort();
        this.inflight.delete(i);
      }
    }
    this.queue = valid.filter((i) => !this.bitmaps.has(i) && !this.inflight.has(i) && (this.failures.get(i) ?? 0) < 3);
    this.lastUsed.set(index, ++this.tick);
    this.pump();
  }

  /** Exact frame if decoded, else the nearest decoded neighbour, else null. */
  get(index: number): ImageBitmap | null {
    const exact = this.bitmaps.get(index);
    if (exact) {
      this.lastUsed.set(index, ++this.tick);
      return exact;
    }
    for (let d = 1; d < 60; d++) {
      const b = this.bitmaps.get(index - d) ?? this.bitmaps.get(index + d);
      if (b) return b;
    }
    return null;
  }

  private pump() {
    while (!this.destroyed && this.inflight.size < this.concurrency && this.queue.length) this.load(this.queue.shift()!);
  }

  private async load(i: number) {
    const ctrl = new AbortController();
    this.inflight.set(i, ctrl);
    try {
      const res = await fetch(frameUrl(this.seq, i, this.version), { signal: ctrl.signal });
      if (!res.ok) throw new Error(String(res.status));
      const bmp = await createImageBitmap(await res.blob());
      if (this.destroyed || ctrl.signal.aborted) {
        bmp.close();
        return;
      }
      this.bitmaps.set(i, bmp);
      this.lastUsed.set(i, ++this.tick);
      this.evict();
      this.onLoad(i);
    } catch {
      if (!ctrl.signal.aborted) {
        const n = (this.failures.get(i) ?? 0) + 1;
        this.failures.set(i, n);
        if (n < 3) setTimeout(() => { if (!this.destroyed) { this.queue.push(i); this.pump(); } }, 400 * 2 ** n);
      }
    } finally {
      if (this.inflight.get(i) === ctrl) this.inflight.delete(i);
      this.pump();
    }
  }

  private evict() {
    if (this.bitmaps.size <= this.maxBitmaps) return;
    const byAge = [...this.bitmaps.keys()]
      .filter((i) => !this.window.has(i))
      .sort((a, b) => (this.lastUsed.get(a) ?? 0) - (this.lastUsed.get(b) ?? 0));
    while (this.bitmaps.size > this.maxBitmaps && byAge.length) {
      const i = byAge.shift()!;
      this.bitmaps.get(i)?.close();
      this.bitmaps.delete(i);
      this.lastUsed.delete(i);
    }
  }

  destroy() {
    this.destroyed = true;
    for (const c of this.inflight.values()) c.abort();
    this.inflight.clear();
    for (const b of this.bitmaps.values()) b.close();
    this.bitmaps.clear();
    this.queue = [];
  }
}
