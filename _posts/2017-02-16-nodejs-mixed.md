---
title: nodejs
time: 2017.02.16
layout: post
tags:
- nodejs
- 笔记
excerpt: 本文主要记录了nodejs的基本知识。
---

####URL地址解析
	url.parse('http://www.imooc.com/video/6710')
	url.format({protocol: 'http:',
	                   slashes: true,
	                   auth: null,
	                   host: 'www.imooc.com',
	                   port: null,
	                   hostname: 'www.imooc.com',
	                   hash: null,
	                   search: null,
	                   query: null,
	                   pathname: '/video/6710',
	                   path: '/video/6710',
	                   href: 'http://www.imooc.com/video/6710'})
	url.resolve('http://baidu.com','/video/6710')                //'http://baidu.com/video/6710'
####querystring
	querystring.stringify({name:'scott',from:''})                   //'name=scott&from='
	querystring.stringify({name:'scott',from:''},',',':')           //'name:scott,from:'
	querystring.parse('name=scott&from=')                     //{ name: 'scott', from: '' }
	querystring.parse('name:scott,from:',',',':')                    //{ name: 'scott', from: '' }
	querystring.escape('<哈哈>')                                        //'%3C%E5%93%88%E5%93%88%3E'
	querystring.unescape('%3C%E5%93%88%E5%93%88%3E')        //'<哈哈>'
####chrome浏览器的Timing
	Stalled：浏览器要发出请求到请求可以发出的等待时间，不包括DNS查询和建立TCP/IP连接的时间
	Proxy negotiation：代理协商的时间
	Request sent：请求的第一个字节发出到最后一个字节发出的时间，即请求时间
	Waiting(TTFB)：请求发出后到收到相应的第一个字节所花费的时间
	Content Download：收到响应的第一个字节到收完响应的最后一个字节所花费的时间，即下载时间
####HTTP 1.1协议定义的请求方法
	GET
	POST
	PUT    更新，比如像指定的资源位置上传最新内容
	DELETE     删除，请求服务器删除我们标识的某个资源
	HEAD        与GET类似，只是服务器不传回资源本文部分，好处是不需要传输全部的内容就能获取其中的元信息或元数据
	TRACE
	OPTIONS
####状态码
	1**   请求已经接收了，继续处理
	2**   请求已经成功接收并处理掉
	3**   重定向
	4**   客户端错误
	5**   服务器错误
####HTTP作用域和上下文
执行上下文就是this所指向的对象
####模块路径解析规则
	方式一：require函数支持斜杠（/）或盘符（C:）开头的绝对路径
	方式二：支持./开头的相对路径
	方式三：对于NodeJS内置模块，直接require('fs')；           
           NodeJS定义了一个特殊的node_modules目录用于存放模块，如果用require('foo/bar')方式加载模块时，会从node_modules下查找；
	       定义NODE_PATH环境变量，如NODE_PATH=/home/user/lib:/home/lib，加载
	       require('foo/bar')时从/home/user/lib/foo/bar或者/home/lib/foo/bar查找。Linux下使用:分隔，在Windows下使用;分隔。
