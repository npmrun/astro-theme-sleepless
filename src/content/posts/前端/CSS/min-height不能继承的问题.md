---
title: min-height不能继承的问题
description: ''
pubDate: 2023/10/1 16:34:53
updatedDate: 2023/10/02 01:33:14
tags:
    - 杂记
category: 杂记
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/68961562_p01.webp
comment: true
---
 
## 前言

最近感觉记忆衰退，已经很久没有睡过一个好觉了。这几天想用nextjs做个个人主页，在做布局的时候遇到的之前也遇到过的问题，之前没怎么深究，今天好好了解以下看看。

## 具体情况

可以在如下的情况中看到，`child`元素定义了`min-height`，但是它的高度却是0，这是因为[min-height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-height)是不可继承的。

<!-- iframe https://editor.xieyaxin.top/#eNp1kEsOwiAQhq8ymcSd1rpwUx8XERcIWIjttAHUmqZ3F/sytXEFzP+YfJxqJJ4rTDDSPs9wiaIgr8iHyV6aB4iMO3dgmFpOEi5FxRCcf2UqzAByXq2eRnqdwDaOy2qnlUm1H14Mj4wAJkVX7rWyXVOr/uhCm6xf1Mu9aR1cXV1/605sll8G7yYEE80JN1WjsKT+FM4oGDWMGEUtdGu5cHFLbXEnmYBVcnR0NDNLapWiYArdhlbDp2zieDEmW85ZsDR0+5vD5vwGanKOOQ== -->

## 资料

- [有最小高度的父盒子里面的子元素不能继承高度](https://juejin.cn/post/6948669062465454087)
- [关于父元素设置min-height，子元素设置 height 100% 不生效的问题](https://blog.csdn.net/weixin_42335036/article/details/109102609)
