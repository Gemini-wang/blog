---
title: 杂七杂八--CSS
time: 2017.01.03 
layout: post
tags:
- CSS
- 笔记
excerpt: 本文主要记录了清浮动的方法和原理。
---

##引入CSS的3种方法：
1.页面被加载的时，CSS会同时被加载。
`<link rel="stylesheet" type="text/css" href="/statics/build/css/common.min.css">`

2.先引入HMTL，再引入CSS。如果HTML文件比较大的时候，再引入CSS可能出现闪烁。
link方式的样式的权重 高于`@import`的权重。
{% highlight HTML %}
    <style type="text/css">
        @import url("fineprint.css");
    </style> 
{% endhighlight %}

3.页面写样式。
`<Table style="font-size:10pt;color:blue;">`

##浮动float
`position:absolute`和`float`属性的异同：都可以让元素脱离文档流，并且可以设置其宽高。但`float`会占位，`absolute`不会。

##定位
    static           默认值。没有定位，元素出现在正常的流中。
    relative         相对定位，相对于其在普通流中的位置进行定位。
    absolute         绝对定位，相对于最近一级的定位不是 static 的父元素来进行定位。
    fixed（老IE不支持）    固定定位，相对于浏览器窗口进行定位。 
    
    relative    无论是否进行移动，元素仍然占据原来的空间。 
    absolute    使元素不占据空间。

##清除浮动
* 父级`div`加入`overflow:hidden`
* `clear:both`清除浮动；

{% highlight HTML %}
    <div class="divcss5"> 
        <div class="divcss5-left">left浮动</div> 
        <div class="divcss5-right">right浮动</div> 
        <div class="clear"></div> 
    </div> 
{% endhighlight %}
通用的清浮动的方法：
{% highlight HTML %}
    .clearfix{
       *zoom:1;
    }
    .clearfix:after{
       content:"";
       display:table;
       clear:both;
    }
{% endhighlight %}

##BFC
BFC，块级格式化上下文，一个创建了新的BFC的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。
    
    形成BFC的条件：
    float： left|right
    overflow：hidden|auto|scroll
    display：table-cell|table-caption|inline-block
    position： absolute|fixed
    
* BFC会阻止垂直外边距折叠。不让它们在同一个BFC。
* BFC可以包含浮动。就是清除浮动的第一种方法，父级元素加`overflow:hidden`。
* BFC不会重叠浮动元素。就是避免文字被浮动元素挡住。给文字加`overflow:hidden`创建新BFC。

##盒模型box-sizing
    content-box：让元素维持W3C的标准盒模型。设置width/height属性指的是content部分的宽/高。
    border-box：让元素维持IE传统盒模型（IE6以下版本和IE6~7的怪异模式）。设置width/height属性指的是border + padding + content。

##css选择器
    1.id选择器（ # myid）
    2.类选择器（.myclassname）
    3.标签选择器（div, h1, p）
    4.相邻选择器（h1 + p）
    5.子选择器（ul > li）
    6.后代选择器（li a）
    7.通配符选择器（ * ）
    8.属性选择器（a[rel = "external"]）
    9.伪类选择器（a: hover, li:nth-child）
    可继承的样式： font-size font-family color, text-indent;
    不可继承的样式：border padding margin width height ;
    优先级：!important > id > class > tag
    p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
    p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
    p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
    p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
    p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
    :enabled  :disabled 控制表单控件的禁用状态。
    :checked        单选框或复选框被选中。
