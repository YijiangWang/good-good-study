import React, { Component } from 'react';

class List extends Component {
  state = { 
    show: false,
    checked: false,
  }
  render() { 
    const {data = {}} = this.props;
    const {title, list} = data;
    const {show, checked} = this.state;
    return (<div className={`friend-group ${show ? 'expanded' : ''}`}>
      <dl>
        <dt onClick={()=>{this.setState({show:!show})}}>{title}</dt>
        {list.map((item, index) => <dd 
          key={index} 
          className={checked?'checked':''}
          onClick={()=>this.setState({checked:!checked})}
        >
          {item.name}
        </dd>)}
      </dl>
    </div>);
  }
}
 
export default List;