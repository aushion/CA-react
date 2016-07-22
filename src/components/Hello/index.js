import './index.scss';
import React from 'react';

var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div id="hello" style={{opacity:this.state.opacity}}>
          Hello chenaosheng<div className="boxA"></div>
      </div>
    );
  }
});
export default Hello;
