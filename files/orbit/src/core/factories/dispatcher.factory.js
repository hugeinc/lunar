import ActionEmitter from '../factories/action-emitter.factory';
import ViewProvider from '../factories/view-provider.factory';
import Logger from '../logger/logger';
import _ from 'lodash';

function extend(actions, middlewares) {
  let emitter = {},
    dispatcher = {},
		middleware;

	Logger.log({ message: '[Dispatcher.extend] Extending ActionEmitter.', level: 'ALL' });

  _.extend(emitter, ActionEmitter.extend(actions));

  if (typeof middlewares !== 'undefined' && middlewares.length) {
		for (middleware in middlewares) {
			Logger.log({ message: `[Dispatcher.extend] Adding middleware ${middlewares[middleware].toString()}`, level: 'ALL' });
			emitter.addMiddleware(middlewares[middleware]);
		}
	}

  Logger.log({ message: '[Dispatcher.extend] Extending ViewProvider.', level: 'ALL' });
  _.extend(dispatcher, ViewProvider.extend([emitter.service]));

  return dispatcher;
}

export default extend;
