const levels = {
	OFF: Symbol('No logs will be shown'),
	FATAL: Symbol('Only errors that will break your app will be shown'),
	ERROR: Symbol('Any error will be logged'),
	WARN: Symbol('Errors and warnings will be shown'),
	INFO: Symbol('Errors, warnings and relevant information will be shown'),
	ALL: Symbol('Everything will be logged and displayed on the console')
};

let Logger = {
	level: levels['OFF'],
	log: log,
	parse: parse
};

function log() {}

function parse() {}

export default Logger;