---
title: 创建Win10符号链接权限问题
description: ''
pubDate: 2023/12/6 00:18:00
updatedDate: 2023/12/06 00:23:36
tags:
    - 技术
    - 知识
category: 技术
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/70462848_p01.webp
comment: true
---

因为nodejs编写时写到了`fs.createSymlink`,执行时出现问题，提示我`operation not permitted`,大概率是权限问题，不停的搜索之后，发现了这篇[文章](https://www.jianshu.com/p/0e307bfe8770)。

首先查看Windows当前账户的权限，在Powershell里执行：`whoami /priv`

![图 0](/public/article/创建Win10符号链接权限问题/2023-12-06_06-00-21-56.png)  

在列表里可以看到，创建符号链接的权限是被禁用的，于是找到开启权限的地方：点开【开始】菜单直接搜索“本地安全策略”，找到相关权限，双击添加开启权限的用户、组。

![图 1](/public/article/创建Win10符号链接权限问题/2023-12-06_06-00-22-09.png)  
![图 2](/public/article/创建Win10符号链接权限问题/2023-12-06_06-00-22-17.png)  

添加完权限后，要重启计算机！！！
备注：Win10家庭版是没有本地安全策略的，要额外安装

参考：
[Windows 10操作系统如何设置审核特权使用](https://jingyan.baidu.com/article/d5a880eb5af8a253f047cc1b.html)