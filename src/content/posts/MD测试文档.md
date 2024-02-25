---
title: MD测试文档
description: Markdown全功能测试
pubDate: 2022/8/31 13:58:47
updatedDate: 2022/09/06 01:31:16
tags:
    - DEMO
    - MD
category: 杂记
author: NPMRUN
heroImage: https://pic.rmb.bdstatic.com/bjh/0e0fcfcf1a0983dccf207fd1364f0eb9.jpeg
hot: true
relatedPosts:
    - unified/如何将一个md文档按h2和h3分块
---

# Welcome to Sleepless! 欢迎来到 失眠先生!

## 标签

<!-- tabs aaa -->

<!-- tab bbb -->

> 阿松大

```
asdas
```

<!-- tabs zzz -->

<!-- tab 111 -->

<!-- tabs ccc -->

<!-- tab fff -->

1111233

<!-- endtab fff -->

<!-- tab ggg -->

222safffffffff

<!-- endtab ggg -->

<!-- endtabs ccc -->

<!-- endtab 111 -->

<!-- tab 222 -->

assssssssssssssss

<!-- endtab 222 -->

<!-- endtabs zzz -->

<!-- endtab bbb -->

<!-- tab ccc -->

ccc

<!-- endtab ccc -->

<!-- endtabs aaa -->

## 1. 排版

**粗体** _斜体_

~~这是一段错误的文本。~~

引用:

> 引用 Sleepless 官方的话, 为什么要做 Sleepless, 原因是...

有充列表:

1.  支持 Vim
2.  支持 Emacs

无序列表:

-   项目 1
-   项目 2

## 2. 图片与链接

图片:
![sleepless](/favicon.svg)
链接:

[这是去往 Sleepless 官方博客的链接](/)

## 3. 标题

以下是各级标题, 最多支持 5 级标题

```
# h1
## h2
### h3
#### h4
##### h4
###### h5
```

## 4. 代码

示例:

    function get(key) {
        return m[key];
    }

代码高亮示例:

```javascript
/**
 * nth element in the fibonacci series.
 * @param n >= 0
 * @return the nth element, >= 0.
 */
function fib(n) {
    var a = 1,
        b = 1
    var tmp
    while (--n >= 0) {
        tmp = a
        a += b
        b = tmp
    }
    return a
}

document.write(fib(10))
```

```python
class Employee:
   empCount = 0

   def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1
```

# 5. Markdown 扩展

Markdown 扩展支持:

-   表格
-   定义型列表
-   Html 标签
-   脚注
-   目录
-   时序图与流程图
-   MathJax 公式

## 5.1 表格

| Item     | Value  |
|----------|--------|
| Computer | \$1600 |
| Phone    | \$12   |
| Pipe     | \$1    |

可以指定对齐方式, 如 Item 列左对齐, Value 列右对齐, Qty 列居中对齐

| Item     |  Value | Qty |
|:---------|-------:|:---:|
| Computer | \$1600 |  5  |
| Phone    |   \$12 | 12  |
| Pipe     |    \$1 | 234 |

## 5.2 定义型列表

名词 1
: 定义 1（左侧有一个可见的冒号和四个不可见的空格）

代码块 2
: 这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）

        代码块（左侧有八个不可见的空格）

## 5.3 Html 标签

支持在 Markdown 语法中嵌套 Html 标签，譬如，你可以用 Html 写一个纵跨两行的表格：

    <table>
        <tr>
            <th rowspan="2">值班人员</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
        </tr>
        <tr>
            <td>李强</td>
            <td>张明</td>
            <td>王平</td>
        </tr>
    </table>

<table>
    <tr>
        <th rowspan="2">值班人员</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
    </tr>
    <tr>
        <td>李强</td>
        <td>张明</td>
        <td>王平</td>
    </tr>
</table>
 
**提示**, 如果想对图片的宽度和高度进行控制, 你也可以通过img标签, 如:
 
<img src="/bg.png" width="120px" />
 
## 5.4 脚注
 
Sleepless[^footnote]来创建一个脚注
  [^footnote]: Sleepless是一款强大的开源云笔记产品.
 
## 5.5 目录
 
通过 `[TOC]` 在文档中插入目录, 如:
 
[TOC]

# 特殊元素

键盘：<kbd>cmd+K</kbd>
