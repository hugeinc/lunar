import test from 'blue-tape';
import _ from 'lodash';
import Orbit from '../../src/index';
import RandomGenerator from '../mocks/random';

Orbit.Logger.setLevel('OFF');

let ModelExample = {
	initialize: function(actions) {
		let middlewares = RandomGenerator.randomMiddleware(actions);

		_.extend(this, Orbit.ActionEmitter.extend(actions));

		for(let middleware in middlewares) {
			this.addMiddleware(middlewares[middleware]);
		}
	}
};

let ViewExample = {
	initialize: function(model) {
		_.extend(this, Orbit.ViewProvider.extend([model.service]));
	},
	test: function() {
		let methods = Object.getOwnPropertySymbols(this.methods),
			promises = [];

		for(let method in methods) {
			promises.push(this.methods[methods[method]]());
		}

		return Promise.all(promises);
	}
};

let Objects = RandomGenerator.randomObjects(3),
	Actions = _.extend({}, Objects[0].actions, Objects[1].actions, Objects[2].actions),
	mockResults = [].concat(Objects[0].mockResults, Objects[1].mockResults, Objects[2].mockResults),
	realResults;

ModelExample.initialize(Actions);
ViewExample.initialize(ModelExample);

test('Model actions length should be equal to actions length', function(t) {
	t.plan(1);
	t.equal(Object.keys(Actions).length, Object.keys(ModelExample.service.actions).length);
});

test('Processed results should be equal to the actions number', function(t) {
	t.plan(1);

	ViewExample.test().then(function(results) {
		realResults = results;
		t.equal(results.length, Object.keys(Actions).length);
	});
});

test('Mocked synchronus results array should be equal to real promised results', function(t) {
	t.plan(1);
	t.deepEqual(mockResults, realResults);
});
