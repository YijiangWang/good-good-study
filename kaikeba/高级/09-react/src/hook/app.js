import React, {useState} from 'react';
import Hstate from './h1-state';
import Heffect from './h2-effect';

function App(props) {

  return (<div>
    <Hstate name='测试 useState' />
    <Heffect />
  </div>)
}

export default App;
