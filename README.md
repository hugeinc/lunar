# Orbit
### v0.2.0
Making the core of your application framework-independent.

## Index
- **[MVC frameworks and the "oponnent", the problem: Refactoring]("#mvc")**
- **[What we propose]("#proposal")**
- **[Angular Example]("#angular")**
- **[Wiki](https://github.com/hugeinc/orbit/wiki/)**
- **[Installing]("#installing")**
- **[Contributing]("#contributing")**

## MVC frameworks and the "opponent", the problem: Refactoring <a href="#mvc"></a>
Usual frameworks propose a good enough separation of concerns by the three major areas that we deal with:

- Data
- Logic
- User Interface

They get separated into Model Controller and View, which is far better than the mixed cake that we rarely see nowadays. We can say that from bottom up, things change less, progressively: View changes a lot, Controller changes often and Models change rarely. Best case scenario those 3 are decoupled in a way we can reuse M, V and C. Often, we need to do parallel actions and mix Controllers features. That is when things get complicated.

Functional, Reactive programming and alike means a tremendous evolution compared to MVC, when regarding scaling and long-term projects. But the main concern we are trying to deal with here is still in place: Refactoring. We just want to propose an easier way to refactor.
 
Refactoring is a reality nowadays, specially when developing big and long lasting applications. The benefits from Client-Side applications are very clear to us but the number of frameworks and their updates rain on us every week. We might feel tempted to test or do proof of concepts on different platforms, frameworks and philosophies but it seems too difficult that we can stay stuck into the same old application for years.

## What we propose <a href="#proposal"></a>
We just have one concern here, the C of MVC. Controllers usually holds the Business Logic of your application, it is what distinguish your product from others. Frameworks do have their role, and makes view rendering and model sincronization a lot easier. It would just be even easier for us if the Business Logic could be decoupled from tools and easily migrated when needed. So, use any framework or library you want, but keep your core code agnostic.

First, you should separate "framework-code" from "application-code". Frameworks should deal with HTTP requests, view/templaing/virtual-dom rendering, data synchronization and/or database integration if needed. Application should be just functions, pure functions in the best case scenario. Let's see an example.

## Angular Example <a href="#angular"></a>
The Angular team saw that M, V and C are not enough for code decoupling. They added a few extra things like Services, Factories and Providers. Whenever you have code that you will reuse in multiple places, put them into Services. This is very helpful but still coupled. Refactoring means changing your Service, Controller and Directive at least.

![](images/OrbitLayer.png)
[Open full size version](images/OrbitLayer.pdf)

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

```javascript
// Import your actions constant file
import { Orbit } from 'orbit';
import actions from './actions';

// Your core feature code, an object with pure functions
export default Orbit.Class.extend({
	// You can have private properties if you want
	title: 'Orbit',
	actions: actions,
	[actions.FORMAT_TITLE]: function(data) {
		return data + ' ' + this.title;
	},
	[actions.INCREMENT]: function(data) {
		return ++data;
	},
	[actions.DECREMENT]: function(data) {
		return --data;
	}
});
```

### The actions file
Refactors happen all the time. In order to change your code in just one place we use actions constants that will set and get functions for you.
All public functions from the application that you want the framework to be able to access should have an action:

```javascript
import { Orbit } from 'orbit';

export default Orbit.ActionsCreator({
	FORMAT_TITLE: 'FORMAT_TITLE',
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT'
});
```

Let's assume that you consider the Angular Service the holder of logic. Controller the scope provider and the Directive where actions get fired.

```javascript
// Service
// After .extend, the service can add middlewares
// And have the actions and methods built into itself
// through the Orbit factory
angular.module('app.home')
    .service('HomeService', HomeService);

function HomeService($http) {
    angular.extend(this, Orbit.Service.extend(Home.actions));

	// This is optional.
	// You might want to execute something before
	// your core code is run, or after.
    this.addMiddleware({
        action: Home.actions.FORMAT_TITLE,
        before: function(data) {
        	// Orbit will send the Promise
        	// result to your code.
            return $http({
                method: 'GET',
                url: 'http://localhost:4000/posts'
            });
        }
    });

    return this.service;
}

HomeService.$inject = ['$http'];
```
```javascript
// Controller
// The controller doesn't know about Orbit,
// it just uses the service.
// After .extend, it gets the methods bound into its scope.
angular.module('app.home')
    .controller('HomeController', HomeController);

function HomeController(HomeService) {
    var vm = this;
    
    vm.title = 'Hello.';

    angular.extend(this, Orbit.Controller.extend([HomeService]));
}

HomeController.$inject = ['HomeService'];
```
```javascript
// Page template
// We pass actions and methods to the directive.
header(title="vm.title", methods="vm.methods")
```
```javascript
// Directive
// The directive just calls the method which return a promise.
angular
    .module('app.header')
    .directive('header', HeaderDirective);

function HeaderDirective() {
    var directive = {
        templateUrl: '../components/header/header.html',
        link: function (scope, element, attr) {
            var actions = scope.actions;

            scope.getTitle = function(params) {
                scope.methods[actions.FORMAT_TITLE](params).then(function(data) {
                    scope.title = data;
                    if (!scope.$root.$$phase) scope.$digest();
                }, function(err) {
                    console.log('Error: ', err);
                });
            }
        },
        scope: {
            title: '=',
            methods: '='
        },
        restrict: 'E'
    };

    return directive;
}

```

Want to know more? Head to the [wiki](https://github.com/hugeinc/orbit/wiki) to see API explanations, React, Backbone and other examples.

## Installing <a href="#installing"></a>
- Download the [orbit/files/dist/orbit.js](https://github.com/hugeinc/orbit/blob/develop/files/orbit/dist/orbit.js) file and place it in your project.
- Orbit is under UMD. You can require, import it, or use it as a global variable

```javascript
const Orbit = require('vendor/orbit');
// or
import { Orbit } from 'vendor/orbit';
// or global variable
console.log(Orbit);
```

## Contributing? Development instructions <a href="#contributing"></a>

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
