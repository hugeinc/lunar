'use strict';

var Application = require('bv-application/index');
var Home = require('bv-application/home/index');

angular.module('app.home')
    .service('HomeService', HomeService);

function HomeService($http) {
    angular.extend(this, Application.Service.extend(Home.actions));

    this.addMiddleware({
        action: Home.actions.GET_TITLE,
        before: function(data) {
             return $http({
                 method: 'GET',
                 url: 'http://localhost:4000/posts'
             });
            // throw 'pééé';
            return 'bla ' + data;
        },
        after: function(data) {
            // throw 'pééé';
            // return $http({
            //     method: 'GET',
            //     url: 'http://localhost:4000/posts'
            // });

            return 'André disse ' + data;
        }
    });

    return this.service;
}

HomeService.$inject = ['$http'];