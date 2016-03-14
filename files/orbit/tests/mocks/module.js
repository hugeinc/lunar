'use strict';

let actions = {
  ONE: Symbol('Plust one'),
  TWO: Symbol('Plus two')
};

let moduleMock = {
  n: 1,
  actions,
  [actions.ONE]: function(n) {
    return Promise.resolve(n + 1);
  },
  [actions.TWO]: function(n) {
    return Promise.resolve(n + 2);
  }
};

export default moduleMock;
