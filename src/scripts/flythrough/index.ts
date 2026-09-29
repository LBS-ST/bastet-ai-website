// Pinned-canvas fly-through controller.
// Native scrolling only (no hijacking): scroll offset → piecewise beat timeline → clip seconds
// → frame, drawn cover-fit on a canvas. All copy stays semantic HTML over the stage.
// Runs only when <html> has `ft-live` (set inline by FlythroughHero unless reduced motion,
// Save-Data, a low-memory device or `?static`); otherwise the hero shows stacked chapters
// over representative stills.
import { BEATS, manifest } from '../../content/flythrough';
import { FrameStore } from './frames';
import { buildTimeline, chapterOpacity, focusAt, timeAt, type Timeline } from './timeline';

export function initFlythrough(root: HTMLElement) {
  if (!document.documentElement.classList.contains('ft-live') || !manifest) return;
  const m = manifest;

  const stage = root.querySelector<HTMLElement>('[data-ft-stage]')!;
  const canvas = root.querySelector<HTMLCanvasElement>('[data-ft-canvas]')!;
  const ctx = canvas.getContext('2d', { alpha: false })!;
  const chapterEls = new Map<string, HTMLElement>();
  root.querySelectorAll<HTMLElement>('[data-chapter]').forEach((el) => chapterEls.set(el.dataset.chapter!, el));

  const mqMobile = matchMedia('(max-width: 47.99rem)');
  let tl: Timeline;
  let store: FrameStore | null = null;
  let seqW = 0, seqH = 0, portrait = false;
  let lastPx = 0, dir: 1 | -1 = 1;
  let lastKey = '';
  let raf = 0;
  let active = true;
  let w = 0, h = 0;

  function setupSequence() {
    store?.destroy();
    // Phones request only the pre-cropped portrait sequence, larger screens only landscape.
    portrait = mqMobile.matches && !!m.portraitPattern;
    const seq = portrait
      ? { pattern: m.portraitPattern!, width: m.portraitWidth!, height: m.portraitHeight!, poster: m.portraitPoster! }
      : m;
    seqW = seq.width;
    seqH = seq.height;
    store = new FrameStore(seq, m.count, m.version, () => { lastKey = ''; schedule(); }, {
      budgetBytes: mqMobile.matches ? 64e6 : 160e6,
    });
  }

  function layout() {
    const vhPx = stage.clientHeight; // the sticky stage is 100svh = one timeline unit
    tl = buildTimeline(BEATS, mqMobile.matches, vhPx);
    root.style.height = `${tl.totalPx + vhPx}px`;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = stage.clientWidth;
    h = vhPx;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lastKey = '';
  }

  function drawCover(bmp: CanvasImageSource, focusX: number) {
    const scale = Math.max(w / seqW, h / seqH);
    const dw = seqW * scale, dh = seqH * scale;
    const x = Math.min(0, Math.max(w - dw, w / 2 - focusX * dw));
    ctx.drawImage(bmp, x, (h - dh) / 2, dw, dh);
  }

  function render() {
    raf = 0;
    const px = Math.min(Math.max(-root.getBoundingClientRect().top, 0), tl.totalPx);
    if (px !== lastPx) dir = px > lastPx ? 1 : -1;
    lastPx = px;

    const frame = Math.min(m.count - 1, Math.max(0, Math.round(timeAt(tl, px) * m.fps)));
    // The portrait sequence is already centre-cropped; focus only shifts the landscape crop.
    const focus = mqMobile.matches && !portrait ? focusAt(tl, px) : 0.5;
    const key = `${frame}|${focus.toFixed(3)}|${w}x${h}`;
    if (key !== lastKey && store) {
      store.want(frame, dir);
      const bmp = store.get(frame);
      if (bmp) {
        drawCover(bmp, focus);
        stage.classList.add('is-drawn');
        lastKey = key;
      }
    }

    for (const ch of tl.chapters) {
      const el = chapterEls.get(ch.id);
      if (!el) continue;
      const o = chapterOpacity(tl, ch, px);
      const visible = o > 0.02;
      el.style.opacity = o.toFixed(3);
      el.style.setProperty('--ft-rise', `${((1 - o) * 16).toFixed(1)}px`);
      if (el.inert === visible) el.inert = !visible; // hidden copy leaves tab order + a11y tree
    }
    root.style.setProperty('--ft-progress', (px / tl.totalPx).toFixed(4));
  }

  function schedule() {
    if (!raf && active) raf = requestAnimationFrame(render);
  }

  setupSequence();
  layout();
  render();
  root.classList.add('is-ready');

  addEventListener('scroll', schedule, { passive: true });
  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => { layout(); schedule(); }, 120);
  };
  addEventListener('resize', onResize);
  addEventListener('orientationchange', onResize);
  mqMobile.addEventListener('change', () => { setupSequence(); onResize(); });

  new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    if (active) { lastKey = ''; schedule(); }
  }).observe(root);
}
