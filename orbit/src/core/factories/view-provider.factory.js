import stampit from 'stampit';

let publicViewProviderFactory = {
  extend
};

function extend(services) {
  let stamp = stampit({
    props: {
      services
    }
  });

  return stampit.compose(stamp, internalViewProviderFactory())();
}

function internalViewProviderFactory() {
  return stampit().init(function(construct) {
    let instance = construct.instance,
        serviceObject;

    for (let serviceObject in instance.services) {
      let service = instance.services[serviceObject];

      if (!service.actions) continue;

      instance.actions = collectActions(service.actions, service);
      instance.methods = createActionsMethods(service.actions, service);
    }

    delete instance.services;
  });
}

function collectActions(actions) {
  let actionsCollection = {};

  for (let action in actions) {
    actionsCollection[action] = actions[action];
  }

  return actionsCollection;
}

function createActionsMethods(actions) {
  let methods = {};

  for (let action in actions) {
    methods[actions[action]] = params => service.do(service.actions[action], params);
  }

  return methods;
}

export default publicViewProviderFactory;
