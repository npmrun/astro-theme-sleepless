---
title: inversifyJS的使用方式
description: ''
pubDate: 2023/9/11 14:35:14
updatedDate: 2023/09/12 02:23:31
tags:
    - inversify
category: inversify
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/68991451_p0.webp
comment: true
draft: true
---

从其[preferences插件](https://github1s.com/eclipse-theia/theia/blob/HEAD/packages/preferences/src/browser/preference-frontend-module.ts)开始了解注册方式，`@theia/preferences`是一个插件包，在[package.json](https://github1s.com/eclipse-theia/theia/blob/HEAD/packages/preferences/package.json)定义了一个`theiaExtensions`用以声明其插件入口，也表示是从此处注入容器的，搜一下`theiaExtensions`,根据结果来说，是[dev-packages/application-package](https://github1s.com/eclipse-theia/theia/blob/HEAD/dev-packages/application-package/src/application-package.ts#L191)包中解析的，再搜`frontendModules`。

## 附件

-   https://www.npmjs.com/package/inversify
-   https://juejin.cn/post/7049717544109752350
-   https://github1s.com/eclipse-theia/theia/blob/HEAD/packages/preferences/src/browser/preference-frontend-module.ts#L34
-   https://theia-ide.org/docs/authoring_extensions/
