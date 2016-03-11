import test from 'blue-tape';
import Logger from '../../src/core/logger/logger';

function testSuccessfulSingleLog(message, level, t) {
	let log;

	log = Logger.log({ message: message, level: level });

	t.equal(log.includes(`[${level}]`), true);
	t.equal(log.includes(message), true);
}

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

test('Logger.setLevel should set the level', function(t) {
	t.plan(1);

	Logger.setLevel('ALL');

	t.equal(Logger.getLevel() , 'ALL');
});

test('Logger.log should not return if level is different than the one chosen', function(t) {
	t.plan(1);

	Logger.setLevel('OFF');

	t.equal(Logger.log({ message: 'Testing a message', level: 'WARN' }), undefined);
});

test('Logger.log should return if level is equal than the one chosen', function(t) {
	let level = 'WARN';

	t.plan(2);

	Logger.setLevel(level);
	testSuccessfulSingleLog('Testing a message', level, t);
});

test('Logger.log should show no log if OFF', function(t) {
	t.plan(1);

	Logger.setLevel('OFF');

	t.equal(Logger.log({ message: 'Testing a message', level: 'WARN' }), undefined);
});

test('Logger.log should show only FATAL if set FATAL', function(t) {
	t.plan(5);

	Logger.setLevel('FATAL');

	testSuccessfulSingleLog('Testing a message', 'FATAL', t);
	t.equal(Logger.log({ message: 'Testing a message', level: 'ERROR' }), undefined);
	t.equal(Logger.log({ message: 'Testing a message', level: 'WARN' }), undefined);
	t.equal(Logger.log({ message: 'Testing a message', level: 'ALL' }), undefined);

});

test('Logger.log should show ALL logs if ALL is set', function(t) {
	t.plan(8);

	Logger.setLevel('ALL');

	testSuccessfulSingleLog('Testing a message', 'FATAL', t);
	testSuccessfulSingleLog('Testing a message', 'ERROR', t);
	testSuccessfulSingleLog('Testing a message', 'WARN', t);
	testSuccessfulSingleLog('Testing a message', 'ALL', t);
});
