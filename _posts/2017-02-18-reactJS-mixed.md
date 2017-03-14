---
title: reactJS
time: 2017.02.18
layout: post
tags:
- reactJS
- 笔记
excerpt: 本文主要记录了reactJS的基本知识。
---

{% highlight js %}
	ReactDOM.render(
	    element,
	    document.getElementById('root')
	);
	function Clock(props) {
	  return (
	    <div>
	      <h1>Hello, world!</h1>
	      <h2>It is {props.date.toLocaleTimeString()}.</h2>
	    </div>
	  );
	}
	function tick() {
	  ReactDOM.render(
	    <Clock date={new Date()} />,
	    document.getElementById('root')
	  );
	}
	setInterval(tick, 1000);
	//或者
	class Clock extends React.Component {
	  render() {
	    return (
	      <div>
	        <h1>Hello, world!</h1>
	        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
	      </div>
	    );
	  }
	}
	function tick() {
	  ReactDOM.render(
	    <Clock date={new Date()} />,
	    document.getElementById('root')
	  );
	}
	setInterval(tick, 1000);
{% endhighlight %}

//或者
state和props主要的区别在于props是不可变的，而state可以根据与用户交互来改变。这就是为什么有些容器组件需要定义state来更新和修改数据。而子组件只能通过props来传递数据。
{% highlight js %}
	class Clock extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {date: new Date()};
	  }
	  render() {
	    return (
	      <div>
	        <h1>Hello, world!</h1>
	        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
	      </div>
	    );
	  }
	}
	ReactDOM.render(
	  <Clock />,
	  document.getElementById('root')
	);
	//或者
	class Clock extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {date: new Date()}; 
	  }
	  //只有在constructor里面可以定义this.state，不能写成this.state.date=new Date();也可以写成this.setState({date: new Date()});
	  componentDidMount() {     //生命周期钩子
	    this.timerID = setInterval(
	      () => this.tick(),
	      1000
	    );
	  }
	  componentWillUnmount() {   //生命周期钩子
	    clearInterval(this.timerID);
	  }
	  tick() {
	    this.setState({
	      date: new Date()
	    });
	  }
	  render() {
	    return (
	      <div>
	        <h1>Hello, world!</h1>
	        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
	      </div>
	    );
	  }
	}
	ReactDOM.render(
	  <Clock />,
	  document.getElementById('root')
	);
{% endhighlight %}

{% highlight js %}
	// Wrong
	this.setState({
	  counter: this.state.counter + this.props.increment,
	});
	// Correct
	this.setState((prevState, props) => ({
	  counter: prevState.counter + props.increment
	}));
	//this.props和this.state是异步更新的，所以第一种写法可能不能得到最新的state
{% endhighlight %}

####绑定事件
{% highlight js %}
	<button onClick={activateLasers}>   
	  Activate Lasers
	</button>
{% endhighlight %}
//用驼峰的写法
//不能用return false阻止默认事件，只能用e.preventDefault();
{% highlight js %}
	class Toggle extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {isToggleOn: true};
	    // This binding is necessary to make `this` work in the callback
	    this.handleClick = this.handleClick.bind(this);
	  }
	  handleClick() {
	    this.setState(prevState => ({
	      isToggleOn: !prevState.isToggleOn
	    }));
	  }
	  render() {
	    return (
	      <button onClick={this.handleClick}>
	        {this.state.isToggleOn ? 'ON' : 'OFF'}
	      </button>
	    );
	  }
	}
	ReactDOM.render(
	  <Toggle />,
	  document.getElementById('root')
	);
{% endhighlight %}
//在ES6的class的写法中，此时的handleClick()的上下文是div的支撑实例，不是Toggle实例，因此我们需要在constructor()函数中bind(this)。
或者在DIV中bind(this)：
{% highlight js %}
	<div onClick={this.handleClick.bind(this)}>
	  You {text} this. Click to toggle.
	</div>
{% endhighlight %}
或者用箭头函数，因为它可以将函数的this绑定到其定义时所在的上下文：
{% highlight js %}
	<div onClick={(e) => this.handleClick(e)}>
	  You {text} this. Click to toggle.
	</div>
{% endhighlight %}
或者用React.createClass，就不需要bind(this)。
//如下&&，{true && expression}里面为true的时候显示expression。
{% highlight js %}
	function Mailbox(props) {
	  const unreadMessages = props.unreadMessages;
	  return (
	    <div>
	      <h1>Hello!</h1>
	      { unreadMessages.length > 0 &&
	        <h2>
	          You have {unreadMessages.length} unread messages.
	        </h2>
	     	   }
	    </div>
	  );
	}
	const messages = ['React', 'Re: React', 'Re:Re: React'];
	ReactDOM.render(
	  <Mailbox unreadMessages={messages} />,
	  document.getElementById('root')
	);
	//condition ? true : false,为true的时候显示
	render() {
	  const isLoggedIn = this.state.isLoggedIn;
	  return (
	    <div>
	      {isLoggedIn ? (
	        <LogoutButton onClick={this.handleLogoutClick} />
	      ) : (
	        <LoginButton onClick={this.handleLoginClick} />
	      )}
	    </div>
	  );
	}
	//return null
	function WarningBanner(props) {
	  if (!props.warn) {
	    return null;        //return false好像也可以，直接return无效
	  }
	  return (
	    <div className="warning">
	      Warning!
	    </div>
	  );
	}
	class Page extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {showWarning: true}
	    this.handleToggleClick = this.handleToggleClick.bind(this);
	  }
	  handleToggleClick() {
	    this.setState(prevState => ({
	      showWarning: !prevState.showWarning
	    }));
	  }
	  render() {
	    return (
	      <div>
	        <WarningBanner warn={this.state.showWarning} />
	        <button onClick={this.handleToggleClick}>
	          {this.state.showWarning ? 'Hide' : 'Show'}
	        </button>
	      </div>
	    );
	  }
	}
	ReactDOM.render(
	  <Page />,
	  document.getElementById('root')
	);
{% endhighlight %}

####数组和key
在创造数组元素的时候，我们需要用到key。注意用key的位置，不能直接在<li>里面用key。最好是用数组项的ID，尽量别用index，因为那样需要对数组进行排序，会很慢。
{% highlight js %}
	function ListItem(props) {
	  // Correct! There is no need to specify the key here:
	  return <li>{props.value}</li>;
	}
	function NumberList(props) {
	  const numbers = props.numbers;
	  const listItems = numbers.map((number) =>
	    // Correct! Key should be specified inside the array.
	    <ListItem key={number.toString()}
	              value={number} />
	  );
	  return (
	    <ul>
	      {listItems}
	    </ul>
	  );
	}
	const numbers = [1, 2, 3, 4, 5];
	ReactDOM.render(
	  <NumberList numbers={numbers} />,
	  document.getElementById('root')
	);
{% endhighlight %}

####表单元素
{% highlight js %}
	//textarea
	class NameForm extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {value: ''};
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }
	  handleChange(event) {
	    this.setState({value: event.target.value});
	  }
	  handleSubmit(event) {
	    alert('A name was submitted: ' + this.state.value);
	    event.preventDefault();
	  }
	  render() {
	    return (
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          Name:
	          <input type="text" value={this.state.value} onChange={this.handleChange} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
	    );
	  }
	}
	//多选框，默认选中的实现。还可以<option selected value="coconut">Coconut</option>来选中。
	class FlavorForm extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {value: 'coconut'};
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }
	  handleChange(event) {
	    this.setState({value: event.target.value});
	  }
	  handleSubmit(event) {
	    alert('Your favorite flavor is: ' + this.state.value);
	    event.preventDefault();
	  }
	  render() {
	    return (
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          Pick your favorite La Croix flavor:
	          <select value={this.state.value} onChange={this.handleChange}>
	            <option value="grapefruit">Grapefruit</option>
	            <option value="lime">Lime</option>
	            <option value="coconut">Coconut</option>
	            <option value="mango">Mango</option>
	          </select>
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
	    );
	  }
	}
	//props.children的用法
	function Dialog(props) {
	  return (
	    <FancyBorder color="blue">
	      <h1 className="Dialog-title">
	        {props.title}
	      </h1>
	      <p className="Dialog-message">
	        {props.message}
	      </p>
	      {props.children}   //表示Dialog里面的内容
	    </FancyBorder>
	  );
	}
	class SignUpDialog extends React.Component {
	  constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSignUp = this.handleSignUp.bind(this);
	    this.state = {login: ''};
	  }
	  render() {
	    return (
	      <Dialog title="Mars Exploration Program"
	              message="How should we refer to you?">
	        <input value={this.state.login}
	               onChange={this.handleChange} />
	        <button onClick={this.handleSignUp}>
	          Sign Me Up!
	        </button>
	      </Dialog>
	    );
	  }
	  handleChange(e) {
	    this.setState({login: e.target.value});
	  }
	  handleSignUp() {
	    alert(`Welcome aboard, ${this.state.login}!`);
	  }
	}
{% endhighlight %}

####Refs
refs属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。
{% highlight js %}
	var MyComponent = React.createClass({
	  handleClick: function() {
	    //使用原生的DOM API获取焦点
	    this.refs.myInput.focus();  //获取对input框的引用
	  },
	  render: function() {
	    //当组件插入到DOM后，ref 属性添加一个组件的引用于到this.refs
	    return (
	      <div>
	        <input type="text" ref="myInput" />  
	        <input
	          type="button"
	          value="点我输入框获取焦点"
	          onClick={this.handleClick}
	        />
	      </div>
	    );
	  }
	});
	ReactDOM.render(
	  <MyComponent />,
	  document.getElementById('example')
	);
{% endhighlight %}

React.createElement(component, props, ...children):如果没有children，写null。
{% highlight js %}
	React.createElement(
	  MyButton,
	  {color: 'blue', shadowSize: 2},
	  'Click Me'
	)
{% endhighlight %}

React.createClass
{% highlight js %}
	React.createClass({
		render: function(){
			return(...);
		}
	})
{% endhighlight %}

####生命周期钩子
	Mounted //React Components被render解析生成DOM节点，并被插入浏览器的DOM结构的过程
	Update  //一个mounted的React Components被重新render的过程
	Unmounted  //一个mounted的React Components对应的DOM节点被从DOM结构中移除的过程
	Mounting:
	componentWillMount,
	render,
	componentDidMount
	Updating:
	componentWillRecieveProps,
	shouldComponentUpdate,
	componentWillUpdtae,
	rendder,
	componentDidUpdate
	Unmounting:
	componentWillUnmount
