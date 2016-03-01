'use strict';

var Application = require('bv-application/index');

angular.module('app.home')
    .controller('HomeController', HomeController);

function HomeController(HomeService) {
    var vm = this;
    
    vm.title = 'Hello.';

    angular.extend(this, Application.Controller.extend([HomeService]));
}

HomeController.$inject = ['HomeService'];