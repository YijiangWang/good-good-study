import React from 'react';
import ReduxTest from './reduxTest';
import {Provider} from 'react-redux';
import store from './store';
import RouterTest from './routerTest';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReduxTest />

        <RouterTest />
      </Provider>
    </div>
  );
}

export default App;
