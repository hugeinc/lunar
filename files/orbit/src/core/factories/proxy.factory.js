import Logger from '../logger/logger';
import OrbitMediator from '../mediator/channel';

function createProxy(modules) {
  this.Proxy = {};
  this.Proxy.actions = {};
  this.Proxy.doAction = doAction.bind(this);
  this.addMiddleware = addMiddleware.bind(this);

  for(let module in modules) {
    this.Proxy.actions = Object.assign(this.Proxy.actions, module.actions);
  }
}

function addMiddleware(serviceMiddleware) {
  let action = serviceMiddleware.action;

  this[action] = {};
  this[action].before = serviceMiddleware.before;
  this[action].after = serviceMiddleware.after;

  Logger.log({ message: `[Proxy.addMiddleware] Added serviceMiddleware ${serviceMiddleware}`, level: 'ALL' });
}

function doAction(action, params) {
  let promise,
    beforeResponse;

  Logger.log({ message: `[Proxy.doAction] Calling action ${action.toString()} with ${params}`, level: 'ALL' });

  promise = new Promise(function (resolve, reject) {
    try {
      beforeResponse = executeBeforeCallback(action, params, this);
      Logger.log({ message: `[Proxy.doAction] Promise ${action.toString()} resolved.`, level: 'ALL' });
      resolve(handleBeforeResponseAndMakeRequest(action, beforeResponse, this));
    } catch (e) {
      Logger.log({ message: `[Proxy.doAction] Promise ${action.toString()} rejected ${e}`, level: 'ERROR' });
      reject(e);
    }
  });

  return promise;
}

function executeBeforeCallback(action, params, instance) {
  if (middlewareActionFunctionExists(action, instance, 'before')) {
    Logger.log({ message: `[Proxy.executeBeforeCallback] Executing before middleware`, level: 'ALL' });
    params = instance[action].before(params);
  } else {
    Logger.log({ message: `[Proxy.executeBeforeCallback] No before middleware to execute`, level: 'ALL' });
  }

  return params;
}

function handleBeforeResponseAndMakeRequest(action, response, instance) {
  let promise;

  if (isPromise(response)) {
    Logger.log({ message: `[Proxy.handleBeforeResponseAndMakeRequest] Before middleware is a Promise, waiting..`, level: 'ALL' });
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
  Logger.log({ message: `[Proxy.requestApplication] Actually requesting application for ${action.toString(0)} with ${params}`, level: 'ALL' });
  return OrbitMediator.request({ topic: action, data: params })
    .then(data => extractProperDataFromRequest(action, data, instance));
}

function extractProperDataFromRequest(action, data, instance) {
  if (middlewareActionFunctionExists(action, instance, 'after')) {
    Logger.log({ message: `[Proxy.handleBeforeResponseAndMakeRequest] Executing after middleware`, level: 'ALL' });
    data = instance[action].after(data);
  } else {
    Logger.log({ message: `[Proxy.handleBeforeResponseAndMakeRequest] No after middleware to execute`, level: 'ALL' });
  }

  return data;
}

export default createProxy;
