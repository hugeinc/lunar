import Logger from '../logger/logger';
import createProxy from './proxy.factory';

function createActivator(objects) {
  this.request = {};

  for(let object in objects) {
    if(typeof object.Proxy !== 'undefined') objectIsProxy(object).bind(this);
    if(typeof object.actions !== 'undefined') objectIsModule(object).bind(this);
  }

  delete this.actions;
}

function objectIsProxy(object) {
  let proxy = object.Proxy;

  createActionsMethods(proxy.actions, object).bind(this);
}

function objectIsModule(object) {
  let proxy = {};

  Logger.log({ message: '[Activator.createActivator] Extending Proxy.', level: 'ALL' });

  createProxy([object]).bind(proxy);

  Logger.log({ message: '[Activator.createActivator] Extending Activator.', level: 'ALL' });

  createActionsMethods(proxy.Proxy.actions, proxy).bind(this);
}

function createActionsMethods(actions, proxy) {
  for (let action in actions) {
    this.request[actions[action]] = params => proxy.doAction(actions[action], params);
    Logger.log({ message: `[Activator.createActionsMethods] Created action method for ${actions[action].toString()} - ${proxy}`, level: 'ALL' });
  }
}

export default createActivator;
