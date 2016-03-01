import OrbitMediator from '../mediator/channel';

let publicActionEmitterFactory = {
  extend
};

function extend(actions) {
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
	}

	function doAction(action, params) {
		let promise,
			beforeResponse;

		promise = new Promise(function(resolve, reject) {
			try {
				beforeResponse = executeBeforeCallback(action, params, instance);
				resolve(handleBeforeResponseAndMakeRequest(action, beforeResponse, instance));
			} catch (e) {
				reject(e);
			}
		});

		return promise;
	}

	return instance;
}

function executeBeforeCallback(action, params, instance) {
  if (middlewareActionFunctionExists(action, instance, 'before')) {
    params = instance[action].before(params);
  }

  return params;
}

function handleBeforeResponseAndMakeRequest(action, response, instance) {
  let promise;

  if (isPromise(response)) {
    promise = response.then((data) => {
      return requestApplication(action, data, instance);
    });
  } else {
    promise = requestApplication(action, response, instance);
  }

  return promise;
}

function middlewareActionFunctionExists(action, instance, type) {
  return (typeof instance[action] !== 'undefined' && typeof instance[action][type] !== 'undefined' && typeof instance[action][type] === 'function');
}

function isPromise(data) {
  return typeof data !== 'undefined' && typeof data.then !== 'undefined' && typeof data.then === 'function';
}

function requestApplication(action, params, instance) {
  return OrbitMediator.request({ topic: action, data: params })
    .then( data => extractProperDataFromRequest(action, data, instance) );
}

function extractProperDataFromRequest(action, data, instance) {
  if (middlewareActionFunctionExists(action, instance, 'after')) {
    data = instance[action].after(data);
  }

  return data;
}

export default publicActionEmitterFactory;
