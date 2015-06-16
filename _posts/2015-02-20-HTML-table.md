---
title: HTML表格与列表
time: 2015.02.20 
layout: post
tags:
- HTML
- CSS
- 笔记
excerpt: 本文主要记录了如何用HTML制作表格。
---

#HTML表格
`caption-side:top;`：改变表格标题的位置。

`border-collapse:collapse;`：消除边框间距border-spacing。

`tr:nth-child(){..}`：伪类选择器。

`rowspan`：指定单元格占几行。需要删除同一列中，这个单元格占据的其他行的表格元素。

`colspan`：指定单元格占几列。需要删除同一行中，这个单元格占据的其他列的表格元素。

{% highlight html %}
<table>
	   <caption>       
		  表格标题
	   </caption>
	   <tr>
	      <th>JPEG</th>
		  <th>PNG</th>
		  <th>GIF</th>
	   </tr>
	   <tr>
	      <td>...</td>
		  <td>...</td>
		  <td>...</td>
	   </tr>
	   <tr>
	      <td rowspan="2">...</td>
		  <td>...</td>
		  <td>...</td>
	   </tr>  
	   <tr>
	      
		  <td>...</td>
		  <td>...</td>
	   </tr>
	   <tr>
	      <td>...</td>
		  <td>...</td>
		  <td>...</td>
	   </tr> 
</table>
{% endhighlight %}


<table>
	   <caption>       
		  表格标题
	   </caption>
	   <tr>
	      <th>JPEG</th>
		  <th>PNG</th>
		  <th>GIF</th>
	   </tr>
	   <tr>
	      <td>...</td>
		  <td>...</td>
		  <td>...</td>
	   </tr>
	   <tr>
	      <td rowspan="2">...</td>
		  <td>...</td>
		  <td>...</td>
	   </tr>  
	   <tr>
	      
		  <td>...</td>
		  <td>...</td>
	   </tr>
	   <tr>
	      <td>...</td>
		  <td>...</td>
		  <td>...</td>
	   </tr> 
</table>

#列表
`list-style-type`：设置列表的项目符号，disc、circle、suqare、none。

`list-style-image`：项目符号的图像。