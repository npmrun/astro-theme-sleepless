import * as acorn from 'acorn'
import fg from 'fast-glob'

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

// https://github.com/syntax-tree/mdast-util-mdxjs-esm
// https://github.com/withastro/astro/search?q=mdxjsEsm
// mdx插件
export default function remarkGlobalComponent() {
    return (tree, file) => {
        // 优化：判断文本是不是mdx且内部是不是又导入对应的全局组件
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
