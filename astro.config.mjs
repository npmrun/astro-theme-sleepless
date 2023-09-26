import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import Directive from 'remark-directive'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkBreaks from 'remark-breaks'

import rehypeCommon from './plugins/rehype/rehype-common.mjs'
import rehypeIframe from './plugins/rehype/rehype-iframe.mjs'
import rehypeCodeBtn from './plugins/rehype/rehype-code-btn.mjs'
import rehypeTabs from './plugins/rehype/rehype-tabs.mjs'
import rehypesplitSections from './plugins/rehype/rehype-splitSections.mjs'
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

import remarkCommon from './plugins/remark/remark-common.mjs'

import browserslist from 'browserslist'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'

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
        rehypePlugins: [
            // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
            rehypeHeadingIds,
            rehypeMathjax,
            rehypeCommon,
            rehypeCodeBtn,
            rehypesplitSections,
            rehypeTabs,
            rehypeIframe,
        ],
        remarkPlugins: [Directive, remarkMath, remarkCommon, remarkBreaks],
        remarkRehype: {
            footnoteLabel: '脚注',
            footnoteBackLabel: '回到文本',
        },
    },
    integrations: [tailwind()],
    vite: {
        build: {
            cssTarget: resolveToEsbuildTarget(browserslist(), {
                printUnknownTargets: false,
            }),
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: ` @import "@blog/assets/style/_global.scss"; `,
                },
            },
        },
    },
})
