'use strict';

import Logger from '../logger/logger';
import createProxy from './proxy.factory';

function createActivator(objects) {
  let instance = this;

  instance.request = {};

  for (let object of objects) {
    if (typeof object.Proxy !== 'undefined') objectIsProxy(object, instance);
    if (typeof object.actions !== 'undefined') objectIsModule(object, instance);
  }

  delete instance.actions;

  return instance;
}

function objectIsProxy(object, instance) {
  let proxy = object.Proxy;

  createActionsMethods(proxy.actions, object, instance);
}

function objectIsModule(object, instance) {
  let proxy;

  Logger.log({ message: '[Activator.createActivator] Extending Proxy.', level: 'ALL' });

  proxy = createProxy.call({}, [object]);
  instance.addMiddleware = proxy.addMiddleware;

  Logger.log({ message: '[Activator.createActivator] Extending Activator.', level: 'ALL' });

  createActionsMethods(proxy.Proxy.actions, proxy, instance);
}

function createActionsMethods(actions, proxy, instance) {
  for (let action in actions) {
    instance.request[actions[action]] = params => proxy.Proxy.doAction(actions[action], params);
    Logger.log({ message: `[Activator.createActionsMethods] Created action method for ${actions[action].toString()} - ${proxy}`, level: 'ALL' });
  }
}

export default createActivator;
