var actions = require('./actions-symbols');

var obj = {
	props: {
		number: 0
	},
	methods: {},
	actions: actions
};

obj.methods[actions.ONE] = function(n) {
	var n = n || 0;

	this.number = n + 1;

	return this.number;
};

obj.methods[actions.TWO] = function(n) {
	var n = n || 0;

	this.number = n + 2;

	return this.number;
};

module.exports = obj;
