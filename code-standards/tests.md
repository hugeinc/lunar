## Table of Contents
3. Tests
	1. [Unit tests](#tests-unit)
	2. [Integration tests](#tests-integration)
	3. [Coverage](#tests-coverage)

<a name="tests"></a>
## 3. Tests

<a name="tests-unit"></a>
### 3.1 Unit tests

#### Rules
Unit tests should test the smallest parts of the application, such as individual functions or directives. Every single unit test should be atomic, in other words, they should be completely order-independent, causing no side effects to the application itself. The main goal is to test each function's behaviour individually, in order to guarantee its independence and efficiency.

#### Good Practices

##### Each unit test should be independent
Test each function's behaviour at a time. Otherwise, the success or failure of your test will rely upon other function's behaviour, which won't represent the actual state of the application.

##### Don't make unnecessary assertions
Consistently define which behaviour is being tested, avoiding assertions that have already been made in other tests or that don't relate to the actual scope. Unnecessary assertions can interfere in the test result and its execution can become slower.

##### Mock external resources and states
If a particular function receives a specific state of the application or an external resource as arguments, mock these elements in a way that your test become independent of any other components.

##### Use consistent names and descriptions
This advice is fit for any kind of software test: when naming or describing your test, expose exactly which function or directive is being tested, what are its arguments and what is the expected result. This improves the legibility and makes debugging a lot easier.

#### Recommended use cases
According to the Test Driven Development methodology, it's highly recommended that you write a unit test before developing any function or directive in the application.


#### How To's: Developing and Running
On the folder of the function or directive you want to test, create a file with the same name and add the suffix .spec before the .js file extension. For example, on-press-handler.spec.js. 

<a name="tests-integration"></a>
### 3.2 Integration tests

#### Rules
Integration tests test the interaction between two or more functions that together form a functionality. This kind of software test assures that each individual nucleus of a group of functions can correctly interact with each other, so that each functionality have the expected behaviour.

#### Good Practices

##### Use an isolated database for integration tests
During the execution of an integration test suite, there can be a lot of data manipulation operations that require direct access to the database. For this reason, it's prudent to create an isolated database so these operations don't affect the production environment, in a way that the production database doesn't get unstable and that there is no interference with the application's real data.

##### Create all necessary data before running the test
Make sure all necessary objects and data for each particular test have been previously mocked or created. Due to this action, it's possible to avoid failure cases in which the problem doesn't relate to the function itself, but to the lack of a proper dataset.

#### Recommended Use Cases 

Whenever there is a bigger function that uses smaller functions in its core, develop an integration test. For example, if we have a function called calculateTotalInterestRate() and it returns (getAccountBalance(accountNumber) - availablePersonalCredit(accountNumber)) * simpleRate * daysAmount. 
In case the function returns a specific result, preferably test it using integration tests other than acceptance tests, because the execution of acceptance tests are a lot slower.


#### How To's: Developing and Running
Create the test file into the folder "integration" and name it after the function or directive you're testing, followed by the suffix integration.spec.js. For example, calculate-total-interest-rate.integration.spec.js.

<a name="tests-coverage"></a>
### 3.3 Coverage

#### Threshold Reporter

On Threshold Reporter it's possible to specify minimum percentages of coverage for each individual module, so that tests fail if the coverage falls below the given threshold.
Statements, branches, functions and lines have a minimum of 90%, 60%, 85% and 90% of coverage, respectively. 

##### Coverage Reports
Coverage reports are generated automatically everytime a unit or integration test suit is executed, displaying the coverage report immediately after the test results, as well as creating an html coverage report and a cobertura-coverage.xml file on the coverage folder.

<a name="tests-code-analysis"></a>
### 3.4 Code Analysis

#### Code Analysis Reports
Reports related to code performance and maintainability are generated using Plato and are stored on the code-analysis-reports folder. To generate a new report, enter the plato -r -d client/site/code-analysis-reports client/app client/components client/assets/styles/*.scss commandline on the project's root folder. 
