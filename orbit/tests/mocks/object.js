import actions from './actions-symbols';

let obj = {
	number: 0,
	actions: actions
};

obj[actions.ONE] = function(n = 0) {
	this.number = n + 1;

	return this.number;
};
obj[actions.TWO] = function(n = 0) {
	this.number = n + 2;

	return this.number;
};

export default obj;
