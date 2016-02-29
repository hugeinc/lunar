var test = require('blue-tape'),
	Orbit = require('../../dist/index'),
	SimpleObjectExample = require('./mocks/object'),
	Class = Orbit.Class,
	Mediator = Orbit.Mediator;

test('Simple object should be converted to "class"', function(t) {
	var OrbitClass;

	Mediator.unsubscribe({ topic: SimpleObjectExample.actions.ONE });
	Mediator.unsubscribe({ topic: SimpleObjectExample.actions.TWO });
	
	OrbitClass = Class.extend(SimpleObjectExample);

	t.plan(14);

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
	t.equal(typeof OrbitClass.actions.TWO, 'symbol');

	t.equal(typeof OrbitClass.__proto__, 'object');
	t.equal(OrbitClass.__proto__[OrbitClass.actions.ONE] instanceof Function, true);
	t.equal(OrbitClass.__proto__[OrbitClass.actions.TWO] instanceof Function, true);
});
