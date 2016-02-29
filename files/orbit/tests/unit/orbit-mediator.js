'use strict';

var test = require('blue-tape'),
	Mediator = require('../../dist/index').Mediator;

test('Mediator should be an object', function(t) {
	t.plan(1);

	t.equal(typeof Mediator, 'object');
});

test('Mediator.subscriptions should be private', function(t) {
	t.plan(1);

	t.equal(typeof Mediator.subscriptions, 'undefined');
});

test('Mediator.subscribe should be an function', function(t) {
	t.plan(1);

	t.equal(typeof Mediator.subscribe, 'function');
});

test('Mediator.unsubscribe should be an function', function(t) {
	t.plan(1);

	t.equal(typeof Mediator.unsubscribe, 'function');
});

test('Mediator.request should be an function', function(t) {
	t.plan(1);

	t.equal(typeof Mediator.request, 'function');
});

test('Mediator.subscribe should add topic to subscriptions', function(t) {
	const options = { topic: 'ONE', callback: function() {} };

	function toTest() {
		return Mediator.subscribe(options);
	}

	t.plan(1);

	Mediator.subscribe(options);

	t.throws(toTest);
	Mediator.unsubscribe(options);
});

test('Mediator.subscribe should throw if topic exists', function(t) {
	const options = { topic: 'ONE', callback: function() {} };

	function toTest() {
		return Mediator.subscribe(options);
	}

	t.plan(1);

	Mediator.subscribe(options);

	t.throws(toTest);
	Mediator.unsubscribe(options);
});

test('Mediator.unsubscribe should remove topic', function(t) {
	const options = { topic: 'ONE', callback: function() {} };

	function toTest() {
		return Mediator.subscribe(options);
	}

	t.plan(2);

	Mediator.subscribe(options);
	t.throws(toTest);

	Mediator.unsubscribe(options);
	t.doesNotThrow(toTest);
});

test('Mediator.unsubscribe should return false if topic does not exist', function(t) {
	const options = { topic: 'ONE', callback: function() {} };
	let response;

	t.plan(1);

	Mediator.unsubscribe(options);
	response = Mediator.unsubscribe(options);

	t.equal(response, false);
});

test('Mediator.request should throw if topic does not exist', function(t) {
	const envelope = { topic: 'ONE', data: {} };

	function toTest() {
		return Mediator.request(envelope);
	}

	t.plan(1);

	t.throws(toTest);
});

test('Mediator.request should call and return data from topic callback', function(t) {
	const options = { topic: 'ONE', callback: function(data) { return ++data } };
	const envelope = { topic: 'ONE', data: 1 };

	Mediator.subscribe(options);

	t.plan(1)

	Mediator.request(envelope).then(function(data) {
		t.equal(data, 2);
	});
});
