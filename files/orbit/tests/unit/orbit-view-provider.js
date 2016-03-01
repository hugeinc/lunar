var test = require('blue-tape'),
	ActionEmitter = require('../../dist/index').ActionEmitter,
	ActionsSymbols = require('../mocks/actions-symbols'),
	ViewProvider = require('../../dist/index').ViewProvider;

test('ViewProvider should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ViewProvider, 'object', 'UHUUUUL');
});

test('ViewProvider should have an extend method', function(t) {
	t.plan(1);

	t.equal(typeof ViewProvider.extend, 'function');
});

test('ViewProvider extend output should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ViewProvider.extend([ActionEmitter.extend(ActionsSymbols).service]), 'object');
});

test('ViewProvider extend output should contain a methods object', function(t) {
	t.plan(1);

	t.equal(typeof ViewProvider.extend([ActionEmitter.extend(ActionsSymbols).service]).methods, 'object');
});

test('ViewProvider extend output should contain a methods object with action symbol functions', function(t) {
	t.plan(2);

	t.equal(typeof ViewProvider.extend([ActionEmitter.extend(ActionsSymbols).service]).methods[ActionsSymbols.ONE], 'function');
	t.equal(typeof ViewProvider.extend([ActionEmitter.extend(ActionsSymbols).service]).methods[ActionsSymbols.TWO], 'function');
});
