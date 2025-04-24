---
title: 如何借助content属性显示CSS var变量值 
description: ''
pubDate: 2025/2/7 15:17:49
updatedDate: 2025/02/22 12:16:01
tags:
    - tips
category: CSS
author: NPMRUN
heroImage: https://hamster-xyx.netlify.app/api/pic/random?auto
comment: true
---

> 思想来自于: https://www.zhangxinxu.com/wordpress/2019/05/content-css-var/

如果想动态修改伪元素的content值,可以参考此文章.

## 一、变量作为字符动态呈现

CSS var变量（CSS自定义属性）很好用，然后，有时候，需要这些变量能够同时作为字符在页面中呈现，我们想到的是使用::before/::after伪元素配合content属性，但是，把CSS变量直接作为content属性值是没有任何效果的。

例如：

```
/* 无效 */
.bar::before {
    content: var(--percent);
}
```

那该如何呈现呢？

## 二、借助CSS计数器呈现CSS var变量值

示意代码如下：

```
/* 有效 */
.bar::before {
    counter-reset: progress var(--percent);
    content: counter(progress);
}
```

也就是虽然`content`属性本身不支持变量，但是`counter-reset`属性后面的计数器初始值是支持的，于是我们可以来一招移花接木让CSS var变量值作为字符在页面中显示。

关于CSS计数器如果不太了解，可以参考我之前这篇文章：“[CSS counter计数器(content目录序号自动递增)详解](https://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/)”。

## 三、实际应用案例展示

例如我们需要实现一个进度条效果，已经加载完成了部分的宽度百分比值和进度值是一样的，最好可以通过一个变量控制，这样会大大简化我们的实现。

此时，CSS var变量非常适合使用。

例如下图所示的效果：

![图 0](/public/article/如何借助content属性显示CSS%20var变量值/2025-02-22_22-12-15-27.png)  

HTML结构非常简单，就是一个单标签，没有任何嵌套：

```
<label>图片1：</label>
<div class="bar" style="--percent: 60;"></div>
<label>图片2：</label>
<div class="bar" style="--percent: 40;"></div>
<label>图片3：</label>
<div class="bar" style="--percent: 20;"></div>
```

关键是CSS，这里就应用了这里的CSS变量值呈现技巧，见下面代码红色高亮部分：

```
.bar {
    height: 20px; width: 300px;
    background-color: #f5f5f5;
}
.bar::before {
    display: block;
    counter-reset: progress var(--percent);
    content: counter(progress) '%\2002';
    width: calc(1% * var(--percent));
    color: #fff;
    background-color: #2486ff;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
}
```

您可以狠狠地点击这里：[CSS百分比变量与进度条demo](https://www.zhangxinxu.com/study/201901/css-var-progress-bar-demo.php)