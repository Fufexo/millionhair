// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio público: lo usan el canonical, Open Graph, el JSON-LD, el sitemap y
// robots.txt. Se define con SITE_URL (en Vercel o en .env) al pasar al dominio final.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://millionhair.vercel.app',
  integrations: [sitemap()],
  prefetch: false,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    // Mismo alias que tsconfig.json: Vite no lo aplica solo a los @use de Sass
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  },
});
