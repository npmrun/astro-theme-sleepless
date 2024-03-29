---
title: 有关computed的各种详细操作
description: ''
pubDate: 2023/9/9 19:37:15
updatedDate: 2023/09/12 02:19:47
tags:
    - vue3
category: vue3
author: NPMRUN
heroImage: https://pic.xieyaxin.top/r10086/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/68963579_p01.webp
comment: true
---


## 官方概念

该属性是属于 vue 的概念之一，主要作用就是结合响应式值，组合成一个新的值，并且会随着响应式值的更新而更新。比之使用函数来说，能够做到对值的缓存，响应式值不变化的时候值也不会变化，而函数只要重新渲染就会执行。

为什么需要缓存呢？想象一下我们有一个非常耗性能的计算属性 list，需要循环一个巨大的数组并做许多计算逻辑，并且可能也有其他计算属性依赖于 list。没有缓存的话，我们会重复执行非常多次 list 的 getter，然而这实际上没有必要！如果你确定不需要缓存，那么也可以使用方法调用。

### 可写计算属性

计算属性默认是只读的。但计算属性也是可以写入的，当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：

```js
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

现在当你再运行 fullName.value = 'John Doe' 时，setter 会被调用而 firstName 和 lastName 会随之更新。

### 注意

-   **Getter 不应有副作用**

    计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要在 getter 中做异步请求或者更改 DOM！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用侦听器根据其他响应式状态的变更来创建副作用。

-   **避免直接修改计算属性值**

    从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

> 以上部分是简要摘出了官方文档的内容。

## 项目实践

我们主要记录用`computed`能够实现怎样简便与优雅的操作。

### 对话框的显隐控制

```html
<script setup lang="ts">
    import { computed } from "vue";
    import { ElDialog } from "element-plus";

    const props = defineProps<{
        visible: boolean;
        title?: string;
    }>();

    const emits = defineEmits<{
        (event: "update:visible", visible: boolean): void;
        (event: "close"): void;
    }>();

    const dialogVisible = computed<boolean>({
        get() {
            return props.visible;
        },
        set(visible) {
            emits("update:visible", visible);
            if (!visible) {
                emits("close");
            }
        },
    });
</script>

<template>
    <ElDialog v-model="dialogVisible" :title="title" width="30%">
        <span>This is a message</span>
        <template #footer>
            <span>
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </ElDialog>
</template>
```

解析：

可以看到`dialogVisible`是一个计算属性，当读取它时，获取到的是`props.visible`的值，当执行`dialogVisible.value = false`是，会走 set 的函数，即`emit`事件给父组件，实现了方便快捷的`v-model`支持，避免了使用`watch`。

不过，可以确定的是，这种方式只能用于一个值的,如果需要多个值组合响应，最好还是要用`watch`好控制一点。

### 其他示例暂未想到

## 附件资料

-   https://cn.vuejs.org/guide/essentials/computed.html
-   https://cn.vuejs.org/api/reactivity-core.html#computed
-   https://cn.vuejs.org/api/options-state.html#computed
