---
title: next主题动画解析
description: ''
pubDate: 2023/9/2 19:14:40
updatedDate: 2023/09/02 21:34:37
tags:
    - next主题
    - 解析
category: next主题
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/6aa537d892a0a2c5dbbcf9e043ce5f4f.png!q90.webp
---

## Next主题的初始化

在`source\js\config.js`文件中，定义了一个全局的`NexT`对象，用以挂载该主题的所有变量。内部也定义了一个全局配置变量。这应该就是全局变量的初始化了。
```js
if (!window.NexT) window.NexT = {};
...
window.CONFIG = ...
...
```
根据情况来看，`config.js`应该就是最初始的文件,`next-boot.js`启动文件，用以执行js,`config.js`位于`layout\_partials\head\head.njk`,
`next-boot.js`位于`layout\_scripts\index.njk`。两者都是每个页面都加载的。

在`next-boot.js`中可以看到如下代码：
```js
...
NexT.boot.motion = function() {
  // Define Motion Sequence & Bootstrap Motion.
  if (CONFIG.motion.enable) {
    NexT.motion.integrator
      .add(NexT.motion.middleWares.header)
      .add(NexT.motion.middleWares.postList)
      .add(NexT.motion.middleWares.sidebar)
      .add(NexT.motion.middleWares.footer)
      .bootstrap();
  }
  NexT.utils.updateSidebarPosition();
};

document.addEventListener('DOMContentLoaded', () => {
  NexT.boot.registerEvents();
  NexT.boot.refresh();
  NexT.boot.motion();
});
```

可以看到动画模块加载的方式，是在`DOMContentLoaded`中触发，通过`NexT.motion.integrator`加载一系列插件，最后`bootstrap`运行。此块代码位于`motion.js`中。

`motion.js`的原理大致如下：

![](/article/next主题动画解析/2023-09-02_02-21-31-43.png)  

header等存放的都是一些anima.js的参数，代码十分简单，有时间用一下。
