import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
    server: {
        port: 3311,
    },
    build: {
        assets: 'astro_',
    },
    markdown: {
        syntaxHighlight: 'prism',
        extendDefaultPlugins: true,
        remarkRehype: {
            footnoteLabel: "脚注",
            footnoteBackLabel: "回到文本"
        }
    },
    integrations: [tailwind()],
})
