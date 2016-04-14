'use strict';

import actions from './actions';

let proxyMock = () => {
  return {
    Proxy: {
      actions,
      doAction: data => Promise.resolve(data)
    },
    addMiddleware: () => {}
  };
};

export default proxyMock;
