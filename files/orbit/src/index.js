import Mediator from './core/mediator/channel';
import Class from './core/factories/application-class.factory';
import ViewProvider from './core/factories/view-provider.factory';
import ActionEmitter from './core/factories/action-emitter.factory';
import Logger from './core/logger/logger';
import Dispatcher from './core/factories/dispatcher.factory';
import ActionsCreator from './core/factories/actions-creator.factory';

export default {
  Orbit: {
		Logger,
    Mediator,
    Class,
    ViewProvider,
    ActionEmitter,
    Dispatcher,
    ActionsCreator,
    Controller: ViewProvider,
    Service: ActionEmitter
  }
};
