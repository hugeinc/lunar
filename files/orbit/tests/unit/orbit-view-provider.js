var test = require('blue-tape'),
	ViewProvider = require('../../dist/index').ViewProvider;

test('ViewProvider should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ViewProvider, 'object');
});
