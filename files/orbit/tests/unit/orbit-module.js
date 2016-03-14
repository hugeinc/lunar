'use strict';

import test from 'blue-tape';
import sinon from 'sinon';
import createModule from '../../src/core/factories/module.factory';
import objectMock from '../mocks/object';

test('Orbit.createModule', function(t) {
  sinon.spy(objectMock, 'ONE');
  sinon.spy(objectMock, 'TWO');

  let module = createModule.call(objectMock);

  module[module.actions.ONE](1);
  module[module.actions.TWO](1);

  t.plan(14);

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

  t.end();
});
