// Our model
var Backbone = require('backbone');
var $ = require('jquery');
var Application = require('bv-application/index');
var Home = require('bv-application/home/index');
var _ = require('lodash');

var Greeting = Backbone.Model.extend({ 
    initialize: function () {
        var model = this;
        _.extend(this, Application.ActionEmitter.extend(Home.actions));

        this.addMiddleware({
            action: Home.actions.GET_TITLE,
            after: function(data) {
                model.set({'text': 'André disse ' + data});
                return 'André disse ' + data;
            }
        });
    },
    defaults: { text: '' } 
});
var greeting = new Greeting();

// Our view
var GreetingView = Backbone.View.extend({
    el: document.getElementById('app'),
    initialize: function() {
        this.template = _.template($('#greeting-template').html());
        this.listenTo(this.model, 'change', this.render);

        _.extend(this, Application.ViewProvider.extend([this.model.service]));

        this.methods[Home.actions.GET_TITLE]().then(function(data) {
            console.log(data);
        }, function(err) {
            console.log('Error: ', err);
        });
    },
    render: function() {
        var text = this.model.get('text');
        var templateData = {
            text: text
        };

        this.$el.html(this.template(templateData));
        return this;
    }
});

var greetingView = new GreetingView({ model: greeting });
greetingView.render();


