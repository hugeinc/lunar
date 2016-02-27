var test = require('blue-tape'),
	Mediator = require('../../dist/index').Mediator;

test('Mediator should be an object', function(t) {
	t.plan(1);

	t.equal(typeof Mediator, 'object');
});

