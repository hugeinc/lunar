'use strict';

define('Home', ['bv-application/index', './actions'], function(Application, actions) {
	var props = {},
		methods = {};

	props.title = 'Hello.';

	methods.bla = function() {
		this.somethingElse();
	};

	methods.somethingElse = function() {
		console.log('blaaaa called somethingElse');
	};

	methods[actions.GET_TITLE] = function(data) {
		// throw 'Sorry dude.';
		//return data;
		return 'Hello.';
		// return data.data[0].title;
	};

	return Application.Class.extend({
		props: props,
		methods: methods,
		actions: actions
	});
});
