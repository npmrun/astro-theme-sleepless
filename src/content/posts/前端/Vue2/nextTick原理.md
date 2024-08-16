---
title: nextTick原理
description: 'nextTick原理，理解也要说的出来哦'
pubDate: 2024/3/1 17:05:03
updatedDate: 2024/3/1 17:05:03
tags:
    - Vue2
category: Vue2
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/72354736_p0.webp
comment: true
chinese: true
---

Vue2中有个`nextTick`函数，这个函数是在更改数据后当你想立即使用js操作新的视图的时候需要使用它，`nextTick` 是在下次 DOM 更新循环结束之后执行延迟回调。[源码在此](https://github.com/vuejs/vue/blob/main/src/core/util/next-tick.ts#L88), 可以去看看。以下是一个简图：

![](/public/article/nextTick原理/2024-03-01_01-18-40-08.png)

可以看到，vue会维护一个callbacks栈，可以通过Promise,MutatuinObserver等执行并清空，vue的策略是通过Promise这种可以函数，将callbacks栈清空的任务放在微任务，也会提供降级，当不支持微任务的时候会通过`setTimeout`创建宏任务。

当我们调用`nextTick`时，会往callbacks栈中压一个回调，同时会调用一下timerFunc执行一下推入微任务的函数，此时在下一次事件循环时会执行微任务中的回调了。当然，如果重复执行timerFunc并不会重复的创建微任务，而是将回调函数压入callbacks栈，一次全部执行完毕。

至于为啥可以在修改响应式数据之后在下一次微队列能获取到更新后的dom元素，那么就得知道**修改vue中的data数据后，vue会在什么时候更新dom？** [源码在此](https://github.com/vuejs/vue/blob/bed04a77e575d6c4c1d903f60087dca874f7213e/src/core/observer/scheduler.ts#L197)。修改数据后，会触发对象的set方法，会通知watcher，从而触发watcher的update方法，update方法内会将watcher添加进watcher队列，执行nexttick，把清空wacher队列的方法加入到微任务，等待同步事件执行完成后，浏览器就会执行微任务，从而更新dom。

## 简要总结

当响应式数据更新时，立马会有一个用于更新dom的微队列任务压入，此时执行`nextTick`压入的微队列任务自然是在更新dom的操作之后了。