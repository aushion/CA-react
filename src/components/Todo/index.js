import './index.css';
import React from 'react';
import TodoItem from './TodoItem';

export default class Todo extends React.Component{
  render(){
    return (
      <div>
        <h1>TodoList</h1>
        <TodoItem title="我是一个TodoItem" message="屌屌?" />
        <TodoItem title="我是一个TodoItem" message="听说你很叼？"  />
      </div>
    );
  }
};
