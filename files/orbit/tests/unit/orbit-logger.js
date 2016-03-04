import test from 'blue-tape';
import Logger from '../../src/core/logger/logger';

test('Logger should be an object', function(t) {
	t.plan(1);

	t.equal(typeof Logger, 'object');
});

test('Logger.log should be a function', function(t) {
	t.plan(1);

	t.equal(typeof Logger.log, 'function');
});

test('Logger.getLevel should be a function', function(t) {
	t.plan(1);

	t.equal(typeof Logger.getLevel, 'function');
});

test('Logger.setLevel should be a function', function(t) {
	t.plan(1);

	t.equal(typeof Logger.setLevel, 'function');
});

test('Logger.getLevel should return the levelString, default to OFF', function(t) {
	t.plan(1);

	t.equal(Logger.getLevel(), 'OFF');
});

test('Logger.setLevel should set the level', function(t) {
	t.plan(1);

	Logger.setLevel('ALL');

	t.equal(Logger.getLevel() , 'ALL');
});

test('Logger.log should not return if level is different than the one chosen', function(t) {
	t.plan(1);

	Logger.setLevel('OFF');

	t.equal(Logger.log('Testing a message', 'WARN'), false);
});

test('Logger.log should return if level is equal than the one chosen', function(t) {
	t.plan(1);

	Logger.setLevel('WARN');

	t.equal(Logger.log('Testing a message', 'WARN'), '[WARN] Testing a message');
});

test('Logger.log should show no log if OFF', function(t) {
	t.plan(1);

	Logger.setLevel('OFF');

	t.equal(Logger.log('Testing a message', 'WARN'), false);
});

test('Logger.log should show only FATAL if set FATAL', function(t) {
	t.plan(4);

	Logger.setLevel('FATAL');

	t.equal(Logger.log('Testing a message', 'FATAL'), '[FATAL] Testing a message');
	t.equal(Logger.log('Testing a message', 'ERROR'), undefined);
	t.equal(Logger.log('Testing a message', 'WARN'), undefined);
	t.equal(Logger.log('Testing a message', 'ALL'), undefined);

});
