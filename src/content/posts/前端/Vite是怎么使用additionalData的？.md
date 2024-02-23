---
title: Vite是怎么使用additionalData的？
description: ''
pubDate: 2023/9/7 00:50:28
updatedDate: 2023/09/07 01:12:38
tags:
    - vite
category: vite
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/69065641_p0.webp
---

## 起因

心血来潮，想知道Vite是怎么使用additionalData的？在webpack中，是可以通过sass-loader的选项additionalData是实现的，但是vite没用到sass-loader，是怎么实现的呢？

## 过程

在[vite仓库](https://github.com/vitejs/vite)搜索`preprocessorOptions`,可以发现结果中有一个`packages/vite/src/node/plugins/css.ts`，那么可以肯定就是在这里处理了。搜索可找到如下代码：

![图 0](/article/Vite是怎么使用additionalData的？/2023-09-07_07-01-00-10.png)  

可以知道preProcessors是持有`scss`,`less`处理方法的对象，按照这个搜索，可发现

![图 1](/article/Vite是怎么使用additionalData的？/2023-09-07_07-01-01-05.png)  

![图 2](/article/Vite是怎么使用additionalData的？/2023-09-07_07-01-02-07.png)  

通过sass显然是没有additionalData属性的，我们接下来继续找，从这里可以知道`getSource`就是获取scss代码的，看一看`getSource`函数

![图 3](/article/Vite是怎么使用additionalData的？/2023-09-07_07-01-03-41.png)  

出现了additionalData ，如果additionalData是函数，会传入源码处理，如果是字符串，会将additionalData 拼接在前面。

由此就知道咋回事了。在处理完预处理器之后才会经过postcss处理。