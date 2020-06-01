import React,{PureComponent} from 'react';

class Cart extends PureComponent{
  constructor(){
    super();
    this.state={
      goods: [
        {title: '手套', count: 3},
        {title: '毛巾', count: 2}
      ]
    }
  }

  render(){
    const {goods} = this.state;
    return <div>
      <ul>
        {goods.map((good,i) => {
          
        })}
      </ul>
    </div>
  }
}