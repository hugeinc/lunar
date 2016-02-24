import stampit from 'stampit';

let publicViewProviderFactory = {
  extend: extend
};

function extend(services) {
  let stamp = stampit({
    props: {
      services: services
    }
  });

  return stampit.compose(stamp, internalViewProviderFactory())();
}

function internalViewProviderFactory() {
  return stampit().init(function(construct) {
    let instance = construct.instance,
        serviceObject;

    for (serviceObject in instance.services) {
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
    methods[actions[action]] = actionCallback(params);
  }

  return methods;
}

function actionCallback(params) {
  return service.do(service.actions[action], params);
}

export default publicViewProviderFactory;
