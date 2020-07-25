import React, { Component } from 'react';

class State extends Component {
  state = {  }
  render() { 
    const {data, removeDone} = this.props;
    const undos = data.filter(item => item.done===false);
    const hasdones = data.filter(item => item.done===true);
    return (  
      <div className='yjwstate'>
        <span><strong>{undos.length}</strong>&nbsp;</span>项待完成
        {hasdones.length>0 ? 
          <span 
            className = 'yjwhasdone'
            onClick = {removeDone}
          >Clear&nbsp;{hasdones.length}&nbsp;已完成事项</span>
          : null
        }
      </div>
    );
  }
}
 
export default State;