const OFF = Symbol('No logs will be shown'),
	FATAL = Symbol('Only errors that will break your app will be shown'),
	ERROR = Symbol('Any error will be logged'),
	WARN = Symbol('Errors and warnings will be shown'),
	ALL = Symbol('Everything will be logged and displayed on the console');

const levels = {
	OFF,
	FATAL,
	ERROR,
	WARN,
	ALL
};

let level = levels['OFF'],
	levelString = 'OFF';

let Logger = {
	getLevel() {
		return levelString;
	},
	setLevel(wantedLevel) {
		if(levels[wantedLevel]) {
			level = levels[wantedLevel];
			levelString = wantedLevel;
		}
	},
	log
};

function log(message, messageLevel) {
	let levelsKeys = Object.keys(levels);

	if(levelString === 'OFF') return false;

	if(levelsKeys.indexOf(levelString) >= levelsKeys.indexOf(messageLevel)) {
		return output(message);
	}
}

function getDateString() {
	let now = new Date(),
		period = now.toLocaleString().slice(-3);

	return now.toLocaleString().replace(period, ':' + now.getMilliseconds()) + period;
}

function output(message) {
	let finalMessage = `[${levelString}] ${getDateString()}:\n${message}\n`;

	console.log(finalMessage);
	return finalMessage;
}

export default Logger;
