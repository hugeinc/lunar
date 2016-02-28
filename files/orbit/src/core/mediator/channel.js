// import Q from 'q';

const subscriptions = {};

const channel = {
	subscribe,
	unsubscribe,
	// publish,
	request
};

function subscribe(options) {
	if(typeof subscriptions[options.topic] !== 'undefined') {
		throw new Error('Topic ' + options.topic + ' already exist, exiting.');
	}

	subscriptions[options.topic] = options.callback;
}

function unsubscribe(subscription) {
	if(typeof subscriptions[subscription.topic] === 'undefined') return false;
	delete subscriptions[subscription.topic];
}

function request(envelope) {
	if(typeof subscriptions[envelope.topic] === 'undefined') {
		throw new Error('Topic ' + envelope.topic + ' does not exist, exiting.');
	}

	return subscriptions[envelope.topic](envelope.data);
}

export default channel;