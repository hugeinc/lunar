import OrbitMediator from '../mediator/channel';
import Logger from '../logger/logger';

let publicClassFactory = {
  extend: function (object) {
		Logger.log('[ApplicationClass] Extending ' + JSON.stringify(object) + '.', 'ALL');

    return internalClassFactory(object);
  }
};

function internalClassFactory(object) {
  let instance = Object.assign({}, object);

  instance.actions = object.actions;

  for (let method of Object.getOwnPropertySymbols(object)) {
    instance[method] = object[method].bind(instance);
  }

  registerActions(instance.actions, instance);

  return instance;
}

function registerActions(actions, instance) {
  for (let action in actions) {
    if (typeof instance[actions[action]] === 'function') {
      OrbitMediator.subscribe({
        topic: actions[action],
        callback: (data) => {
          let response;

          try {
            response = instance[actions[action]](data);
          } catch (e) {
            response = e;
          }

          return response;
        }
      });
    }
  }
}

export default publicClassFactory;
