'use strict';

import test from 'blue-tape';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

import moduleMock from '../mocks/module';
import channelMock from '../mocks/channel';

sinon.spy(channelMock, 'request');

const createProxy = proxyquire('../../src/core/factories/proxy.factory', {
  '../mediator/channel': channelMock
});

test('Orbit.createProxy', function(t) {
  let proxy = createProxy.call({}, [moduleMock]);

  t.plan(6);

  t.equal(typeof proxy, 'object', 'Should return an object');
  t.equal(proxy.addMiddleware instanceof Function, true, `Should have method 'addMiddleware'`);
  t.equal(proxy.Proxy.doAction instanceof Function, true, 'Should have method doAction');
  t.equal(typeof proxy.Proxy.actions, 'object', 'Should have actions');
  t.equal(typeof proxy.Proxy.actions.ONE, 'symbol', `Should have action 'ONE' as symbol`);
  t.equal(typeof proxy.Proxy.actions.TWO, 'symbol', `Should have action 'TWO' as symbol`);

  test('doAction', function(t) {
    t.plan(4);

    let resultONE = proxy.Proxy.doAction(proxy.Proxy.actions.ONE, 1);
    let resultTWO = proxy.Proxy.doAction(proxy.Proxy.actions.TWO, 1);

    t.equal(resultONE instanceof Promise, true, `Should return a promise`);
    t.equal(resultTWO instanceof Promise, true, `Should return a promise`);
    t.equal(channelMock.request.calledWith({ topic: moduleMock.actions.ONE, data: 1 }), true, `Should have been called with right params`);
    t.equal(channelMock.request.calledWith({ topic: moduleMock.actions.TWO, data: 1 }), true, `Should have been called with right params`);

  });

  test('addMiddleware', function(t) {
    t.plan(6);

    let beforeMiddlewareSpy = sinon.spy((n) => n);
    let afterMiddlewareSpy = sinon.spy((n) => n);

    proxy.addMiddleware({
      action: proxy.Proxy.actions.ONE,
      before: beforeMiddlewareSpy,
      after: afterMiddlewareSpy
    });

    let promise = proxy.Proxy.doAction(proxy.Proxy.actions.ONE, 1);

    t.equal(channelMock.request.calledWith({ topic: moduleMock.actions.ONE, data: 1 }), true, `Should have been called with right params`);

    promise.then((data) => {
      t.equal(beforeMiddlewareSpy.calledWith(1), true, `Should have been called with '1'`);
      t.equal(afterMiddlewareSpy.calledWith(2), true, `Should have been called with '2'`);
      t.equal(beforeMiddlewareSpy.calledOnce, true, `Should have been called once`);
      t.equal(afterMiddlewareSpy.calledOnce, true, `Should have been called once`);

      t.equal(data, 2, `Should have been called with '2'`);

      t.end();
    });
  });

  test('addMiddleware returning a promise', function(t) {
    t.plan(6);

    let beforeMiddlewareSpy = sinon.spy((n) => Promise.resolve(n));
    let afterMiddlewareSpy = sinon.spy((n) => Promise.resolve(n));

    proxy.addMiddleware({
      action: proxy.Proxy.actions.ONE,
      before: beforeMiddlewareSpy,
      after: afterMiddlewareSpy
    });

    let promise = proxy.Proxy.doAction(proxy.Proxy.actions.ONE, 1);

    t.equal(channelMock.request.calledWith({ topic: moduleMock.actions.ONE, data: 1 }), true, `Should have been called with right params`);

    promise.then((data) => {
      t.equal(beforeMiddlewareSpy.calledWith(1), true, `Should have been called with '1'`);
      t.equal(afterMiddlewareSpy.calledWith(2), true, `Should have been called with '2'`);
      t.equal(beforeMiddlewareSpy.calledOnce, true, `Should have been called once`);
      t.equal(afterMiddlewareSpy.calledOnce, true, `Should have been called once`);

      t.equal(data, 2, `Should have been called with '2'`);

      t.end();
    });
  });

  test('addMiddleware returning a rejected promise', function(t) {
    t.plan(5);

    let beforeMiddlewareSpy = sinon.spy(() => {
      throw Error('Error!');
    });
    let afterMiddlewareSpy = sinon.spy();

    proxy.addMiddleware({
      action: proxy.Proxy.actions.ONE,
      before: beforeMiddlewareSpy,
      after: afterMiddlewareSpy
    });

    let promise = proxy.Proxy.doAction(proxy.Proxy.actions.ONE, 1);

    t.equal(channelMock.request.calledWith({ topic: moduleMock.actions.ONE, data: 1 }), true, `Should have been called with right params`);

    promise.catch((err) => {
      t.equal(beforeMiddlewareSpy.calledWith(1), true, `Should have been called with '1'`);
      t.throws(beforeMiddlewareSpy, /Error/, `Should have been called with '1'`);
      t.equal(afterMiddlewareSpy.notCalled, true, `Should have been called with '2'`);

      t.equal(err instanceof Error, true, `Should have been called with '2'`);

      t.end();
    });
  });

  t.end();
});
