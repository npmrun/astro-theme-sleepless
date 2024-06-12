---
title: Windows CMD永久设置UTF-8编码
description: ''
pubDate: 2024/6/12 15:28:58
updatedDate: 2024/6/12 15:28:58
tags:
    - 技术
category: 技术
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/71920172_p0.webp
comment: true
---

## 临时修改，只作用于当前打开的窗口

进入cmd窗口后，直接执行
```
chcp 65001
```
执行完后，cmd的编码格式就是UTF-8

## 永久修改，修改注册表

在运行中输入`regedit`，找到`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor`

然后“右键-新建”，选择“字符串值”，“名称”列填写`autorun`，数值数据填写`chcp 65001`

![图 0](/article/Windows CMD永久设置UTF-8编码/2024-06-12_12-15-30-04.png)  

添加成功后

![图 1](/article/Windows CMD永久设置UTF-8编码/2024-06-12_12-15-30-16.png)  

再次在运行中输入cmd，就会自动把编码格式设置为UTF-8

## 编码代码
```
437（英语）
65001（utf-8）
936（GBK）
```