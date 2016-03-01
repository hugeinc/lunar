const subscriptions = {};

const channel = {
	subscribe,
	unsubscribe,
	request
};

function subscribe(options) {
	if(typeof subscriptions[options.topic] !== 'undefined') {
		throw new Error('Topic already exist, exiting.');
	}

	subscriptions[options.topic] = options.callback;
}

function unsubscribe(subscription) {
	if(typeof subscriptions[subscription.topic] === 'undefined') return false;
	delete subscriptions[subscription.topic];
}

function request(envelope) {
	if(typeof subscriptions[envelope.topic] === 'undefined') {
		throw new Error('Topic does not exist, exiting.');
	}

	return new Promise(function(resolve, reject) {
		try {
			resolve(subscriptions[envelope.topic](envelope.data));
		} catch(e) {
			reject(e);
		}
	});
}

export default channel;
