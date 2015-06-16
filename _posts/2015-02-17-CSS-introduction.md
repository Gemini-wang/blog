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