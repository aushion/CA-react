import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from '../../components/Todo/index.js';

ReactDOM.render(
  <div className="container">
    <div className="content">
      <TodoList className="todo-list" />
    </div>
  </div>,
  document.getElementById('root')
);
