define('Example', ['../index', './actions'], function(Orbit, actions) {
	var props = {},
		methods = {};

	props.title = 'Hello.';

	methods.one = function() {
		this.two();
	};

	methods.two = function() {
		console.log('one called two');
	};

	methods[actions.GET_TITLE] = function(data) {
		// throw 'Sorry.';
		//return data;
		return 'Hello.';
		// return data.data[0].title;
	};

	return Orbit.Class.extend({
		props: props,
		methods: methods,
		actions: actions
	});
});
