---
title: ES6
time: 2017.02.10
layout: post
tags:
- JS
- 笔记
excerpt: 本文主要记录了es6的入门知识。
---

{% highlight js %}
	with (expression) {   //将expression加到作用域链的前端
	  statement
	}
	try         //用来测试代码中的错误
	{
	   //在此运行代码
	}
	catch(err)
	{
	   //在此处理错误
	}
{% endhighlight %}

###let
	声明变量，只在let命令所在的代码块内有效；
	变量一定要在声明后使用，否则报错；
	块级作用域内用let声明变量，就形成了封闭作用域，不受外部影响；
	let不允许在相同作用域内，重复声明同一个变量；
	不能在函数内部重新声明参数；
	在块级作用域之中声明函数，类似于let，在块级作用域之外不可引用；

###const
	声明一个只读的常量。一旦声明，常量的值就不能改变；
	const一旦声明变量，就必须立即初始化，不然会报错；
	const的作用域与let命令相同：只在声明所在的块级作用域内有效；
	存在暂时性死区，只能在声明的位置后面使用；
	const声明的常量，也与let一样不可重复声明；
	对于复合类型的变量，const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变。即不能把变量指向另一个地址，但对象本身是可变的，依然可以为其添加新属性；

###解构赋值
	从数组和对象中提取值，对变量进行赋值。只要等号两边的模式相同，左边的变量就会被赋予对应的值；
	如果解构不成功，变量的值就等于undefined；
	var、let、const都行；
	解构赋值允许指定默认值，如果一个数组成员不严格等于undefined，默认值是不会生效的，所以右边一定要是undefined；
	默认值可以引用解构赋值的其他变量，但该变量必须已经声明；
	对象的解构与数组的不同：数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值；
	变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。但是var允许重新声明；
	解构赋值不能使用圆括号的情况：1.变量声明语句中不用圆括号。2.函数参数中不用。3.赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
	可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号；

###数值的扩展
	Number.isFinite()用来检查一个数值是否为有限的；
	Number.isNaN()用来检查一个值是否为NaN；
	与传统的全局方法isFinite()和isNaN()，以上2个方法只对数值有效，非数值一律返回false；
	Number.parseInt()和Number.parseFloat()，与parseInt()和parseFloat()一样；
	Number.isInteger()用来判断一个值是否为整数；
	在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值；
	Number.EPSILON的实质是一个可以接受的误差范围；
	JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内；
	Math.trunc方法用于去除一个数的小数部分，返回整数部分。对于非数值，Math.trunc内部使用Number方法将其先转为数值。对于空值和无法截取整数的值，返回NaN；
	Math.sign方法用来判断一个数到底是正数、负数、还是零。参数为正数，返回+1；参数为负数，返回-1；参数为0，返回0；参数为-0，返回-0;其他值，返回NaN；
	Math.cbrt方法用于计算一个数的立方根。对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值；
	JavaScript的整数使用32位二进制形式表示，Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0；
	Math.imul方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数；
	Math.fround方法返回一个数的单精度浮点数形式；
	Math.hypot方法返回所有参数的平方和的平方根；
	（新增）Math.expm1(x)返回ex - 1；
	（新增）Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)；
	（新增）Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN；
	（新增）Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN；
	  ● Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
	  ● Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
	  ● Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
	  ● Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
	  ● Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
	  ● Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
	（新增）指数运算符（**）         b **= 3; // 等同于 b = b * b * b;

###数组的扩展
	Array.from方法用于将两类对象转为真正的数组，类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）；
	可以用Array.prototype.slice方法替代；
	所谓类似数组的对象，本质特征只有一点，即必须有length属性；
	Array.from的第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组；
	Array.from的第三个参数，用来绑定this；
	Array.from(string).length;    //将字符串转为数组，然后返回字符串的长度
	Array.of方法用于将一组值，转换为数组；
	Array.of基本上可以用来替代Array()或new Array()。因为Array()方法当参数个数只有一个时，实际上是指定数组的长度。当参数个数不少于2个时，Array()才会返回由参数组成的新数组；
	数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组；
	Array.prototype.copyWithin(target, start = 0, end = this.length)
	  ● target（必需）：从该位置开始替换数据。
	  ● start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
	  ● end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
	  ● 这三个参数都应该是数值，如果不是，会自动转为数值。
	数组实例的find方法，用于找出第一个符合条件的数组成员。如果没有符合条件的成员，则返回undefined；
	数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1；
	find和findIndex接受第二个参数，用来绑定回调函数的this对象；
	find和findIndex都可以发现NaN，弥补了数组的IndexOf方法的不足；
	数组实例的fill方法使用给定值，填充一个数组。接受第二个和第三个参数，用于指定填充的起始位置和结束位置；
	数组实例的entries()，keys()和values()——用于遍历数组；
	数组实例的includes()方法返回一个布尔值，表示某个数组是否包含给定的值；
	数组实例的includes()方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度，则会重置为从0开始；
	数组的空位指，数组的某一个位置没有任何值。比如Array(3) //[, , ,]。ES5中空位不是undefined。ES6则是明确将空位转为undefined。

###函数的扩展
	ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。参数变量是默认声明的，所以不能用let或const再次声明；
	参数默认值可以与解构赋值的默认值，结合起来使用；
	定义了默认值的参数，应该是函数的尾参数。如果是非尾部的参数，就必须要传值了，不然会报错。如果传入undefined，将触发该参数等于默认值，null则没有这个效果；
	函数的length属性，返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真；
	如果函数参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，即先是当前函数的作用域，然后才是全局作用域；
	rest参数（形式为“...变量名”），用于向函数传递任意多的参数，在函数内部会转成数组。rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。函数的length属性不包括rest参数；
	扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列；
	函数的name属性，返回该函数的函数名；

###箭头函数
	var f = v => v;等同于 var f = function(v) {return v;};
	如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回；
	如果箭头函数直接返回一个对象，必须在对象外面加上括号；
	函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this；
	不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误；
	不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替；
	不可以使用yield命令，因此箭头函数不能用作Generator函数；
	函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面；

###对象的扩展
	ES6允许直接写入变量和函数，作为对象的属性和方法；
	ES6用表达式作为属性名，这时要将表达式放在方括号之内。obj['a' + 'bc'] = 123;；
	Object.is用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。不同之处只有两个：一是+0不等于-0，二是NaN等于自身；
	Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。如果只有一个参数，Object.assign会直接返回该参数。如果该参数不是对象，则会先转成对象，然后返回；
	Object.assign(target, source1, source2);
	target // {a:1, b:2, c:3}
	Object.assign方法实行的是浅拷贝，而不是深拷贝。如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用，这个对象的任何变化，都会反映到目标对象上面；

###Symbol
	ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。
	Symbol值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
	注意，Symbol函数前不能使用new命令，否则会报错。生成的Symbol是一个原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。
	Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
	Symbol值不能与其他类型的值进行运算，会报错。
	注意，Symbol值作为对象属性名时，不能用点运算符。同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。