import React, { Component } from 'react';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { val: '' }
  }

  changeTodo = (e) => {
    this.setState({val: e.target.value});
  }
  keyDown = e => {
    const {addData} = this.props;
    const {val} = this.state;
    // 通过 e.keyCode 获取回车键码
    if(e.keyCode === 13){
      if(!val.trim()){
        alert('计划不能为空');
        return;
      } 
      console.log('yjw----keydown')
      addData(val);
      this.setState({val: ''});
    }
  }

  render() { 
    const {val} = this.state;
    return (  
      <div>
        <input 
          className = 'create-todo'
          placeholder = 'What needs to be done?'
          value = {val}
          onChange = {this.changeTodo}
          onKeyDown = {this.keyDown}
        />
      </div>
    );
  }
}
 
export default Create;