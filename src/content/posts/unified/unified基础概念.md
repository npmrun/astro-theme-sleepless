---
title: unified基础概念
description: ''
pubDate: 2023/9/6 01:21:40
updatedDate: 2023/09/06 01:24:18
tags:
    - unified
category: unified
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/70480510_p01.webp
---

## 什么是unified.js？

进而言之，他们能将内容编译为语法树，将语法树编译为内容。它能够处理`markdown`,`html`或者纯文本，将其转化为结构化数据，再将结构化数据输出对应文件，这几者之间可操作的事情就多了。

Unified本身是一个相当小的模块，充当统一处理不同内容格式的接口。围绕某种格式，有一个生态系统,其中包括：

*   [remark](https://unifiedjs.com/explore/project/remarkjs/remark/) Markdown   (mdast)
*   [rehype](https://unifiedjs.com/explore/project/rehypejs/rehype/) HTML   (hast)
*   [retext](https://unifiedjs.com/explore/project/retextjs/retext/) Natural language
*   [redot](https://unifiedjs.com/explore/project/redotjs/redot/) Graphviz

语法树的规范如下：

*   [unist](https://github.com/syntax-tree/unist) Universal Syntax Tree
*   [mdast](https://github.com/syntax-tree/mdast) Markdown Abstract Syntax Tree format
*   [hast](https://github.com/syntax-tree/hast) HTML Abstract Syntax Tree format
*   [xast](https://github.com/syntax-tree/xast) XML Abstract Syntax Tree format
*   [esast](https://github.com/syntax-tree/esast) ECMAScript Abstract Syntax Tree format
*   [nlcst](https://github.com/syntax-tree/nlcst) Natural Language Concrete Syntax Tree format

还有一些其他的构建块:

*   [syntax\-tree](https://github.com/syntax-tree) Low-level utilities for building plugins
*   [vfile](https://unifiedjs.com/explore/package/vfile/) Virtual file format for text processing
*   [MDX](https://unifiedjs.com/explore/project/mdx-js/mdx/) Markdown and JSX

## 工作流程

说了这么多，那他们是怎么工作的呢？其实就是分了三步：

1. 解析：
    无论您的输入是 Markdown、HTML 还是散文，都需要将其解析为可行的格式。这种格式称为语法树。规范（例如 mdast）定义了这种语法树的格式。处理器负责创建它们。
2. 转化：
    这就是魔术发生的地方。用户编写插件及其运行顺序。插件插入此阶段并转换和检查它们获得的格式。
3. 输出：
    最后一步是采用（调整后的）格式并将其字符串化为Markdown，HTML或文本（可能与输入格式不同！）

[unified](https://unifiedjs.com/explore/package/unified/) 可以 Node.js 中以编程方式使用。通过构建步骤，它也可以在浏览器中使用处理器的 CLI 版本、Grunt 插件、Gulp 插件也存在

[unified](https://unifiedjs.com/explore/package/unified/)的独特之处在于它可以在同一过程中在格式之间切换，例如Markdown到HTML。这允许更强大的合成，以下插件桥接格式：

*   [remark-rehype](https://unifiedjs.com/explore/package/remark-rehype/) Markdown to HTML
*   [rehype-remark](https://unifiedjs.com/explore/package/rehype-remark/) HTML to Markdown
*   [remark-retext](https://unifiedjs.com/explore/package/remark-retext/) Markdown to prose
*   [rehype-retext](https://unifiedjs.com/explore/package/rehype-retext/) HTML to prose

> 参考
> 1. https://www.npmjs.com/package/remark-html
> 2. https://marvinsblog.net/post/2022-04-18-markdown-with-remark/
> 3. https://unifiedjs.com/learn/
> 4. https://github.com/vmarkdown/remark-render/blob/master/src/compiler.js
