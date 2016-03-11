import Mediator from './core/mediator/channel';
import Class from './core/factories/application-class.factory';
import ViewProvider from './core/factories/view-provider.factory';
import ActionEmitter from './core/factories/action-emitter.factory';
import Logger from './core/logger/logger';
import Dispatcher from './core/factories/dispatcher.factory';
import ActionsCreator from './core/factories/actions-creator.factory';

function extend(target, source) {
  let merge = Object.assign({}, target, source);

  for (let prop of Object.getOwnPropertySymbols(source)) {
    merge[prop] = source[prop];
  }

  for (let prop of Object.getOwnPropertySymbols(target)) {
    merge[prop] = target[prop];
  }

  return merge;
}

function Orbit(component) {
  function createModule() {
    let module = {
      actions: ActionsCreator(component.actions)
    };

    for (let prop in component) {
      if (prop === 'actions') {
        continue;
      } else if (component[prop] instanceof Function) {
        module[module.actions[prop]] = component[prop];
      } else {
        module[prop] = component[prop];
      }
    }

    return Class.extend(module);
  }

  function createProxy(module) {
    return extend(component, ActionEmitter.extend(module));
  }

  function createActivator(modules, middlewares) {
    if (modules instanceof Array)
      return extend(component, ViewProvider.extend(modules, middlewares));
    else
      return extend(component, Dispatcher(modules, middlewares));
  }

  return {
    createModule,
    createProxy,
    createActivator
  };
}

export default Orbit;
