/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Reutiliza la config de Vite de Astro: alias `@/`, tipos de astro:assets, etc.
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
