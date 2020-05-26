import React from 'react';
import {BrowserRouter,Link,Route} from 'react-router-dom';

class Index extends React.Component{
  render(){
    return <div>
      <h2>Index</h2>
    </div>
  }
}

class About extends React.Component{
  render(){
    return <div>
      <h2>About</h2>
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
        <Route exact path='/' component={Index} />
        <Route path='/about' component={About} />
      </BrowserRouter>
    </div>
  }
}

export default RouterTest;