var actionStrings = require('./actions-string');
var ActionsCreator = require('../../dist/index').Orbit.ActionsCreator;

module.exports = ActionsCreator(actionStrings);
