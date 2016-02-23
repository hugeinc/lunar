import stampit from 'stampit';
import OrbitMediator from '../mediator/channel';

let publicClassFactory = {
	extend: function(options) {
    let { props, methods } = options;

		let stamp = stampit({
			props,
			methods
		});

    return stampit.compose(stamp, internalClassFactory(options.actions))();
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
