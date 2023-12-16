import {defineConfig} from 'astro/config'
import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://sitek94.github.io',
  base: '/advent-of-code',
  srcDir: 'www',
  integrations: [
    react(),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
