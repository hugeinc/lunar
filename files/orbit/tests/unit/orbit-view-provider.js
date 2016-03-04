import test from 'blue-tape';
import { Orbit } from '../../src/index';
import ActionsSymbols from '../mocks/actions-symbols';
const ActionEmitter = Orbit.ActionEmitter;
const ViewProvider = Orbit.ViewProvider;

test('ViewProvider should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ViewProvider, 'object');
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
