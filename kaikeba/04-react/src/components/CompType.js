import React from 'react';

export function CompFunc({name}) {
  return <div>
    Component1--{name}
  </div>
}

export class CompClass extends React.Component{
  render() {
    return <div>
      Component2--{this.props.name}
    </div>
  }
}