import { visitParents, CONTINUE, EXIT, SKIP } from 'unist-util-visit-parents'

export default function () {
    return async (tree) => {
        visitParents(tree, 'raw', (node, ancestors) => {
            const parent = ancestors[ancestors.length - 1]
            const reg = new RegExp(`<\!-- iframe (.*?) -->$`)
            if (node.type === 'raw' && reg.test(node.value)) {
                let result = reg.exec(node.value)
                if (result && !!result.length) {
                    const [_, url] = result
                    let index = -1
                    for (let i = 0; i < parent.children.length; i++) {
                        const element = parent.children[i]
                        if (node === element) {
                            index = i
                            break
                        }
                    }
                    parent.children[index] = {
                        type: "element",
                        tagName: "iframe",
                        properties: {
                            width: `100%`,
                            height: `300px`,
                            src: url
                        },
                    }
                    return SKIP
                }
            }
        })
    }
}