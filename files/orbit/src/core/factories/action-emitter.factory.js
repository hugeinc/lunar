import Logger from '../logger/logger';
import OrbitMediator from '../mediator/channel';

let publicActionEmitterFactory = {
  extend
};

function extend(actions) {
	Logger.log({ message: '[ActionEmitter.extend] Calling internalActionEmitterFactory', level: 'ALL' });
  return internalActionEmitterFactory(actions);
}

function internalActionEmitterFactory(actions) {
  let instance = {};
  instance.service = {};
  instance.service.actions = actions;
  instance.addMiddleware = addMiddleware;
  instance.service.do = doAction;

  function addMiddleware(serviceMiddleware) {
    let action = serviceMiddleware.action;
    instance[action] = {};
    instance[action].before = serviceMiddleware.before;
    instance[action].after = serviceMiddleware.after;

    Logger.log({ message: `[ActionEmitter.addMiddleware] Added serviceMiddleware ${serviceMiddleware}`, level: 'ALL' });
  }

  function doAction(action, params) {
    let promise,
    beforeResponse;

    Logger.log({ message: `[ActionEmitter.doAction] Calling action ${action} with ${params}`, level: 'ALL' });

    promise = new Promise(function (resolve, reject) {
      try {
        beforeResponse = executeBeforeCallback(action, params, instance);
        Logger.log({ message: `[ActionEmitter.doAction] Promise ${action} resolved.`, level: 'ALL' });
        resolve(handleBeforeResponseAndMakeRequest(action, beforeResponse, instance));
      } catch (e) {
      	Logger.log({ message: `[ActionEmitter.doAction] Promise ${action} rejected ${e}`, level: 'ERROR' });
        reject(e);
      }
    });

    return promise;
  }

  return instance;
}

function executeBeforeCallback(action, params, instance) {
  if (middlewareActionFunctionExists(action, instance, 'before')) {
  	Logger.log({ message: `[ActionEmitter.executeBeforeCallback] Executing before middleware`, level: 'ALL' });
    params = instance[action].before(params);
  } else {
  	Logger.log({ message: `[ActionEmitter.executeBeforeCallback] No before middleware to execute`, level: 'ALL' });
  }

  return params;
}

function handleBeforeResponseAndMakeRequest(action, response, instance) {
  let promise;

  if (isPromise(response)) {
  	Logger.log({ message: `[ActionEmitter.handleBeforeResponseAndMakeRequest] Before middleware is a Promise, waiting..`, level: 'ALL' });
    promise = response.then((data) => {
      return requestApplication(action, data, instance);
    });
  } else {
    promise = requestApplication(action, response, instance);
  }

  return promise;
}

function middlewareActionFunctionExists(action, instance, type) {
  return (typeof instance[action] !== 'undefined' &&
					typeof instance[action][type] !== 'undefined' &&
					typeof instance[action][type] === 'function');
}

function isPromise(data) {
  return (typeof data !== 'undefined' &&
					typeof data.then !== 'undefined' &&
					typeof data.then === 'function');
}

function requestApplication(action, params, instance) {
	Logger.log({ message: `[ActionEmitter.requestApplication] Actually requesting application for ${action} with ${params}`, level: 'ALL' });
  return OrbitMediator.request({ topic: action, data: params })
    .then(data => extractProperDataFromRequest(action, data, instance));
}

function extractProperDataFromRequest(action, data, instance) {
  if (middlewareActionFunctionExists(action, instance, 'after')) {
  	Logger.log({ message: `[ActionEmitter.handleBeforeResponseAndMakeRequest] Executing after middleware`, level: 'ALL' });
    data = instance[action].after(data);
  } else {
		Logger.log({ message: `[ActionEmitter.handleBeforeResponseAndMakeRequest] No after middleware to execute`, level: 'ALL' });
  }

  return data;
}

export default publicActionEmitterFactory;
