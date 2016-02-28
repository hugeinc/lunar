var test = require('blue-tape'),
	Class = require('../../dist/index').Class,
	Mediator = require('../../dist/index').Mediator;
	SimpleObjectExample = require('./mocks/object');

var OrbitClass = Class.extend(SimpleObjectExample);	
console.log(Mediator, Mediator.bus.getSubscribersFor());
// test('Simple object should be converted to "class"', function(t) {
// 	var OrbitClass = Class.extend(SimpleObjectExample);

// 	t.plan(1);

// });
