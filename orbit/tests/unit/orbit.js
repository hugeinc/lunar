import test from 'blue-tape';
import Orbit from '../../src/index';

test('Orbit', function(t) {
  let moduleMock = {
    n: 1,
    actions: {
      ONE: 'Plus one',
      TWO: 'Plus two'
    },
    ONE: function(n) {
      return n + 1;
    },
    TWO: function(n) {
      return n + 2;
    }
  };
  let orbitModule = Orbit(moduleMock);

  t.equal(Orbit instanceof Function, true, 'should be an function');
  t.equal(orbitModule.createModule instanceof Function, true, 'should contain createModule function');

  test('Orbit.createModule', function(t) {
    let module = orbitModule.createModule();

    t.plan(7);

    t.equal(typeof module, 'object', 'Should return an object');
    t.equal(typeof module.actions, 'object', 'Should have actions');
    t.equal(typeof module.actions.ONE, 'symbol', 'Should convert action ONE into Symbol');
    t.equal(typeof module.actions.TWO, 'symbol', 'Should convert action TWO into Symbol');
    t.equal(module.n, 1, `Should have a property 'n' with value of 1`);
    t.equal(module[module.actions.ONE] instanceof Function, true, `Should have a method on Symbol('Plus one')`);
    t.equal(module[module.actions.TWO] instanceof Function, true, `Should have a method on Symbol('Plus two')`);

    t.end();
  });

  test('Orbit.createProxy', function(t) {
    let module = orbitModule.createModule();
    let proxy = Orbit({}).createProxy([module]);

    t.plan(6);

    t.equal(typeof proxy, 'object', 'Should return an object');
    t.equal(proxy.addMiddleware instanceof Function, true, `Should have method 'addMiddleware'`);
    t.equal(proxy.Proxy.doAction instanceof Function, true, 'Should have method doAction');
    t.equal(typeof proxy.Proxy.actions, 'object', 'Should have actions');
    t.equal(typeof proxy.Proxy.actions.ONE, 'symbol', `Should have action 'ONE' as symbol`);
    t.equal(typeof proxy.Proxy.actions.TWO, 'symbol', `Should have action 'TWO' as symbol`);

    t.end();
  });

  test('Orbit.createActivator', function(t) {
    let module = orbitModule.createModule();
    let proxy = Orbit({}).createProxy(module);
    console.log(module);
    let activator = Orbit({}).createActivator([module]);
    activator.addMiddleware({
        action: module.actions.ONE,
        before: function(data) {
          return 'Before sending the data ' + data;
        },
        after: function(data) {
          return 'After processing the data ' + data;
        }
      });

    t.plan(2);

    t.equal(typeof activator, 'object', 'Should return an object');
    t.equal(activator.addMiddleware instanceof Function, true, `Should have method 'addMiddleware'`);
    // t.equal(proxy.doAction instanceof Function, true, 'Should have method doAction');
    // t.equal(typeof proxy.actions, 'object', 'Should have actions');
    // t.equal(typeof proxy.actions.ONE, 'symbol', `Should have action 'ONE' as symbol`);
    // t.equal(typeof proxy.actions.TWO, 'symbol', `Should have action 'TWO' as symbol`);

    t.end();
  });

  t.end();
});

// test('Orbit should contain Class', function(t) {
//  t.plan(1);

//  t.notEqual(typeof Orbit.Class, 'undefined');
//  t.end();
// });

// test('Orbit should contain ViewProvider', function(t) {
//  t.plan(1);

//  t.notEqual(typeof Orbit.ViewProvider, 'undefined');
//  t.end();
// });

// test('Orbit should contain ActionEmitter', function(t) {
//  t.plan(1);

//  t.notEqual(typeof Orbit.ActionEmitter, 'undefined');
//  t.end();
// });

// test('Orbit should contain Dispatcher', function(t) {
//  t.plan(1);

//  t.notEqual(typeof Orbit.Dispatcher, 'undefined');
//  t.end();
// });

// test('Orbit should contain ActionsCreator', function(t) {
//  t.plan(1);

//  t.notEqual(typeof Orbit.ActionsCreator, 'undefined');
//  t.end();
// });

// test('Orbit should contain Controller', function(t) {
//  t.plan(1);

//  t.notEqual(typeof Orbit.Controller, 'undefined');
//  t.end();
// });

// test('Orbit should contain Service', function(t) {
//  t.plan(1);

//  t.notEqual(typeof Orbit.Service, 'undefined');
//  t.end();
// });
