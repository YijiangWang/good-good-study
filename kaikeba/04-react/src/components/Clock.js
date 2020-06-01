import React, {useState} from 'react';

export default class Clock extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      time: new Date()
    }
  }

  componentDidMount(){
    this.timer = setInterval(() => {
      this.setState({time: new Date()})
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
    return (<div>
      {this.state.time.toLocaleTimeString()}
    </div> )
  }
}