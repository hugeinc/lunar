var actions = Orbit.ActionsCreator({
	GET_TITLE: 'GET_TITLE'
});

var SimpleExample = Orbit.Class.extend({
	title: 'Orbit',
	actions: actions,
	[actions.GET_TITLE]: function(data) {
		return data + ' ' + this.title;
	}
});
