'use strict';

import test from 'blue-tape';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

let moduleMock = sinon.spy();
let createModuleMock = sinon.spy();
let createProxyMock = sinon.spy();
let createActivatorMock = sinon.spy();

const Lunar = proxyquire('../../src/index',{
  './core/factories/module.factory': createModuleMock,
  './core/factories/proxy.factory': createProxyMock,
  './core/factories/activator.factory': createActivatorMock
});

test('Lunar', function(t) {
  let LunarModule = Lunar(moduleMock);

  LunarModule.createModule();
  LunarModule.createProxy();
  LunarModule.createActivator();

  t.plan(9);

  t.equal(Lunar instanceof Function, true, 'should be an function');

  t.equal(LunarModule.createModule instanceof Function, true, 'should contain createModule function');
  t.equal(LunarModule.createProxy instanceof Function, true, 'should contain createModule function');
  t.equal(LunarModule.createActivator instanceof Function, true, 'should contain createModule function');
  t.equal(typeof LunarModule.Logger, 'object', 'should contain the Logger');
  t.equal(typeof LunarModule.Mediator, 'object', 'should contain the Mediator');

  t.equal(createModuleMock.calledOn(moduleMock), true, `should have been called with 'moduleMock' as 'this'`);
  t.equal(createProxyMock.calledOn(moduleMock), true, `should have been called with 'moduleMock' as 'this'`);
  t.equal(createActivatorMock.calledOn(moduleMock), true, `should have been called with 'moduleMock' as 'this'`);

  t.end();
});
