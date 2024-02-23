---
title: JS判断页面是否被iframe嵌套
description: ''
pubDate: 2023/10/12 21:38:41
updatedDate: 2023/10/13 18:45:15
tags:
    - 前端
category: 前端
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/bf0c0aba9aa421a16e75a61f293fe11c.jpg!q90.webp
comment: true
---

1. 判断页面是否被`iframe`有三种方法

```js
//方式一 
if (self.frameElement && self.frameElement.tagName == "IFRAME") { 
  alert('在iframe中'); 
} 
//方式二 
if (window.frames.length != parent.frames.length) { 
  alert('在iframe中'); 
} 
//方式三 
if (self != top) { 
 alert('在iframe中'); 
}
```

2. 禁止页面被别人iframe

```html
<script language="javascript"> 
if (top.location != location) 
{ 
top.location.href = location.href; 
} 
</script> 

//或 
<script language="javascript"> 
if(self!=top){top.location.href=self.location.href;} 
</script>
```

> 注： 这种做法虽简单，但如果对方用如下招数很容易就被破解了

```html
<iframe src="你的页面地址" name="tv" marginwidth="0" marginheight="0" scrolling="No" noResize frameborder="0" id="tv" framespacing="0" width="580" height="550" VSPACE=-145 HSPACE=-385></iframe> 
<script language="javascript"> 
var location=""; 
var navigate=""; 
frames[0].location.href=""; 
</script>
```

当然，万能的js依旧设计了应对招数

```html
<script language="javascript"> 
if(top != self){ 
 location.href = "about:blank"; //也可设置为你自己的URL
} 
</script>
```

当然，当然，这个也不是完美的奥，这种方式会禁止所有的页面的嵌入，那么本域名内的页面嵌入也是被禁止呢，嘤嘤～别着急，JS say no~ no~ no~

我们依旧有办法可以做到禁止除域名外的页面的iframe

```html
<script language="JavaScript">
try{
　　top.location.hostname;
　　if (top.location.hostname != window.location.hostname) {
　　　　top.location.href =window.location.href;
　　}
}
catch(e){
　　top.location.href = window.location.href;
}
</script>
```