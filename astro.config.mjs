import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import Directive from 'remark-directive'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkBreaks from 'remark-breaks'
import remarkDeflist from 'remark-deflist'

import rehypeCommon from './plugins/rehype/rehype-common.mjs'
import rehypeBlockquote from './plugins/rehype/rehype-blockquote.mjs'
import rehypeIframe from './plugins/rehype/rehype-iframe.mjs'
import rehypeCodeBtn from './plugins/rehype/rehype-code-btn.mjs'
import rehypeTabs from './plugins/rehype/rehype-tabs.mjs'
import rehypesplitSections from './plugins/rehype/rehype-splitSections.mjs'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'

import remarkCommon from './plugins/remark/remark-common.mjs'

import remarkGlobalComponent from './plugins/remark/remark-global-component.mjs'

import browserslist from 'browserslist'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'
import icon from 'astro-icon'

import { refractor } from 'refractor/lib/all';
import rehypePrismGenerator from 'rehype-prism-plus/generator';

refractor.alias('html', ['vue', 'svelte']);
const rehypePrismPlus = rehypePrismGenerator(refractor);

// https://astro.build/config
export default defineConfig({
    server: {
        port: 3311,
    },
    build: {
        assets: 'astro_',
    },
    markdown: {
        syntaxHighlight: false,
        extendDefaultPlugins: true,
        rehypePlugins: [
            [rehypePrismPlus, { ignoreMissing: true, defaultLanguage: "txt" }],
            // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
            rehypeHeadingIds,
            rehypeMathjax,
            rehypeCommon,
            rehypeBlockquote,
            rehypeCodeBtn,
            rehypesplitSections,
            rehypeTabs,
            rehypeIframe,
        ],
        remarkPlugins: [Directive, remarkMath, remarkCommon, remarkDeflist, remarkBreaks],
        remarkRehype: {
            footnoteLabel: '脚注',
            footnoteBackLabel: '回到文本',
        },
    },
    integrations: [
        mdx({
            remarkPlugins: [remarkGlobalComponent],
        }),
        icon(),
        tailwind(),
    ],
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
