import stampit from 'stampit';
import OrbitMediator from '../mediator/channel';
import Q from 'q';

let publicActionEmitterFactory = {
  extend
};

function extend(actions) {
  let stamp = stampit({
    props: {
      service: {
        actions
      }
    }
  });

  return stampit.compose(stamp, internalActionEmitterFactory())();
}

function internalActionEmitterFactory() {
  return stampit().init(function(construct) {
    let instance = construct.instance;

    instance.service = instance.service || {};
    instance.addMiddleware = addMiddleware;
    instance.service.do = doAction;

    function addMiddleware(serviceMiddleware) {
      let action = serviceMiddleware.action;
      instance[`before${action}`] = serviceMiddleware.before;
      instance[`after${action}`] = serviceMiddleware.after;
    }

    function doAction(action, params) {
      let promise = Q.defer(),
          beforeResponse;

      try {
        beforeResponse = executeBeforeCallback(action, params, instance);
        promise = handleBeforeReponseAndMakeRequest(action, beforeResponse, instance);
      } catch (e) {
        promise.reject(e);
        promise = promise.promise;
      }

      return promise;
    }
  });
}

function executeBeforeCallback(action, params, instance) {
  if (actionFunctionExists(`before${action}`, instance)) {
    params = instance[`before${action}`](params);
  }

  return params;
}

function handleBeforeReponseAndMakeRequest(action, response, instance) {
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

function actionFunctionExists(action, instance) {
  return (typeof instance[action] !== 'undefined' && typeof instance[action] === 'function');
}

function isPromise(data) {
  return typeof data !== 'undefined' && typeof data.then !== 'undefined' && typeof data.then === 'function';
}

function requestApplication(action, params, instance) {
  return OrbitMediator.request({ topic: action, data: params })
    .then( data => extractProperDataFromRequest(action, data, instance) );
}

function extractProperDataFromRequest(action, data, instance) {
  if (actionFunctionExists(`after${action}`, instance)) {
    data = instance[`after${action}`](data);
  }

  return data;
}

export default publicActionEmitterFactory;
