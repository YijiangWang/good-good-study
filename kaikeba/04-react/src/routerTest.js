import React from 'react';
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom';

class Index extends React.Component{
  render(){
    return <div>
      <h2>Index</h2>
      <ul>
        <li><Link to='/detail/web'>web课程</Link></li>
        <li><Link to='/detail/python'>python课程</Link></li>
      </ul>
    </div>
  }
}

class Detail extends React.Component{
  render(){
    console.log('yjw---> ', this.props);
    const {match, history} = this.props;
    return <div>
      <h2>{match.params.course}</h2>
      <button onClick={history.goBack}>返回</button>
    </div>
  }
}

class About extends React.Component{
  render(){
    return <div>
      <h2>About</h2>
      <ul>
        <li><Link to='/about/me'>Me</Link></li>
        <li><Link to='/about/order'>Order</Link></li>
      </ul>
      <Route path='/about/me' component={()=><div>me</div>} />
      <Route path='/about/order' component={()=><div>order</div>} />
      <Redirect to='/about/me' ></Redirect>
    </div>
  }
}


class NoMatch extends React.Component{
  render(){
    return <div>
      404,{this.props.location.pathname} 不存在
    </div>
  }
}

class RouterTest extends React.Component{
  render(){
    return <div>
      <BrowserRouter>
        <ul>
          <li><Link to='/'>首页</Link></li>
          <li><Link to='/about'>关于</Link></li>
        </ul>
        <Switch>
          <Route exact path='/' component={Index} />
          {/* 暂时发现动态路由不能嵌套在其它路由中 */}
          <Route path='/detail/:course' component={Detail} />
          <Route path='/about' component={About} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </div>
  }
}

export default RouterTest;