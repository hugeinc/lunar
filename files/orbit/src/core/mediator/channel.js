import Q from 'q';

const channel = {
	subscriptions: {},
	subscribe,
	unsubscribe,
	publish,
	request
};

function subscribe(options) {
	pushTopicIfNeeded(options.topic);
	pushCallbackToTopic(options.topic, options.callback);
}

function pushTopicIfNeeded(topic) {
	if(!channel.subscriptions.contains(topic)) {
		channel.subscriptions[topic] = {
			queue: []
		}
	}
}

function pushCallbackToTopic(topic, callback) {
	channel.subscriptions[topic].queue.push(callback);
}

function unsubscribe(subscription) {}

function publish(envelope) {}

function request(options) {}