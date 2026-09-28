// Post-build checks for the CLAUDE.md non-negotiables. Run after `astro build`: npm run verify
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const D = 'dist';
const SITE = 'https://bastet-tech.ai';
const fails = [];
const ok = (cond, msg) => (cond ? console.log(`  ✓ ${msg}`) : fails.push(msg));
const read = (p) => readFileSync(join(D, p), 'utf8');

const pages = {
  'index.html': { canonical: `${SITE}/`, types: ['Organization', 'WebSite', 'FAQPage'], text: ['Make the Pest Visible', 'Request a Live Demo', 'Learn How It Works', 'How do I get started with Bastet?'] },
  'solution.html': { canonical: `${SITE}/solution`, types: ['Product'], text: ['The Bastet Solution', 'View Live Analytics Dashboard', 'Comprehensive Reporting'] },
  'datasheet.html': { canonical: `${SITE}/datasheet`, types: ['CollectionPage'], text: ['Product Datasheets', 'Bastet Zigbee Gateway'] },
  'about.html': { canonical: `${SITE}/about`, types: ['AboutPage'], text: ['About Bastet', '1000+', 'Built by Practitioners'] },
  'contact.html': { canonical: `${SITE}/contact`, types: ['ContactPage'], text: ["Let&#39;s Transform Your Facility", 'mailto:info@bastet-tech.ai', 'Implementation timeline discussion'] },
  'privacy.html': { canonical: `${SITE}/privacy`, types: ['WebPage'], text: ['Last updated: April 2026', '7. Contact Us'] },
  'blog.html': { canonical: `${SITE}/blog`, types: ['Blog'], text: ['Bastet AI Blog', 'https://blog.bastet-tech.ai'] },
};

const jsonLd = (h) => [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const types = (nodes) => nodes.flatMap((n) => (n['@graph'] ?? [n]).map((g) => g['@type']));

console.log('Pages, canonical, meta, JSON-LD');
for (const [file, want] of Object.entries(pages)) {
  ok(existsSync(join(D, file)), `${file} exists`);
  const h = read(file);
  const canon = [...h.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  ok(canon.length === 1 && canon[0] === want.canonical, `${file}: one self canonical ${want.canonical}`);
  ok(h.includes(`property="og:url" content="${want.canonical}"`), `${file}: og:url`);
  ok(h.includes(`property="og:image" content="${SITE}/og-image.png"`), `${file}: og:image local`);
  ok(h.includes('name="twitter:card"'), `${file}: twitter card`);
  ok(h.includes('G-YESEEGLGZ6'), `${file}: GA4`);
  ok(h.includes('elrk-lMsiJTc79FostpBS8dg5D3SMG3Brj20YRxY6uA'), `${file}: GSC verification`);
  ok(/index\\\.html/.test(h), `${file}: /index.html redirect script`);
  ok((h.match(/<h1[\s>]/g) ?? []).length === 1, `${file}: exactly one h1`);
  let t = [];
  try { t = types(jsonLd(h)); ok(true, `${file}: JSON-LD parses`); } catch (e) { ok(false, `${file}: JSON-LD parses (${e.message})`); }
  want.types.forEach((ty) => ok(t.includes(ty), `${file}: JSON-LD ${ty}`));
  want.text.forEach((s) => ok(h.includes(s), `${file}: contains "${s}"`));
}
const nf = read('404.html');
ok(nf.includes('noindex') && !nf.includes('rel="canonical"'), '404.html: noindex, no canonical');
const faq = jsonLd(read('index.html'))[0]['@graph'].find((n) => n['@type'] === 'FAQPage');
ok(faq?.mainEntity?.length === 6, 'FAQPage has 6 questions');

console.log('Crawl files');
const robots = read('robots.txt');
['GPTBot', 'ClaudeBot', 'PerplexityBot'].forEach((b) => ok(new RegExp(`User-agent: ${b}\\s+Allow: /`).test(robots), `robots allows ${b}`));
ok(/User-agent: \*\s+Allow: \//.test(robots), 'robots allows all');
ok(robots.includes(`Sitemap: ${SITE}/sitemap.xml`), 'robots sitemap pointer');
const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(locs.length === 7, `sitemap has 7 URLs (${locs.length})`);
Object.values(pages).forEach((p) => ok(locs.includes(p.canonical), `sitemap lists ${p.canonical}`));
ok(existsSync(join(D, 'llms.txt')) && read('llms.txt').startsWith('# Bastet AI'), 'llms.txt present');
ok(existsSync(join(D, 'og-image.png')), 'og-image.png present');

console.log('Datasheets');
const ds = read('datasheet.html');
const pdfs = [...ds.matchAll(/href="(\/datasheets\/[^"]+\.pdf)"/g)].map((m) => m[1]);
ok(pdfs.length === 10, `10 PDF links (${pdfs.length})`);
pdfs.forEach((p) => ok(existsSync(join(D, p)) && statSync(join(D, p)).size > 10_000, `${p} exists`));

console.log('Contact + WhatsApp');
const ct = read('contact.html');
ok(!/<form[\s>]/.test(ct), 'contact page has no form');
for (const f of Object.keys(pages)) ok(read(f).includes('https://wa.me/85265645417?text=Hello%20Bastet%20AI%2C%20I%20would%20like%20to%20enquire%20about%20your%20solutions.'), `${f}: WhatsApp button`);

console.log('Content hygiene (all emitted text files)');
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const textFiles = walk(D).filter((f) => /\.(html|txt|xml|js|css|json)$/.test(f));
const CJK = /[　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]/;
for (const f of textFiles) {
  const s = readFileSync(f, 'utf8');
  if (CJK.test(s)) fails.push(`CJK characters in ${f}`);
  if (/unsplash/i.test(s)) fails.push(`Unsplash URL in ${f}`);
  if (/lorem ipsum|placeholder text/i.test(s)) fails.push(`placeholder text in ${f}`);
}
ok(true, `${textFiles.length} files scanned for CJK / Unsplash / lorem`);

if (fails.length) {
  console.error(`\n✗ ${fails.length} check(s) failed:\n  - ${fails.join('\n  - ')}`);
  process.exit(1);
}
console.log('\nAll checks passed.');
