// One-off asset derivation from reference/assets → src/assets + public.
// Run: node scripts/prepare-assets.mjs  (outputs are committed; re-run only if the sources change)
import sharp from 'sharp';
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';

const REF = 'reference/assets';
mkdirSync('src/assets/brand', { recursive: true });
mkdirSync('src/assets/screens', { recursive: true });
mkdirSync('public/datasheets', { recursive: true });

// 1. Logo on transparent background, white wordmark variant for dark surfaces.
//    The source PNG sits on an opaque #F9F9F9 field, so the field is keyed out:
//    flood-fill the light background from the edges, then un-blend the anti-aliased
//    edge pixels. The symbol keeps its blue gradient + white eye; only the wordmark
//    (dark navy) is recoloured to white.
async function logoVariants() {
  const { data, info } = await sharp(`${REF}/bastet-logo.png`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const BG = 249;
  const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  const isBgLike = (i) => lum(i) > 236 && Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) < 12;

  // flood fill background
  const bg = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push([x, 0], [x, H - 1]);
  for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const p = y * W + x;
    if (bg[p] || !isBgLike(p * 4)) continue;
    bg[p] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  const SYMBOL_END = 470; // wordmark starts right of this column
  const white = Buffer.from(data);
  const colour = Buffer.from(data);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      const i = p * 4;
      if (bg[p]) { white[i + 3] = 0; colour[i + 3] = 0; continue; }
      if (x >= SYMBOL_END) {
        // wordmark: dark ink on light field → alpha from luminance
        const a = Math.max(0, Math.min(1, (BG - lum(i)) / (BG - 14)));
        white[i] = white[i + 1] = white[i + 2] = 255; white[i + 3] = Math.round(a * 255);
        colour[i] = 26; colour[i + 1] = 35; colour[i + 2] = 51; colour[i + 3] = Math.round(a * 255);
        continue;
      }
      // symbol: un-blend only pixels touching the keyed background
      let edge = false;
      for (let dy = -2; dy <= 2 && !edge; dy++) for (let dx = -2; dx <= 2; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx >= 0 && yy >= 0 && xx < W && yy < H && bg[yy * W + xx]) { edge = true; break; }
      }
      if (!edge) continue;
      const a = Math.max(0, Math.min(1, (BG - data[i]) / (BG - 60)));
      for (const buf of [white, colour]) {
        buf[i + 3] = Math.round(a * 255);
        if (a > 0.02) for (let c = 0; c < 3; c++) buf[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - (1 - a) * BG) / a)));
      }
    }
  }
  const out = (buf, file) => sharp(buf, { raw: { width: W, height: H, channels: 4 } }).trim({ threshold: 0 }).png().toFile(file);
  await out(white, 'src/assets/brand/bastet-logo-white.png');
  await out(colour, 'src/assets/brand/bastet-logo.png');
  // symbol only (footer lock-up, JSON-LD logo)
  const symbol = await sharp(colour, { raw: { width: W, height: H, channels: 4 } }).extract({ left: 0, top: 0, width: SYMBOL_END, height: H }).png().toBuffer();
  await sharp(symbol).trim({ threshold: 0 }).png().toFile('src/assets/brand/bastet-symbol.png');
  await sharp('src/assets/brand/bastet-logo.png').resize({ width: 600 }).png().toFile('public/bastet-logo.png');
}

// 2. Hero backdrop: the source illustration is cyan/blue ink on a white field. Putting a dark
//    overlay on it only greys it out, so the white field is removed instead: each pixel's ink
//    amount becomes alpha, its colour is un-blended from the field, and the result is laid on
//    the brand navy. Hues stay true (the blue hex stays blue), the field becomes night.
async function heroBackdrop() {
  const { data, info } = await sharp(`${REF}/solution-hero-bg.png`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const FIELD = 249;
  const NAVY = [26, 35, 51];
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(0, Math.min(1, (FIELD - Math.min(r, g, b)) / (FIELD - 30)));
    const lit = Math.min(1, a * 1.5);
    for (let c = 0; c < 3; c++) {
      const ink = a > 0.02 ? Math.max(0, Math.min(255, (data[i + c] - (1 - a) * FIELD) / a)) : 0;
      out[i + c] = Math.round(NAVY[c] * (1 - lit) + ink * lit);
    }
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile('src/assets/brand/hero-circuit.png');
}

// 3. Product screenshots. Several source captures carry Chinese UI text, which the site must
//    not show (English only). Nothing is redrawn: Chinese UI chrome is cropped away and the
//    few glyphs inside real photos (camera timestamp weekday, detection label, a brand print on
//    the sticky board) are blurred. Everything else is the untouched capture.
async function redact(file, { crop, blur = [] }) {
  let img = sharp(`${REF}/${file}.png`).removeAlpha();
  const base = await img.png().toBuffer();
  const patches = await Promise.all(
    blur.map(async (r) => ({
      input: await sharp(base).extract(r).blur(7).png().toBuffer(),
      left: r.left,
      top: r.top,
    })),
  );
  let out = sharp(await sharp(base).composite(patches).png().toBuffer());
  if (crop) out = sharp(await out.extract(crop).png().toBuffer());
  await out.png().toFile(`src/assets/screens/${file}.png`);
}

async function screens() {
  for (const f of ['iot-sensor-map', 'dashboard-analytics']) copyFileSync(`${REF}/${f}.png`, `src/assets/screens/${f}.png`);
  // AI box, wide: the camera feed only, below the on-screen timestamp; blur the class label.
  await redact('ai-box-dashboard', {
    blur: [{ left: 625, top: 248, width: 80, height: 40 }],
    crop: { left: 473, top: 152, width: 970, height: 490 },
  });
  // AI box, close-in: the same feed tightened on the detection box.
  await redact('ai-box-detection', {
    blur: [{ left: 296, top: 486, width: 80, height: 46 }],
    crop: { left: 120, top: 345, width: 684, height: 500 },
  });
  // Sticky-trap tool: drop the app bar (Chinese menu + a sibling brand logo); blur the trap's print.
  await redact('sticky-trap-analysis', {
    blur: [{ left: 748, top: 250, width: 88, height: 50 }],
    crop: { left: 0, top: 104, width: 1388, height: 1169 },
  });
  await redact('analysis-details', { blur: [{ left: 576, top: 586, width: 82, height: 52 }] });
  // Smart trap map: crop the planting schedule (it has a Chinese-name column).
  await redact('smart-trap-caught', { crop: { left: 0, top: 0, width: 1691, height: 1105 } });
}

// 4. Straight copies: PDFs, icons, social image.
function copies() {
  for (const f of readdirSync(`${REF}/datasheets`)) copyFileSync(`${REF}/datasheets/${f}`, `public/datasheets/${f}`);
  copyFileSync(`${REF}/og-image.png`, 'public/og-image.png');
  copyFileSync(`${REF}/favicon.ico`, 'public/favicon.ico');
  copyFileSync(`${REF}/favicon.png`, 'public/favicon.png');
}

async function touchIcon() {
  await sharp(`${REF}/favicon.png`).resize(180, 180, { fit: 'contain', background: '#F9F9F9' }).png().toFile('public/apple-touch-icon.png');
}

await logoVariants();
await heroBackdrop();
copies();
await touchIcon();
await screens();
console.log('assets prepared');
