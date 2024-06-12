---
title: 修改Windows10 命令终端cmd的编码为UTF-8
pubDate: 2024/06/12 03:15:00
updatedDate: 2024/06/12 03:15:00
author: NPMRUN
category: 技术
tags:
  - 技术
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/69544713_p01.webp
hot: false
hidden: false
relatedPosts: []
---


## 临时修改，只作用于当前打开的窗口

进入cmd窗口后，直接执行

```
chcp 65001
```

执行完后，cmd的编码格式就是UTF-8

## 永久修改，修改注册表

在运行中输入`regedit`，找到`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor`

然后“右键-新建”，选择“字符串值”，“名称”列填写autorun，数值数据填写chcp 65001.

添加成功后

![](/images/1907212-f57050a78fbc9b88.webp)



再次在运行中输入cmd，就会自动把编码格式设置为UTF-8

## 编码代码

```
437（英语）
65001（utf-8）
936（GBK）
```
