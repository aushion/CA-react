import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from '../../components/Todo/index.jsx';
import Hello from  '../../components/Hello/index.jsx';
ReactDOM.render(
  <div className="container">
    <div className="content">
        <Hello />
      <TodoList className="todo-list" />
    </div>
  </div>,
  document.getElementById('root')
);
