var test = require('blue-tape'),
	Orbit = require('../../dist/index');

test('Orbit should be an object', function(t) {
	t.plan(1);

	t.equal(typeof Orbit, 'object');
	t.end();
});

test('Orbit should contain Mediator', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Mediator, 'undefined');
	t.end();
});

test('Orbit should contain Class', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Class, 'undefined');
	t.end();
});

test('Orbit should contain ViewProvider', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.ViewProvider, 'undefined');
	t.end();
});

test('Orbit should contain ActionEmitter', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.ActionEmitter, 'undefined');
	t.end();
});

test('Orbit should contain Dispatcher', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Dispatcher, 'undefined');
	t.end();
});

test('Orbit should contain ActionsCreator', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.ActionsCreator, 'undefined');
	t.end();
});

test('Orbit should contain Controller', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Controller, 'undefined');
	t.end();
});

test('Orbit should contain Service', function(t) {
	t.plan(1);

	t.notEqual(typeof Orbit.Service, 'undefined');
	t.end();
});
