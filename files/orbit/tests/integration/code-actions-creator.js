var test = require('blue-tape'),
	ActionsCreator = require('../../dist/index').ActionsCreator,
	SimpleActionsExample = require('./mocks/actions-string');

test('Actions constants should be converted to Symbols', function(t) {
	t.plan(4);

	t.equal(typeof SimpleActionsExample.ONE, 'string');
	t.equal(typeof SimpleActionsExample.TWO, 'string');
	t.equal(typeof ActionsCreator(SimpleActionsExample).ONE, 'symbol');
	t.equal(typeof ActionsCreator(SimpleActionsExample).TWO, 'symbol');
});
