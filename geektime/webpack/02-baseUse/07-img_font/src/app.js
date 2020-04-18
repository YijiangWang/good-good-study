// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import yjw from './yjw.png';

class Yjw extends React.Component{
  render () {
    return (<div>
      May I help you?
      <img src={yjw}/>
    </div>)
  }
}

ReactDOM.render(
  <Yjw />,
  document.getElementById('root')
);