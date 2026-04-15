import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // <-- Cambiado aquí

export default defineConfig({
  output: 'server',
  adapter: vercel(), // <-- Cambiado aquí
  vite: {
    ssr: {
      external: ['node:sqlite']
    }
  }
});