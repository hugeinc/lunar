var test = require('blue-tape'),
	Orbit = require('../../dist/index');

test('Orbit.Class should be an object', function(t) {
	t.plan(1);

	t.equal(typeof Orbit.Class, 'object');
});
