---
title: BFC的一些知识点
description: ''
pubDate: 2024/3/7 02:24:54
updatedDate: 2024/3/7 02:24:54
tags:
    - CSS
category: CSS
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/yande542336_Mr_GT.webp
comment: true
---

今天我们来说一说什么是BFC（[区块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)），以及怎么创建它，做一个完整的介绍。首先其定义我们可以从MDN的文档来看：

> 区块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

块级盒子的布局过程发生的区域好理解，也就是将该元素理解成一个块级盒子元素在里面布局渲染。那么`浮动元素与其他元素交互的区域`是啥意思呢？

在BFC环境中,浮动元素和其他普通流内元素的渲染是有特殊交互规则的，简单来说:

1. 浮动元素会脱离普通流,不占据空间,但还是参与渲染和定位计算。
2. 普通流内的元素会环绕浮动元素renderung布局。

具体来说,在同一个BFC内:

1. 内部浮动元素不会影响外部元素的布局,但外部元素会因为存在浮动元素而扩展自身区域,形成"环绕"效果。
2. 浮动元素与其他浮动元素会按从上到下,从左到右的顺序渲染。
3. 普通流内元素会环绕浮动元素并在浮动元素周围渲染。

所以BFC提供了一个渲染区域,在这个区域内部,浮动和普通流元素会按特殊的规则相互影响和交互,实现各种布局效果。这就是所谓的"浮动元素与其他元素交互的区域"的含义。

**总结**

是不是一股GPT风，那么我们简答一下：可以理解为BFC是一个块级盒子，里面有自己的渲染规则，内部的元素布局与外部的布局互不影响，其内部仍旧按照流式布局进行布局，但是不会影响到外面的布局。

**怎么创建BFC呢？**

- 文档的根元素（`<html>`）。
- 浮动元素（即 float 值不为 none 的元素）。
- 绝对定位元素（position 值为 absolute 或 fixed 的元素）。
- 行内块元素（display 值为 inline-block 的元素）。
- 表格单元格（display 值为 table-cell，HTML 表格单元格默认值）。
- 表格标题（display 值为 table-caption，HTML 表格标题默认值）。
- 匿名表格单元格元素（display 值为 table（HTML 表格默认值）、table-row（表格行默认值）、table-row-group（表格体默认值）、table-header-group（表格头部默认值）、table-footer-group（表格尾部默认值）或 inline-table）。
- overflow 值不为 visible 或 clip 的块级元素。
- display 值为 flow-root 的元素。
- contain 值为 layout、content 或 paint 的元素。
- 弹性元素（display 值为 flex 或 inline-flex 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器。
- 网格元素（display 值为 grid 或 inline-grid 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器。
- 多列容器（column-count 或 column-width (en-US) 值不为 auto，且含有 column-count: 1 的元素）。
- column-span 值为 all 的元素始终会创建一个新的格式化上下文，即使该元素没有包裹在一个多列容器中（规范变更、Chrome bug）

格式化上下文影响布局，通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局，因为它将：

1. 包含内部浮动。
    BFC 使得让浮动内容和周围的内容等高。也就是能撑起父元素。
2. 排除外部浮动。

    正常文档流中建立的 BFC 不得与元素本身所在的块格式化上下文中的任何浮动的外边距重叠。
    
    本来效果：

    <!-- iframe https://editor.xieyaxin.top/#eNplkEEOgjAURK/S/DVRcVmQiwgLoB9oKC1pv4ohnEYSF5yLe0iixKDLycu8TKaHQipU0hHwcw86bRA47CpqFHiQG02oFwShkFfm6K7wFEOhTEpcYUEBu0lBFfcPh7YLWIWyrGhNWZrXpTUXLbhFEcQQhftFE8V6Y1tbx79WaRF1kBkr0HK/7ZgzSgr2kc2PaR6f8zi9rTB43/3kNus3zOXulyYeKKlrt3yQDC+GZ1+m -->

    发现普通div元素没有环绕在浮动元素边上，而是浮动元素在div元素上，但内部文字确实环绕的。证明浮动元素是脱离文档流的,不再占据文档流中的位置,而是移动到其容器的左侧或右侧。

    当我们设置了BFC之后，元素是不会跟浮动元素重叠的：

    <!-- iframe https://editor.xieyaxin.top/#eNqlkU1OwzAQRq9ijcQuQFOJjV16EdJFEk9iq45d2UN/FOU0VGLRc+UeOBQLAt2x9HyeN08zPTTaoNGBgL/0YMsOgcODos5ABrWzhDZGsJJ6zwKdDD4X0BhXEjfYkGAHLUnxfLHYHQVTqFtF6VWV9bb17tVK7lGKr5DF9E4UsM5XjxG6LuwNtp++/ge+vAlPjOUfRusRraicl+h5vjuy4IyWbEJ32t5fRdi1z+3RR80DV1rK2PV79vh2Gc/v4/mSHGDIvldLYbbYWRbqME8rJ099YRn7IfH0KTEV0+BUGWDYZGC03YZ4zc3wAf0noxE= -->

    看像不像一个双飞翼布局，多简单。

- 阻止外边距重叠。

    <!-- iframe https://editor.xieyaxin.top/#eNpVkMFuwyAQRH9ltWfLTQ+90DQ/UnIgZmOj4CUCnFay/O9ZHMkxJ6SZeTvLznh1nrxLGdXvjGxGQoXtkEePDXaBM7FYeLTuAZ03Kf1ovPiJNJ6OHyKeNFdemDJFMTUDVEYku2fWF5fm3ZlT1Vh5qUu125YdGs2tjIW5lA3k+iEr+Drc/7+LMJrYO1bwKQIcRFo0C1DAF3Ex3a2PYWKroKhbZJu5T4i4BdZPviLhQfHqw5+CwVlLvFbvuRwNp7uJsnfhcTk36B3fkhz8vDwBKYqCjQ== -->