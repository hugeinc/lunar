define('ApplicationClass', ['stampit', 'bv-application/core/mediator/channel'], function(stampit, ApplicationMediator) {
	var publicClassFactory = {
		extend: function(options) {
			var stamp = stampit({
				props: options.props,
				methods: options.methods
			});

			return stampit.compose(stamp, internalClassFactory(options.actions))();
		}
	};

	function internalClassFactory(actions) {
		return stampit().init(function(construct) {
			var instance = construct.instance,
				action,
				i;

			instance.actions = actions;
			registerActions(actions, instance);
		});
	}

	function registerActions(actions, instance) {
		for (action in actions) {
			if (typeof instance[actions[action]] === 'function') {
				ApplicationMediator.subscribe({
					topic: actions[action],
					callback: function(data, envelope) {
						var response, error;

						try {
							response = instance[actions[action]](data);
						} catch(e) {
							error = e;
						} finally {
							envelope.reply(error, response);
						}
					}
				});
			}
		}
	}

	return publicClassFactory;
});
