---
title: nodejs（2）
time: 2017.02.17
layout: post
tags:
- nodejs
- 笔记
excerpt: 本文主要记录了nodejs的基本知识。
---

####node运行的特点
浏览器仅仅缓存文件，而node缓存的是编译和执行后的对象。

借鉴commonJS的规范：
	* 模块引用    var math = require('math');  //引入模块到上下文
	* 模块定义    exports对象用于导出当前模块的方法或变量。module对象代表模块自身，而exports是module的一个属性，一个文件就是一个模块。
	* 模块标识	 指传递给require方法的参数，它可以是以小驼峰命名的字符串、以.或..开头的相对路径或者绝对路径。
	
node有核心模块（自己提供的模块）和文件模块（用户编写的模块），前者加载速度比后者快。加载速度：缓存>核心模块>文件模块>自定义模块。

不要试图加载一个与核心模块标识符相同的自定义模块。

####connect自带的中间件
cookieParser()：解析HTTP cookie ，支持常规cookie、签名cookie和特殊的JSON cookie。
req.cookies默认是用常规未签名cookie组装而成的。如果你想支持session()中间件要求的签名cookie，在创建cookieParser()实例时要传入一个加密用的字符串。

JSON cookie：带有前j:，告诉Connect它是一个串行化的JSON。JSON cookie既可以是签名的，也可以是未签名的。

res.setHeader('Set-Cookie','foo=bar')：可以写入多个Set-Cookie响应头。

bodyParser()：解析请求主体，整合了其他三个更小的组件：json(), urlencoded(), 和 multipart() 。

bodyParser()组件为你提供了req.body属性，可以用来解析JSON、x-www-form-urlencoded 和multipart/form-data请求。如果是multipart/form-data请求，比如文件上传，则还有 req.files 对象。 

limit()：请求主体的限制。
在bodyParser()之前加上limit()组件，你可以指定请求主体的大长度，既可以是字节数（比如1024），也可以用下面任意一种方式表示：1gb、25mb或50kb。 

query()：查询字符串解析，它将请求发来的查询字符串解析成JSON对象，用req.query对象可以访问。如果在HTTP请求中没有查询字符串参数，比如/songSearch，req.query默认为空对象。

logger()：记录请求。带有可定制的日志格式。它还能缓冲日志输出， 减少写硬盘的次数，并且如果你想把日志输出到控制台之外的其他地方，比如文件或socket中， 还可以指定日志流。它还有3个选项stream、immediate和buffer，使用immediate，一收到请求就写日志，而不是等到响应后；使用buffer可以降低往硬盘中写日志文件的次数。

favicon()：提供favicon。可以传入.ico文件的路径，还可以传入一个maxAge参数，指明浏览器应该把favicon放在内存中缓存多长时间。

methodOverride()：伪造HTTP方法。原始的请求方法可以通过req.originalMethod访问到。

vhost()：虚拟主机。它有2个参数，第一个是主机名，vhost实例会用它进行匹配。第二个是http.Server实例，用来处理对相匹配的主机名发起的HTTP请求。

session()：会话管理。
* 中间件session()需要用签名cookie，所以你应该在它上面使用cookieParser()，并传给它一个秘钥。
* session()默认是内存数据存储，当然也可以存储到数据库中。可以通过配置参数设定session()会话有效期，并只在使用HTTPS时才发送会话cookie。
* session会话管理非常简单。其基本原理是当请求完成时，赋给req.session对象的所有 属性都会被保存下来；当相同的用户（浏览器）再次发来请求时，会加载它们。

处理Web程序安全的中间件： 
* basicAuth()：为保护数据提供了HTTP基本认证。
* csrf()：实现对跨站请求伪造（CSRF）攻击的防护。 
* errorHandler()：帮你在开发过程中进行调试。

static()：静态文件服务。
app.use(connect.static('public'));     //返回./public目录下的静态资源文件
app.use('/app/files',connect.static('public'));  //挂载，前面的/app/files不会出现在文件路径解析中。
static()中的路径是相对于当前工作目录的。如果想用绝对路径指定根目录，用变量__dirname。

compress()：压缩静态文件。
compress()组件通过请求头域Accept-Encoding自动检测客户端可接受的编码。如果请求头中没有该域，则使用相同的编码，也就是说不会对响应做处理。如果请求头的该域中包含gzip、deflate或两个都有，则响应会被压缩。
compress()默认支持的MIME类型有text/*、*/json和*/javascript，这是在默认的filter函数中定义的，也可以自己写过滤器进行过滤。

directory()：目录列表。 
directory()组件要配合static()使用，由static()提供真正的文件服务；而directory()只是提供列表。

####Express
app.configure()：方法接受一个表示环境的可选字符串，以及一个函数。当环境与传入的字符串相匹配时，回调函数会被立即调用；当只给出函数时，在所有环境中都会调用它。这些环境的名称完全是随意的。

$ set NODE_ENV=production     //设置了环境变量NODE_ENV后，可以在process.env对象中读取
app.set()
app.get()
app.enable()
app.disable()

Express中两种渲染视图的办法：在程序层面用app.render()，在请求或响应层面用res.render()。

__dirname：（前面有两个下划线）是一个全局变量，用来确定当前运行的文件所在的目录。在开发时，这个目录通常跟你的当前工作目录是同一个目录，但在生产环境中，Node可能是从另外一个目录中运行的。
