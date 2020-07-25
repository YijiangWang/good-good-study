import React from 'react';
import ReactDOM from 'react-dom';
import Lists from './components/Lists';
import App from './components/todos/App';
import ToDoList from './components/todoList';

ReactDOM.render(
  <React.StrictMode>
    {/* <Lists /> */}
    <App />
    <ToDoList />
  </React.StrictMode>,
  document.getElementById('root')
);
