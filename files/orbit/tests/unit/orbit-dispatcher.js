var test = require('blue-tape'),
	Dispatcher = require('../../dist/index').Dispatcher,
	ActionsSymbols = require('../mocks/actions-symbols');

test('Dispatcher should be a function', function(t) {
	t.plan(1);

	t.equal(typeof Dispatcher, 'function');
});

test('Dispatcher should output an object when an actions symbols object is given', function(t) {
	t.plan(1);

	t.equal(typeof Dispatcher(ActionsSymbols), 'object');
});

test('Dispatcher should output an object when an actions symbols object and middlewares array are given', function(t) {
	t.plan(1);

	t.equal(typeof Dispatcher(ActionsSymbols, [
		{
			action: ActionsSymbols.ONE,
			before: function(data) {
				return 'Before sending the data ' + data;
			},
			after: function(data) {
				return 'After getting the data and before setting state ' + data;
			}
		}
	]), 'object');
});

test('Dispatcher output should contain a methods object', function(t) {
	t.plan(1);

	t.equal(typeof Dispatcher(ActionsSymbols).methods, 'object');
});

test('Dispatcher methods should contain action symbol functions', function(t) {
	t.plan(2);

	t.equal(typeof Dispatcher(ActionsSymbols).methods[ActionsSymbols.ONE], 'function');
	t.equal(typeof Dispatcher(ActionsSymbols).methods[ActionsSymbols.TWO], 'function');
});
