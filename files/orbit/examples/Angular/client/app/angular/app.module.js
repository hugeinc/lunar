var angular = require('angular'),
    core = require('bv-angular/core/core.module'),
    home = require('bv-angular/home/home.module'),
    header = require('components/header/header.module');

angular.module('app', [
    'app.core',
    'app.home',
    'app.header'
]);