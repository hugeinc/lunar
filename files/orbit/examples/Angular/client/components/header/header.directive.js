'use strict';

angular
    .module('app.header')
    .directive('bvHeader', HeaderDirective);

function HeaderDirective() {
    var directive = {
        templateUrl: '../components/header/header.html',
        link: function (scope, element, attr) {
            var actions = scope.actions;

            scope.getTitle = function(params) {
                scope.methods[actions.GET_TITLE](params).then(function(data) {
                    // scope.title = data.data[0].title;
                    scope.title = data;
                    if (!scope.$root.$$phase) scope.$digest();
                }, function(err) {
                    console.log('Error: ', err);
                });
            }
        },
        scope: {
            title: '=',
            actions: '=',
            methods: '='
        },
        restrict: 'E'
    };

    return directive;
}
