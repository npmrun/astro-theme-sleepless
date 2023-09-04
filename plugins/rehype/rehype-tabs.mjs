import { visitParents, CONTINUE, EXIT, SKIP } from 'unist-util-visit-parents'

function parseTab(list) {
    const reg = new RegExp(`<\!-- tab (.*?) -->$`)
    let tabs = []
    let startIndex = -1
    let startName
    let seq = []
    for (let i = 0; i < list.length; i++) {
        const element = list[i]
        if (!startName && element.type === 'raw' && reg.test(element.value)) {
            startIndex = i
            let result = reg.exec(element.value)
            if (result) {
                const [_, name] = result
                startName = name
            }
        }
        if (startIndex != -1) {
            seq.push(element)
        }
        if (
            startName &&
            element.type === 'raw' &&
            element.value === `<\!-- endtab ${startName} -->`
        ) {
            tabs.push({
                name: startName,
                list: seq,
            })
            startIndex = -1
            startName = undefined
            seq = []
        }
    }
    return tabs
}

export default function () {
    return async (tree) => {
        function done(node, ancestors) {
            const parent = ancestors[ancestors.length - 1]
            const reg = new RegExp(`<\!-- tabs (.*?) -->$`)
            if (node.type === 'raw' && reg.test(node.value)) {
                let result = reg.exec(node.value)
                if (result) {
                    const [_, name] = result
                    const sequeue = []
                    let index = -1
                    let endIndex = -1
                    for (let i = 0; i < parent.children.length; i++) {
                        const element = parent.children[i]
                        if (node === element) {
                            index = i
                            continue
                        }
                        if (
                            element.type === 'raw' &&
                            element.value === `<\!-- endtabs ${name} -->`
                        ) {
                            endIndex = i
                            break
                        }
                        if (index != -1) {
                            sequeue.push(element)
                        }
                    }
                    if (endIndex !== -1 && index !== -1) {
                        const tab = parseTab(sequeue)
                        const tabChildren = []
                        tab.forEach((v, tabIndex) => {
                            const tabName = v.name
                            const children = v.list.slice(1, -1)
                            // 处理tab中的tabs
                            visitParents(
                                {
                                    type: 'root',
                                    children: children,
                                },
                                'raw',
                                done
                            )
                            tabChildren.push({
                                type: 'element',
                                tagName: 'input',
                                properties: {
                                    type: 'radio',
                                    name: name.replace(/\s/g, ''),
                                    id: `${name.replace(
                                        /\s/g,
                                        ''
                                    )}-tab${tabIndex}`,
                                    checked: tabIndex === 0 ? 'checked' : '',
                                },
                            })
                            tabChildren.push({
                                type: 'element',
                                tagName: 'label',
                                properties: {
                                    className: 'tab-name',
                                    for: `${name.replace(
                                        /\s/g,
                                        ''
                                    )}-tab${tabIndex}`,
                                },
                                children: [
                                    {
                                        type: 'text',
                                        value: tabName,
                                    },
                                ],
                            })
                            tabChildren.push({
                                type: 'element',
                                tagName: 'div',
                                properties: {
                                    className: 'tab',
                                },
                                children: children,
                            })
                        })

                        parent.children.splice(index, sequeue.length + 2, {
                            type: 'element',
                            tagName: 'div',
                            properties: {
                                className: 'tabs ' + name,
                            },
                            children: tabChildren,
                        })
                    }
                    return CONTINUE
                }
            }
        }
        visitParents(tree, 'raw', done)
    }
}
