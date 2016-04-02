import test from 'blue-tape';
import ActionsCreator from '../../src/core/factories/actions-creator.factory';
import ActionsStrings from '../mocks/actions-string';

test('ActionsCreator should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ActionsCreator, 'function');
});

test('ActionsCreator should convert actions strings to actions symbols', function(t) {
	t.plan(2);

	t.equal(typeof ActionsCreator(ActionsStrings).ONE, 'symbol');
	t.equal(typeof ActionsCreator(ActionsStrings).TWO, 'symbol');
});
