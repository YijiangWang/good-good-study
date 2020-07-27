import React from 'react';
import ReactDOM from 'react-dom';
import Lists from './components/Lists';
import ToDoList from './components/todoList';
import Happ from './hook/app';

ReactDOM.render(
  <React.StrictMode>
    {/* <Lists /> */}
    {/* <App /> */}
    {/* <ToDoList /> */}
    <Happ />
  </React.StrictMode>,
  document.getElementById('root')
);
