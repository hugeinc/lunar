import ActionEmitter from '../factories/action-emitter.factory';
import ViewProvider from '../factories/view-provider.factory';
import _ from 'lodash';

function extend(actions, middlewares) {
  let emitter = {},
      dispatcher = {},
      middleware;

  _.extend(emitter, ActionEmitter.extend(actions));

  for (middleware in middlewares) {
    emitter.addMiddleware(middlewares[middleware]);
  }

  _.extend(dispatcher, ViewProvider.extend([emitter.service]));

  return dispatcher;
}

export default extend;
