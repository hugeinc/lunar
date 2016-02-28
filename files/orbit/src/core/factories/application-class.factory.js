import stampit from 'stampit';
import OrbitMediator from '../mediator/channel';

let publicClassFactory = {
	extend: function(options) {
    let { props, methods, actions } = options;

		let stamp = stampit({
			props
		});

    return stampit.compose(stamp, internalClassFactory(actions, methods))();
  }
};

function internalClassFactory(actions, methods) {
  return stampit().init(function(construct) {
    let instance = construct.instance;

    instance.actions = actions;

    for (let method of Object.getOwnPropertySymbols(methods)) {
      instance.__proto__[method] = methods[method];
    }

    registerActions(actions, instance);
  });
}

function registerActions(actions, instance) {
	for (let action in actions) {
		if (typeof instance[actions[action]] === 'function') {
			OrbitMediator.subscribe({
				topic: action,
				callback: (data, envelope) => {
					let response, error;

          try {
            response = instance[actions[action]](data);
          } catch (e) {
            error = e;
          } finally {
            envelope.reply(error, response);
          }
        }
      });
    }
  }
}

export default publicClassFactory;
