---
title: Ajax
time: 2015.06.02 
layout: post
tags:
- JS
- Ajax
- JSON
- 笔记
excerpt: 本文主要记录了Ajax工作流程，跨域问题，以及JSON数据。
---

>Ajax(或XHR)：异步JS和XML，使用XMLHttpRequest获取数据的模式。无需动态刷新即可获得页面。

- Javascript：处理与用户及其他浏览器相关事件的交互，解释来自服务器的数据，并将其呈现在页面上。
- XMLHttpRequest：这个请求对象可以在不中断其他浏览器任务的情况下向服务器发送请求。
- 文本文件：服务器会发回XML、HTML或JSON格式的文件。

#XMLHttpRequest请求对象
由Javascript做一个请求：
{% highlight js %}

window.onload=function(){
	var url="http://someserver.com/data.json";        //告诉浏览器去哪找数据
	var request=new XMLHttpRequest;                   //创建一个请求对象
	request.onload=function(){                        //接到完整响应后调用函数
		if(request.status==200){                      //检查Http响应码是否为“200”
			updataSales(request.responseText);         //从HTTP GET获得的数据可以在request对象的responseText属性找到，但是是JSON数据                 
		}			
	};
	request.open("GET",url);                              //open方法:用url建立请求
	request.send(null);                                   //send方法：告诉请求对象获取数据
}
function updataSales(responseText){                                   //处理发回的数据
	var saleDiv=document.getElementById("sales");
	var sales=JSON.parse("responseText");							  //将JSON串转换为Javascript对象	
	for(i=0;i<sales.length;i++){
		var sale=sales[i];
		var div=document.createElement("div")；
		div.setAttribute("class","salesItem");
		div.innerHTML=sale.name+"sold"+sale.sales+"gumballs";
		salesDiv.appendChild(div);									  //将<div>插入<div id="sales">中
	}
}

{% endhighlight %}

open()方法：接受3个参数，发送请求的类型（GET、POST）、请求的URL、表示是否发送异步请求的布尔值。调用open()方法并不会真正发送请求，只是启动一个请求以备发送，而且只能向同一个域中使用相同端口和协议的URL发送请求。`xhr.open("GET","example.php",false)`

send()方法：接受一个参数，即要作为请求主体发送的数据。如果不通过请求主体发送数据，则必须传入null。

XHR对象的readyState属性：表示请求响应过程的当前阶段，这个属性可以取5个值，我们可以通过检测它的属性值判断当前进行到哪个阶段。每一次readyState属性改变时，都会触发一次readystatechange事件。

0：未初始化。尚未调用open()方法。

1：启动。已经调用opne(),未调用send()。

2：发送。已经调用send(),但尚未接收到响应。

3：接收。已经接收到部分响应数据。

4：完成。已经接收到全部响应数据，而且可以在客户端使用。

{% highlight js %}
var xhr=createXHR();
xhr.onreadystatechange=function(){
	if(xhr.readyState == 4){
		if((xhr.status>=200&&xhr.status<300) || xhr.status == 304){
			alert(xhr.responseText);
		}else{
			alert("Request was unsuccessful:"+xhr.status);
			}
	}
};
xhr.open("GET","example.php",true);
xhr.send(null);
{% endhighlight %}

#JSON
###JSON对象
JSON对象没有变量的概念，属性需要加引号，也没有末尾的分号。
{% highlight json %}
{
	"name":"Tim",
	"age":29
}
{% endhighlight %}
###JSON数据转换
JSON.stringify:把JavaScript对象转化为JSON字符串。

JSON.parse:把JSON字符串解析为原生的Javascript值。

并不是所有的JavaScript对象都能转化为JSON字符串，比如方法就不能，但所有的基本类型都能转换，比如数字、字符串、数组。

>浏览器对XMLHttpRequest HTTP请求有安全限制，如果从某个域提供页面本身，安全策略要求不能从另一个域获取数据。
>JSONP(JSON with padding)能帮助解决跨域问题。JSONP使用动态的`<script>`标记获取JSON对象，由另一个域提供的Javascript文件可以调用浏览器的函数。

#AJAX跨域问题
JSONP:浏览器遇到`<script>`标记，向src url发送请求；服务器在返回JSON串之前，用callback参数把它包装在一个函数中；在解析JSON响应时，会调用函数，并把JSON串创建的对象传入函数中。JSONP请求类似`http://gumball.widke.com?callback=updateSales`
{% highlight js %}
window.onload=function(){
	setInterval(handleRefresh,3000);           //页面加载后，每隔3S调用函数
}
function handleRefresh(){
	var url="http://gumball.widke.com"+"?callback=updateSales"+"&lastreporttime="+lastReportTime+"&random"+(new Date()).getTime();
	var newScriptElement=document.createElement("script");							//创建动态的script元素
	newScriptElement.setAttribute("src","url");
	newScriptElement.setAttribute("id","jsonp");
	var oldScriptElement=document.getElementById("jsonp");
	var head=document.getElementByTagName("head")[0];
	if(oldScriptElement==null){
		head.appendChild(newScriptElement);                                     
	}else{
		head.replaceChild(newScriptElement,oldScriptElement);              //如果页面中有script元素，用新的script元素将它替换
	}
}
{% endhighlight %}

如果只是替换URL而不替换script元素,浏览器不会把它看作一个新的script元素,也不会发出请求来获取JSONP。

如果反复地获取同一个URL，浏览器为了提高效率会把它缓存起来。

`lastReportTime`参数：最后一个报告的时间。

`&random`：增加一个随机数，诱使浏览器认为是一个新的URL。

(new Date()).getTime()：使用Date对象的getTime方法得到时间。
