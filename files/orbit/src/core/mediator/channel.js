'use strict';

import Logger from '../logger/logger';

const subscriptions = {},
	channel = {
    subscribe,
    unsubscribe,
    request
  };

function subscribe(options) {
	Logger.log({ message: `[Mediator.subscribe] Trying to subscribe.`, level: 'ALL' });
  if (typeof subscriptions[options.topic] !== 'undefined') {
  	Logger.log({ message: `[Mediator.subscribe] Topic already exists.`, level: 'FATAL' });
    throw new Error(`Topic already exist, exiting.`);
  }
  Logger.log({ message: `[Mediator.subscribe] Subscribed.`, level: 'ALL' });
  subscriptions[options.topic] = options.callback;
}

function unsubscribe(subscription) {
	Logger.log({ message: `[Mediator.unsubscribe] Trying to unsubscribe.`, level: 'ALL' });
  if (typeof subscriptions[subscription.topic] === 'undefined') {
  	Logger.log({ message: `[Mediator.unsubscribe] Topic doesn't exist.`, level: 'WARN' });
  	return false;
  }
  delete subscriptions[subscription.topic];
  Logger.log({ message: `[Mediator.unsubscribe] Topic unsubscribed.`, level: 'ALL' });
}

function request(envelope) {
	Logger.log({ message: `[Mediator.request] Trying to request callback with ${envelope.data}.`, level: 'ALL' });
  if (typeof subscriptions[envelope.topic] === 'undefined') {
  	Logger.log({ message: `[Mediator.request] Topic does not exists.`, level: 'ERROR' });
    throw new Error(`Topic does not exist, exiting.`);
  }

  Logger.log({ message: `[Mediator.request] Requested, returning Promise.`, level: 'ALL' });
  return new Promise(function (resolve, reject) {
    try {
    	Logger.log({ message: `[Mediator.request] Promise resolved`, level: 'ALL' });
      resolve(subscriptions[envelope.topic](envelope.data));
    } catch (e) {
    	Logger.log({ message: `[Mediator.request] Promise rejected ${e}`, level: 'ERROR' });
      reject(e);
    }
  });
}

export default channel;
