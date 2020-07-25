import React, { Component } from 'react';
import Title from './title';
import Create from './create';
import Todos from './todos';
import State from './state';
import './index.css';

class ToDoList extends Component {
  state = {
    data: [
      {
        id: 0,
        txt: "数据内容0",
        done: false
      },
      {
        id: 1,
        txt: "数据内容1",
        done: true
      },
      {
        id: 2,
        txt: "数据内容2",
        done: false
      },
    ]
  }
  addData = value => {
    this.setState(preState => {
      return {
        data: [...preState.data, {
          id: Date.now(),
          txt: value,
          done: false
        }
        ]
      }
    })
  }
  changeDone = (id, done) => {
    const { data } = this.state;
    data.forEach(item => {
      if (item.id === id) {
        item.done = done
      }
    })
    this.setState({ data: data })
  }
  remove = id => {
    let { data } = this.state;
    data = data.filter(item => item.id !== id);
    this.setState({ data })
  }
  removeDone = () => {
    const {data} = this.state;
    const unDone = data.filter(item => item.done === false);
    this.setState({data: unDone})
  }

  render() {
    const { data = [] } = this.state;
    console.log('yjw---> ', data);

    return (
      <div className='todolist'>
        <Title />
        <div className="content">
          <Create addData={this.addData} />
          <Todos
            data = {data}
            changeDone = {this.changeDone}
            remove = {this.remove}
          />
          <State data={data} removeDone={this.removeDone}/>
        </div>
      </div>
    );
  }
}

export default ToDoList;