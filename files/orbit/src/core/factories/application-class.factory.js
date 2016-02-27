import stampit from 'stampit';
import OrbitMediator from '../mediator/channel';

let publicClassFactory = {
	extend: function(options) {
    let { props, methods, actions } = options;

		let stamp = stampit({
			props
		});

    let stampClass = stampit.compose(stamp, internalClassFactory(actions))();

    for (let method of Object.getOwnPropertySymbols(methods)) {
    	stampClass.__proto__[method] = methods[method];
    }

    return stampClass;
  }
};

function internalClassFactory(actions) {
  return stampit().init(function(construct) {
    let instance = construct.instance;

    instance.actions = actions;
    registerActions(actions, instance);
  });
}

function registerActions(actions, instance) {
	for (let action in actions) {
		if (typeof instance[actions[action]] === 'function') {
			OrbitMediator.subscribe({
				topic: actions[action],
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
