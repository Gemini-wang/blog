---
title: HTML
time: 2015.02.16 
layout: post
tags:
- HTML
- 笔记
excerpt: 本文主要记录了HTML常用的元素及其属性。
---
#web页面

将用HTML（HyperText Markup Language）创建的文件放在Web服务器上，当单击一个链接来访问页面时，浏览器向Web服务器请求一个HTML页面，Web服务器查找资源并将找到的资源发回给浏览器，浏览器窗口显示获取的页面。


#HTML元素和属性

`<style>`：给页面增加样式，总是要放在`<head>`元素里，常与`type`属性一起使用，告诉浏览器使用什么类型的样式，如`<style type="text/css"></style>`。


`<em>`：表示强调，内联元素。

`<strong>`：和`<em>`一样表示强调，但它强调的程度更强一些。

`<q>`：表示短引用，内联元素。在引用周围不需要加双引号（有些浏览器会负责加上引号）。

`<blockquote>`：表示较长的引用，块元素。插入`<blockquote>`元素前需要先结束段落，插入完后需要增加一个`<p>`标记，使段落在`<blockquote>`之后开始下一段落，但`<blockquote>`元素不能让引文内容分行显示。

`<br>`：换行，void元素。如`Passing Cars,<br>`。

`<ul><ol>`:`<ul>`有序列表，`<ol>`无序列表。不能把其它文本或者元素放在里，它们只能包含`<li>`元素，但可以把`<ul><ol>`作为`<li>`的内容嵌套。

#`<a>`
`<a>`：用来创建HTML链接，内联元素。常与`href`属性一起使用，可以指向WEB页面、PDF文档等各种资源。如`<a href="index.html">Home</a>`。建立图像链接需要把`<img>`放在`<a>`标记之间,建立段落链接需要`<p>`把放在`<a>`标记之间。与	`title`属性一起使用，提供链接的文本描述。与`target`属性一起使用，告诉浏览器使用一个不同的窗口，如`<a target="_blank"></a>`使用一个新窗口。注意`href`指向相同文件夹的页面,可以使用`..`向上移至父文件夹。

`a:link`：未访问状态。

`a:visited`：已访问。

`a:hover`：悬停在链接上。

`a:focus`：焦点状态，按下Tab键访问到页面上的某个链接时。

`a:active`：用户第一次单击链接时。


#HTML特殊字符

<a href="http://www.cnblogs.com/knowledgesea/archive/2013/07/24/3210703.html">HTML特殊符号对照表</a>

`&lt;`：<，小于号或显示标记。

`&gt;`：>，大于号或显示标记。

`&amp;`：&，可用于显示其它特殊字符。

`&quot;`：“，引号。

`&reg;`：®，已注册。

`&copy;`：©，版权。

`&trade;`：™	，商标。

`&ensp;`：半个空白位。

`&emsp;`：一个空白位。

`&nbsp;`：不断行的空白。

#HTML添加注释

`<!--CONTENT-->`注释内容可以写很多行，会被浏览器完全忽略。
