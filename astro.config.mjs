import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import UnoCSS from 'unocss/astro';

// ААААААААААААААААААААААААААААА ТУТ ПІД"РАААААААААААААААААААААААААААААААААААААААААС
export default defineConfig({
  integrations: [
    vue(),
    UnoCSS({
      injectReset: true,
    }),
  ],
});
