import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = a =>({num: a});
const mapDispatchToProps = {
  add: ()=>({type:'add'}),
  minus: ()=>({type:'minus'})
}

class ReduxTest extends React.Component {
  render(){
    const {num, add, minus} = this.props;
    return <div>
      <div>现有学生：{num}人</div>
      <button onClick={add}>招人</button>
      <button onClick={minus}>劝退</button>
    </div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTest);