---
title: CSS表格
time: 2015.02.19 
layout: post
tags:
- HTML
- CSS
- 笔记
excerpt: 本文主要记录了如何使用CSS做一种类似“表格”的布局结构。
---
##给表格增加一个`div`
{% highlight html %}	
<div id="tableContainer">
        <div id="tabaleRow">
            <div id="main">
                ...
            </div>
            <div id="sidebar">
                ...
            </div>
        </div>
</div>
{% endhighlight %}

##指定`div`的样式
`bord-spacing`：给表格中的单元格增加边框间距，不会与外边距创建的空间重叠。
{% highlight css %}
	#tableContainer{
		  display:table;
		  background:red;
		  padding:20px;
		  border-spacing:10px;}    
	#tableRow{
		  display:table-row;
		  background:blue;}    
	#main{
		  display:table-cell;
		  background:yellow;
		  padding:15px;
		  width:100px;
		  height:50px;}    
	#sidebar{
		  display:table-cell;
		  background:green;
		  padding:15px;
		  width:100px;
		  height:50px;}
{% endhighlight %}

##最后得到的css表格
<img src="{{site.url}}/img/css-table.png" width="200" height="100">

