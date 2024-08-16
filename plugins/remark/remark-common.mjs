// https://github.com/remarkjs/remark-directive
// https://github.com/syntax-tree/mdast-util-directive#syntax-tree

import { visit } from 'unist-util-visit'

export default function () {
    return (tree, file) => {
        const images = []
        visit(tree, 'image', (node) => {
            //===== 解析图片 ===== Start
            const name = node.url.split('/').reverse()[0]
            images.push({
                name: name,
                alt: node.alt,
                url: node.url.replace(/^\/public/, ""),
            })
            //===== 解析图片 =====  End

            const url = node.url
            const alt = node.alt
            node.type = 'html'
            const altStr = `alt="${alt}"`
            const altEl = `<div style="display: flex;justify-content: center;width:100px;white-space:nowrap;margin:0 auto;border-bottom:1px solid #e8e8e8;padding:4px 0;color: #c6c6c6;font-size: 0.875em;">${alt}</div>`
            delete node.url
            delete node.alt
            delete node.title
            node.value = `
            <div style="text-align: center;">
                <img onerror="this.classList.add('error');" style="display:block;margin:0 auto;max-width: 100%;" ${
                    alt ? altStr : ''
                } src="${url}">
                ${alt ? altEl : ''}
            </div>
        `
        })
        file.data.astro.frontmatter._images = images
    }
}
