---
title: 折磨的console.log与watch导致的问题
description: ''
pubDate: 2024/3/15 00:22:13
updatedDate: 2024/3/15 00:22:13
tags:
    - 杂记
category: 杂记
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/71920172_p0.webp
comment: true
---

经历了折磨的几小时，发现问题是直呼操蛋，为啥用console.log会出现这种问题。具体是什么呢？我直接说结论：在watch回调中打印一个数组会导致不按照vue的规则重复触发回调。

我们从[Vue3侦听数组](https://v3-migration.vuejs.org/zh/breaking-changes/watch.html)这部分来看，vue3是不会监听内部数组改变的，只有当栈地址发生变化时才会触发监听，或者使用deep选项深度监听。

这时的情况还是正常的：

<!-- iframe https://editor.xieyaxin.top/?vue#eNqNU02P0zAQ/StWLptqU2fRcqraagHtAYQALdwwBzeZpN4mtmU7aVGV/87Y7kfaBbS3eObNe28+sk/eaU37DpJZMreFEdoRC67TSyZFq5VxZE8MVBnZclesH6sKCpeRlpvNE99mmOKFEz1kxCkMkIFURrXkBhlvmGSyUNI60oK1vAay8FTpz18TJhtwRBlRC/lZ1ZjwQNUAbVRNV0KW6SGA0FEKgSml1DozWSz3TJIjNe150wHVnV0fAT57UjgHh7Mtbgz/HUzFJqKzUaNpOiGLJQlCIxcpSwKIFLxpoGSJpz30xJHvjsmqk0ipJOFliSSBIchFi/z2Nlo54axuRAGX0EPsLiNvInqexxXhcvDhoNUNd4AvQual6JfzVecckj0UWLhZsATVWbL0kvM85l5iogrC4scZmHvKE3ewNPOfpJ9WymClIAIb9HGs3u+JIMMQq861h/1cFqYCvWdETDzBAREofHwYphdcvu1Rq0mWxMOctlzTZ6sknm4YGhoKCcuSWRyjj+El+jdL1s5pO8vzopRYVkIjekMluFzqNn9AWG466UQL01K1D/f0nr5FfevGYQq2na6M2lowSMKSbCSTY7AHMzUgSzBgXit7VTaWvkq9kPfqeBcDDsVZvNBK1FcjKVSrRQPmq/ZndjkavF61/RRiznRw6qVYQ7H5S/zZ7mJP3wwEZ6P+HTc1uJh+/P4Fdvh9Sraq7JrDGv6RfAL8uzrvMcLed7JE2yNccPsxbFjI+od93DmQ9tiUNxqmEfBhHx/+0/rZLk77NMXhDzmxulA= -->

只有一个`watch called-0`，不错，符合vue3的规则。

但不幸的是，我修改一下出现了问题

<!-- iframe https://editor.xieyaxin.top/?vue#eNqNU02P0zAQ/SujXDbVpsmi5VS11QLaAxwALdwwB28yab1NbMt20qIq/52x3Y+0C4ibPfPmvTfj8T55p3Xed5jMkrktjdAOLLpOL5kUrVbGwR4M1hlsuSvXj3WNpcug5WbzxLcZpXjpRI8ZOEUBGKA2qoUbYrxhkslSSeugRWv5CmHhqdIfPydMNuhAGyEdBdM8z60zk8VyzyQc0XnPmw5z3dn1EcDkcCblxvBfgTJaiLwjm2k6gcUSAqcvUQ3mjVqloZCgEA2kLAlFUPKmwYolXubgkBP/HZN1J0lCSeBVRaSBMbBEd/z2Nlo74axuRImX0EPsLoM3ET0v4sBp1HRx2OqGO6QbwLwS/XL+3DlHZA8lFW4WLCF1liy95LyIudeYqEKweDgDC0954g6WZv4I/bRWhioFCGrQx6l6vwcBwxCrzrWHp7ksTAV5z0BMPMEBESh8fBimF1y+7VGrSZbENZu2XOcvVklaxDA0MhQSliWzOEYfo73yd5asndN2VhRlJamswkb0JpfoCqnb4oFghemkEy1OK9U+3Of3+VvSt24cztG202ejthYNkbAkG8kUFOzRTA3KCg2a/5W9KhtLX6VeyXt12ouBhuIsbWwtVlcjKVWrRYPmi/Zrdjka2l61/RRiznR46qVcY7n5Q/zF7mJPXw0GZ6P+HTcrdDH9+O0z7uh8Sraq6prDM/wl+YT02zrvMcLed7Ii2yNccPsxvLCQq+/2cedQ2mNT3miYRsCH9/jwj9bPdmnapykOvwGKzqh2  -->

可以看到每次`push`和`splice`都会触发`watchEffect`，不过如果你将`console.log`修改为`print`就没啥事，还是正常的。或者将`console.log(array)`修改为`console.log(toRaw(array))`也是可以的。这就有问题了。

我们先看看为啥ref不能监听数组，可以看看[这篇文章](https://segmentfault.com/a/1190000041250654)。具体原因不去深究。

大致就是因为没有去深度遍历数组内部的set,get,只是停留在对地址的监听上，当地址改变了才会触发set从而触发监听。

说了这么多，从刚才的问题分析，只可能是console.log的问题了，猜想就是console.log打印的时候会去获取数组的值，从而触发监听数组的get, 当我修改console.log(array)为console.log(array[2])是，点击三下才会多触发一次。

暂时不去探究那么深，先睡觉，很晚了。