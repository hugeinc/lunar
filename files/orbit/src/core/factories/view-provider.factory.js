let publicViewProviderFactory = {
  extend
};

function extend(services) {
	return internalViewProviderFactory(services);
}

function internalViewProviderFactory(services) {
	let instance = {};
	instance.actions = {};
	instance.methods = {};

	for (let serviceObject in services) {
		let service = services[serviceObject];

		if (!service.actions) continue;

		collectActions(service.actions, instance);
		createActionsMethods(service.actions, service, instance);
	}

	return instance;
}

function collectActions(actions, instance) {
  for (let action in actions) {
    instance.actions[action] = actions[action];
  }
}

function createActionsMethods(actions, service, instance) {
  for (let action in actions) {
    instance.methods[actions[action]] = params => service.do(actions[action], params);
  }
}

export default publicViewProviderFactory;
