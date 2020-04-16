import React from  'react';
import ReactDOM from 'react-dom';
import './style.less';
import './style2.css';

class Yjw extends React.Component{
  componentDidMount() {
    console.log('------yjw-------');
  }
  render() {
    return (<div>
      <div className='content'>Hello YJW.</div>
      <div className="content2">hah</div>
    </div>);
  }
}

ReactDOM.render(
  <Yjw />,
  document.getElementById('root')
);