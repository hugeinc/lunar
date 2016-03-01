define('Application', ['./core/mediator/channel',
			'./core/factories/application-class.factory',
			'./core/factories/view-provider.factory',
			'./core/factories/action-emitter.factory',
			'./core/factories/dispatcher.factory'], function(Mediator, Class, ViewProvider, ActionEmitter, Dispatcher) {
	return {
		Mediator: Mediator,
		Class: Class,
		ViewProvider: ViewProvider,
		ActionEmitter: ActionEmitter,
		Controller: ViewProvider,
		Service: ActionEmitter,
		Dispatcher: Dispatcher
	};
});