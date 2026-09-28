// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static SSG for Cloudflare Pages. `format: 'file'` emits dist/solution.html, which Pages
// serves at /solution with no trailing-slash redirect, so canonical and served URLs match.
// The sitemap is a hand-rolled endpoint (src/pages/sitemap.xml.ts) listing exactly 7 URLs.
export default defineConfig({
  site: 'https://bastet-tech.ai',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
});
