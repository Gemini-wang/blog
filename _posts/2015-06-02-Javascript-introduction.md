---
title: JavaScript
time: 2015.06.02 
layout: post
tags:
- JS
- 笔记
excerpt: 本文主要记录了JS的基本内容，包括JS函数和对象的声明，全局变量和局部变量的定义。
---

#声明变量
{% highlight js %}
	var winners=20;        //整数或浮点数
	var name="evil";       //字符串用双引号
	var isEligible=false;  //布尔值（true/false）
	var isEligible=null;   //没有值 
	var scroops=Math.random()*10;   //使用JS内部库的函数生成随机数
	var width；                     //声明变量时不一定要指定值
	Math.random();  //生成0-1之间的随机数
	Math.floor();   //去除一个浮点数中小数点后面的数字
{% endhighlight %}

命名变量：用字母、美元、下划线开头。


#JS注释
//Content

#数组
1. 定义数组的2种方法：
{% highlight js %}
	var temp=new Array();        //定义数组
	  temp[0]=59;
	  ....
	  temp[4]=62;
	
	var temp=[59,60,60,61,62];   //定义数组
{% endhighlight %}

2. 用`length`属性得到数组的大小：`var numTtems=temp.length;`

3. 如果访问一个不存在的数组索引，比如temp[5]，会得到一个尚未赋值的变量的值undefined。
4. 删除数组中的元素：
 - 将元素值设为null，数组长度不变。`myArray[2]=null;`
 - 用函数splice，元素被彻底删除，所删除的元素后面的所有元素索引相应地减1。

#Javascript函数
1. 函数可以有0个或多个行参。定义函数时用行参，调用函数时用实参。
2. 函数不一定要返回一个值。如果没有return语句，函数会返回undefined。

{% highlight js %}
function addScore(level,score){
	var bonus=level*score*.1;
    return score+bonus;
}
{% endhighlight %}

#Javascript对象
###对象：属性+方法
{% highlight js %}
var fido={
	name:"fido"，
	weight:40，
	loves:["walks","fetching balls"]
	bark:function(){
	alert("woof!");
	}
}；
{% endhighlight %}

`fido.weight`，访问对象的属性。

`fido["weight"]`，访问对象的属性。

`fido.bark`，调用方法。

`fido.loves.push("chewing bones")；`直接将一个新元素压入数组的末尾。 

`delete fido.age；` 删除对象的属性，包括值和属性本身。

###给函数传递对象
调用一个函数并传入对象时，实际上传递的是对象引用而不是对象本身。这个引用的副本会传递到行参，它指向原来的对象，对行参属性的任何改变都会影响传入的对象。   
{% highlight js %}
function bark(dog){
	...
}
bark(fido);
{% endhighlight %}

###用构造函数来创建对象
1.创建构造函数

{% highlight js %}
function Dog(name,breed,weight){           //构造函数的行参取希望创建的对象的属性值
	this.name=name;
	this.breed=breed;
	this.bark=function(){
		if(this.weight>25){
			alert(this.name+"says woof!");
		}
	};
}
{% endhighlight %}

2.使用构造函数创建对象

{% highlight js %}
var fido=new Dog("fido","mixed",38);
{% endhighlight %}


#全局变量、局部变量
全局变量：变量在函数外声明，可以在JS代码的任何地方访问。如果页面链接到其它脚本，它们也会看到这些全局变量。给一个还没声明的变量赋值时，会把它当做全局变量，即使是在函数内部也是。

局部变量：在函数内部声明。

定义变量时，在函数中使用了var,该变量被视为局部变量；在函数中没使用var,为全局变量。

如果在函数中定义一个已有的全局变量名，函数中关于这个局部变量的引用全部指向局部变量，而不是全局变量。


