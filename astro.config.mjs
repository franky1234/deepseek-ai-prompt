
1// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
//   output: 'static', 
  server: {
    host: true,
    port: 4321
  }
});