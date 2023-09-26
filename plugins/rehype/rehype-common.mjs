// https://github.com/remarkjs/remark-directive
// https://github.com/syntax-tree/mdast-util-directive#syntax-tree

import { visit } from 'unist-util-visit'

export default function () {
    return (tree, file) => {
        // 修改链接跳转方式
        visit(tree, 'element', (node) => {
            if (!node.properties) node.properties = {}
            if (node.tagName === 'a') {
                let value
                const url = node?.properties?.href
                if (url && url.startsWith('http')) {
                    value = '_blank'
                }
                // node.properties.className = "link"
                node.properties.target = value
            }
        })
        // 增加文章内[TOC]文本替换
        visit(tree, 'element', (node) => {
            if (!node.properties) node.properties = {}
            if (node.tagName === 'p' && node.children.length === 1 && node.children[0].type === "text" && node.children[0].value === "[TOC]") {
                const head = file.data.__astroHeadings
                let array = []
                for (let i = 0; i < head.length; i++) {
                    const v = head[i]
                    if (v.level > 3) continue;
                    array.push(`<li><a title="${v.text}" href="#${v.slug}" style="overflow-x: hidden;white-space: nowrap;text-overflow: ellipsis;margin-left:${(v.depth - 1) * 15}px"># ${v.text}</a></li>`)
                }
                node.type = "raw"
                node.value = `<ul class="toc">
                  ${array.join("")}
                </ul>`
            }
        })
    }
}
