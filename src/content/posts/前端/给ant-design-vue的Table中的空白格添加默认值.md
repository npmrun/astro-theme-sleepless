---
title: 给ant-design-vue的Table中的空白格添加默认值
description: ''
pubDate: 2023/10/13 18:41:47
updatedDate: 2023/10/13 18:46:48
tags:
    - 杂记
category: 杂记
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/70295578_p01.webp
comment: true
---

如标题所言，该文章主要是为了实现该功能，目前大致有两种方法：

1. 伪元素
2. 检测是否空渲染再显示

先看看我们需要的效果：

![图 0](/public/article/给ant-design-vue的Table中的空白格添加默认值/2023-10-13_13-18-46-18.png)  

不错，目的就是为了给没数据的列添加`-`字符。接下来看方法：

## 伪元素

从以下链接查看到，各位可以点过去看看：
[Table组件优雅的给空内容添加 “--“ 值_antd table 空值替换-CSDN博客](https://blog.csdn.net/weixin_44052136/article/details/119644262)

缺点是无法复制

## 检测是否空渲染再显示

我是将`a-table`包裹了一层，方便统一处理：

```html
<a-table
    ...
>
    <template v-for="(item, key, index) in tableSlotsWithoutbodyCell" :key="index" v-slot:
[item]="data">
        <slot :name="key" v-bind="data"></slot>
    </template>
    <template #bodyCell="{ text, record, index, column }">
        <RenderBodyCell :data="{ text, record, index, column }" :bodyCell="bodyCell">
            <div
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
            >
                {{  text ? text : !disableEmptyLine ? "-" : "" }}
            </div>
        </RenderBodyCell>
    </template>
</a-table>
```

借鉴思路即可，目的是通过代理`bodyCell`插槽，如果用户提供的插槽渲染了节点，那么就使用用户的插槽，如果用户没提供插槽或者渲染，就使用默认的检测，即如果有值则显示值，如果没有值，这显示`-`。这样的话灵活度高一点。

> `RenderBodyCell`代码如下:

```html
<script lang="ts" setup>
const props = defineProps<{
    bodyCell: any // 将bodyCell插槽传递过来
    data: any
}>()

const parentRef = ref<HTMLElement>()
const hasChildren = computed(() => {
    return parentRef.value !== undefined ? !!parentRef.value?.childElementCount : parentRef.value
})

const defaultComp = computed(() => {
    return props.bodyCell ? () => props.bodyCell(props.data) : undefined
})
</script>

<template>
    <div ref="parentRef">
        <defaultComp v-if="!!defaultComp"></defaultComp>
        <slot v-if="hasChildren !== undefined && !hasChildren"></slot>
    </div>
</template>
```

