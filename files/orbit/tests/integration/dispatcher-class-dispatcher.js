import test from 'blue-tape';
import _ from 'lodash';
import { Orbit } from '../../src/index';
import SimpleObjectExample from '../mocks/object';

Orbit.Mediator.unsubscribe({ topic: SimpleObjectExample.actions.ONE });
Orbit.Mediator.unsubscribe({ topic: SimpleObjectExample.actions.TWO });

let Example = Orbit.Class.extend(SimpleObjectExample);

let AppExample = {
	state: {
		number: 0
	},
	dispatcher: function() {
		_.extend(this, Orbit.Dispatcher(Example.actions));
	},
	test: function(n) {
		let self = this;
		this.dispatcher();

		return this.methods[Example.actions.ONE](n).then(function(data) {
			self.state.number = data;
		}, function(err) {
			console.log('Error: ', err);
		});
	}
};

let AppExampleWithMiddleware = {
	state: {
		number: 0
	},
	dispatcher: function() {
		_.extend(this, Orbit.Dispatcher(Example.actions, [
			{
				action: Example.actions.ONE,
				before: function(data) {
					return 'Before sending the data ' + data + '.';
				},
				after: function(data) {
					return data + ' After getting the data and before setting state.';
				}
			}
		]));
	},
	test: function(n) {
		let self = this;
		this.dispatcher();

		return this.methods[Example.actions.ONE](n).then(function(data) {
			self.state.number = data + ' Just set the state.';
		}, function(err) {
			console.log('Error: ', err);
		});
	}
};

test('AppExample.state.number should be 1', function(t) {
	t.plan(1);

	AppExample.test().then(function() {
		t.equal(AppExample.state.number, 1);
	});
});

test('AppExample.state.number should be 101', function(t) {
	t.plan(1);

	AppExample.test(100).then(function() {
		t.equal(AppExample.state.number, 101);
	});
});

test('AppExampleWithMiddleware.state.number should have data from all middlewares and class.', function(t) {
	t.plan(1);

	AppExampleWithMiddleware.test(1).then(function() {
		t.equal(AppExampleWithMiddleware.state.number, 'Before sending the data 1.1 After getting the data and before setting state. Just set the state.');
	});
});

test('AppExampleWithMiddleware.state.number should have data from all middlewares and class.', function(t) {
	t.plan(1);

	AppExampleWithMiddleware.test(100).then(function() {
		t.equal(AppExampleWithMiddleware.state.number, 'Before sending the data 100.1 After getting the data and before setting state. Just set the state.');
	});
});
