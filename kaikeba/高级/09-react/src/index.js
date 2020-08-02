import React from 'react';
import ReactDOM from 'react-dom';
import Lists from './components/Lists';
import ToDoList from './components/todoList';
import Happ from './hook/app';
import Index from './router';

ReactDOM.render(
  <React.StrictMode>
    {/* <Lists /> */}
    {/* <App /> */}
    {/* <ToDoList /> */}
    {/* <Happ /> */}

    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
