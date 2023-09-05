---
title: TCP协议的连接建立过程和释放过程简单介绍
description: ''
pubDate: 2023/9/6 00:39:36
updatedDate: 2023/09/06 00:40:11
tags:
    - 面试
category: 面试
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/a3f11f5b85e3fb101c25fa53b6d36cd7.jpg!q90.webp
---

## TCP的连接过程
> https://blog.csdn.net/lin962792501/article/details/86589026
> https://blog.csdn.net/weixin_42981560/article/details/129187014

TCP协议是通过握手建立一个可靠的点对点连接，其流程是：
第一次握手：客户端发送一个syn包，并进入syn_sent状态，这个数据包中包含了初始序列号seq,表示客户端想要与服务器建立连接
第二次握手：服务器收到syn包之后，会返回一个syn+ack的包，并进入syn_revd的状态，表示服务器收到并同意了客户端的连接
第三次握手：客户端收到syn包之后，会发送一个ack的包给服务器，并进入连接接成功的状态。服务器收到ack的包之后也会进入连接成功的状态。
至此握手连接完成。
