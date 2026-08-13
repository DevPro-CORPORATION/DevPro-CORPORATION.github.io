import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://devpro-corporation.github.io',
  base: '/',
  vite: {
    build: {
      rollupOptions: {
        external: ['https://esm.sh/three@0.160.0'],
      }
    }
  }
});
