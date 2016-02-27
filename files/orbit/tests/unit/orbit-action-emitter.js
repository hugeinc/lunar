var test = require('blue-tape'),
	ActionEmitter = require('../../dist/index').ActionEmitter;

test('ActionEmitter should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter, 'object');
});
