---
title: 刷新iframe的几个方法
description: ''
pubDate: 2023/10/8 11:01:29
updatedDate: 2023/10/11 00:03:56
tags:
    - 技术
category: 技术
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/69586601_p01.webp
comment: true
---

有一个iframe如下：
```html
<iframe id="myFrameId" name="myFrameName" :src="url" height="300" width="500"></iframe>
```

## 非跨域刷新

> frameWindow.location.reload()

```js
// 通过各种手段获取的iframe window对象都行
const frameWindow = document.querySelector('#myFrameId').contentWindow 
frameWindow.location.reload()
```

这个方法只能在非跨域时使用。
其实， 非跨域的话，随便一种方法都可以的。

## 跨域刷新 (非跨域也可以)：

> 思路：通过重新给iframe的src赋值来刷新

```js
// 方法1
const tmpUrl = document.all.myFrameName.src
window.open(tmpUrl ,'myFrameName')
// 方法2
const el = document.querySelector('#myFrameId')
const tmpUrl = el.src
el.src = tmpUrl 
```
效果类似但又不完全类似于location.href = xxx，不同点 ：

- iframe的src 不会随内部跳转而变化，location.href 会随页面跳转而变化。
- 当 iframe 里面完全没有发生过跳转，且tmpUrl带hash时（如 https://cn.vuejs.org/v2/guide/installation.html#NPM 带了#NPM），上述方法就无法刷新iframe，同样条件下location.href = location.href 可以刷新页面

## 刷新带hash的iframe

```js
// 方法3 - ⭕⭕⭕
const el = document.querySelector('#myFrameId')
const tmpUrl = el.src
el.src = 'about:blank' // 作为一个临时的链接，如果是其它正常可访问URL，会浪费一些不必要流量
const _t = setTimeout(()=>{
    el.src = tmpUrl
    clearTimeout(_t)
}, 300) // 太短，iframe依然反应不过来，太长效果又不好，300ms刚刚好
```

> 记录自：https://segmentfault.com/a/1190000041675997
> 感谢作者