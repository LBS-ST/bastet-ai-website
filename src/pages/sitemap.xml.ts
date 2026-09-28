// Exactly the 7 indexable routes (CLAUDE.md §8), canonical form, no 404.
import type { APIRoute } from 'astro';
import { ROUTES, SITE } from '../content/site';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = Object.values(ROUTES)
    .map((path) => {
      const loc = new URL(path, SITE.url).href;
      const priority = path === '/' ? '1.0' : path === '/privacy' ? '0.3' : '0.8';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
