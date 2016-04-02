'use strict';

let moduleMock = {
  n: 1,
  actions: {
    ONE: 'Plus one',
    TWO: 'Plus two'
  },
  ONE: function(n) {
    return n + 1;
  },
  TWO: function(n) {
    return n + 2;
  }
};

export default moduleMock;
