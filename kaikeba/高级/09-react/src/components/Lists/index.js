import React, { Component } from 'react';
import styles from './index.css';
import List from './List';

let datas = {
  family: {
      title: '家人',
      list: [
          {name: '爸爸'},
          {name: '妈妈'}
      ]
  },
  friend: {
      title: '朋友',
      list: [
          {name: '张三'},
          {name: '李四'},
          {name: '王五'}
      ]
  },
  customer: {
      title: '客户',
      list: [
          {name: '阿里'},
          {name: '腾讯'},
          {name: '头条'}
      ]
  }
};
class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (<div className="friend-list">
      {Object.keys(datas).map(key => <div key={key}>
        <List data={datas[key]} />
      </div>)}
    </div>);
  }
}
 
export default Lists;