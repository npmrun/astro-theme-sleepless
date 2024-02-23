---
title: 可能因为Hyper-V动态端口的占用导致clash出现proxy错误
description: ''
pubDate: 2024/1/16 22:38:35
updatedDate: 2024/01/16 22:53:53
tags:
    - 杂记
category: 杂记
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/樱道随机图片api接口.php?图片系列=动漫综合2
comment: true
---

这段时间，使用clash时总是出现 `代理服务器出现问题，或者地址有误` 这种问题。找了很久不知道原因，后面不知道为啥，发现clash中连代理的网站都没了，打开应用目录，删除`.config\clash-verge`目录，重新导入，还是有问题，但是发现在日志中出现端口9090被占用的问题，搜索时发现 [这篇文章](https://zhuanlan.zhihu.com/p/341274233) ,使用`netstat -ano | findstr "9090"` 发现并没有端口占用问题，再看下面，发现了Hyper-V有动态端口的问题，可能是这个导致了我的9090和7890端口被占用。

尝试`netsh interface ipv4 show excludedportrange protocol=tcp`,类似如下输出:

```
C:\Users\username>netsh interface ipv4 show excludedportrange protocol=tcp

协议 tcp 端口排除范围

开始端口    结束端口
----------    --------
      1069        1168
      1169        1268
      1269        1368
      5357        5357
     50000       50059     *

* - 管理的端口排除。
```

我的发现我的两个端口都被占用了，那应该是这个问题，随后搜索Hyper-V修改动态端口的结构，发现 [这篇文章](https://www.cnblogs.com/fansys/articles/13375989.html#:~:text=%E4%BF%AE%E6%94%B9Hyper-V%E5%8A%A8%E6%80%81%E7%AB%AF%E5%8F%A3%E8%8C%83%E5%9B%B4%201%201.%20%E9%97%AE%E9%A2%98%201.1.%20%E7%8E%B0%E8%B1%A1%20%E5%9B%A0%E4%B8%BA%E4%BD%BF%E7%94%A8Windows%2010%E4%B8%AD%E7%9A%84WSL,%E8%BF%99%E6%A0%B7%E4%BD%A0%E7%9A%84tcp%E7%AB%AF%E5%8F%A3%E6%8E%92%E9%99%A4%E8%8C%83%E5%9B%B4%E5%8F%AF%E8%83%BD%E5%88%9A%E5%A5%BD%E4%B8%8D%E5%8C%85%E5%90%AB%201099%20%E7%AB%AF%E5%8F%A3%EF%BC%8C%E8%BF%99%E6%A0%B7%E4%BD%A0%E5%BD%93%E7%84%B6%E5%B0%B1%E5%8F%AF%E4%BB%A5%E7%94%A8%E4%BD%A0%E7%9A%84IDEA%E8%BF%90%E8%A1%8CTomcat%E5%BA%94%E7%94%A8%E4%BA%86%E3%80%82%20...%203%203.%20%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C%20)。 

## 简要解决办法

以下步骤需要使用管理员权限操作

1. 关闭Hyper-V

```
# 关闭Hyper-V
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V
```

2. 修改动态端口范围

使用管理员身份运行cmd

```
# 设置动态端口TCP范围
netsh int ipv4 set dynamicport tcp start=51555 num=13980
# 设置动态端口UDP范围
netsh int ipv4 set dynamicport udp start=51555 num=13980
```

然后检查修改结果

```
# 查看动态端口范围
netsh int ipv4 show dynamicport tcp
```

输出结果如下：

```
协议 tcp 动态端口范围

启动端口 : 51555
端口数 : 13980
```

3. 开启Hyper-V

```
# 启用Hyper-V
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
```

输出结果如下：

```
部署映像服务和管理工具
版本: 10.0.18362.1

映像版本: 10.0.18363.752

启用一个或多个功能
[100.0%]
操作成功完成。
重新启动 Windows 以完成该操作。
是否立即重新启动计算机? (Y/N)
```

## 附件

常用操作

```
# 禁用Hyper-V
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V
# 启动Hyper-V
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All

# 显示动态端口范围
netsh int ipv4 show dynamicport tcp
# 显示例外端口范围
netsh interface ipv4 show excludedportrange protocol=tcp

# 设置动态端口TCP范围
netsh int ipv4 set dynamicport tcp start=51555 num=13980
# 设置动态端口UDP范围
netsh int ipv4 set dynamicport udp start=51555 num=13980

# 添加例外端口
netsh int ipv4 add excludedportrange protocol=tcp startport=50051 numberofports=1
```

## 最后

如此，我的clash就没有代理服务器错误的问题了。不过这样可能导致hyperv的虚拟交换机管理器中的被删除，重新创建并应用到虚拟机上就好了