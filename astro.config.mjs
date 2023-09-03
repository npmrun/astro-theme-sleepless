import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import remarkBreaks from 'remark-breaks'
import rehypeCommon from './plugins/rehype/rehype-common.mjs'
import rehypesplitSections from './plugins/rehype/rehype-splitSections.mjs'

import remarkCommon from './plugins/remark/remark-common.mjs'

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
        rehypePlugins: [rehypeCommon, rehypesplitSections],
        remarkPlugins: [remarkCommon, remarkBreaks],
        remarkRehype: {
            footnoteLabel: '脚注',
            footnoteBackLabel: '回到文本',
        },
    },
    integrations: [tailwind()],
})
