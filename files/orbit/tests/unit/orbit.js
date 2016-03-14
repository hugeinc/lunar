'use strict';

import test from 'blue-tape';
import Orbit from '../../src/index';
import moduleMock from '../mocks/module';

test('Orbit', function(t) {
  let orbitModule = Orbit(moduleMock);

  t.equal(Orbit instanceof Function, true, 'should be an function');
  t.equal(orbitModule.createModule instanceof Function, true, 'should contain createModule function');
  t.equal(orbitModule.createProxy instanceof Function, true, 'should contain createModule function');
  t.equal(orbitModule.createActivator instanceof Function, true, 'should contain createModule function');

  t.end();
});
