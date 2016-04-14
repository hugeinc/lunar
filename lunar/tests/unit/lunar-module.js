'use strict';

import test from 'blue-tape';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import objectMock from '../mocks/object';
import channelMock from '../mocks/channel';

test('Lunar.createModule', function(t) {
  sinon.spy(objectMock, 'ONE');
  sinon.spy(objectMock, 'TWO');
  channelMock.subscribe = sinon.spy();

  let createModule = proxyquire('../../src/core/factories/module.factory', {
    '../mediator/channel': channelMock
  });

  let module = createModule.call(objectMock);

  module[module.actions.ONE](1);
  module[module.actions.TWO](1);

  t.plan(16);

  t.equal(createModule instanceof Function, true, 'Should return an object');
  t.equal(typeof module, 'object', 'Should return an object');
  t.equal(module.n, 1, `Should have a property 'n' with value of 1`);

  t.equal(typeof module.actions, 'object', 'Should have actions');
  t.equal(typeof module.actions.ONE, 'symbol', 'Should convert action ONE into Symbol');
  t.equal(typeof module.actions.TWO, 'symbol', 'Should convert action TWO into Symbol');

  t.equal(module[module.actions.ONE] instanceof Function, true, `Should have a method on Symbol('Plus one')`);
  t.equal(objectMock.ONE.calledOnce, true, `Should have been called once`);
  t.equal(objectMock.ONE.calledWithExactly(1), true, `Should have been called with 1`);
  t.equal(objectMock.ONE.returned(2), true, `Should have returned 2`);

  t.equal(module[module.actions.TWO] instanceof Function, true, `Should have a method on Symbol('Plus two')`);
  t.equal(objectMock.TWO.calledOnce, true, `Should have been called once`);
  t.equal(objectMock.TWO.calledWithExactly(1), true, `Should have been called with 1`);
  t.equal(objectMock.TWO.returned(3), true, `Should have returned 3`);

  t.equal(channelMock.subscribe.calledTwice, true, `Should been called twice`);
  t.equal(channelMock.subscribe.calledWith(sinon.match({ topic: sinon.match.typeOf('symbol'), callback: sinon.match.instanceOf(Function) })), true, `Should been called twice`);

  test('without an method reference to the action', function(t) {
    t.plan(1);

    t.throws(() => createModule.call({ actions: { THREE: 'Plus three' } }), /Method not found for action/, 'Should throw an Error');

    t.end();
  });

  t.end();
});
