import Mediator from './core/mediator/channel';
import Class from './core/factories/application-class.factory';
import ViewProvider from './core/factories/view-provider.factory';
import ActionEmitter from './core/factories/action-emitter.factory';
import Dispatcher from './core/factories/dispatcher.factory';

export default {
	Mediator: Mediator,
	Class: Class,
	ViewProvider: ViewProvider,
	ActionEmitter: ActionEmitter,
	Controller: ViewProvider,
	Service: ActionEmitter,
	Dispatcher: Dispatcher
}