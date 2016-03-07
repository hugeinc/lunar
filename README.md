# Orbit
### v0.2.0
Making the core of your application framework-independent.

## MVC frameworks and the "opponent"
Usual frameworks propose a good enough separation of concerns by the three major areas that we deal with:

- Data
- Logic
- User Interface

They get separated into Model Controller and View, which is far better than the mixed cake that we rarely see nowadays. We can say that from bottom up, things change less, progressively: View changes a lot, Controller changes often and Models change rarely. Best case scenario those 3 are decoupled in a way we can reuse M, V and C. Often, we need to do parallel actions and mix Controllers features. That is when things get complicated.

Functional, Reactive programming and alike means a tremendous evolution compared to MVC, when regarding scaling and long-term projects. But the main concern we are trying to deal with here is still in place: Refactoring. We just want to propose an easier way to refactor.
 
Refactoring is a reality nowadays, specially when developing big and long lasting applications. The benefits from Client-Side applications are very clear to us but the number of frameworks and their updates rain on us every week. We might feel tempted to test or do proof of concepts on different platforms, frameworks and philosophies but it seems too difficult that we can stay stuck into the same old application for years.

## What we propose
We just have one concern here, the C of MVC. Controllers usually holds the Business Logic of your application, it is what distinguish your product from others. Frameworks do have their role, and makes view rendering and model sincronization a lot easier. It would just be even easier for us if the Business Logic could be decoupled from tools and easily migrated when needed.

First, you should separate "framework-code" from "application-code". Frameworks should deal with HTTP requests, view/templaing/virtual-dom rendering, data synchronization and/or database integration if needed. Application should be just functions, pure functions in the best case scenario. Let's see an example.

## Angular Example

![](images/ApplicationLayer.png)
[Open full size version](images/ApplicationLayerGraph.pdf)

Structure:  

```
/client  
    /orbit  
    /angular
```

## The orbit folder

```
/orbit
	/folder-by-feature
	/eg-home
	/simulator
```	

- Your files will host all functions related to a specific feature.
- Additionally, each feature have a set of public actions.
- If writting tests, add your .spec file in there too.

```
/orbit/home
	home.js
	home.spec.js
	actions.js
```

### The feature main file
You can divide this file into multiple modules as needed, but all functionalities should come into one file at the end.

Your file will look something like this:

```
define('Home', ['orbit', './actions'], function(Orbit, actions) {
	var props = {},
		methods = {};

	props.title = 'Hello.';

	methods.privateMethod = function() {
		this.anotherPrivateMethod();
	};

	methods.anotherPrivateMethod = function() {
		console.log('privateMethod called anotherPrivateMethod');
	};

	methods[actions.GET_TITLE] = function(data) {
		// You can modify, return data or throw error.

		return this.title + ' | ' + data;
	};

	return Orbit.Class.extend({
		props: props,
		methods: methods,
		actions: actions
	});
});
```

### The actions file
Refactors happen all the time. In order to change your code in just one place we use actions constants that will set and get functions for you.
All public functions from the application that you want the framework to be able to access should have an action:

```
define('actions', function() {
   return {
       GET_TITLE: 'FetchTitleFromServer'
   };
});
```

**An Angular example:**  
Let's assume that you consider the Angular Service the holder of logic, Controller the scope provider and the Directive where actions get fired.

```  
// Service
// After .extend the service can add middlewares
// And have the actions and methods built into itself
// through the Orbit factory
angular.module('app.home')
    .service('HomeService', HomeService);

function HomeService($http) {
    angular.extend(this, Orbit.Service.extend(Home.actions));

    this.addMiddleware({
        action: Home.actions.GET_TITLE,
        before: function(data) {
             return $http({
                 method: 'GET',
                 url: 'http://localhost:4000/posts'
             });
            // throw 'pééé';
            return 'bla ' + data;
        }
    });

    return this.service;
}

HomeService.$inject = ['$http'];
```
```
// Controller
// The controller doesn't know about the Orbit,
// it just uses the service.
// After .extend it gets the actions and methods bound into its scope.
angular.module('app.home')
    .controller('HomeController', HomeController);

function HomeController(HomeService) {
    var vm = this;
    
    vm.title = 'Hello.';

    angular.extend(this, Orbit.Controller.extend([HomeService]));
}

HomeController.$inject = ['HomeService'];
```
```
// Page template
// We pass actions and methods to the directive.
bv-header(title="vm.title", actions="vm.actions", methods="vm.methods")
```
```
// Directive
// The directive just calls the method which return a promise.
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

```

Want to know more? Head to the wiki to see API explanations, React, Backbone and other examples.

## Installing
Just download the orbit/files/dist/orbit.js file and placeit in your project.

## Contributing? Development instructions

* Install [Docker](https://docs.docker.com/mac/step_one/)*

```
$ make sdocker
```
Starts Docker default machine, if you are on Mac.

```
$ make setup
```
First time only image setup.

```
$ make up
```
Starts container.

See the **makefile** to see available commands such as unit, integration tests and others.
