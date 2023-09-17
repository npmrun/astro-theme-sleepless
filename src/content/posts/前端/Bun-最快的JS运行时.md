---
title: Bun-最快的JS运行时
description: ''
pubDate: 2023/9/18 01:27:45
updatedDate: 2023/09/18 01:38:10
tags:
    - Bun
category: 前端
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/69482201_p0.webp
comment: true
draft: true
---

今天偶然看到一个新闻，[Bun](https://bun.sh/)这个号称最快的JS运行时已经发布`1.0`版本了，这意味着可以开始用了，不过在访问其官网时发现其有一行小字。

> Supported on macOS, Linux, and WSL

表示只支持macos, linux 和 wsl，window平台是不支持的，因此我们使用wsl安装看看。

<!-- tabs 安装 -->
<!-- tab 安装命令(推荐) -->
```bash
curl -fsSL https://bun.sh/install | bash
```
`github`的安装速度感人，慢慢等吧
<!-- endtab 安装命令(推荐) -->
<!-- tab 其他安装命令 -->
```bash
# with npm
npm install -g bun

# with Homebrew
brew tap oven-sh/bun
brew install bun

# with Docker
docker pull oven/bun
docker run --rm --init --ulimit memlock=-1:-1 oven/bun
```
<!-- endtab 其他安装命令 -->
<!-- endtabs 安装 -->

> 等安装完成再接后续