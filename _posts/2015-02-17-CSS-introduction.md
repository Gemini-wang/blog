---
title: 认识CSS
time: 2015.02.17 
layout: post
tags:
- CSS
- 笔记
excerpt: 本文主要记录了继承、覆盖继承。
---

#`<link>`元素

1.创建`lounge.css`文件。

2.从`lounge.css`文件链接到外部样式表。

`<link type="text/css" rel="stylesheet" href="lounge.css">`

#继承
元素可以从它们的父元素继承样式，但不是继承所有样式，只有一部分样式，如`font-family`。能继承的属性：`color`、`font-family`以及所有与字体相关的属性，`font-size`、`font-weight`、`font-style`。不能继承的属性：边框。
`<img>`元素没有任何文本，不会受继承影响。
#覆盖继承
给子元素提供特定的规则来覆盖父元素的规则。对于CSS,总会使用最特定的规则。


#CSS添加注释
`/*CONTENT*/`

#overflow属性
visible：不裁剪溢出的内容。浏览器把溢出的内容呈现在其容器元素的显示区域以外，全部内容都可见。

hidden：隐藏溢出的内容。内容只显示在其容器元素的显示区域里，这意味着只有一部分内容可见。

scroll：类似于hidden，浏览器将对溢出的内容隐藏，但显示一个滚动条以便让用户能够滚动看到内容的其他部分。

auto：类似于scroll，但浏览器只在确实发生溢出时才显示滚动条。如果内容没有溢出，就不显示滚动条。
