import test from 'blue-tape';
import Orbit from '../../src/index';
import objectMock from '../mocks/object';

let app = Orbit(objectMock),
  module = app.createModule(),
  proxy = app.createProxy([module]);

app.Logger.setLevel('OFF');

test('Orbit.createProxy', function(t) {
  t.end();

  test('Proxy.doAction', function(t) {
    t.plan(4);

    let promises = [];
    promises.push(proxy.Proxy.doAction(proxy.Proxy.actions.ONE, 1));
    promises.push(proxy.Proxy.doAction(proxy.Proxy.actions.TWO, 1));

    t.equal(promises[0] instanceof Promise, true, 'Should return a Promise');
    t.equal(promises[1] instanceof Promise, true, 'Should return a Promise');

    Promise.all(promises)
      .then(results => {
        let [result1, result2] = results;

        t.equal(result1, 2, 'Should be equal 2');
        t.equal(result2, 3, 'Should be equal 2');

        t.end();
      });
  });

  test('addMiddleware', function(t) {
    t.plan(2);

    proxy.addMiddleware({
      action: proxy.Proxy.actions.ONE,
      before: data => data + 1,
      after: data => data + 2
    });

    let promise = proxy.Proxy.doAction(proxy.Proxy.actions.ONE, 1);

    t.equal(promise instanceof Promise, true, 'Should return a Promise');

    promise
      .then(result => {
        t.equal(result, 5, 'Should be equal 5');
        t.end();
      });
  });
});
