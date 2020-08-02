#### router 的基本使用
```js
import React from 'react';
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
          <Route path='/join'exact component={Join} />
          <Route path='/join/detail' component={JoinDetail} />
          <Route component={Find404}/>
        </Switch>
      </div>
    </HashRouter>
  </div>)
}

export default App;
```