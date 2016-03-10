import { Orbit } from '../../src/index';

const RandomGenerator = {
	randomObjects: randomObjects,
	randomObject: randomObject
};

function randomObjects(numberOfObjects) {
	let objects = [];

	if(numberOfObjects) {
		objects = randomObjectsGenerator(numberOfObjects);
	} else {
		let randomNumberOfObjects = randomNumber();
		objects = randomObjectsGenerator(randomNumberOfObjects);
	}

	return objects;
}

function randomObjectsGenerator(numberOfObjects) {
	let objects = [];

	for (let i = 0; i < numberOfObjects; i++) {
		objects.push(randomObject());
	}

	return objects;
}

function randomObject(numberOfActions) {
	let object = {},
		actions = randomActions(numberOfActions),
		counter = 0;

	object.actions = actions;

	for(let method in actions) {
		let methodCounter = counter;

		object[actions[method]] = function() {
			return methodCounter;
		}

		counter++;
	}

	counter = 0;

	return Orbit.Class.extend(object);
}

function randomActions(numberOfActions) {
	let actions = {};

	if(numberOfActions) {
		actions = randomActionsGenerator(numberOfActions);
	} else {
		let randomNumberOfActions = randomNumber();
		actions = randomActionsGenerator(randomNumberOfActions);
	}

	return Orbit.ActionsCreator(actions);
}

function randomActionsGenerator(numberOfActions) {
	let actions = {};

	for (let i = 0; i < numberOfActions; i++) {
		let actionName = randomString();
		actions[actionName] = actionName;
	}

	return actions;
}

function randomNumber() {
	return Math.floor(Math.random() * 26);
}

function randomString() {
	return String.fromCharCode(65 + randomNumber()) + Date.now();
}

// function randomMiddleware() {}

export default RandomGenerator;
