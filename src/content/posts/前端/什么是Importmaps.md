---
title: 什么是Importmaps
description: ''
pubDate: 2023/9/6 23:31:16
updatedDate: 2023/09/06 23:31:35
tags:
    - 技术
category: 技术
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/71455328_p0.webp
---


> [官方连接](https://github.com/WICG/import-maps)
> [参考翻译链接](https://www.jianshu.com/p/b23d823a183a)

## 什么是 Import maps？

或者，可以理解为怎么控制 javascript 的 import 的行为。

## 基本概念

该提议允许控制 `javaScript`的`import`语句和 `import()`表达式获取哪些 URL。
同时，这提案允许“裸导入”，就像`import moment from "moment"`这样的语句，使其能够工作。

这个东西的原理就是通过一个使用中的`import map`去控制普遍的模块之间的解析问题，正如介绍的，以下代码可工作：
```
import moment from "moment";
import { partition } from "lodash";
```

现在，上面两行代码会抛出异常，因为裸导入符是[显示保留](https://html.spec.whatwg.org/multipage/webappapis.html#resolve-a-module-specifier)的，通过给浏览器提供如下代码：
```
<script type="importmap">
{
  "imports": {
    "moment": "/node_modules/moment/src/moment.js",
    "lodash": "/node_modules/lodash-es/lodash.js"
  }
}
</script>
```
像上面这样写的话，之气那的`import`的行为就会解析成如下：
```
import moment from "/node_modules/moment/src/moment.js";
import { partition } from "/node_modules/lodash-es/lodash.js";
```

## 背景

对于大多数存在`pre-ES2015 module systems`,`CommonJS`的有经验的web开发者来说，他们可能会通过以下的方式导入模块：
```
const $ = require("jquery");
const { pluck } = require("lodash");
```
翻译成浏览器的es语法，就是：
```
import $ from "jquery";
import { pluck } from "lodash";
```
在这个系统中，这些裸导入`jquery`和`lodash`映射向了完整的文件名或者网址。通常这些导入符表示一个库，通过npm导入。通过只指明库的名字，它们会暗中请求这个包的主模块。