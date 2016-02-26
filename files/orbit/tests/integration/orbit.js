var test = require('blue-tape'),
	_ = require('lodash'),
	Orbit = require('../../dist/index');

var Example = Orbit.Class.extend({
	props: {
		number: 0
	},
	methods: {
		ONE: function(n) {
			var n = n || 0;
			
			this.number = n + 1;

			return this.number;
		},
		TWO: function(n) {
			var n = n || 0;
			
			this.number = n + 2;

			return this.number;
		}
	},
	actions: {
		ONE: 'ONE',
		TWO: 'TWO'
	}
});	

var AppExample = {
	state: {
		number: 0
	},
	dispatcher: function() {
		_.extend(this, Orbit.Dispatcher(Example.actions));
	},
	test: function(n) {
		var self = this;
		this.dispatcher();

		return this.methods[this.actions.ONE](n).then(function(data) {
            self.state.number = data;
        }, function(err) {
            console.log('Error: ', err);
        });
	}
};

test('Example should have a number prop', function(t) {
	t.plan(1);

	t.equal(typeof Example.number, 'number');
	t.end();
});

test('Example.number should be 0', function(t) {
	t.plan(1);

	t.equal(Example.number, 0);
	t.end();
});

test('Example.number should be 1', function(t) {
	t.plan(1);

	Example.ONE();
	t.equal(Example.number, 1);
	t.end();
});

test('Example.number should be 6', function(t) {
	t.plan(1);

	Example.ONE(5);
	t.equal(Example.number, 6);
	t.end();
});

test('Example.number should be 2', function(t) {
	t.plan(1);

	Example.TWO();
	t.equal(Example.number, 2);
	t.end();
});

test('Example.number should be 7', function(t) {
	t.plan(1);

	Example.TWO(5);
	t.equal(Example.number, 7);
	t.end();
});

test('AppExample.state.number should be 1', function(t) {
	t.plan(1);

	AppExample.test().then(function() {
		t.equal(AppExample.state.number, 1);
		t.end();
	});
});

test('AppExample.state.number should be 101', function(t) {
	t.plan(1);

	AppExample.test(100).then(function() {
		t.equal(AppExample.state.number, 101);
		t.end();
	});
});