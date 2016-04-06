import test from 'blue-tape';
import Orbit from '../../src/index';
import objectMock from '../mocks/object';

let app = Orbit(objectMock),
  module = app.createModule();

app.Logger.setLevel('OFF');

test('Activator from Module', function(t) {
  let activator = {};

  t.plan(2);

  Orbit(activator).createActivator([module]);

  activator.request[module.actions.ONE](1).then(function(data) {
    t.equal(data, 2, 'should call Modules function "plus one" and increase the value sent by one');

    activator.addMiddleware({
      action: module.actions.ONE,
      before: function(n) {
        return n + 1
      },
      after: function(n) {
        return n + 1
      }
    });

    return activator.request[module.actions.ONE](1);
  }).then(function(data) {
    t.equal(data, 4, 'should call middlewares and Modules function "plus one" and increase the value sent by 3');
  });
});

test('Activator from Proxy', function(t) {
  let proxy = {},
    activator = {};

  t.plan(2);

  Orbit(proxy).createProxy([module]);

  proxy.addMiddleware({
    action: module.actions.TWO,
    before: function(n) {
      return n + 1
    },
    after: function(n) {
      return n + 1
    }
  });

  Orbit(activator).createActivator([proxy]);

  activator.request[module.actions.ONE](1).then(function(data) {
    t.equal(data, 2, 'should call Modules function "plus one" and increase the value sent by one');
  });

  activator.request[module.actions.TWO](1).then(function(data) {
    t.equal(data, 5, 'should call middlewares and Modules function "plus one" and increase the value sent by 4');
  });
});
