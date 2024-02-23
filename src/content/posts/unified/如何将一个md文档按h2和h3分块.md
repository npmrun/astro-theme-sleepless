---
title: 如何将一个md文档按h2和h3分块
description: 如何将一个md文档按h2和h3分块
pubDate: 2023/8/31 13:58:47
updatedDate: 2023/09/06 01:21:52
tags:
    - unified
category: unified
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/yande555770_charunetra.webp
---

这个问题参照了 chatgpt 的答案并加以修改，直接看[源码](#源码)。

## 探究

根据其回答思路，主要是编写了一个插件，通过遍历其中的 h2 和 h3 元素，如果有，则作为指示器，跳过其子节点，然后按顺序将相邻节点筛选出来。

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
## 问题

当然，以上代码也有问题，具体有两个

- 只支持顶层的h2和h3，如果是被引用框包裹住的这类的是不管的

- 会从首个h2或者h3元素开始，其以上的元素会丢失，这个比较严重

当然解决办法也是有的，第一个应该不算是个问题，我也就不太管了。主要是第二个问题，在本主题中已经解决了，其源码[在此](https://github.com/npmrun/astro-theme-sleepless/blob/master/plugins/rehype/rehype-splitSections.mjs)，可以点击查看。