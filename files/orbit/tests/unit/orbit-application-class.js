var test = require('blue-tape'),
	Orbit = require('../../dist/index').Orbit,
	SimpleObjectExample = require('../mocks/object'),
	Class = Orbit.Class,
	Mediator = Orbit.Mediator;

test('Simple object should be converted to "class"', function(t) {
	var OrbitClass;

	Mediator.unsubscribe({ topic: SimpleObjectExample.actions.ONE });
	Mediator.unsubscribe({ topic: SimpleObjectExample.actions.TWO });

	OrbitClass = Class.extend(SimpleObjectExample);

	t.plan(12);

	t.equal(typeof SimpleObjectExample, 'object');
	t.equal(typeof SimpleObjectExample.number, 'number');
	t.equal(typeof SimpleObjectExample.actions, 'object');
	t.equal(typeof SimpleObjectExample.actions.ONE, 'symbol');
	t.equal(typeof SimpleObjectExample.actions.TWO, 'symbol');
	t.equal(typeof SimpleObjectExample[SimpleObjectExample.actions.ONE], 'function');
	t.equal(typeof SimpleObjectExample[SimpleObjectExample.actions.TWO], 'function');

	t.equal(typeof OrbitClass.actions, 'object');
	t.equal(typeof OrbitClass.actions.ONE, 'symbol');
	t.equal(typeof OrbitClass.actions.TWO, 'symbol');
	t.equal(typeof OrbitClass[OrbitClass.actions.ONE], 'function');
	t.equal(typeof OrbitClass[OrbitClass.actions.TWO], 'function');
});
