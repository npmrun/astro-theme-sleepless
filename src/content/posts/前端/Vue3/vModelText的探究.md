---
title: vModelText的探究
description: ''
pubDate: 2023/9/6 23:39:03
updatedDate: 2023/09/06 23:39:18
tags:
    - Vue3
category: Vue3
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/20ef800ab6f9fdc7ea85ad9e68a4e74c.jpg!q90.webp
---


## 起始

今天学习掘金的文章，看到一篇[关于vue3技巧的文章](https://juejin.cn/post/7264532077574668303#heading-0)，学习到主要两个点，如下：
1. `pinia-plugin-persistedstate` 插件
    这应该是pinia的持久化插件，vuex时期也有类似的，既然是别人推荐的，想必也是好用的。
2. `vModelText`
    这个是一个官方的自定义指令，对应的指令是`v-model`,这竟然从没了解过，可以给其添加修饰符
    ```ts
    <script setup>
    import { ref, vModelText } from 'vue'

    const value = ref("")

    // 为' v-model '指令定义一个名为'capitalize '的自定义修饰符
    vModelText.beforeUpdate = function (el, { value, modifiers }) {
        // 检查' v-model '指令中是否存在' capitalize '修饰符
        if (value && modifiers.capitalize) {
        el.value = el.value.toUpperCase()
        }
    }
    </script>

    <template>
    <input type="text" v-model.capitalize="value" />
    </template>
    ```

## 探究

其源码在[这里](https://gitee.com/fe-mirror/vue3/blob/main/packages/runtime-dom/src/directives/vModel.ts#L41), 可以看到它主要是一个指令，