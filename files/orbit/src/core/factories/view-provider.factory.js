let publicViewProviderFactory = {
  extend
};

function extend(services) {
  return internalViewProviderFactory(services);
}

function internalViewProviderFactory(services) {
  let instance = {};
  instance.methods = {};

  for (let serviceObject in services) {
    let service = services[serviceObject];

    if (!service.actions) continue;

    createActionsMethods(service.actions, service, instance);
  }

  delete instance.actions;

  return instance;
}

function createActionsMethods(actions, service, instance) {
  for (let action in actions) {
    instance.methods[actions[action]] = params => service.do(actions[action], params);
  }
}

export default publicViewProviderFactory;
