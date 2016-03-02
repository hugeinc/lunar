var actionStrings = require('./actions-string');
var ActionsCreator = require('../../dist/orbit').Orbit.ActionsCreator;

module.exports = ActionsCreator(actionStrings);
