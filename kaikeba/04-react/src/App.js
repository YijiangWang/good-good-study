import React from 'react';
import ReduxTest from './reduxTest';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {<ReduxTest />}
      </Provider>
    </div>
  );
}

export default App;
