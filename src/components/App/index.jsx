import './index.css';
import React from 'react';
import Home from './home.jsx';
import GlobalNav from './GlobalNav.jsx';

export default class App extends React.Component{
  render(){
    return (
      <div>
        <GlobalNav/>
        <div style={{ padding: 20 }}>
          {this.props.children || <Home/>}
        </div>
      </div>
    );
  }
};
