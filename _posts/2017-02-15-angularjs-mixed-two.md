---
title: 杂七杂八--angularJS（2）
time: 2017.02.15
layout: post
tags:
- angularJS
- 笔记
excerpt: 本文主要记录了angular1.x的双向绑定原理、延迟对象、路由、模板缓存等内容。
---

####ng-if 跟 ng-show/hide 的区别有哪些？
1.第一点区别是，`ng-if`在后面表达式为true的时候才创建这个dom节点，`ng-show`是初始时就创建了，用`display:block`和`display:none`来控制显示和不显示。

2.第二点区别是，`ng-if`会（隐式地）产生新作用域，`ng-switch`、`ng-include`等会动态创建一块界面的也是如此。
{% highlight js %}
	<p>{{name}}</p>
	<div ng-if="true">
	  <input type="text" ng-model="name">
	</div>
{% endhighlight %}

会出现`ng-if`外面的name是可以继承到的，但是改变input框的name值却不会影响外面。最好用`data.name`绑定。

####ng-repeat迭代数组的时候，如果数组中有相同值，会有什么问题，如何解决？
会提示 Duplicates in a repeater are not allowed.

user in users track by $index

####ng-click 中写的表达式，能使用 JS 原生对象上的方法吗？
不止是 `ng-click` 中的表达式，只要是在页面中，都不能直接调用原生的 JS 方法，因为这些并不存在于与页面对应的 Controller 的 `$scope` 中。
{% highlight js %}
	<p>{{parseInt(55.66)}}<p>
	$scope.parseInt = function(x){
	    return parseInt(x);
	}
{% endhighlight %}

####过滤器
* 自定义过滤器：
{% highlight js %}
	app.filter('cn',function(){
	   return function (value, opt) {   //value就是row.status，opt是vmStatus，opt参数可以有很多个
	      var cnData = {
	        	    };
	           return cnData[opt][value];
	   }
	});
	{{row.status|cn:'vmStatus'}}
{% endhighlight %}
* 内置过滤器：ng 内置的 filter 有九种：
  *  date（日期）
  *  currency（货币）
  *  limitTo（限制数组或字符串长度）
  *  orderBy（排序）
  *  lowercase（小写）
  *  uppercase（大写）
  *  number（格式化数字，加上千位分隔符，并接收参数限定小数点位数）
  *  filter（处理一个数组，过滤出含有某个子串的元素）
  *  json（格式化 json 对象
 
`filter` 有两种使用方法，

* 一种是直接在页面里：
	<p>{{now | date : 'yyyy-MM-dd'}}</p>
* 另一种是在 js 里面用：
	// $filter('过滤器名称')(需要过滤的对象, 参数1, 参数2,...)
	$filter('date')(now, 'yyyy-MM-dd hh:mm:ss');

####factory、service 和 provider 是什么关系？
#####Factory 
就是创建一个对象，为它添加属性，然后把这个对象返回出来。
{% highlight js %}
	app.controller('myFactoryCtrl', function ($scope, myFactory) {
	  $scope.artist = myFactory.getArtist()
	})
	app.factory('myFactory', function () {
	  var _artist = '';
	  var service = {}
	  service.getArtist = function () {
	    return _artist
	  }
	  return service;
	})
{% endhighlight %}


#####Service 
Service是用"new"关键字实例化的。因此，你应该给"this"添加属性，然后 `service` 返回"this"。
{% highlight js %}
	app.controller('myServiceCtrl', function ($scope, myService) {
	  $scope.artist = myService.getArtist();
	});
	app.service('myService', function () {
	  var _artist = '';
	  this.getArtist = function () {
	    return _artist;
	  }
	});
{% endhighlight %}

#####Providers 
Providers是唯一一种你可以传进 `.config()` 函数的 service。当你想要在 service 对象启用之前，先进行模块范围的配置，那就应该用 `provider`。
{% highlight js %}
	app.controller('myProviderCtrl', function ($scope, myProvider) {
	  $scope.artist = myProvider.getArtist();
	  $scope.data.thingFromConfig = myProvider.thingOnConfig;
	});
	app.provider('myProvider', function () {
	  this._artist = '';
	  this.thingFromConfig = '';
	  this.$get = function () {
	    var that = this;
	    return {
	      getArtist: function () {
	        return that._artist;
	      },
	      thingonConfig: that.thingFromConfig
	    }
	  }
	});
	app.config(function (myProviderProvider) {
	  myProviderProvider.thingFromConfig = 'This was set in config()';
	});
{% endhighlight %}

####angular 的数据绑定采用什么机制？详述原理
* `{{value}}`：页面没有加载完毕 `{{val}}` 会直接显示到页面，直到 angular 渲染该绑定数据
* `ng-bind`：单向绑定，在angular渲染完毕后将数据显示
* `ng-model`：双向绑定

脏值检测：
    AngularJS 确实在幕后为 scope 模型上设置了一个 监听队列，用来监听数据变化并更新 view 。
    每次绑定一个东西到 view 上时 AngularJS 就会往 $watch 队列里插入一条 $watch，用来检测它监视的 model里是否有变化的东西。
    当浏览器接收到可以被 angular context 处理的事件时，$digest 循环就会触发。$digest 会遍历所有的 $watch。如果有至少一个更新过，这个循环就会再次触发，直到所有的$watch都没有变化。这样就能够保证每个model都已经不会再变化。记住如果循环超过10次的话，它将会抛出一个异常，防止无限循环。 当$digest循环结束时，DOM相应地变化。
通过`$apply`来进入`angular context`。但是很多时候不需要我们手动添加`$apply`方法，

{% highlight js %}
	app.controller('MainCtrl', function() {
	    $scope.name = "Foo";
	    $scope.changeFoo = function() {
	         $scope.name = "Bar";
	     }
	});
	<button ng-click="changeFoo()">Change the name</button> //ng-click会调用$apply
{% endhighlight %}

$apply()和$digest()的区别：
* 最直接的差异是， `$apply`可以带参数，它可以接受一个函数，然后在应用数据之后，调用这个函数。所以，一般在集成非 Angular 框架（比如jQuery）的代码时，可以把代码写在这个里面调用。
* 当调用`$digest`的时候，只触发当前作用域和它的子作用域上的监控，但是当调用`$apply`的时候，会触发作用域树上的所有监控。

什么时候手动调用`$apply()`方法？
* 使用了JavaScript中的`setTimeout()`来更新一个scope model
{% highlight js %}
	$scope.getMessage = function() {  
	    setTimeout(function() {  
	        $scope.$apply(function() {  
	            $scope.message = 'hello world';   
	            console.log('message:' + $scope.message);  
	        });  
	    }, 2000);  
	}
{% endhighlight %}
或者直接把`setTimeout`换成`$timeout`,就不用调用`$scope`

* 用指令设置一个DOM事件`listener`并且在该`listener`中修改了一些`models`
{% highlight js %}
	<button ng-click="val=val+1">increase 1</button>
	app.directive("inc", function() {
	    return function (scope, element, attr) {
	        element.on("click", function() {
	            scope.$apply(function(){
	                scope.val++;
	            });
	        });
	    };
	});
{% endhighlight %}

[http://huangtengfei.com/2015/09/data-bind-of-angularjs/](http://huangtengfei.com/2015/09/data-bind-of-angularjs/)

####在AngularJS中使用$watch:
{% highlight js %}
	$scope.data.name = 'htf';
	$scope.$watch('data', function(newValue, oldValue) {
	    if (newValue === oldValue) { return; } 
	    $scope.updated++;
	}, true);
{% endhighlight %}
第三个参数true表示比较的是对象的值而不是引用。

####AngularJS 中 Controller 之间的通信
1. 作用域继承。利用子Controller控制父Controller上的数据。（父Controller中的数据要为引用类型，不能是基本类型）
2. 注入服务。把需要共享的数据注册为一个`service`，在需要的 Controller 中注入。
3. 基于事件。利用Angular的事件机制，使用`$on`、`$emit`和`$broadcast`。如果是同级的controller，还可以用`$rootscope`结合`$on`、`$emit`和`$broadcast`实现通信。
`scope.$emit`：如果是子 Controller 往父Controller上发送事件（从作用域往上发送事件），使用 `$scope.$emit("someEvent", {});`可以传字符串或者对象

`scope.$broadcast`：如果是父 Controller 往子 Controller 上发送事件（从作用域往下发送事件），使用 `$scope.$broadcast("someEvent", {});`可以传字符串或者对象
`$scope.$on`：无论是`$emit`还是`$broadcast`发送的事件，都用`$scope.$on`接收：
{% highlight js %}
	$scope.$on("someEvent", function(event, data) {
	    // 这里取到发送过来的数据 data
	});
{% endhighlight %}

####一个 angular 应用应当如何良好地分层？
这里逻辑代码的拆分，主要是指尽量让 controller 这一层很薄。提取共用的逻辑到 `service` 中 （比如后台数据的请求，数据的共享和缓存，基于事件的模块间通信等），提取共用的界面操作到 `directive` 中（比如将日期选择、分页等封装成组件等），提取共用的格式化操作到 `filter` 中等等。

####angular 应用常用哪些路由库，各自的区别是什么？
Angular1.x 中常用 `ngRoute` 和 `ui.router`，还有一种为 Angular2 设计的 `new router`（面向组件）。
#####ngRoute 
{% highlight js %}
	var app = angular.module('ngRouteApp', ['ngRoute']);
	app.config(function($routeProvider){
	    $routeProvider.when('/main', {
	          templateUrl: "main.html",
	          controller: 'MainCtrl'
	    }).otherwise({ redirectTo: '/tabs' });
	});
{% endhighlight %}

#####ui.router
{% highlight js %}
	var app = angular.module("uiRouteApp", ["ui.router"]);
	app.config(function($urlRouterProvider, $stateProvider){
	    $urlRouterProvider.otherwise("/index");
	    $stateProvider.state("Main", {
	            url: "/main",
	            templateUrl: "main.html",
	            controller: 'MainCtrl'
	     });
	});
{% endhighlight %}

`ui.router`除了可以嵌套路由，还可以一个`$state`下多个视图
{% highlight js %}
	$stateProvider.state('report',{
	    views: {
	      'filters': {
	        templateUrl: 'report-filters.html',
	        controller: function($scope){ ... controller stuff just for filters view ... }
	      },
	      'tabledata': {
	        templateUrl: 'report-table.html',
	        controller: function($scope){ ... controller stuff just for tabledata view ... }
	      },
	      'graph': {
	        templateUrl: 'report-graph.html',
	        controller: function($scope){ ... controller stuff just for graph view ... }
	      }
	    }
	})
	<div>
	  <div ui-view="filters"></div>
	  <div ui-view="tabledata"></div>
	  <div ui-view="graph"></div>
	</div>
{% endhighlight %}

`ui-sref`,`$state.go()`:
{% highlight js %}
	$stateProvider.state('man', { 
	    url: '/man',         
	    params: {id:'id',name:'name'}
	    templateUrl: '../man.html',  
	})  
	<a ui-sref="man({id:1,name:2})" >按钮</a> 
{% endhighlight %}

ngRoute: [http://www.cnblogs.com/xing901022/p/5154358.html?utm_source=tuicool&utm_medium=referral](http://www.cnblogs.com/xing901022/p/5154358.html?utm_source=tuicool&utm_medium=referral)

ui.router: [http://blog.csdn.net/yangjvn/article/details/47703973](http://blog.csdn.net/yangjvn/article/details/47703973)
 
嵌套路由 [http://blog.csdn.net/qq_27626333/article/details/52249545](http://blog.csdn.net/qq_27626333/article/details/52249545)

`resolve`属性里的值会在路由成功前被预先设定好，然后注入到控制器中。通俗地将，就是等数据都“就位”后，才进行路由（其实我觉得也不能叫路由，因为路由是一些列的操作，其中就包括了设置`resolve`属性等等）。这样的好处就是页面仅会被渲染一遍。

如果是嵌套路由的话，不重新设置`resolve`值则会“继承”父路由的`resolve`值，如果不是嵌套路由且不重新设置，则不会正确显示。
{% highlight js %}
	$stateProvider.state("index",{
	            url:'/',
	            templateUrl:'list.html',
	            controller:'myController',
	            resolve:{
	                user:function(){
	                    return {
	                        name:"perter",
	                        email:"826415551@qq.com",
	                        age:"18"
	                    }
	                }
	            }
	})；
	app.controller('myController',function($scope,user){
	    	$scope.name=user.name;
	    	$scope.age=user.age;
	    	$scope.email=user.email;
	   	$scope.user=user;
	});
{% endhighlight %}

####angular 的缺点有哪些？
* 不利于 SEO
因为所有内容都是动态获取并渲染生成的，搜索引擎没法爬取。
一种解决办法是，对于正常用户的访问，服务器响应 AngularJS 应用的内容；对于搜索引擎的访问，则响应专门针对 SEO 的HTML页面。
* 性能问题
作为 MVVM 框架，因为实现了数据的双向绑定，对于大数组、复杂对象会存在性能问题。
可以用来 优化 Angular 应用的性能 的办法：
* 减少监控项（比如对不会变化的数据采用单向绑定）
* 主动设置索引（指定 `track by`，简单类型默认用自身当索引，对象默认使用 `$$hashKey`，比如改为 `track by item.id`）
* 降低渲染数据量（比如分页，或者每次取一小部分数据，根据需要再取）
* 数据扁平化（比如对于树状结构，使用扁平化结构，构建一个 map 和树状数据，对树操作时，由于跟扁平数据同一引用，树状数据变更会同步到原始的扁平数据）

####如何看待 angular 1.2 中引入的 controller as 语法？
{% highlight js %}
	angular.module("app",[]).controller("demoController",[function(){
	    this.title = "angualr";
	    或者：
	    var vm = this;   //这样定义可以避免JavaScript的this的坑
	    vm.title = "angualr";
	    return vm;
	}])
	<div ng-app="app" ng-controller="demoController as demo">
	     hello : {{demo.title}} !
	</div>
{% endhighlight %}

把demo变成了`demoController`的`$scope`的属性，不需要再在controller里面引入`$scope`了。
这样可以避免那个`ng-if`新生成作用域的坑，因为是对`$scope`对象的引用。
但是因为没有注入 `$scope`，导致 `$emit`、 `$broadcast`、 `$on`、 `$watch` 等 `$scope` 下的方法无法使用。
[http://www.cnblogs.com/whitewolf/p/3493362.html](http://www.cnblogs.com/whitewolf/p/3493362.html)

####详述 angular 的 “依赖注入”
	目的是处理代码之间的依赖关系，减少组件间的耦合。
	对于一个 DI 容器，必须具备三个要素：依赖项的注册，依赖关系的声明和对象的获取。
	原理：AngularJS 是通过构造函数的参数名字来推断依赖服务名称的，通过 toString() 来找到这个定义的 function 对应的字符串，然后用正则解析出其中的参数（依赖项），再去依赖映射中取到对应的依赖，实例化之后传入。
注入依赖的方法：
* 数组注释法
{% highlight js %}
	myApp.controller('myCtrl', ['$scope', '$http', function($scope, $http){
	    ...
	}])
{% endhighlight %}

* 显式 $inject
{% highlight js %}
	myApp.controller('myCtrl', myCtrl);
	functionmyCtrl = ($scope, $http){
	    ...
	}
	myCtrl.$inject = ['$scope', '$http'];
{% endhighlight %}

####延迟对象
`$q`是Angular的一种内置服务，它可以使你异步地执行函数，并且当函数执行完成时它允许你使用函数的返回值（或异常）。

`$q.defer()` 可以创建一个`deferred`实例（延迟对象实例。

`defer`的方法：
    1. deferred.resolve(value)  成功解决(resolve)了其派生的promise。
    2. deferred.reject(reason)  未成功解决其派生的promise。
    3. notify(value)  更新promise的执行状态。
    
当创建一个`deferred`实例时，promise实例也会被创建。`promise.then()`会返回一个新的衍生`promise`，形成`promise`链。

promise 的方法:
`then(successCallback, errorCallback, nitifyCallback)` 根据`promise`被`resolve/reject`，或将要被`resolve/reject`,调用`successCallback/errorCallback/nitifyCallback`。
{% highlight js %}
	function asyncGreet(name) {
	  var deferred = $q.defer();  
	  deferred.notify('About to greet ' + name + '.');  //延迟对象的notify方法。
	  if (okToGreet(name)) {
	    deferred.resolve('Hello, ' + name + '!');  //任务被成功执行
	  } else {
	    deferred.reject('Greeting ' + name + ' is not allowed.');  //任务未被成功执行
	  }
	  return deferred.promise;  //返回deferred实例的promise对象
	}
	function okToGreet(name) {
	  //只是mock数据，实际情况将根据相关业务实现代码
	  if(name == 'Superman') return true;  
	  else return false;
	}
	var promise = asyncGreet('Superman');  //获得promise对象
	//promise对象的then函数会获得当前任务也就是当前deferred延迟实例的执行状态。它的三个回调函数分别会在resolve(), reject() 和notify()时被执行
	promise.then(function(greeting) {
	  alert('Success: ' + greeting);
	}, function(reason) {
	  alert('Failed: ' + reason);
	}, function(update) {
	  alert('Got notification: ' + update);
	});
{% endhighlight %}

[http://www.cnblogs.com/big-snow/p/5126059.html](http://www.cnblogs.com/big-snow/p/5126059.html)


####$templateCache
当某个服务需要调用`template`的时候，比如调用了`modal`框，就不需要去http取了，缓存里有了。

{% highlight js %}
	<script type="text/ng-template" id="zippy.html">
		<div>test</div>
	</script>
	或者
	app.run(function($templateCache){
		$templateCache.put('zippy.html','<div>test</div>');
	});
	
	app.directive('myDirective',function($templateCache){
		return{
			template: $templateCache.get('zippy.html')
		}
	});
{% endhighlight %}
