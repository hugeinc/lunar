'use strict';

import Logger from './core/logger/logger';
import Mediator from './core/mediator/channel';
import createModuleFactory from './core/factories/module.factory';
import createProxyFactory from './core/factories/proxy.factory';
import createActivatorFactory from './core/factories/activator.factory';

function Orbit(component) {
  let createModule = createModuleFactory.bind(component),
    createProxy = createProxyFactory.bind(component),
    createActivator = createActivatorFactory.bind(component);

  return {
    Logger,
    Mediator,
    createModule,
    createProxy,
    createActivator
  };
}

export default Orbit;
