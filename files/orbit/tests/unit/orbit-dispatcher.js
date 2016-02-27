var test = require('blue-tape'),
	Dispatcher = require('../../dist/index').Dispatcher;

test('Dispatcher should be an object', function(t) {
	t.plan(1);

	t.equal(typeof Dispatcher, 'function');
});
