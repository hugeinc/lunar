import Orbit from '../index';
import actions from './actions';

var props = {},
	methods = {};

props.title = 'Hello.';

methods.one = function() {
  this.two();
};

methods.two = function() {
  console.log('one called two');
};

methods[actions.GET_TITLE] = function(data) {
  // throw 'Sorry.';
  //return data;
  return `Hello ${data}.`;
  // return data.data[0].title;
};

export default Orbit.Class.extend({
	props,
	methods,
	actions
});
