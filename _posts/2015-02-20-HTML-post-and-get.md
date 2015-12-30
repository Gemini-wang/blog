---
title: HTML表单
time: 2015.02.20 
layout: post
tags:
- HTML
- CSS
- 笔记
excerpt: 本文主要记录了如何用HTML制作表单。
---
#表单
{% highlight html %}
<form action="http://dkc.com/contest.php" method="POST">
		<input type=".." name="...">
</form>
{% endhighlight %}

`action`：提供服务器脚本。

`method`：表单数据发送到服务器的方式。

`input`：内联元素。

`name`：服务器脚本处理时会使得这个表单元素名。

`<label>`：使用`<label>`前，要给相应的表单元素添加与for属性同名的id,`<label for="hot">hot</label>`

- 文本输入`<input type="text" name="fullname">`，添加`maxlength="100"`限制最多输入字符。
- 提交输入`<input type="submit">`，添加`value`可改变按钮上的名字。
- 单选框`<input type="radio" name="hotornot" value="hot">`
- 复选框`<input type="checkbox" name="hotornot" value="hot">`，增加`checked `指定选项默认选中。
- 多行文本框`<textarea name="comments" rows="10" cols="48"></textarea>`，`rows`文本框的高度，`cols`宽度。在HTML中不能限制输入多少文本。
- 菜单，增加`multiple`把单选菜单变成一个多选菜单。	
	{% highlight html %}		
<select name="characters" multiple>
     <option value="john">john pad</option>
     <option value="john">john pad</option>
</select>
{% endhighlight %}
- 数字输入`<input type="number" min="0" max="20">`
- 范围输入`<input type="range" min="0" max="20" step="4">`
- 颜色输入`<input type="color">`
- 日期输入`<input type="date">`
- Email输入`<input type="email">`
- url输入`<input type="url">`
- tel输入`<input type="tel">`
- `<fieldset>`
{% highlight html %}
<fieldset>
          <legend>单选框</legend>
          <input type="radio" name="hotornot" value="hot"></br>
          <input type="radio" name="hotornot" value="hot"> </br> 
</fieldset>
{% endhighlight %}
- 给输入的文本加掩码`<input type="password">`
- 文件输入`<input type="file" name="doc">`
- `placeholder属性`:给填写表单的人提示希望输入的内容。
- `required属性`：布尔属性，可用于任何表单控件，指示一个域是必须输入的。


#POST & GET

POST会打包表单变量,在后台将所有的表单数据会作为请求的一部分发送到服务器，对用户不可见。

GET也打包表单变量,但会把这些数据追加到URL的最后，然后向服务器发送一个请求，用户可以看到表单数据，在这个URL中可以看到每个表单元素名和相应的值。

如果希望用户能够对提交表单后的结果页面加书签，就必须使用GET。如果使用了`<textarea>`，就要使用POST,因为可能会送大量数据。

<table>
   <tr>
      <th>POST</th>
	  <th>GET</th>
   </tr>
   <tr>
      <td>把参数数据队列加到提交表单的ACTION属性所指的URL中，值和表单内各个字段一一对应，在URL中可以看到</td>
	  <td>通过HTTP POST机制，将表单内各个字段与其内容放置在HTML HEADER内一起传送到ACTION属性所指的URL地址。用户看不到这个 过程</td>
   </tr>
   <tr>
      <td>服务器端用Request.QueryString获取变量的值</td>
	  <td>服务器端用Request.Form获取变量的值</td>
   </tr>
   <tr>
      <td>传送的数据量较小，不能大于2KB</td>
	  <td>传送胡数据量较大，一般被默认为不受限制。但理论上，因服务器不同而异</td>
   </tr>
   <tr>
      <td>安全性非常低</td>
	  <td>安全性较高</td>
   </tr>
   <tr>
       <td>form method="get" action="a.asp?b=b"跟form method="get" action="a.asp"是一样的，即method为get时action页面后边带的参数列表会被忽视</td>
	  <td>form method="get" action="a.asp?b=b"跟form method="get" action="a.asp"是不一样的</td>
   </tr>
   <tr>
      <td>它会将数据添加到URL中，通过这种方式传递到服务器，通常利用一个问号？代表URL地址的结尾与数据参数的开端，后面的参数每一个数据参数以“名称=值”的形式出现，参数与参数之间利用一个连接符&来区分</td>
	  <td>数据是放在HTTP主体中的，其组织方式不只一种，有&，也有分隔符方式，可隐藏参数，传递大批数据，比较方便</td>
   </tr>   
</table>
