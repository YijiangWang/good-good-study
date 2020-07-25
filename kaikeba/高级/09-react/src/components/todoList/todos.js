import React, { Component } from 'react';
import Todo from './todo';

class Todos extends Component {
  state = {  }
  render() { 
    const {data} = this.props;
    return (  
      <div className='todos'>
        {
          data.map((item, index) => 
            <Todo key={index} {...this.props} data={item}/>
          )
        }
      </div>
    );
  }
}
 
export default Todos;