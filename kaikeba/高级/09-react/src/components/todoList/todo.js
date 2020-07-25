import React, { Component, createRef } from 'react';
import clsName from 'classname';

class Todo extends Component {
  constructor(){
    super();
    this.input = createRef();
  }
  clickEvent = e => {
    const {changeDone, data:{id}} = this.props;
    changeDone(id, e.target.checked)
  }
  destroy = e => {
    const {remove, data:{id}} = this.props;
    remove(id);
  }
  componentDidUpdate() {
    console.log('yjw---ref---> ',this.input.current.checked)
  }
  render() { 
    const {data:{done,txt}} = this.props;
    return (  
      <div className='yjwtodo'>
        <input 
          ref={this.input}
          type = "checkbox"
          checked = {done}
          onChange = {this.clickEvent}
        />
        <div 
          className={clsName('text', {'doneStyle': done})}
        >{txt}</div>
        <span 
          className="yjwdestroy"
          onClick = {this.destroy}
        ></span>
      </div>
    );
  }
}
 
export default Todo;