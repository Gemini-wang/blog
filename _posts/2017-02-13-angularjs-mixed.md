---
title: 杂七杂八--angularJS
time: 2017.02.13
layout: post
tags:
- angularJS
- 笔记
excerpt: 本文主要记录了angular1.x的基础知识。
---

####MVC
模型、控制器、视图

为什么需要MVC?————模块化和复用

angularJS中的MVC是借助于`$scope`作用域实现的

####$scope作用域
	$scope提供了一些工具方法$watch()/$apply()；
	$scope是一个树型结构，与DOM标签平行；
	子$scope对象会继承父$scope上的属性和方法；
	每一个Angular应用只有一个根$scope对象（一般位于ng-app上）；
	$scope可以传播事件，类似DOM事件；
	angular.element($0).scope()可以获取当前元素上的scope;
	$broadcast用来向后代controller播报事件，$emit用来向祖先controller播报事件，$on用来监听事件。
	$scope.$emit('emitEvent' , $scope.childName);   
	//第一个参数监听的事件，第二个参数$scope的属性或变量
	$scope.$broadcast('broadcastEvent' , $scope.parentName);
	$scope.$on('emitEvent' , function(e , value){      
		//value就是$emit，$broadcast传递过来的值
	    $scope.emitValue = value;
	});

####Controller
{% highlight js %}
	<div ng-controller="Controller">
	    <p>{{greeting.text}},Angular</p>
	    <button ng-click="test()">test</button>
	</div>

	function Controller($scope){
	    $scope.greeting = {
	        text:'hello'
	    };
	    $scope.test = function(){
	        alert("test");
	    };
	}
{% endhighlight %}

####Model
{% highlight js %}
	<div>
	    <input ng-model="greeting.text">         
	    <p>{{greeting.text}},Angular</p>
	</div>
	//生成的ng-model在 $rootScope根作用域下，在ng-app内部都可以调用到ng-model
{% endhighlight %}

####View


####指令directive
{% highlight js %}
	var myModule = angular.module("MyModule",[]);
	myModule.directive("hello",function(){
	    return {
	        scope: Boolean or Object:    //定义独立scope,'@''='''
	            {},
	        restrict: 'E',
	        priority: Number,        //定义指令的优先级,默认为0,ng-repeat指令则定义了优先级为1000
	        terminal: Boolean,       //优先级比该指令低的其他指令都停止执行，不过同级的指令依旧会执行
	        template: String or Template Function: 
	            '<div>Hi everyone!</div>',        //HTML字符串中的必须存在一个DOM根元素
	            function(tElement, tAttrs){...},
	        templateUrl: hello.html,
	        replace: true,           //默认为false，false时，模板将会作为子元素插入到指令的元素内部。true时，模板将会替换掉指令元素
	        transclude: Boolean,     //为true时，将视图元素嵌入到我们指定的地方进去。默认值为false。在页面上需要加上ng-transclude（指令模板的内部元素会被嵌入到页面中，并替换ng-transclude的部分）
	        controller: String or function: 
	            function(scope, element, attrs, transclude, otherInjectables) { ... },        
	        controllerAs: String,    //设置控制器的别名
	        require: 字符串或数组,    //将控制器注入到其值所指定的指令中，并作为当前指令的link函数的第四个参数
	        link: function(scope,element,attr){   //element是指令绑定的元素，attr是元素的属性
	            element.bind('mouseenter',function(){});    //绑定事件，操作DOM
	        },
	        compile:   
				// 返回一个对象或连接函数,如下所示:               
	            function(tElement, tAttrs, transclude) { 
	                 return { 
	                     pre: function(scope, iElement, iAttrs, controller) { ... }, 
	                     post: function(scope, iElement, iAttrs, controller) { ... } 
	                 } 
	                 // 或者 return function postLink(...) { ... } 
	             }
	         }
	});
{% endhighlight %}

* scope:为false时，将会直接访问父元素的作用域，此时指令中对作用域中元素的修改也会直接作用在父元素的作用域中;为true时，则会继承父元素作用域，并创建一个新的独立的作用域对象。默认值为false。将scope的值定义为一个对象，指令的作用域将会完全独立于外界（连父元素的作用域都不继承了）。
	*  '@' : 类似于将父作用域中的变量拷贝一份到指令的独立作用域中,数据是单向绑定,要通过使用{{}}来绑定数据;
	*  '=' : 在独立作用域中修改变量的值也会同步到父作用域中,数据的双向绑定，不用使用{{}};
	*  '&' : 生成一个指向父级作用域的包装函数，若需要从指令向控制器中的该函数传递参数，则必须使用json的格式的参数;
	*  scope:{flavor:'@'}       //等同于link:function(scope,element,attrs){scope.flavor=attrs.flavor;}
	*  scope:{flavor:'='}       //数据双向绑定

//将指令缓存，"run"注射器加载完所有模块时，此方法执行一次
{% highlight js %}
	myModule.run(function($templateCache){
	    $templateCache.put("hello.html","<div>Hello everyone!!!!!!</div>");
	});
	myModule.directive("hello", function($templateCache) {
	    return {
	        restrict: 'AECM',
	        template: $templateCache.get("hello.html"),
	        replace: true
	    }
	});
{% endhighlight %}

//`transclude`允许指令内部嵌套， `replace`不允许嵌套。
{% highlight js %}
	<hello><div>这里是指令内部的内容。</div></hello>
	myModule.directive("hello", function() {
	    return {
	        restrict:"AE",
	        transclude:true,
	        template:"<div>Hello everyone!<div ng-transclude></div></div>"
	    } 
	});
{% endhighlight %}

{% highlight js %}
	<div ng-controller="MyCtrl">
	     <loader howToLoad="loadData()">滑动加载</loader>
	</div>
	<div ng-controller="MyCtrl2">
	     <loader howToLoad="loadData2()">滑动加载</loader>
	</div>
	myModule.controller('MyCtrl', ['$scope', function($scope){
	    $scope.loadData=function(){
	        console.log("加载数据中...");
	    }
	}]);
	myModule.controller('MyCtrl2', ['$scope', function($scope){
	    $scope.loadData2=function(){
	        console.log("加载数据中...22222");
	    }
	}]);
	myModule.directive("loader", function() {
	    return {
	        restrict:"AE",
	        link:function(scope,element,attrs){
	            element.bind('mouseenter', function(event) {
	                //scope.loadData();
	                // scope.$apply("loadData()");
	                // 注意这里的坑，howToLoad会被转换成小写的howtoload
	                scope.$apply(attrs.howtoload);
	            });
	        }
	    } 
	});
{% endhighlight %}

参考链接：[transclude](https://segmentfault.com/a/1190000004586636),[require](http://hudeyong926.iteye.com/blog/2074238)

####注入器（$injector）
{% highlight js %}
	var greeting = $injector.get('greeting');    //调用get函数来获得任何已经被定义过的服务的实例
	greeting('Ford Prefect'); 
	var myFunction = function(greeting) {
	  greeting('Ford Prefect');
	};
	$injector.invoke(myFunction);           //invoke方法将服务注入到函数中
{% endhighlight %}

参考链接：[http://blog.csdn.net/aitangyong/article/details/39937505](http://blog.csdn.net/aitangyong/article/details/39937505)

####config&&run
	提供一种方式抽取共用类库;
	类似utility;
* constant  
app.constant('movieTitle', 'The Matrix');
定义常量,定义的值不能被改变，可以被注入到任何地方,不能被装饰器(`decorator`)装饰
  
* value     
app.value('movieTitle', 'The Matrix');
定义string,number甚至function,可以被修改，不能被注入到`config`中，但是它可以被`decorator`装饰

* service    
{% highlight js %}        
    app.service('movie', function(){
      this.title = 'The Matrix';
    });
{% endhighlight %}

* factory
{% highlight js %} 
    app.factory('movie', function(){
      return {
        title: 'The Matrix';
      }
    });
{% endhighlight %}

* provider 
上面的几乎(除了`constant`)都是`provider`的封装，`provider`必须有一个`$get`方法，当然也可以说`provider`是一个可配置的`factory`

{% highlight js %}
    var app = angular.module('app', []);
    app.provider('movie', function () {
      var version;
      return {
          setVersion: function (value) {
             version = value;
          },
          $get: function () {
             return {
               title: 'The Matrix' + ' ' + version
             }
          }
      }
    });
    app.config(function (movieProvider) {        //movieProvider就是movie
       movieProvider.setVersion('Reloaded');           
    });
    app.controller('ctrl', function (movie) {
      expect(movie.title).toEqual('The Matrix Reloaded');
    });
{% endhighlight %}

* decorator

`factory`和`service`的区别就是：`factory`是普通function，而`service`是一个构造器(`constructor`)，这样Angular在调用`service`时会用`new`关键字，而调用`factory`时只是调用普通的function，所以`factory`可以返回任何东西，而`service`可以不返回(可查阅`new`关键字的作用).
