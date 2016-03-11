import ActionEmitter from '../factories/action-emitter.factory';
import ViewProvider from '../factories/view-provider.factory';
import Logger from '../logger/logger';

function extend(module, middlewares) {
  let dispatcher = {},
    emitter = {};

  Logger.log({ message: '[Dispatcher.extend] Extending ActionEmitter.', level: 'ALL' });

  Object.assign(emitter, ActionEmitter.extend(actions));

  if (typeof middlewares !== 'undefined' && middlewares.length) {
    for (let middleware in middlewares) {
      Logger.log({ message: `[Dispatcher.extend] Adding middleware ${middlewares[middleware].toString()}`, level: 'ALL' });
      emitter.addMiddleware(middlewares[middleware]);
    }
  }

  Logger.log({ message: '[Dispatcher.extend] Extending ViewProvider.', level: 'ALL' });
  Object.assign(dispatcher, ViewProvider.extend([emitter.service]));

  return dispatcher;
}

export default extend;
