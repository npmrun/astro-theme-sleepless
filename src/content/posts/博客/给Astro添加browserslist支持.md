---
title: 给Astro添加browserslist支持
description: ''
pubDate: 2023/9/7 00:00:32
updatedDate: 2023/09/07 00:23:34
tags:
    - Astro
category: Astro
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/yande550104_yanis.webp
---

## 目标

`Astro`输出的CSS是最新的CSS,我需要构建一个兼容微信浏览器的低版本CSS,因此想到了Astro是否支持`browserslist`，到issue一搜，确实有人问啊，具体在[这里](https://github.com/withastro/astro/issues/4092);

## 详细情况

原来Vite有`build.target`与`build.cssTarget`两个配置，足可以将CSS版本降下来，因此就不太需要`browserslist`，不过也是有方法支持的，也就是通过`esbuild`插件，vite中主要使用`esbuild`做预构建，其他文章可看[这里](https://juejin.cn/post/7240740177449435191#heading-9)。在生产环境中是使用`esbuild`做代码的转换以及压缩，例如在[这里](https://vitejs.cn/vite3-cn/config/build-options.html#build-target)搜索`esbuild`这个单词。

以下是支持`browserslist`的方法：

```ts
import { defineConfig } from "astro/config";
import browserslist from "browserslist";
import { resolveToEsbuildTarget } from "esbuild-plugin-browserslist";

export default defineConfig({
    vite : {
        build: {
            cssTarget: resolveToEsbuildTarget(browserslist())
        }
    }
});
```

## 未尝试：

使用`@vitejs/plugin-legacy`做转换，这个不是使用的`esbuild`转换，而是`babel`。
