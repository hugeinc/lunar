define('ViewProviderFactory', ['stampit'], function(stampit) {
    var publicViewProviderFactory = {
        extend: extend
    };

    function extend(services) {
        var stamp = stampit({
            props: {
                services: services
            }
        });

        return stampit.compose(stamp, internalViewProviderFactory())();
    }

    function internalViewProviderFactory() {
        return stampit().init(function(construct) {
            var instance = construct.instance,
                serviceObject;

            for (serviceObject in instance.services) {
                var service = instance.services[serviceObject];

                if (!service.actions) continue;

                instance.actions = collectActions(service.actions, service);
                instance.methods = createActionsMethods(service.actions, service);
            }

            delete instance.services;
        });
    }

    function collectActions(actions, service) {
        var actionsCollection = {},
            action;

        for (action in actions) {
            actionsCollection[action] = actions[action];
        }

        return actionsCollection;
    }

    function createActionsMethods(actions, service) {
        var methods = {},
            action;

        for (action in actions) {
            methods[actions[action]] = function(params) {
                return service.do(service.actions[action], params);
            }
        }

        return methods;
    }

    return publicViewProviderFactory;
});