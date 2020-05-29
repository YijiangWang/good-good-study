import React from 'react';
import ReduxTest from './reduxTest';
import {Provider} from 'react-redux';
import store from './store';
import RouterTest from './routerTest';
import { CompFunc, CompClass } from './components/CompType';
import Clock from './components/Clock';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReduxTest />

        <RouterTest />
      </Provider>
      <hr/>


      <hr/>
      
      <Clock />
      <hr/>

      <CompFunc name='CompF'/>
      <CompClass name='CompC'/>
    </div>
  );
}

export default App;
