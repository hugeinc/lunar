import Logger from '../logger/logger';

const subscriptions = {},
	channel = {
  subscribe,
  unsubscribe,
  request
};

function subscribe(options) {
	Logger.log({ message: `[Mediator.subscribe] Trying to subscribe ${options.topic}.`, level: 'ALL' });
  if (typeof subscriptions[options.topic] !== 'undefined') {
  	Logger.log({ message: `[Mediator.subscribe] Topic ${options.topic} already exists.`, level: 'FATAL' });
    throw new Error(`Topic ${options.topic} already exist, exiting.`);
  }
  Logger.log({ message: `[Mediator.subscribe] ${options.topic} subscribed.`, level: 'ALL' });
  subscriptions[options.topic] = options.callback;
}

function unsubscribe(subscription) {
	Logger.log({ message: `[Mediator.unsubscribe] Trying to unsubscribe ${subscription.topic}.`, level: 'ALL' });
  if (typeof subscriptions[subscription.topic] === 'undefined') {
  	Logger.log({ message: `[Mediator.unsubscribe] Topic ${subscription.topic} doesn't exist.`, level: 'WARN' });
  	return false;
  }
  delete subscriptions[subscription.topic];
  Logger.log({ message: `[Mediator.unsubscribe] Topic ${subscription.topic} unsubscribed.`, level: 'ALL' });
}

function request(envelope) {
	Logger.log({ message: `[Mediator.request] Trying to request ${envelope.topic} callback with ${envelope.data}.`, level: 'ALL' });
  if (typeof subscriptions[envelope.topic] === 'undefined') {
  	Logger.log({ message: `[Mediator.request] Topic ${envelope.topic} already exists.`, level: 'ERROR' });
    throw new Error(`Topic ${envelope.topic} does not exist, exiting.`);
  }

  Logger.log({ message: `[Mediator.request] ${envelope.topic} requested, returning Promise.`, level: 'ALL' });
  return new Promise(function (resolve, reject) {
    try {
    	Logger.log({ message: `[Mediator.request] ${envelope.topic} Promise resolved`, level: 'ALL' });
      resolve(subscriptions[envelope.topic](envelope.data));
    } catch (e) {
    	Logger.log({ message: `[Mediator.request] ${envelope.topic} Promise rejected ${e}`, level: 'ERROR' });
      reject(e);
    }
  });
}

export default channel;
