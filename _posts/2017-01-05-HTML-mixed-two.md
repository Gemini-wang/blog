---
title: 杂七杂八--HTML(2)
time: 2017.01.05
layout: post
tags:
- HTML
- 笔记
excerpt: 本文主要记录了清浮动的方法和原理。
---

##浏览器解析
* 先下载HTML，然后解析HTML，遇到link引入CSS会去下载CSS，但不会停止解析HTML。
* `render tree` 必须等到 css 解析完毕才会构建。
* js的下载也不会阻塞 html 的解析. 并且:如果js下载结束但是 html 还没有解析完毕的话, 那么js会先执行。
* css文件的加载会阻塞 后面的 js 的执行究其原因, 是因为 后面的js不知道前面正在加载的资源是 js还是 css, 并且js是顺序执行的, 所以它需要等待前面的资源加载完毕。

先HTML解析成DOM树，CSS是并行加载并解析成CSS树，CSS的加载会阻塞JS的执行，JS是串行加载并解析，JS的加载和运行会阻塞HTML的加载和解析。`defer`主要用在IE中，`async`值不管是多少，都可以使JS异步运行，不影响HTML的解析，但`async`有兼容问题并不是所有浏览器都生效。`window.onload`方法也可以使JS在DOM解析完成后再执行。

* 浏览器解析：
    *  HTML/XHTML/SVG解析成`DOM Tree`；
    *  CSS解析成`CSS Rule Tree`；
    *  JS操作`DOM Tree`和`CSS Rule Tree`；
* 解析完成后，浏览器引擎会通过`DOM Tree` 和 `CSS Rule Tree` 来构造 `Rendering Tree`：
    *  `Rendering Tree`不包括`Header`或`display:none`的东西；
    *  把`CSS Rule`附加上`Rendering Tree`上的每个`Element`。也就是`DOM`结点或`Frame`；
    *  计算每个`Frame`的位置，也叫`layout`和`reflow`；
* 最后通过调用操作系统`Native GUI`的API绘制

在渲染的过程中，有`Reflow`和`Repaint`：

* `Repaint`——屏幕的一部分要重画，比如某个CSS的背景色变了。但是元素的几何尺寸没有变。
* `Reflow/Layout`——意味着元件的几何尺寸变了，我们需要重新验证并计算`Render Tree`。
减少reflow/repaint:
* 不要一条一条地修改DOM的样式。先定义好css的class，然后修改DOM的`className`。
* 把DOM离线后修改。
* 不要把DOM结点的属性值放在一个循环里当成循环里的变量。
* 尽可能的修改层级比较低的DOM。
* 为动画的HTML元件使用`fixed`或`absoult`的`position`，那么修改他们的CSS是不会`reflow`的。
* 千万不要使用`table`布局。

##跨域
#####JSONP
{% highlight js %}
	<script>
	    function getWeather(data) {
	        console.log(data);
	    }
	</script><script src="http://x.y.com/xx.js">   
	//http://x.y.com/xx.js的文件内容getWeather({"城市":"北京","天气":"大雾"});
	function getBooks(){
	    var script=document.createElement('script');
	    script.setAttribute('type','text/javascript');
	    script.setAttribute('src','http://test.com/bookservice.php?callback=displayBooks');
	    document.body.appendChild(script);
	}
	getBooks();
{% endhighlight %}
如果是jQuery可以这么解决：
{% highlight js %}
	function getBooks(){
	    $.ajax({
	        type:'get',
	        url:'http://test.com/bookservice.php',
	        dataType:'jsonp',
	        jsonp:'callback',
	        jsonpCallback:'displayBooks'
	    });
	}
	//如果想用别的回调函数名，可以加一个参数jsonp，比如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器或者用getJSON，它可以自动判断是否跨域
	<script type="text/javascript">
	    $.getJSON('http://example.com/data.php?callback=?,function(jsondata)'){
	        //处理获得的json数据
	    });
	</script>
	jsonp数据：
	callback({
	    "message":"获取成功",
	    "state":"1",
	    "result":{"name":"工作组1","id":1,"description":"11"}
	})
{% endhighlight %}

#####document.domain
	使用条件：
	1.有其他页面 window 对象的引用。
	2.二级域名相同。
	3.协议相同。
	4.端口相同。
`x.one.example.com`和`y.one.example.com`可以将`document.domain`设置为`one.example.com`，也可以设置为`example.com`。
常用于控制`<iframe>`。

#####window.name
	如果在一个标签里面跳转网页的话，我们的window.name是不会改变的。
	这种方法与document.domain方法相比，放宽了域名后缀要相同的限制，可以从任意页面获取string类型的数据。
	我的页面(http://one.example.com/index.html)中内嵌了一个<iframe>：
	<iframe id="iframe" src="http://omg.com/iframe.html"></iframe>
	在iframe.html中设置好了window.name为我们要传递的字符串。
我们在`index.html`中写了下面的代码：
{% highlight js %}
	var iframe = document.getElementById('iframe');
	var data = '';
	iframe.onload = function() {
	    iframe.onload = function(){
	        data = iframe.contentWindow.name;
	    }
	    iframe.src = 'about:blank';
	};
{% endhighlight %}

#####[HTML5] postMessage
`postMessage(data,origin)`：data是要传递的数据，JavaScript的任意基本类型或可复制的对象，传的时候最好序列化一下；origin是字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，设为"*"可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

{% highlight js %}
	//http://test.com/index.html：
	<div style="width:200px; float:left; margin-right:200px;border:solid 1px #333;">
	    <div id="color">Frame Color</div>
	</div>
	<div>
	     <iframe id="child" src="http://lsLib.com/lsLib.html"></iframe>
	</div>

	window.onload=function(){
	     window.frames[0].postMessage('getcolor','http://lslib.com');
	}

	//http://lslib.com/lslib.html：
	window.addEventListener('message',function(e){
	     if(e.source!=window.parent) return;
	     console.log(e.data);
	     var color=container.style.backgroundColor;
	     window.parent.postMessage(color,'*');
	},false);
{% endhighlight %}

#####跨域资源共享（CORS）
服务器端对于CORS的支持，主要就是通过设置`Access-Control-Allow-Origin`来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

{% highlight js %}
	<script type="text/javascript">
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://segmentfault.com/u/trigkit4/",true);
	    xhr.send();
	</script>
{% endhighlight %}

##AJAX过程
	(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象.
	(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
	(3)设置响应HTTP请求状态变化的函数.
	(4)发送HTTP请求.
	(5)获取异步调用返回的数据.
	(6)使用JavaScript和DOM实现局部刷新.
{% highlight js %}
	var xhr =createXHR();
	xhr.onreadystatechange = function () {
	    if (xhr.readyState == 4 && xhr.status == 200) {
	        setContainer('Original Ajax: ' + xhr.responseText);
	    }
	}
	xhr.open('get', 'ajax.aspx?action=getTime', true);
	xhr.send();
{% endhighlight %}

##GET和POST的区别
	GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符
	POST：一般用于修改服务器上的资源，对所发送的信息没有限制。
	GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值，
	也就是说Get是通过地址栏来传值，而Post是通过提交表单来传值。

在以下情况中，请使用 POST 请求：

* 无法使用缓存文件（更新服务器上的文件或数据库）。
* 向服务器发送大量数据（POST没有数据量限制）。
* 发送包含未知字符的用户输入时，POST比GET更稳定也更可靠。

##异步加载和延迟加载
	1.异步加载的方案： 动态插入script标签
	2.通过ajax去获取js代码，然后通过eval执行
	3.script标签上添加defer或者async属性
	4.创建并插入iframe，让它异步执行js
	5.延迟加载：有些js代码并不是页面初始化的时候就立刻需要的，而稍后的某些情况才需要的。
js的阻塞：所有浏览器在下载JS的时候，会阻止一切其他活动，直到JS下载、解析、执行完毕后才开始继续并行下载其他资源并呈现内容。
Javascript无阻塞加载具体方式：

* 将脚本放在底部。`<link>`还是放在`head`中，用以保证在js加载前，能加载出正常显示的页面。`<script>`标签放在`</body>`前。
* 成组脚本：由于每个`<script>`标签下载时阻塞页面解析过程，所以限制页面的`<script>`总数也可以改善性能。适用于内联脚本和外部脚本。
* 非阻塞脚本：等页面完成加载后，再加载js代码。也就是，在`window.onload`事件发出后开始下载代码。
{% highlight js %}
	<script>
		var script=document.createElement("script");
		script.type="text/javascript";
		script.src="file.js";
		document.getElementsByTagName("head")[0].appendChild(script);
	</script> 
{% endhighlight %}

##性能优化  
* 尽量减少HTTP请求次数。合并js、合并css、图片sprite。
* 延迟加载内容。图片懒加载、数据懒加载(点击查看更多)、功能懒加载。
* 使用离线缓存。把常用的变动又少的js、css、图片存储到`localstorage`，第二次访问的时候直接走本地缓存。在移动端使用广泛。
* CSS、JS放置正确位置。把css放在head中，把js放到body里最后位置，防止加载js阻塞页面。
* 静态资源压缩。图片、CSS、JS在发布前要压缩。
* 静态资源使用多个域名。对于图片、CSS、JS，可使用几个域名，可以并发加载。
* 静态资源使用cdn存储。
* 预加载。在某个功能还没展现时，在空闲时间预先加载相关图片或者js代码。
* DOM操作优化。
* 优化算法。在js处理中优化查找、排序算法。尽量少使用嵌套循环。

##一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
* 当发送一个URL请求时，浏览器都会开启一个线程来处理这个请求，同时在远程DNS服务器上启动一个DNS查询。这能使浏览器获得请求对应的IP地址。
* 浏览器与远程Web服务器通过TCP三次握手协商来建立一个TCP/IP连接。
* 一旦TCP/IP连接建立，浏览器会通过该连接向远程服务器发送HTTP的GET请求。远程服务器找到资源并使用HTTP响应返回该资源。
* Web服务器提供资源服务，客户端开始下载资源。
* 浏览器会解析HTML生成`DOM Tree`，其次会根据CSS生成`CSS Rule Tree`，而javascript又可以根据DOM API操作DOM。

##事件
Opera、Firefox、Chrome、Safari都支持DOM事件流（先捕获，然后实际目标接收，最后冒泡），IE不支持事件流，只支持事件冒泡。

* `addEventListener/removeEventListener`：接收3个参数，事件类型（`click`,`load`），事件处理方法，布尔值（如果是true表示在捕获阶段调用事件处理程序，如果是false，则是在事件冒泡阶段处理）。
* `attachEvent/detachEvent`（IE中）：接收2个参数，事件处理函数名称（`onclick`,`onload`），事件处理方法。
* 事件处理程序的作用域不相同，`addEventListener`的作用域是元素本身，this是指的触发元素，而`attachEvent`事件处理程序会在全局变量内运行，this是`window`。

DOM中的事件对象`event：preventDefault()`取消事件默认行为，`stopPropagation()`取消事件进一步捕获或冒泡，`target`事件的目标元素。但是在IE中，`event`对象作为window对象的一个属性存在，想要得到`event`对象需要自己写`window.event`（用`attachEvent`，可以直接获得`event`)，而且`event`对象的属性也没有非IE的那么多。
在事件处理程序内部，this始终等同于`currentTarget`，而`target`是事件的实际目标。

##事件委托
利用事件触发后判断事件源是不是符合选择器参数来决定是否执行事件处理程序。

	.on( events [,selector ] [,data ], handler(eventObject) )
	events：事件类型，如'click'
	selector：一个选择器字符串，用于过滤出被选中的元素中能触发事件的后代元素。
	data：在handler的event对象中读到，event.data
	handler：处理事件的函数
	.off( events [, selector ] [, handler ] )
