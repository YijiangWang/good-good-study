// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import yjwImg from './yjw.png';

class Yjw extends React.Component {
  render() { 
    return (<div className='content'>
      Hello Webpack-dev-server
      <img src={yjwImg} />
    </div>);
  }
}
 
ReactDOM.render(
  <Yjw />,
  document.getElementById('root')
);