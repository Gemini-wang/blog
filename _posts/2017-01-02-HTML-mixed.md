---
title: 杂七杂八--HTML
time: 2017.01.02 
layout: post
tags:
- HTML
- 笔记
excerpt: 本文主要记录了几种离线存储cookie/sessionStorage/localStorage。
---

##cookie
#####每次都会携带在HTTP头中，如果使用`cookie`保存过多数据会带来性能问题.

#####设置`cookie`，过期时间`document.cookie="userId=828; userName=hulk; expiress="+date.toGMTString();`
   
#####获得`cookie`：`var test = document.cookie;`

#####指定可访问`cookie`的路径
* 默认情况下，如果在某个页面创建了一个`cookie`，那么该页面所在目录中的其他页面也可以访问该`cookie`。如果这个目录下还有子目录，则在子目录中也可以访问。例如在`www.xxxx.com/html/a.html`中所创建的`cookie`，可以被`www.xxxx.com/html/b.html`或 `www.xxx.com/html/some/c.html`所访问，但不能被`www.xxxx.com/d.html`访问。 

{% highlight js %}
    document.cookie="userId=320; path=/shop";       //就表示当前cookie仅能在shop目录下使用
    document.cookie="userId=320; path=/";              //指定为根目录，使cookie在整个网站下可用
{% endhighlight %} 

#####指定可访问`cookie`的主机名 
* 主机名是指同一个域下的不同主机，例如：`www.google.com和gmail.google.com`就是两个不同的主机名。默认情况下， 一个主机中创建的`cookie`在另一个主机下是不能被访问的，但可以通过domain参数来实现对其的控制。

{% highlight js %}
    document.cookie="name=value;domain=.google.com";      //所有google.com下的主机都可以访问该cookie
    //设置cookie
    function setCookie(name,value,expiresHours){ 
        var cookieString=name+"="+escape(value); 
        //判断是否设置过期时间 
        if(expiresHours>0){ 
            var date=new Date(); 
            date.setTime(date.getTime+expiresHours*3600*1000); 
            cookieString=cookieString+"; expires="+date.toGMTString(); 
        } 
        document.cookie=cookieString; 
    } 
    //获得cookie
    function getCookie(name){ 
        var strCookie=document.cookie; 
        var arrCookie=strCookie.split("; "); 
        for(var i=0;i<arrCookie.length;i++){ 
            var arr=arrCookie[i].split("="); 
            if(arr[0]==name)return arr[1]; 
        } 
        return ""; 
    } 
    //删除cookie，把过期时间设置为之前的一个时间
    function deleteCookie(name){ 
        var date=new Date(); 
        date.setTime(date.getTime()-10000); 
        document.cookie=name+"=v; expires="+date.toGMTString(); 
    } 
{% endhighlight %} 

##localstorage&&sessionstorage
* 仅在客户端（即浏览器）中保存，不参与和服务器的通信.
* 作用域不同，`sessionStorage`不在不同的浏览器窗口中共享，即使是同一个页面；`localStorage`在所有同源窗口中都是共享的；`cookie`也是在所有同源窗口中都是共享的。
* `localStorage`的作用域是限定在文档源（同域名、同端口、同主机名、同协议）级别的，不同的文档源之间是不能读取和修改对方的数据的，而相同的文档源是可以的。但是不同的浏览器是不共享Storage的，也就是说你在Chorme浏览器里存的数据，在Firefox里是访问不到的，即使它们是同一文档源。
* `sessionStorage`的作用域同样是限定在文档源级别的，不仅如此，它还被限制在标签页中，不同标签页的同一个页面拥有各自的`sessionStorage`，数据不能共享。如果是一个页面里有两个`<iframe>`元素，它们是共享`sessionStorage`的。

{% highlight js %}
    localStorage.setItem(key,value)      // 设置键值对
    localStorage.getItem(key)            // 通过键值读取对应的值
    localStorage.removeItem(key)         // 通过键值移除对应的值
    localStorage.clear()                 // 初始化localStorage，清除所有键值对
    localStorage.key(index)              // 通过下标index来获取指定索引的key名  
    sessionStorage.setItem('key', 'value');     // 从sessionStorage获取数据
    var data = sessionStorage.getItem('key');   // 从sessionStorage删除保存的数据
    sessionStorage.removeItem('key');           // 从sessionStorage删除所有保存的数据
    sessionStorage.clear();
{% endhighlight %} 
[https://segmentfault.com/a/1190000007811307](https://segmentfault.com/a/1190000007811307)

##session
* `Session`保存在服务器端。为了获得更高的存取速度，服务器一般把`Session`放在内存里。每个用户都会有一个独立的`Session`。如果`Session`内容过于复杂，当大量客户访问服务器时可能会导致内存溢出。因此，`Session`里的信息应该尽量精简。
* `Session`在用户第一次访问服务器的时候自动创建。需要注意只有访问`JSP`、`Servlet`等程序时才会创建Session，只访问HTML、IMAGE等静态资源并不会创建`Session`。如果尚未生成`Session`，也可以使用`request.getSession(true)`强制生成`Session`。
* `Session`生成后，只要用户继续访问，服务器就会更新`Session`的最后访问时间，并维护该`Session`。用户每访问服务器一次，无论是否读写Session，服务器都认为该用户的`Session`“活跃（active）”了一次。
* 由于会有越来越多的用户访问服务器，因此`Session`也会越来越多。为防止内存溢出，服务器会把长时间内没有活跃的`Session`从内存删除。这个时间就是`Session`的超时时间。如果超过了超时时间没访问过服务器，`Session`就自动失效了。
* 如果客户端浏览器将`Cookie`功能禁用，或者不支持`Cookie`怎么办？例如，绝大多数的手机浏览器都不支持`Cookie`。Java Web提供了另一种解决方案：URL地址重写。
* URL地址重写是对客户端不支持`Cookie`的解决方案。URL地址重写的原理是将该用户`Session`的id信息重写到URL地址中。服务器能够解析重写后的URL获取`Session`的id。这样即使客户端不支`持Cookie`，也可以使用`Session`来记录用户状态。

##同源策略
    这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议。 指一段脚本只能读取来自同一来源的窗口和文档的属性。

##xhtml与HTML之间的差异
* `XHTML` 元素必须被正确地嵌套。
* `XHTML` 元素必须被关闭。
* 标签名必须用小写字母。
* `XHTML` 文档必须拥有根元素。

##XML和JSON的区别
* 数据体积方面。
JSON相对于XML来讲，数据的体积小，传递的速度更快些。
* 数据交互方面。
JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互。
* 数据描述方面。
JSON对数据的描述性比XML较差。
* 传输速度方面。
JSON的速度要远远快于XML。

##说说你对语义化的理解？
* 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
* 有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
* 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
* 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

##iframe的优缺点
* `<iframe>`优点：
    *  解决加载缓慢的第三方内容如图标和广告等的加载问题
    *  Security sandbox
    *  并行加载脚本
* `<iframe>`的缺点：
    *  iframe会阻塞主页面的Onload事件；
    *  即时内容为空，加载也需要时间
    *  没有语意 

##请说出三种减少页面加载时间的方法
* 优化图片 
* 图像格式的选择（GIF：提供的颜色较少，可用在一些对颜色要求不高的地方） 
* 优化CSS（压缩合并css，如`margin-top`,`margin-left`...) 
* 网址后加斜杠（如`www.campr.com/`目录，会判断这个“目录是什么文件类型，或者是目录。） 
* 标明高度和宽度
* 减少http请求（合并文件，合并图片）

##CSS3新特性
* CSS3实现圆角（border-radius），阴影（box-shadow），
* 对文字加特效（text-shadow、），线性渐变（gradient），旋转（transform）
* transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转,缩放,定位,倾斜
* 增加了更多的CSS选择器  多背景 rgba 
* 在CSS3中唯一引入的伪元素是::selection.
* 媒体查询，多栏布局
* border-image

{% highlight HTML %}
    transition: 1s 1s height ease;
    animation：
        @keyframes pound {
            from { transform: none; }
            to { transform: scale(1.2); }
         }
         .heart {
                animation: pound .3s infinite;
         }
{% endhighlight %}

##html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
* 拖拽释放(Drag and drop) API 
* 语义化更好的内容标签（header,nav,footer,aside,article,section）
* 音频、视频API(audio,video)
* 画布(Canvas) API
* 地理(Geolocation) API
* 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；sessionStorage 的数据在浏览器关闭后自动删除

* 表单控件，calendar、date、time、email、url、search  
* 新的技术webworker, websocket, Geolocation

移除的元素

* 纯表现的元素：basefont，big，center，font, s，strike，tt，u；

* 对可用性产生负面影响的元素：frame，frameset，noframes；

如何区分： DOCTYPE声明\新增的结构元素\功能元素
