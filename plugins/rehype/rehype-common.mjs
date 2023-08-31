// https://github.com/remarkjs/remark-directive
// https://github.com/syntax-tree/mdast-util-directive#syntax-tree

import { visit } from 'unist-util-visit'

export default function () {
    return (tree) => {
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
    }
}
