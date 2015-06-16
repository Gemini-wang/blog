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