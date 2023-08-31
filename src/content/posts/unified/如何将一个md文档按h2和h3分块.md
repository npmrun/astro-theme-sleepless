---
title: 如何将一个md文档按h2和h3分块
describtion: 如何将一个md文档按h2和h3分块
tags:
    - unified
category: 技术
author: NPMRUN
---

这个问题参照了 chatgpt 的答案并加以修改，直接看[附件](#源码)

## 源码

```js
import { unified } from 'unified'
import parse from 'rehype-parse'
import stringify from 'rehype-stringify'
import { SKIP, visit } from 'unist-util-visit'

const html = `
  <h2>Section 1</h2>
  <p>This is content for section 1.</p>
  <p>More content for section 1.</p>
  <h3>Subsection 1.1</h3>
  <p>This is content for subsection 1.1.</p>
  <h3>Subsection 1.2</h3>
  <p>This is content for subsection 1.2.</p>
  <h2>Section 2</h2>
  <p>This is content for section 2.</p>
  <h3>Subsection 2.1</h3>
  <p>This is content for subsection 2.1.</p>
  <p>More content for subsection 2.1.</p>
  <h2>Section 3</h2>
  <p>This is content for section 3.</p>
`

const processor = unified()
    .use(parse)
    .use(function splitSections() {
        const sections = []
        let currentSection = null

        return (tree) => {
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
                        properties: {},
                        children: [node],
                    }
                    return SKIP
                } else if (currentSection) {
                    currentSection.children.push(node)
                    return SKIP
                }
            })
            if (currentSection) {
                sections.push(currentSection)
            }
            tree.children = sections
        }
    })
    .use(stringify)

const processedHtml = processor.processSync(html).toString()

console.log(processedHtml)
```

输出：

```html
<div>
    <h2>Section 1</h2>
    <p>This is content for section 1.</p>
    <p>More content for section 1.</p>
</div>
<div>
    <h3>Subsection 1.1</h3>
    <p>This is content for subsection 1.1.</p>
</div>
<div>
    <h3>Subsection 1.2</h3>
    <p>This is content for subsection 1.2.</p>
</div>
<div>
    <h2>Section 2</h2>
    <p>This is content for section 2.</p>
</div>
<div>
    <h3>Subsection 2.1</h3>
    <p>This is content for subsection 2.1.</p>
    <p>More content for subsection 2.1.</p>
</div>
<div>
    <h2>Section 3</h2>
    <p>This is content for section 3.</p>
</div>
```
