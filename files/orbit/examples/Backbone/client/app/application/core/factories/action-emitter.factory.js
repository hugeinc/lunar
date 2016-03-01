define('ActionEmitter', ['stampit', 'bv-application/core/mediator/channel', 'q'], function(stampit, ApplicationMediator, Q) {
    var publicActionEmitterFactory = {
        extend: extend
    };

    function extend(actions) {
        var stamp = stampit({
            props: {
                service: {
                    actions: actions
                }
            }
        });

        return stampit.compose(stamp, internalActionEmitterFactory())();
    }

    function internalActionEmitterFactory() {
        return stampit().init(function(construct) {
            var instance = construct.instance;

            instance.service = instance.service || {};
            instance.addMiddleware = addMiddleware;
            instance.service.do = doAction;

            function addMiddleware(serviceMiddleware) {
                var action = serviceMiddleware.action;
                instance['before' + action] = serviceMiddleware.before;
                instance['after' + action] = serviceMiddleware.after;
            }

            function doAction(action, params) {
                var promise = Q.defer(),
                    beforeResponse;

                try {
                    beforeResponse = executeBeforeCallback(action, params, instance);    
                    promise = handleBeforeReponseAndMakeRequest(action, beforeResponse, instance);
                } catch(e) {
                    promise.reject(e);
                    promise = promise.promise;
                }

                return promise;
            };
        });
    }

    function executeBeforeCallback(action, params, instance) {
        if (actionFunctionExists('before' + action, instance)) {
            params = instance['before' + action](params);
        }

        return params;
    }

    function handleBeforeReponseAndMakeRequest(action, response, instance) {
        var promise;

        if (isPromise(response)) {
            promise = response.then(function(data) {
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
        return ApplicationMediator.request({ topic: action, data: params }).then(function(data) {
            return extractProperDataFromRequest(action, data, instance);
        });
    }

    function extractProperDataFromRequest(action, data, instance) {
        if (actionFunctionExists('after' + action, instance)) {
            data = instance['after' + action](data);

            if (isPromise(data)) {
                data = data.then(function(response) {
                    return response;
                });
            }
        }

        return data;
    }

    return publicActionEmitterFactory;
});