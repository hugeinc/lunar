'use strict';

import test from 'blue-tape';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

let moduleMock = sinon.spy();
let createModuleMock = sinon.spy();
let createProxyMock = sinon.spy();
let createActivatorMock = sinon.spy();

const Orbit = proxyquire('../../src/index',{
  './core/factories/module.factory': createModuleMock,
  './core/factories/proxy.factory': createProxyMock,
  './core/factories/activator.factory': createActivatorMock
});

test('Orbit', function(t) {
  let orbitModule = Orbit(moduleMock);

  orbitModule.createModule();
  orbitModule.createProxy();
  orbitModule.createActivator();

  t.plan(9);

  t.equal(Orbit instanceof Function, true, 'should be an function');

  t.equal(orbitModule.createModule instanceof Function, true, 'should contain createModule function');
  t.equal(orbitModule.createProxy instanceof Function, true, 'should contain createModule function');
  t.equal(orbitModule.createActivator instanceof Function, true, 'should contain createModule function');
  t.equal(typeof orbitModule.Logger, 'object', 'should contain the Logger');
  t.equal(typeof orbitModule.Mediator, 'object', 'should contain the Mediator');

  t.equal(createModuleMock.calledOn(moduleMock), true, `should have been called with 'moduleMock' as 'this'`);
  t.equal(createProxyMock.calledOn(moduleMock), true, `should have been called with 'moduleMock' as 'this'`);
  t.equal(createActivatorMock.calledOn(moduleMock), true, `should have been called with 'moduleMock' as 'this'`);

  t.end();
});
