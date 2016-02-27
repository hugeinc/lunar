var test = require('blue-tape'),
	Class = require('../../dist/index').Class,
	SimpleObjectExample = require('./mocks/object');

// console.log(SimpleObjectExample, Class.extend(SimpleObjectExample).__proto__);

test('Simple object should be converted to "class"', function(t) {
	var OrbitClass = Class.extend(SimpleObjectExample);

	t.plan(13);

	t.equal(typeof SimpleObjectExample.props, 'object');
	t.equal(typeof SimpleObjectExample.props.number, 'number');
	t.equal(typeof SimpleObjectExample.methods, 'object');
	t.equal(typeof SimpleObjectExample.actions, 'object');
	t.equal(typeof SimpleObjectExample.actions.ONE, 'symbol');
	t.equal(typeof SimpleObjectExample.actions.TWO, 'symbol');

	t.equal(typeof OrbitClass.props, 'undefined');
	t.equal(typeof OrbitClass.methods, 'undefined');
	t.equal(typeof OrbitClass.actions, 'object');
	t.equal(typeof OrbitClass.actions.ONE, 'symbol');
	t.equal(OrbitClass[OrbitClass.actions.ONE] instanceof Function, true);
	t.equal(typeof OrbitClass.actions.TWO, 'symbol');
	t.equal(OrbitClass[OrbitClass.actions.TWO] instanceof Function, true);

	// t.equal(typeof OrbitClass.__proto__, 'object');
	// t.equal(typeof OrbitClass.__proto__.[OrbitClass.actions.ONE], 'function');
	// t.equal(typeof OrbitClass.__proto__.[OrbitClass.actions.TWO], 'function');
});
