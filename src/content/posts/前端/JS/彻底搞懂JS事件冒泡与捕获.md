---
title: 彻底搞懂JS事件冒泡与捕获
description: ''
pubDate: 2024/5/8 11:00:54
updatedDate: 2024/5/8 11:00:54
tags:
    - 杂记
category: 杂记
author: NPMRUN
heroImage: https://api.r10086.com/樱道随机图片api接口.php?图片系列=动漫综合2
comment: true
---
## 事件冒泡与事件捕获
事件冒泡和事件捕获分别由微软和网景公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。

如下：假设三层div都有事件监听，这时我们点击的小的蓝方框，事件执行的顺序是怎么样的呢

<!-- iframe https://editor.xieyaxin.top/#eNptkU0OgjAQha/SzJqoqCv8uYi4EDpK41AIrQIh7LyBazceQw+k3sIaJEBgNu3LS74vmSlgLwhJKA3OpgC5CxEcGAU6JLDAj6RGaSpYcnFmgq9cULYLTOmc0IQAxSHQDptPJnG2SAXXQR28KOGYOMyOM6YiEpwlyF1Yvx53VzIzLeR0ADltI6vQR+ZIFKWGWiF/83lemtByzAYcdttRhb7DoxMaw/t6W44N7q+q/9ULpdUsT6vO6jqd8lW3ZVBuLSAhj8pcYFt+ATqQgi0= s:height:500px -->

## 事件冒泡

微软提出了名为事件冒(event bubbling)的事件流。事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。因此在事件冒泡的概念下在div元素上发生click事件的顺序应该是`div -> body -> html -> document`

## 事件捕获

网景提出另一种事件流名为事件捕获(event capturing)。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。因此在事件捕获的概念下在div元素上发生click事件的顺序应该是`document -> html -> body -> div -> div`

## w3c 采用折中的方式，制定了统一的标准——先捕获再冒泡。

addEventListener第三个参数默认值是false，表示在事件冒泡阶段调用事件处理函数;如果参数为true，则表示在事件捕获阶段调用处理函数。

## 测试事件冒泡-点击蓝色

<!-- iframe https://editor.xieyaxin.top/#eNqlk09P2zAYxr+K5QutFLWk3amFHSZxmLRvsHAosdtauAmKXaCqKlUdYv/ZtK1SJ7FJTNWEJsSYJqBKgS9DnKQnvgIOJjS0CA74Er/2k9+TPH7dhGVCMSWMw8LLJrRKNQwLMFPlNQo1aNoWx5bcgnOIrAKC5g3IdAMCxhsUy6KKSaXKC+DJ7OzKenGNIF6NiyXbQdgpAH1lHTCbEgQcjAz4NHB/GRaQI4HM3YHMJZGqmEY2MKX2mqQqZDRGw41xkfDI3+GhJz1UMe2xROtYOoRff8xlJe7aKp6rJ2xp4/A4uxVdpGY6mAfINus1uZapYL5AcTR91niOUjNMn0krKsvdq8vd6PL36vKR7lqpZ0oILazKzRfylLGFnZQBTUrMZQNq5bplcmJbKZxujlOT3y5/HWeoXZFaeWBAbH7x/+947ntveGTAdDGb9YZbwu2Kfx1x1vYG79TLLa1cogxH+8Henjd46w3+iE8dv3swGvbC/b5on/i9v1eai5MP4c5u0HfF9q7iKo9R78jfPwwPXgXf4vX+RvB5U7w+lZii+N3xf24rpjdwuVOPSOLN9wmY/7Ebbh0nYUnMebsT5/3YdGS7TaUzEUZ8ZI+1kh34sNWtTmQmm+hF2FrUICXWMpP3fbF1CfmPmzc= s:height:500px -->

## 测试事件捕获-点击蓝色

<!-- iframe https://editor.xieyaxin.top/#eNqlkr1uwjAUhV/FuhNIESWhU6DduvUNagaIL8TCOCh2+FGUrVvVLlXHLn2IVoLXQS19i16aoiQlEgNekiPb57M/OYWRVKikseDfpaAHUwQfWqGdKnAgiLRFTVPQE3LOpLjiYFwOzNiVQgohynFofXbZbs+W3YUUNjyEYRQLjH3mzpbMREoKFqPgcP21fuOa0ShVejWVXrkyD8eVK1QqWlBrXrkf35v7IpQYnRqGW2bk4ZgxVAkSYff82ruguj/U4T//QuYU8qypqDNuayDEzZzSLXlGjXGDQ6BkMOHgjBIdWBnpBjbT4ty0m+DYUtGY1pIy9vn4snv62K4ftpt3Ds1uvjZzbJzgPuXZeOeySF8N6z/tl9U5l0VKT9yr4tUEpmqWQdZ3QEk9MfR6+9kPx5z4SA== s:height:500px -->

## 事件捕获与事件冒泡同时存-先捕获后冒泡

*   这里记被点击的DOM节点为target节点,document 往 target节点，捕获前进，遇到注册的捕获事件立即触发执
*   到达target节点，触发事件
*   对于target节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行
*   arget节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发

<!-- iframe https://editor.xieyaxin.top/#eNqtlE9PwjAYxr9K854gWZCBp4HevPkNLAdYX1hD6cha/oXsZrwYPWg8etCvYKIJfB1E/Ba+ZhCGI2rCetmerHt+7S9Np9CWCpU0FryLKehmD8GDUmB7ChzwQ21R0yeoCzlkUpxwMC4HZuxEIYUAZSewHjsul/vj2kgKG2xCK4wERh5z+2NmQiUFi1BwOP2YPXPNaKQqK3sqK+nKJGQrJ6hUOKLWpPJ7fM4vtyHFqO5huGlGErKMlhogEVb3j/UjqlujNu/JE2JnK8+aHXXGLTWFOBtSOifPqDEqcPCV9LscnPZA+1aGuoDF6Xbd9DfBsaTCDs0lZez96m758rSYXS/mrxyKtWRu7LSbyuAmmsqhKLL3T1T1UBQJ/Ru1huWicHnzsLp9y8JsNEizcnGYZf2k5Sfx933tHE3jm93DySBuOKCk7hq6ABrxF2RHb9k= s:height:500px -->

## 应用：事件委托（也叫事件代理）

比如我想点击ul标签里面的li获取它的值，有点人就会遍历去给每个li加一个事件监听
其实我们可以在li的父级加一个事件监听，这就相当于把事件监听委托给了ul  
我们点击li的时候是会打出值的

```
<ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
</ul>
```
```
ul = document.getElementById('ur')

    ul.addEventListener("click",function(e){
        console.log(e.target.innerText);
    },false);
```

## onclick事件分析

onclick不能像addEventListener那样指定是事件类型，它只能是事件冒泡

```
   s1.onclick=function(){
        console.log('红')
    }
    s2.onclick=function(){
        console.log('黄')
    }
    s3.onclick=function(){
        console.log('蓝')
        return true
    }
```

## 阻止事件冒泡和事件默认行为

但某一些时候我们不想触发事件冒泡怎么办或者是不想触发默认的一些方法

### e.stopPropagation()

这是W3C的标准方法，stopPropagation是事件对象(Event)的一个方法，作用是阻止目标元素的冒泡事件，但是会不阻止默认行为。
IE使用的是IE则是使用e.cancelBubble = true

```
function stopBubble(e) { 
//如果提供了事件对象，则这是一个非IE浏览器 
if ( e && e.stopPropagation ) 
    //因此它支持W3C的stopPropagation()方法 
    e.stopPropagation(); 
else 
    //否则，我们需要使用IE的方式来取消事件冒泡 
    window.event.cancelBubble = true; 
}
```

### e.preventDefault()

preventDefault它是事件对象(Event)的一个方法，作用是取消一个目标元素的默认行为。既然是说默认行为，当然是元素必须有默认行为才能被取消，如果元素本身就没有默认行为，调用当然就无效了。什么元素有默认行为呢？如链接`<a>`，提交按钮`<input type=”submit”>`等。当Event 对象的 cancelable为false时，表示没有默认行为，这时即使有默认行为，调用preventDefault也是不会起作用的。

### return false

javascript的return false只会阻止默认行为，而是用jQuery的话则既阻止默认行为又防止对象冒泡。

```
//阻止浏览器的默认行为 总结
function stopDefault( e ) { 
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
    return false; 
}
```