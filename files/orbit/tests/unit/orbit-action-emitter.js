import test from 'blue-tape';
import ActionEmitter from '../../src/core/factories/proxy.factory.js';
import ActionsSymbols from '../mocks/actions-symbols';

test('ActionEmitter should be an object', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter, 'object');
});

test('ActionEmitter should have an extend function', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter.extend, 'function');
});

test('ActionEmitter should return an object when actions are given', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter.extend(ActionsSymbols), 'object');
});

test('ActionEmitter output should contain a service object', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter.extend(ActionsSymbols).service, 'object');
});

test('ActionEmitter output service should contain an actions object', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter.extend(ActionsSymbols).service.actions, 'object');
});

test('ActionEmitter output service should contain a do() method', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter.extend(ActionsSymbols).service.do, 'function');
});

test('ActionEmitter output should contain an addMiddleware() function', function(t) {
	t.plan(1);

	t.equal(typeof ActionEmitter.extend(ActionsSymbols).addMiddleware, 'function');
});
