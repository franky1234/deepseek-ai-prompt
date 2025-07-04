// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    server: {
      host: true,  // Escucha en todas las interfaces
      port: 4321
    }
  });
