define('Mediator', ['postaljs/postal.js', 'postaljs/postal.request-response', 'q'], function(postal, rp, Q) {
    postal.configuration.promise.createDeferred = function() {
        return Q.defer();
    };

    postal.configuration.promise.getPromise = function(dfd) {
        return dfd.promise;
    };

    return postal.channel('ORBIT');
});
