import Logger from './core/logger/logger';
import Mediator from './core/mediator/channel';
import createModule from './core/factories/module.factory';
import createActivator from './core/factories/activator.factory.js';
import createProxy from './core/factories/proxy.factory.js';

function Orbit(component) {
  let createModule = createModule.bind(component),
    createProxy = createProxy.bind(component),
    createActivator = createActivator.bind(component);

  return {
    Logger,
    Mediator,
    createModule,
    createProxy,
    createActivator
  }
}

export default Orbit;
