// import Q from 'q';

const channel = {
	subscriptions: {},
	subscribe,
	unsubscribe,
	// publish,
	request
};

function subscribe(options) {
	if(channel.subscriptions.contains(options.topic)) {
		throw new Error('Topic ' + options.topic + ' already exist, exiting.');
	}

	channel.subscriptions[topic] = options.callback;
}

function unsubscribe(subscription) {
	if(!channel.subscriptions.contains(subscription.topic)) return false;
	delete channel.subscriptions[subscription.topic];
}

// function publish(envelope) {
// 	if(!channel.subscriptions.contains(envelope.topic)) return false;
// 	if(!channel.subscriptions[subscription.topic].queue.length) return false;

// 	for(let callback in channel.subscriptions[subscription.topic].queue) {
// 		callback(envelope.data);
// 	}
// }

function request(envelope) {
	if(!channel.subscriptions.contains(envelope.topic)) {
		throw new Error('Topic ' + envelope.topic + ' does not exist, exiting.');
	}

	return channel.subscriptions[envelope.topic](envelope.data);
}