---
title: linear-gradient的学习笔记
description: ''
pubDate: 2023/10/21 09:54:12
updatedDate: 2023/10/21 10:19:07
tags:
    - 杂记
category: 杂记
author: NPMRUN
heroImage: https://api.r10086.com/樱道随机图片api接口.php?图片系列=动漫综合2
comment: true
---

> [linear-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient)在MDN的文档已经很好了，可以看懂， 这里主要做一些学习方面的补充。

## 概念

`linear-gradient()`是一个CSS函数，创建一个由两种或多种颜色沿一条直线进行线性过渡的图像，其结果是 <gradient> 数据类型的对象，此对象是一种特殊的 [`<image>`数据类型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image)。这个数据类型就比较重要了，主要决定了这个函数能够写在哪些地方,大致以下几种地方：

| 图像对象类型 | 	默认的图像对象尺寸 |
|:--|:--|
| background-image| 	DOM 元素的背景定位的范围尺寸（大小）|
| list-style-image| 	字符的 1em 尺寸（大小）|
| border-image| 	DOM 元素的边框图像范围尺寸（大小）|
| cursor| 	浏览器定义的光标尺寸匹配在使用操作系统上常规的光标尺寸|
| 用 CSS content属性，和 CSS 伪元素 ::after 和 ::before替换元素内容| 	一个 300px × 150px 矩形|

因为这函数本身不比图片，它是没有宽高的，所以需要自行指定作用元素的宽高。

我们看看示例：

<!-- iframe https://editor.xieyaxin.top/#eNqVUrtOwzAU/RXLAwKpLQ/BEgo/QhhMbBILx6lsl4dQJRBICKndWKAMgAQDC2uFgP5Mm4aJX+Cm6SNJebRShujc87Kvt46xJD7DFi55xhe4gJ1AGiYNIGVvZXOHOHuuCqqSFrlPXFZeBNCWZcr3kSOI1hs2znNsvFleBALwgAl8wbUpanMk2O8meQ6Y2BIhwYGXMdsJFGXqjzap+UQTp6p0oAayqH3daT13Wo3ovv71Vu++XkUvj5+3J9HTabf50bu8CC8b0dl72GyHjYew1QrvLno35zCCn1xo4jsRR3YNVBnc6E9lM4SRHNcK47UYnVlKZqYdnZ3aspTfxnF8jQecGs9Cy0tLlcP1GPAYdz2TRvI6C+5eMqKKriKUg/386hplbgEpRgvIVYzJBRDW4rOW8tvrh1KuK4IcxUYw5Yb5/SCfKJfLomC7kL8yjB87zBSc3vbUJ000I2YWHnTQgeA0jTuBCJQVl0ijU18V5MSfYhVGzKh+8m5mKw5I5TDpN2qT+FioqsT8/10WhvGZ5zdtiznL6uv6fIhO1FNuDSFIruHa9jfvnZ2k 基础示例-->

