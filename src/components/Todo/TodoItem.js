import './index.css';
import React from 'react';

export default class TodoItem extends React.Component{
  render(){
    return (
      <div className="todo-item">
        <h2 className="todo-item-title">{this.props.title}</h2>
        <div className="todo-item-message">{this.props.message}</div>
      </div>
    );
  }
};
