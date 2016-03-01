import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Title from './home/home';
import Application from 'bv-application/index';
import Home from 'bv-application/home/index';

var App = React.createClass({
	dispatcher: function() {
		_.extend(this, Application.Dispatcher(Home.actions, [
			{
				action: Home.actions.GET_TITLE,
				before: function(data) {
					return 'bla ' + data;
				},
				after: function(data) {
					return 'André disse ' + data;
				}
			}
		]));
	},
	getInitialState: function() {
		return {
			title: ''
		}
	},
	componentDidMount: function() {
		var self = this;
		this.dispatcher();

		this.methods[this.actions.GET_TITLE]().then(function(data) {
            self.setState({
            	title: data
            });
        }, function(err) {
            console.log('Error: ', err);
        });
	},
	render: function() {
		return (
			<Title title={this.state.title} />
		);
	}
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);