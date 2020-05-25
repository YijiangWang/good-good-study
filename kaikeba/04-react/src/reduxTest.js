import React from 'react';
import {connect} from 'react-redux';
import {add, minus, asynAdd} from './service/counter/action';

const mapStateToProps = a =>({num: a.counter});
const mapDispatchToProps = {add, minus, asynAdd}

class ReduxTest extends React.Component {
  render(){
    const {num, add, minus, asynAdd} = this.props;
    return <div>
      <div>现有学生：{num}人</div>
      <button onClick={add}>招人</button>
      <button onClick={minus}>劝退</button>
      <button onClick={asynAdd}>晚点招人</button>
    </div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTest);