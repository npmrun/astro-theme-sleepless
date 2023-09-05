import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import remarkBreaks from 'remark-breaks'
import rehypeCommon from './plugins/rehype/rehype-common.mjs'
import rehypeCodeBtn from './plugins/rehype/rehype-code-btn.mjs'
import rehypeTabs from './plugins/rehype/rehype-tabs.mjs'
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
        rehypePlugins: [rehypeCommon, rehypeCodeBtn, rehypesplitSections, rehypeTabs],
        remarkPlugins: [remarkCommon, remarkBreaks],
        remarkRehype: {
            footnoteLabel: '脚注',
            footnoteBackLabel: '回到文本',
        },
    },
    integrations: [tailwind()],
})
