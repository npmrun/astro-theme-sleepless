---
title: Vue的一些注意点
description: ''
pubDate: 2024/3/8 19:00:36
updatedDate: 2024/3/8 19:00:36
tags:
    - Vue
category: Vue
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/e0d69f8551d53118d28b36fcfd3b9894.png!q90.webp
comment: true
---

## 在vue3的`.vue`文件内`<script></script>`中间的内容是共享的

如代码所示：

<!-- iframe https://editor.xieyaxin.top/?vue#eNqNUU1P20AQ/SvbvaSVsFc0PUUG0VZIbQ9tBUgcWA7GniQL3g/NjkOkyP+d8ToEEz7EbXfem5n35m3k9xDyVQtyJotYoQkkjrWrvIskSnEkrg6/Tq+1g3XwSGKjnRCldp12hRrozObPtjUCtYErxg50gTAXnZijt2LCWyY9eRhu44LHM/558guaxotLj039afJlfzSBDU1JwD8hiuXh8WaTmruuUPxLVeNCS2KVWV9Dc6Ql41oKxWChRv3yQA7KMluG/DZ6x7aTJ70FopazwWVfY8X9X8slUYgzparacRvvMCvMHZBywaoTpilsHRkLWe3tyTSf5t9UbSKNyzlEm92gv4+APETLg9EaxcUVYIbgakDAj67daxuv3oNerO+3c44dH4UiZzI3i72TVN4G0wD+C2Q4s2enKTmy+z+pRtjCzku1hOrulfptXA+e/iMkZSP/VOICaIBPz//Cmt87kCNtm20Mb4BnEH3T9hoH2o/W1Sx7xEtqf6eEjVtcxNM1gYuPpnqh6RqJn/L4+Y71J7l87d0VuwcJfBxC -->

可以发现在output的js中，有一段这样的代码：

```
const a = [123]
export {
  a
}
```

这是放在该组件的顶层的，换句话说，这个a是定义在组件之外的，当组件内使用该变量时访问的就是同一个变量，如果需要每个组件单独一个变量的话就会出现问题。