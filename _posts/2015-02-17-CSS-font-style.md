---
title: 字体和颜色样式
time: 2015.02.17 
layout: post
tags:
- CSS
- 笔记
excerpt: 本文主要记录了增加字体和颜色样式的规则。
---

#字体系列
每个`font-family`包含一组有共同特征的字体，共有5个字体系列：`sans-serif`、`serif`、`monospace`、`cursive`、`fantasy`。

`font-family`：指定一个包含候选字体的列表，它们都来自同一个字体系列，在最后总是放一个通用的字体系列名，至少可以确保提供同一个字体系列中的通用字体。如果连通用的都没有，会使用浏览器定义 的该字体系列的默认字体。
#font-face规则
1.找到所需字体文件，并放在Web上。

存储字体的格式有`.ttf`、`.otf`、`.eot`（仅IE支持）、`.svg`（一种通用的图像格式，使用这种格式表示字符）、`.woff`（Web开放字体格式，大多数现代浏览器都支持这种格式）。

2.在CSS中增加@font-face属性。

{% highlight HTML %}
@font-face{
font-family:"Emblema";
src:url("....");
}
{% endhighlight %}

3.在CSS中使用font-family名。

#字体样式
`font-size`：px、em（相对于父元素字体的倍数）、%(相对于父元素字体的大小)、关键字（xx-small、x-small、small、medium、large、x-large、xx-large）。其中small是12px。默认body字体大小为16px。`<h1>`是默认字体大小的120%，`<h2>`是150%，`<h3>`是120%，`<h4>`是100%，`<h5>`是90%，`<h6>`是60%。

`font-weight`：lighter、normal、bold、bolder，还可以设为100-900之间的一个数（100的倍数）。

`font-style`：italic(斜体)、not italic、oblique(倾斜)、not oblique。

`text-decoration`：line-throught、underline、overline、none。

`background-color`：rgb(80%,40%,0%)，rgb(204,102,0)，#ccbboo。有16种基本颜色和130种扩展颜色。

`text-align`：center、left、right。

`vertical-align`：top、middle、bottom，元素中的所有内容相对于元素的上边对齐。

`line-height`：设置文本的行间距，em、%、数字、关键字。如果使用数字，表示元素的行高是自己字体大小的倍数。

#关于`text-align`
- 使用`text-align`后会对块元素中的所有内联内容对齐。
- `text-align`只能在块元素上设置，如果直接在内联元素（如`<img>`）上使用，则不起作用。