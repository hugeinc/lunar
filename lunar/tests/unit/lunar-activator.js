'use strict';

import test from 'blue-tape';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import proxyMockModel from '../mocks/proxy';
import moduleMock from '../mocks/module';

const proxyMock = sinon.spy(proxyMockModel);

const createActivator = proxyquire('../../src/core/factories/activator.factory', {
  './proxy.factory': proxyMock
});

test('Lunar.createActivator', function(t) {

  test('From a module', function(t) {
    let activator = createActivator.call({}, [moduleMock]);

    t.plan(7);
    t.equal(Object.getOwnPropertySymbols(activator.request)[0], moduleMock.actions.ONE);
    t.equal(typeof activator, 'object', 'Should return an object');
    t.equal(activator.addMiddleware instanceof Function, true, `Should have method 'addMiddleware'`);
    t.equal(typeof activator.request, 'object', `Should have property 'request' as an Object`);
    t.equal(activator.request[moduleMock.actions.ONE] instanceof Function, true, `Should have methods on 'request' property`);
    t.equal(activator.request[moduleMock.actions.TWO] instanceof Function, true, `Should have methods on 'request' property`);
    t.equal(proxyMock.calledWithMatch([moduleMock]), true, `Should call 'proxy' with the right params`);

    t.end();
  });

  test('From a proxy', function(t) {
    let proxyInstanceMock = proxyMock.call({}, [moduleMock]);
    proxyInstanceMock.Proxy.doAction = sinon.spy((n) => n);

    let activator = createActivator.call({}, [proxyInstanceMock]);

    activator.request[proxyInstanceMock.Proxy.actions.ONE]('test-data');

    t.plan(5);

    t.equal(typeof activator, 'object', 'Should return an object');
    t.equal(typeof activator.request, 'object', `Should have property 'request' as an Object`);
    t.equal(activator.request[proxyInstanceMock.Proxy.actions.ONE] instanceof Function, true, `Should have methods on 'request' property`);
    t.equal(activator.request[proxyInstanceMock.Proxy.actions.TWO] instanceof Function, true, `Should have methods on 'request' property`);
    t.equal(proxyInstanceMock.Proxy.doAction.calledWith(proxyInstanceMock.Proxy.actions.ONE, 'test-data'), true, `Should call internal method 'doAction' with the right params`);

    t.end();
  });

  t.end();
});
