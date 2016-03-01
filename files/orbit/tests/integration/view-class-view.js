var test = require('blue-tape'),
	_ = require('lodash'),
	Orbit = require('../../dist/index').Orbit,
	SimpleObjectExample = require('../mocks/object');

Orbit.Mediator.unsubscribe({ topic: SimpleObjectExample.actions.ONE });
Orbit.Mediator.unsubscribe({ topic: SimpleObjectExample.actions.TWO });

var Example = Orbit.Class.extend(SimpleObjectExample);

var ModelExample = {
	state: { text: '' },
	initialize: function () {
		var model = this;
		_.extend(this, Orbit.ActionEmitter.extend(Example.actions));

		this.addMiddleware({
			action: Example.actions.ONE,
			after: function(data) {
				model.state.text = data;
			}
		});
	}
};

var ModelWithBeforeMiddlewareExample = {
	state: { text: '' },
	initialize: function () {
		var model = this;
		_.extend(this, Orbit.ActionEmitter.extend(Example.actions));

		this.addMiddleware({
			action: Example.actions.ONE,
			before: function(data) {
				return data + 500;
			},
			after: function(data) {
				model.state.text = data;
			}
		});
	}
};

var ViewExample = {
	initialize: function(model) {
		_.extend(this, Orbit.ViewProvider.extend([model.service]));
	},
	test: function(n) {
		return this.methods[Example.actions.ONE](n);
	}
};

test('ModelExample.state.text should be 1', function(t) {
	t.plan(1);

	ModelExample.initialize();
	ViewExample.initialize(ModelExample);

	ViewExample.test().then(function() {
		t.equal(ModelExample.state.text, 1);
	});
});

test('ModelExample.state.text should be 101', function(t) {
	t.plan(1);

	ModelExample.initialize();
	ViewExample.initialize(ModelExample);

	ViewExample.test(100).then(function() {
		t.equal(ModelExample.state.text, 101);
	});
});

test('ModelWithBeforeMiddlewareExample should be 601, with data from view, before middleware and class.', function(t) {
	t.plan(1);

	ModelWithBeforeMiddlewareExample.initialize();
	ViewExample.initialize(ModelWithBeforeMiddlewareExample);

	ViewExample.test(100).then(function() {
		t.equal(ModelWithBeforeMiddlewareExample.state.text, 601);
	});
});
