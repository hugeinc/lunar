define('DispatcherFactory', ['bv-application/core/factories/action-emitter.factory', 'bv-application/core/factories/view-provider.factory', 'lodash'], function(ActionEmitter, ViewProvider, _) {
    function extend(actions, middlewares) {
        var emitter = {},
            dispatcher = {},
            middleware;

        _.extend(emitter, ActionEmitter.extend(actions));

        for (middleware in middlewares) {
            emitter.addMiddleware(middlewares[middleware]);
        }

        _.extend(dispatcher, ViewProvider.extend([emitter.service]));

        return dispatcher;
    }

    return extend;
});