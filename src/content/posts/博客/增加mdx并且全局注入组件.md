---
title: 增加mdx并且全局注入组件
description: ''
pubDate: 2024/3/5 14:19:34
updatedDate: 2024/3/5 14:19:34
tags:
    - 博客
category: 博客
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/72323793_p0.webp
comment: true
---

今天想要给我的博客增加一个mdx的全新编写方式，主要是能在md中使用组件，这点就十分的方便了。原理暂时不讲，我们按步骤来：

<!-- tabs code -->
<!-- tab 安装 -->
```bash
pnpm i @astrojs/mdx acorn fast-glob
```
<!-- endtab 安装 -->
<!-- endtabs code -->

<!-- tabs code -->
<!-- tab remark-global-component.mjs -->
```js
import * as acorn from 'acorn'
import fg from 'fast-glob'

// 可以作为配置，也能直接写死，因为是自用的插件，直接写死好了
const list = fg
    .sync(['src/mdxGlobal/**/*'])
    .map((v) => {
        let result = v.match(/src\/mdxGlobal\/(.*?)$/)
        if (result && result[1]) {
            return result[1]
        }
    })
    .filter((v) => v)

function jsToTreeNode(
    jsString,
    acornOpts = {
        ecmaVersion: 'latest',
        sourceType: 'module',
    }
) {
    return {
        type: 'mdxjsEsm',
        value: '',
        data: {
            // @ts-expect-error `parse` return types is incompatible but it should work in runtime
            estree: {
                ...acorn.parse(jsString, acornOpts),
                type: 'Program',
                sourceType: 'module',
            },
        },
    }
}

export default function remarkGlobalComponent() {
    return (tree, file) => {
        const components = list
            .map((v) => {
                const name = v.match(/(.*?)\./)
                if (name && name[1]) {
                    return jsToTreeNode(
                        `import ${name[1]} from '@blog/mdxGlobal/${v}';`
                    )
                }
            })
            .filter((v) => v)
        tree.children.unshift(...components)
    }
}
```
<!-- endtab remark-global-component.mjs -->
<!-- endtabs code -->

<!-- tabs code -->
<!-- tab astro.config.mjs -->
```
import mdx from '@astrojs/mdx'
import remarkGlobalComponent from './plugins/remark/remark-global-component.mjs'

export default defineConfig({
    ...
    integrations: [
        mdx({
            remarkPlugins: [remarkGlobalComponent],
        }),
    ],
    ...
})
```
<!-- endtab astro.config.mjs -->
<!-- endtabs code -->