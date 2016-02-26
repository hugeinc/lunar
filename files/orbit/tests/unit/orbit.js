var test = require('blue-tape'),
	Orbit = require('../../dist/index');

test('Orbit should be an object', function(t) {
	t.plan(1);

	t.equal(typeof Orbit, 'object');
});

test('Orbit should contain Mediator', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Mediator, 'undefined');
});

test('Orbit should contain Class', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Class, 'undefined');
});

test('Orbit should contain ViewProvider', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.ViewProvider, 'undefined');
});

test('Orbit should contain ActionEmitter', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.ActionEmitter, 'undefined');
});

test('Orbit should contain Dispatcher', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Dispatcher, 'undefined');
});

test('Orbit should contain ActionsCreator', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.ActionsCreator, 'undefined');
});

test('Orbit should contain Controller', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Controller, 'undefined');
});

test('Orbit should contain Service', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Service, 'undefined');
});
