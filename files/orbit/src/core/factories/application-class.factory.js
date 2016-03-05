import OrbitMediator from '../mediator/channel';
import Logger from '../logger/logger';

let publicClassFactory = {
  extend: function (object) {
		Logger.log({ message: '[ApplicationClass] Extending ' + JSON.stringify(object) + '.', level: 'ALL' });

    return internalClassFactory(object);
  }
};

function internalClassFactory(object) {
  let instance = Object.assign({}, object);

  instance.actions = object.actions;

  for (let method of Object.getOwnPropertySymbols(object)) {
		Logger.log(`[ApplicationClass.internalClassFactory] Assigning method ${method.toString()}() to object.`, 'ALL');
    instance[method] = object[method].bind(instance);
  }

  registerActions(instance.actions, instance);

  return instance;
}

function registerActions(actions, instance) {
  for (let action in actions) {
    if (typeof instance[actions[action]] === 'function') {
			Logger.log(`[ApplicationClass.registerActions] Subscribing to ${actions[action].toString()} action.`, 'ALL');
      OrbitMediator.subscribe({
        topic: actions[action],
        callback: (data) => {
          let response;

					Logger.log(`[ApplicationClass.callback] Action ${action} callback called with ${data}`, 'ALL');

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
