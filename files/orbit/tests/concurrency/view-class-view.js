import test from 'blue-tape';
import _ from 'lodash';
import { Orbit } from '../../src/index';
import RandomGenerator from '../mocks/random';

Orbit.Logger.setLevel('OFF');

let ModelExample = {
	initialize: function(actions) {
		let model = this,
			middlewares = RandomGenerator.randomMiddleware(actions);

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
		let results = [],
			methods = Object.getOwnPropertySymbols(this.methods),
			promises = [];

		for(let method in methods) {
			promises.push(this.methods[methods[method]]());
		}

		return Promise.all(promises);
	}
};

let Objects = RandomGenerator.randomObjects(3),
	Actions = _.extend({}, Objects[0].actions, Objects[1].actions, Objects[2].actions);

ModelExample.initialize(Actions);
ViewExample.initialize(ModelExample);

console.log(Object.keys(Actions).length, Object.keys(ModelExample.service.actions).length);

ViewExample.test().then(function(results) {
	console.log('RESULTS', results);
});

// test('I dont know yet what Im testing', function(t) {

// });
