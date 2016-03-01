var test = require('blue-tape'),
	ActionsCreator = require('../../dist/index').ActionsCreator,
	ActionsStrings = require('../mocks/actions-string');

test('ActionsCreator should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ActionsCreator, 'function');
});

test('ActionsCreator should convert actions strings to actions symbols', function(t) {
	t.plan(2);

	t.equal(typeof ActionsCreator(ActionsStrings).ONE, 'symbol');
	t.equal(typeof ActionsCreator(ActionsStrings).TWO, 'symbol');
});
