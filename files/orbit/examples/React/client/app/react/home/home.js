import React from 'react';
import ReactDOM from 'react-dom';

var Title = React.createClass({
  render: function() {
    return (
      <h1>{this.props.title}</h1>
    );
  }
});

export default Title;