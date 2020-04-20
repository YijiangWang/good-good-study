import React from 'react';
import ReactDOM from 'react-dom';
import './login.css';


class Login extends React.Component{
  render() {
    return (<div className='content'>
      Login
    </div>)
  }
}

ReactDOM.render(
  <Login />,
  document.getElementById('login')
);