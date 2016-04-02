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
    if (levels[wantedLevel]) {
      level = levels[wantedLevel];
      levelString = wantedLevel;
    }
  },

  log
};

function log(options) {
  if (Array.isArray(options)) {
    return multipleLogs(options);
  } else if (typeof options === 'object') {
    return singleLog(options);
  }
}

function multipleLogs(logs) {
  for (let i = 0; i < logs.length; i++) {
    singleLog(logs[i]);
  }
}

function singleLog({ message=null, level='OFF' } = {}) {
  let levelsKeys = Object.keys(levels);

  if (levelString === 'OFF') return undefined;

  if (levelsKeys.indexOf(levelString) >= levelsKeys.indexOf(level)) {
    return output(message, level);
  }
}

function output(message, level) {
  let finalMessage = `[Orbit.Logger][${level}] ${getDateString()}\n${message}\n`;

	console.log(finalMessage);

	return finalMessage;
}

function getDateString() {
  let now = new Date(),
  period = now.toLocaleString().slice(-3);

  return now.toLocaleString().replace(period, ':' + now.getMilliseconds()) + period;
}

export default Logger;
