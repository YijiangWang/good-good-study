//@ts-check
import React from 'react';
import ReactDOM from 'react-dom';

class Yjw extends React.Component {
  render() {
    console.log('yjw---> ', document.getElementById('root'));
    return <div>aaaa</div>
  }
}
 
ReactDOM.render(
  <Yjw />, document.getElementById('root')
)