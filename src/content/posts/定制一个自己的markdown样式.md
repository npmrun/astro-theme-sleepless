---
title: 定制一个自己的markdown样式
description: 定制一个自己的markdown样式定制一个自己的markdown样式定制一个自己的markdown样式定制一个自己的markdown样式
pubDate: 2023/8/31 13:58:47
updatedDate: 2023/09/01 01:38:39
tags:
    - MD
category: 技术
author: NPMRUN
heroImage: https://w.wallhaven.cc/full/yx/wallhaven-yxqzpd.jpg
heroPosition: top
---

## 重置样式

首先，我们需要对 HTMl 去除一些默认的丑陋样式，以达到各平台统一的画面，同时覆盖用户定义的 CSS，由 markdown 样式统一处理，当然，也需要保留用户覆盖 markdown 样式的能力。

对元素的字体优化，去除空白，以及打乱字符，防止一个单次过长导致溢出出现滚动条。

```css
.markdown-body {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-rendering: optimizelegibility;
    margin: 0;
    word-wrap: break-word;
    &::before {
        display: table;
        content: '';
    }
    &::after {
        display: table;
        clear: both;
        content: '';
    }
    > *:first-child {
        margin-top: 0 !important;
    }
    > *:last-child {
        margin-bottom: 0 !important;
    }
}
```

统一处理各行的间距：

```css
p,
blockquote,
ul,
ol,
dl,
table,
hr,
form,
pre,
details {
    margin-top: 0;
    margin-bottom: 1em;
}
blockquote {
    & > :first-child {
        margin-top: 0;
    }
    & > :last-child {
        margin-bottom: 0;
    }
}
```

固定一些元素的显示模式：

```css
/* 统一显示成块状元素 */
details,
figcaption,
figure {
    display: block;
}
/* HTML5 媒体文件跟 img 保持一致 */
audio,
canvas,
video {
    display: inline-block;
}
/* 按钮内部间距统一 */
button::-moz-focus-inner,
input::-moz-focus-inner {
    padding: 0;
    border: 0;
}
/* 定义元素显示为斜体 */
dfn {
    font-style: italic;
}
/* 去掉各Table cell 的边距并让其边重合 */
table {
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
}
/* 可拖动文件添加拖动手势 */
[draggable] {
    cursor: move;
}
/* 加粗元素 */
b,
strong {
    font-weight: var(--base-text-weight-semibold, 600);
}
.clearfix:before,
.clearfix:after {
    content: '';
    display: table;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    zoom: 1;
}
/* 强制文本换行 */
.textwrap,
.textwrap td,
.textwrap th {
    word-wrap: break-word;
    word-break: break-all;
}
.textwrap-table {
    table-layout: fixed;
}
/* 缩写元素样式统一 */
abbr[title],
acronym {
    border-bottom: none;
    font-variant: normal;
    text-decoration: underline dotted;
}
/* 添加鼠标问号，进一步确保应用的语义是正确的（要知道，交互他们也有洁癖，如果你不去掉，那得多花点口舌） */
abbr {
    cursor: help;
}
/* 一致的 del 样式 */
del {
    text-decoration: line-through;
}
/* a标签去除下划线 */
a {
    text-decoration: none;
    &:not([href]) {
        color: inherit;
        text-decoration: none;
    }
    &:hover {
        text-decoration: underline;
    }
}
/* 默认不显示下划线，保持页面简洁 */
ins {
    text-decoration: none;
}
/* 专名号：虽然 u 已经重回 html5 Draft，但在所有浏览器中都是可以使用的，
 * 要做到更好，向后兼容的话，添加 class="typo-u" 来显示专名号
 * 关于 <u> 标签：http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-u-element
 * 被放弃的是 4，之前一直搞错 http://www.w3.org/TR/html401/appendix/changes.html#idx-deprecated
 * 一篇关于 <u> 标签的很好文章：http://html5doctor.com/u-element/
 */
u,
.typo-u {
    text-decoration: underline;
}
/* 隐藏指定元素 */
[hidden] {
    display: none !important;
}
/* 伸缩框显示为列表元素 */
summary {
    display: list-item;
}
q:before,
q:after {
    content: '';
}
caption,
th {
    text-align: left;
}
caption[align='center'],
th[align='center'] {
    text-align: center;
}
address,
caption,
cite,
em,
th,
var {
    font-weight: 400;
}
/* 标记，类似于手写的荧光笔的作用 */
mark {
    background: #fffdd1;
    border-bottom: 1px solid #ffedce;
    padding: 2px;
    margin: 0 5px;
}
/* 统一h1元素的间隔和字体大小 */
h1 {
    margin: 0.67em 0;
    font-weight: var(--base-text-weight-semibold, 600);
    padding-bottom: 0.3em;
    font-size: 2em;
}
/* small字体缩小 */
small {
    font-size: 90%;
}
/* 上下标显示 */
sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}
sub a,
sup a {
    padding: 0 0.1em;
}
sub {
    bottom: -0.25em;
}
sup {
    top: -0.5em;
}
/* 代码相关的字体大小统一 */
code,
kbd,
pre,
samp {
    font-family: monospace;
    font-size: 1em;
}
/* 去除默认边框 */
fieldset,
img {
    border: 0;
}
/* 图片初始化样式 */
img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: var(--color-canvas-default);
}
/* 可附标题内容元素的间距 */
figure {
    margin: 1em 40px;
}
/* 间隔线 */
/* 一致化 horizontal rule */
hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid var(--color-border-muted);
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: var(--color-border-default);
    border: 0;
    &::before {
        display: table;
        content: '';
    }
    &::after {
        display: table;
        clear: both;
        content: '';
    }
}

/* 表单元素并不继承父级 font 的问题 */
button,
input,
select,
textarea {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
/* 外观显示为按钮 */
[type='button'],
[type='reset'],
[type='submit'] {
    -webkit-appearance: button;
}
/* 这两个表单样式规则覆盖 */
[type='checkbox'],
[type='radio'] {
    box-sizing: border-box;
    padding: 0;
}
/* 数字按钮内部高度自动 */
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
    height: auto;
}
/* 搜索按钮内图标外观去除 */
[type='search']::-webkit-search-cancel-button,
[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
}
/* 输入框的占位符样式 */
::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
}
/* 文件选择按钮样式统一 */
::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
}
/* 占位符显示统一 */
::placeholder {
    color: var(--color-fg-subtle);
    opacity: 1;
}
/* table内的td,th去除留白 */
td,
th {
    padding: 0;
}
/* 伸缩框鼠标显示 */
details summary {
    cursor: pointer;
}

details:not([open]) > *:not(summary) {
    display: none !important;
}
/* 按键显示 */
kbd {
    display: inline-block;
    padding: 3px 5px;
    font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
        Liberation Mono, monospace;
    line-height: 10px;
    color: var(--color-fg-default);
    vertical-align: middle;
    background-color: var(--color-canvas-subtle);
    border: solid 1px var(--color-neutral-muted);
    border-bottom-color: var(--color-neutral-muted);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 var(--color-neutral-muted);
}
```
