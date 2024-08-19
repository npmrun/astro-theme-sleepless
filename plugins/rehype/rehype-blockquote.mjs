import { visit } from 'unist-util-visit'

export default function () {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.type === 'element' && node.tagName === 'blockquote') {
                if (node.children) {
                    node.children.unshift({
                        type: 'element',
                        tagName: 'svg',
                        properties: {
                            className: 'outline',
                            height: '100%',
                            width: '100%',
                            xmlns: 'http://www.w3.org/2000/svg',
                        },
                        children: [
                            {
                                type: 'element',
                                tagName: 'rect',
                                properties: {
                                    height: '100%',
                                    width: '100%',
                                },
                            },
                        ],
                    })
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
