'use strict';

var routes = require('./home.routes.json!');

angular
    .module('app.home')
    .config(homeRun);

function homeRun($stateProvider, $urlRouterProvider) {
    var i, routesArray = routes.routes;

    for (i = 0; i < routesArray.length; i++) {
        $stateProvider
            .state(routesArray[i].state, {
                url: routesArray[i].url,
                templateUrl: routesArray[i].templateUrl,
                controller: routesArray[i].controller,
                controllerAs: 'vm'
            });
    }

    $urlRouterProvider.otherwise('/');
}
