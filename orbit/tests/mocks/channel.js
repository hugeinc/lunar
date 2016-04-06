'use strict';

let moduleMock = {
  subscribe: () => 'hey',
  request: (params) => {
    return Promise.resolve(params.data + 1);
  }
};

export default moduleMock;
