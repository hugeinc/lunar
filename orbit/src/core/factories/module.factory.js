'use strict';

import OrbitMediator from '../mediator/channel';
import Logger from '../logger/logger';

function createModule() {
  let instance = Object.assign({}, this);

  instance.actions = actionsCreator(this.actions);

  for (let action in instance.actions) {
    Logger.log({ message: `[Module.createModule] Assigning method ${instance.actions[action].toString()}() to object.`, level: 'ALL'});
    if (instance[action] instanceof Function) {
      instance[instance.actions[action]] = instance[action].bind(instance);
    } else {
      Logger.log(`[Module.createModule] ${action} doesn't have a function callback.`, 'ERROR');
      throw Error(`Method not found for action '${action}'`);
    }
    delete instance[action];
  }

  registerActions(instance.actions, instance);

  return instance;
}

function actionsCreator(actions) {
  let symbolActions = {};

  Logger.log({ message: '[Module.actionsCreator] Trying to create actions.', level: 'ALL' });

  for (let action in actions) {
    Logger.log({ message: `[Module.actionsCreator] Creating action ${action}.`, level: 'ALL' });
    symbolActions[action] = Symbol(action);
  }

  return symbolActions;
}

function registerActions(actions, instance) {
  Logger.log({ message: `[Module.registerActions] Trying to register actions`, level: 'ALL'});

  for (let action in actions) {
    Logger.log(`[Module.registerActions] Subscribing to ${action} action.`, 'ALL');
    OrbitMediator.subscribe({
      topic: actions[action],
      callback: (data) => {
        let response;

        Logger.log(`[Module.callback] Action ${action} callback called with ${data}`, 'ALL');

        try {
          Logger.log(`[Module.callback] ${action} Promise resolved`, 'ALL');
          response = instance[actions[action]](data);
        } catch (e) {
          Logger.log(`[Module.callback] ${action} Promise rejected ${e}`, 'ERROR');
          response = e;
        }

        return response;
      }
    });
  }
}

export default createModule;
