import Logger from '../logger/logger';

let publicViewProviderFactory = {
  extend
};

function extend(services) {
	Logger.log({ message: '[ViewProvider.extend] Calling internalViewProviderFactory', level: 'ALL' });
  return internalViewProviderFactory(services);
}

function internalViewProviderFactory(services) {
  let instance = {};
  instance.methods = {};

  for (let serviceObject in services) {
    let service = services[serviceObject];

    if (!service.actions) {
    	Logger.log({ message: `[ViewProvider.internalViewProviderFactory] No actions in service ${serviceObject}`, level: 'WARN' });
    	continue;
    }

    createActionsMethods(service.actions, service, instance);
  }

  delete instance.actions;

  return instance;
}

function createActionsMethods(actions, service, instance) {
  for (let action in actions) {
    instance.methods[actions[action]] = params => service.do(actions[action], params);
    Logger.log({ message: `[ViewProvider.createActionsMethods] Created action method for ${actions[action].toString()} - ${service}`, level: 'ALL' });
  }
}

export default publicViewProviderFactory;
