import test from 'blue-tape';
import _ from 'lodash';
import Lunar from '../../src/index';
import RandomGenerator from '../mocks/random';

Lunar().Logger.setLevel('OFF');

let ModelExample = {
	initialize: function(modules) {
		let middlewares = RandomGenerator.randomMiddleware(modules);

		Lunar(this).createProxy(modules);

		for(let middleware in middlewares) {
			this.addMiddleware(middlewares[middleware]);
		}
	}
};

let ViewExample = {
	initialize: function(model) {
		Lunar(this).createActivator([model]);
	},
	test: function() {
		let methods = Object.getOwnPropertySymbols(this.request),
			promises = [];

		for(let method in methods) {
			promises.push(this.request[methods[method]]());
		}

		return Promise.all(promises);
	}
};

let Objects = RandomGenerator.randomObjects(3),
	mockResults = _.flatten([Objects[0].mockResults, Objects[1].mockResults, Objects[2].mockResults]),
	realResults;

ModelExample.initialize(Objects);
ViewExample.initialize(ModelExample);

test('Processed results should be equal to the actions number', function(t) {
	t.plan(1);

	ViewExample.test().then(function(results) {
		realResults = results;
		t.equal(results.length, Object.keys(ModelExample.Proxy.actions).length);
	});
});

test('Mocked synchronus results array should be equal to real promised results', function(t) {
	t.plan(1);
	t.deepEqual(mockResults, realResults);
});
