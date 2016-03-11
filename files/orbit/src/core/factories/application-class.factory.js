import OrbitMediator from '../mediator/channel';
import Logger from '../logger/logger';

let publicClassFactory = {
  extend: function (object) {
		Logger.log({ message: '[ApplicationClass.extend] Extending ' + JSON.stringify(object) + '.', level: 'ALL' });
    return internalClassFactory(object);
  }
};

function internalClassFactory(object) {
  let instance = Object.assign({}, object);

  instance.actions = object.actions;

  for (let method of Object.getOwnPropertySymbols(object)) {
		Logger.log({ message: `[ApplicationClass.internalClassFactory] Assigning method ${method.toString()}() to object.`, level: 'ALL'});
    instance[method] = object[method].bind(instance);
  }

  registerActions(instance.actions, instance);

  return instance;
}

function registerActions(actions, instance) {
	Logger.log({ message: `[ApplicationClass.registerActions] Trying to register actions`, level: 'ALL'});
  for (let action in actions) {
    if (typeof instance[actions[action]] === 'function') {
			Logger.log(`[ApplicationClass.registerActions] Subscribing to ${actions[action].toString()} action.`, 'ALL');
      OrbitMediator.subscribe({
        topic: actions[action],
        callback: (data) => {
          let response;

					Logger.log(`[ApplicationClass.callback] Action ${actions[action].toString()} callback called with ${data}`, 'ALL');

          try {
          	Logger.log(`[ApplicationClass.callback] ${actions[action].toString()} Promise resolved`, 'ALL');
            response = instance[actions[action]](data);
          } catch (e) {
          	Logger.log(`[ApplicationClass.callback] ${actions[action].toString()} Promise rejected ${e}`, 'ERROR');
            response = e;
          }

          return response;
        }
      });
    } else {
    	Logger.log(`[ApplicationClass.registerActions] ${actions[action].toString()} doesn't have a function callback.`, 'ERROR');
    }
  }
}

export default publicClassFactory;
