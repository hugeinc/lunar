var Title = React.createClass({
	render: function() {
		return (
			React.createElement('h1', null, this.props.title)
		);
	}
});

var App = React.createClass({
	getInitialState: function() {
		return {
			title: ''
		}
	},
	componentDidMount: function() {
		var self = this;

    Orbit(this).createActivator([SimpleExample]);

    this.addMiddleware({
        action: SimpleExample.actions.GET_TITLE,
        before: function(data) {
          return 'Huge ' + data;
        },
        after: function(data) {
          return data + ' to the party.';
        }
    });

		this.request[SimpleExample.actions.GET_TITLE]('welcomes').then(function(data) {
				self.setState({
					title: data
				});
		}, function(err) {
				console.log('Error: ', err);
		});
	},
	render: function() {
		return (
			React.createElement(Title, {title: this.state.title})
		);
	}
});

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('content')
);
