---
title: img实现图片加载前默认图片
description: img实现图片加载前默认图片
pubDate: 2023/8/31 13:58:47
updatedDate: 2023/08/31 15:53:11
tags:
    - img
category: 前端
author: NPMRUN
heroImage: https://w.wallhaven.cc/full/jx/wallhaven-jxd59w.jpg
---

## 前言

开发过程中，我们希望图片在加载失败的时候会替换成加载失败的图片,同时为了更好的体验，加载前最好也要有一张占位图片，即实现加载前显示一张占位图，加载成功显示真实要显示的图，加载失败又是另一张失败图

---

之前搜到一个博主用指令的方式，使 img 的 src 先指向占位图，等真实图片加载出来后再对图片的 src 进行替换，有一个项目我就是用的这个方法，但是占位图和加载失败的图片只能是同一张图片，所以会在图片加载出来之前【加载失败】的图片就已经显示出来了，等请求到真实图片再进行替换，虽然只是闪了一下，观感还是不太好的，当时项目比较急也没有时间进行优化，所以只能先让 UI 给找了一张模棱两可的图片换上了，现在有了时间，所以好好研究了一下

## 一、加载前

```html
<img :src="personInfo.avatar" />
```

avatar 为从接口请求来的变量，接口请求需要一定时间，所以接口数据请求来之前给 css 设置样式

```html
img[src=""],img:not([src]){ background: url('/static/img/sitg.jpg') no-repeat
center; background-size:100% 100% ; }
```

但是这样有个问题，当 img 的 src 属性为空时，会有一圈的类似于 border 的边框，但是这个边框设置 border:0 是无效的，大多数文章给出的解决办法是设置透明度，如下

```
img[src=""],img:not([src]){
   opcity: 0;
}
```

但是因为我们要设置占位图，所以透明度不能设置为 0，设置为 0 时占位图也会一整个不显示了，所以去除 border 其实还有一个方法，就是设置宽度高度都为 0，然后设置 padding 来把这个图片的高度宽度撑起来，这样就不会有这个 border 问题了

```
 img {
      margin: 25px 10px 25px 0;
      width: 260px;
      height: 164px;
  }
img[src=""],img:not([src]){
	width: 0;
    height: 0;
    padding: 82px 130px;
    background: url('/static/img/sitg.jpg') no-repeat center;
    background-size:100% 100% ;
}
```

## 二、加载成功

图片请求完这一步没什么点，就是把请求的图片值赋给变量就可以了

## 三、加载失败

当图片丢失或其他原因加载失败的情况下需要显示一张加载失败的图片，需要给 img 的 onerror 属性设置一张当触发 onerror,将此 img 的 src 指向加载失败的图片。但是这样有一个严重的 bug,就是当前你请求的图片加载失败，然后触发 onerror 指向的加载失败的图片也失败的时候，会无限触发 onerror 事件，进入死循环，所以我们在触发一次 onerror 事件后，需要将 onerror 设为 null,想想陷入死循环还是页面没有加载成功丑一点，还是丑点就丑点吧

```
<img :src="personInfo.avatar" alt=""  onerror="javascript:this.src='/static/img/fail.png';this.onerror=null;">
```
