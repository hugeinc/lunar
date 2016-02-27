var test = require('blue-tape'),
	ActionsCreator = require('../../dist/index').ActionsCreator;

test('ActionsCreator should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ActionsCreator, 'function');
});
