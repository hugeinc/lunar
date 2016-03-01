var actions = require('./actions-symbols');

var obj = {
	number: 0,
	actions: actions
};

obj[actions.ONE] = function(n) {
	var n = n || 0;

	this.number = n + 1;

	return this.number;
};

obj[actions.TWO] = function(n) {
	var n = n || 0;

	this.number = n + 2;

	return this.number;
};

module.exports = obj;
