import { SKIP, visit } from 'unist-util-visit'

export default function splitSections() {
    const sections = []
    let currentSection = null

    return (tree, file) => {
        let theme = file.data.astro.frontmatter?.theme
        if(!theme){
            return
        }
        if(typeof theme === "string" && theme !== 'split'){
            return
        }else if(Array.isArray(theme) && !theme.includes('split')){
            return
        }
        visit(tree, (node) => {
            if (
                node.type === 'element' &&
                (node.tagName === 'h2' || node.tagName === 'h3')
            ) {
                if (currentSection) {
                    sections.push(currentSection)
                }

                currentSection = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: 'split-block',
                    },
                    children: [node],
                }
                return SKIP
            } else if (currentSection) {
                currentSection.children.push(node)
                return SKIP
            } else if (node.type !== 'root') {
                currentSection = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: 'split-block',
                    },
                    children: [node],
                }
                return SKIP
            }
        })
        if (currentSection) {
            sections.push(currentSection)
        }
        tree.children = sections
    }
}
