import { visit } from 'unist-util-visit'

export default function () {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.type === 'element' && node.tagName === 'blockquote') {
                if (node.children) {
                    node.children.unshift({
                        type: 'element',
                        tagName: 'div',
                        properties: {},
                        children: [],
                    })
                }
            }
        })
    }
}
