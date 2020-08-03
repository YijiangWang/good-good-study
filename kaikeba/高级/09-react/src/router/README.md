#### router 的基本使用
```js
import React, {useState} from 'react';
import {BrowserRouter, HashRouter, Link, Route, Switch} from 'react-router-dom';

import Home from './home';
import About from './about';
import Join from './join';
import JoinDetail from './joinDetail';
import Find404 from './find404';

function App() {
  /**
   * HashRouter 比 BrowserRouter 路径中多一个 #，使用 BrowserRouter 时上线需要后台进行配置
   */
  const [count, setCount] = useState(5);
  return (<div>
    <HashRouter>
      <div className="nav">
        <Link to='/'>首页</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to='/about'>关于我们</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to='/join'>加入我们</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to='/join/detail'>加入我们详情</Link>
      </div>

      <div className="route">
        {/** 
          注意：
          1、只定义 path，它的匹配规则就是判断，现在的url中是否包含了 path 中定义的路径；
          2、exact 精确匹配 path；
          3、Switch 使用最先匹配到的 Route 就不再继续往下匹配。
        */}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          {/* 
            route 的 render 属性：
              1、如果我们想给路由里的组件进行传参那就需要调用组件的 render 方法；
              2、render 方法接收的参数是一个函数，在函数里必须有一个返回值，返回值是我们要渲染的对应组件
          */}
          <Route path='/join'exact render={(props) => <Join {...props} count={count}/>} />
          <Route path='/join/detail' component={JoinDetail} />
          <Route component={Find404}/>
        </Switch>
      </div>
    </HashRouter>
  </div>)
}

export default App; 
```