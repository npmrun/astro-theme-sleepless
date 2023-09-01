---
title: 油猴为CSDN开启沉浸式与可复制操作
description: ''
pubDate: 2023/8/31 15:42:03
updatedDate: 2023/09/01 09:45:46
tags:
    - 油猴
category: 脚本
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/72861197_p0.webp
---

从一个脚本上改了一下（感谢此人，在此保留他的信息，**_侵权立删_**），不说废话，直接看源码：

```js
// ==UserScript==
// @name         CSDN去除收费项、免登录复制、免登录查看需关注的内容、沉浸式阅读
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  1.CSDN去除无用信息沉浸式阅读  2.免登录复制 3.免登录查看需要关注才能看的内容
// @description  更新内容（2023-04-07）==> 1、还原显示付费下载内容  2、删除多余显示项  3、修复部分页面显示问题
// @author       Mr.Chen
// @match        https://blog.csdn.net/*/article/details/*
// @match        https://*.blog.csdn.net/article/details/*
// @match        https://so.csdn.net/*
// @icon         https://www.google.com/s2/favicons?domain=csdn.net
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

// 如果为详情页则去除无用内容，开起沉浸式阅读
GM_addStyle(`
        .blog_container_aside,#rightAside,.recommend-box,#treeSkill,#blogExtensionBox,#recommendNps,#toolBarBox,.comment-box-old,.insert-baidu-box,.blog-footer-bottom,.blog-footer-bottom,.comment-box,.template-box,.column-group,#csdn-toolbar,.csdn-side-toolbar,#passportbox,.passport-login-container,.hide-article-box{display:none!important;}
        .article_content{height:auto!important} #content_views pre code{user-select:text !important}
    `)

// 调整主页面大小
document.querySelector('#mainBox').style.width = '100%'
document.getElementsByTagName('main')[0].style.width = '100%'

document.querySelectorAll('*').forEach((el) => (el.style.userSelect = 'auto'))

document
    .querySelectorAll('*')
    .forEach((el) =>
        el.addEventListener(
            'copy',
            (event) => event.stopImmediatePropagation(),
            true
        )
    )
document
    .querySelectorAll('*')
    .forEach((el) =>
        el.addEventListener(
            'click',
            (event) => event.stopImmediatePropagation(),
            true
        )
    )
document
    .querySelectorAll('*')
    .forEach((el) =>
        el.addEventListener(
            'mousedown',
            (event) => event.stopImmediatePropagation(),
            true
        )
    )
document
    .querySelectorAll('*')
    .forEach((el) =>
        el.addEventListener(
            'mouseup',
            (event) => event.stopImmediatePropagation(),
            true
        )
    )
```
